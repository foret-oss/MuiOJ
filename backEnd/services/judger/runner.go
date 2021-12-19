package judger

import (
	"MuiOJ-backEnd/models"
	judger2 "MuiOJ-backEnd/models/judger"
	"MuiOJ-backEnd/services/config/judger"
	"MuiOJ-backEnd/services/docker"
	"MuiOJ-backEnd/utils"
	files "MuiOJ-backEnd/utils/file"
	"bytes"
	"errors"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"io/ioutil"
	"log"
	"os"
	"path"
	"path/filepath"
	"time"
)

func Runner(
	sid uint32, codePath string,
	compileInfo *judger.CompileInfo,
	testCases []*models.Test,
	timeLimit, spaceLimit, outputPath string,
	code []byte, buildProduction []byte,
) (map[string][]byte, error) {
	vmPath := codePath + "vm/"
	fmt.Printf("(%d) [Runner] Compile OK, start run container \n", sid)

	resultFilePathInHost := filepath.Join(codePath, "result.json")
	err := files.TouchFile(resultFilePathInHost)
	if err != nil {
		fmt.Printf("(%d) %+v \n", sid, err)
		return nil, err
	}
	fmt.Printf("(%d) [Runner] Touched empty result file for build \n", sid)

	containerConfig := &container.Config{
		Image:           compileInfo.RunImage,
		NetworkDisabled: true,
		Env: []string{
			"EXEC_COMMAND=" + compileInfo.RunArgsJSON,
			"CASE_COUNT=" + fmt.Sprintf("%d", len(testCases)),
			"TIME_LIMIT=" + timeLimit,
			"SPACE_LIMIT=" + spaceLimit,
			"Role=Tester",
		},
	}

	if os.Getenv("DEV") == "1" {
		containerConfig.Env = append(containerConfig.Env, "DEV=1")
	}

	containerHostConfig := &container.HostConfig{}
	//if judger.Global.Extensions.HostBind {
	//	if len(testCases) > 0 {
	//		os.CreateTemp()
	//		, err := files.CreateTmpFile([]byte(testCases[0].In))
	//		if err != nil {
	//			return nil, err
	//		}
	//		containerHostConfig.Mounts = []mount.Mount{
	//			{
	//				Source:   path.Dir(testCases[0].StdinPath),
	//				Target:   "/case",
	//				ReadOnly: true,
	//				Type:     mount.TypeBind,
	//			},
	//		}
	//	}
	//
	//	containerHostConfig.Binds = []string{
	//		utils.DockerHostConfigBinds(resultFilePathInHost, "/result/info.json"),
	//		utils.DockerHostConfigBinds(outputPath, "/output"),
	//	}
	//}

	if !compileInfo.NoBuild {
		containerHostConfig.Binds = append(containerHostConfig.Binds,
			utils.DockerHostConfigBinds(vmPath, path.Dir(compileInfo.BuildTarget)))
	}

	if judger.Global.AutoRemove.Containers && judger.Global.Extensions.HostBind {
		containerHostConfig.AutoRemove = true
	}

	fmt.Printf("(%d) [Runner] Creating container \n", sid)
	resp, err := docker.Client.ContainerCreate(docker.Context,
		containerConfig,
		containerHostConfig,
		nil,
		nil,
		"")

	if err != nil {
		return nil, err
	}

	defer func() {
		go func() {
			if err := docker.Client.ContainerStop(docker.Context, resp.ID, nil); err != nil {
				log.Printf("Unable to stop container %s: %s", resp.ID, err)
			}

			removeOptions := types.ContainerRemoveOptions{
				RemoveVolumes: true,
				Force:         true,
			}

			if err := docker.Client.ContainerRemove(docker.Context, resp.ID, removeOptions); err != nil {
				log.Printf("Unable to remove container: %s", err)
			}
		}()
	}()

	if !compileInfo.NoBuild && !judger.Global.Extensions.HostBind {
		fmt.Printf("(%d) [Runner] Copying build production to container \n", sid)
		io := bytes.NewReader(buildProduction)

		if err := docker.Client.CopyToContainer(
			docker.Context,
			resp.ID,
			"/",
			io,
			types.CopyToContainerOptions{
				AllowOverwriteDirWithFile: true,
				CopyUIDGID:                false,
			}); err != nil {
			return nil, err
		}
	}

	var tarInfos []utils.TarFileBasicInfo
	if !judger.Global.Extensions.HostBind {
		fmt.Printf("(%d) [Runner] Preparing judge cases for container \n", sid)
		var testCasesInType []*judger2.TestCase
		for index, test := range testCases{
			in, err := os.CreateTemp("/tmp", "rw")
			if err != nil {
				return nil, err
			}
			out, err := os.CreateTemp("/tmp", "rw")
			if err != nil {
				return nil, err
			}
			if _, err = in.Write([]byte(test.In)); err != nil {
				return nil ,err
			}
			if _, err = out.Write([]byte(test.Out)); err != nil {
				return nil, err
			}
			testCasesInType = append(testCasesInType, &judger2.TestCase{
				Id:         index + 1,
				StdinPath:  fmt.Sprintf("%s", in.Name()),
				Stdin:      []byte(test.In),
				StdoutPath: fmt.Sprintf("%s", out.Name()),
				Stdout:     []byte(test.Out),
			})
			_ = in.Close()
			_ = out.Close()
		}
		caseArchiveInfos, err := utils.TestCasesToTarArchiveInfo(testCasesInType, "/case")
		if err != nil {
			return nil, err
		}
		tarInfos = append(tarInfos, caseArchiveInfos...)
	}

	if compileInfo.NoBuild {
		sourceTarInfo := utils.TarFileBasicInfo{
			Name: compileInfo.Source,
			Body: code,
			Mode: 0644,
		}

		tarInfos = append(tarInfos, sourceTarInfo)
	}

	if len(tarInfos) > 0 {
		fmt.Printf("(%d) [Runner] Copying files to container \n", sid)
		io, err := utils.ConvertToTar(tarInfos)
		if err != nil {
			return nil, err
		}

		if err := docker.Client.CopyToContainer(
			docker.Context,
			resp.ID,
			"/",
			io,
			types.CopyToContainerOptions{
				AllowOverwriteDirWithFile: true,
				CopyUIDGID:                false,
			}); err != nil {
			return nil, err
		}
	}

	fmt.Printf("(%d) [Runner] Running container \n", sid)
	if err := docker.Client.ContainerStart(docker.Context, resp.ID, types.ContainerStartOptions{}); err != nil {
		fmt.Printf("(%d) [Runner] %+v \n", sid, err)
		return nil, err
	}

	docker.ContainerErrToStdErr(resp.ID)
	statusCh, errCh := docker.Client.ContainerWait(docker.Context, resp.ID, container.WaitConditionNotRunning)
	fmt.Printf("(%d) [Runner] Waiting for status \n", sid)

	var collectedStdout map[string][]byte
	select {
	case err := <-errCh:
		return nil, err
	case status := <-statusCh:
		if status.StatusCode != int64(0) {
			return nil, errors.New("RE")
		}

		if !judger.Global.Extensions.HostBind {
			if err := copyResultJsonFile(resp.ID, resultFilePathInHost); err != nil {
				return nil, err
			}
			if collectedStdout, err = copyStdoutFile(resp.ID); err != nil {
				return nil, err
			}
		}
		fmt.Printf("(%d) %+v \n", sid, status)
	case <-time.After(time.Duration(compileInfo.Constraints.RunTimeout) * time.Second):
		go docker.ForceContainerRemove(resp.ID)
		return nil, errors.New("run timeout")
	}

	return collectedStdout, nil
}

func copyResultJsonFile(containerID, resultFilePathInHost string) error {
	files, err := docker.CopyFromContainer(docker.Context, containerID, "/result/info.json")
	if err != nil {
		return err
	}
	if len(files) != 1 {
		return errors.New(fmt.Sprintf("files.length = %d, not 1", len(files)))
	}
	configFile := files[0]
	if err := ioutil.WriteFile(resultFilePathInHost, configFile.Body, 0644); err != nil {
		return err
	}

	return nil
}

//func copyStdoutFile(containerID, outputPath string) error {
//	files, err := docker.CopyFromContainer(docker.Context, containerID, "/result/info.json")
//	if err != nil {
//		return err
//	}
//
//	for _, file := range files {
//		casePath := fmt.Sprintf("%s/%s", outputPath, file.Name)
//		if err := ioutil.WriteFile(casePath, file.Body, os.FileMode(file.Mode)); err != nil {
//			return err
//		}
//	}
//
//	return nil
//}

func copyStdoutFile(containerID string) (map[string][]byte, error) {
	files, err := docker.CopyFromContainer(docker.Context, containerID, "/output")
	if err != nil {
		return nil, err
	}

	collectedStdout := make(map[string][]byte)
	for _, file := range files {
		collectedStdout[file.Name] = file.Body
	}
	return collectedStdout, nil
}
