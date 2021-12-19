package docker

import (
	"MuiOJ-backEnd/services/config/judger"
	"context"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
)

func InitDocker() {
	ctx := context.Background()
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}

	Context, Client = ctx, cli
	if judger.Global.Extensions.AutoPull {
		InitDockerImages()
	}
}

func GetNeedImages() map[string]bool {
	needImages := make(map[string]bool)

	for _, item := range judger.CompileObject {
		if item.BuildImage != "-" {
			needImages[item.BuildImage] = true
		}

		if item.RunImage != "-" {
			needImages[item.RunImage] = true
		}
	}

	fmt.Println("[Docker] fetching image list")
	images, err := Client.ImageList(Context, types.ImageListOptions{})
	if err != nil {
		panic(err)
	}

	fmt.Println("[Docker] comparing image list")
	for _, image := range images {
		for _, tag := range image.RepoTags {
			if _, ok := needImages[tag]; ok {
				needImages[tag] = false
			}
		}
	}

	return needImages
}

func InitDockerImages() {
	needImages := GetNeedImages()

	for imageTag, need := range needImages {
		if !need {
			continue
		}

		if v, ok := judger.LocalImages[imageTag]; ok && v {
			BuildImage(imageTag)
		} else {
			PullImage(imageTag)
		}
	}
}
