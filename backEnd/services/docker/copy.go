package docker

import (
	"MuiOJ-backEnd/utils"
	"context"

)

func CopyFromContainer(ctx context.Context, containerID, srcPath string) ([]utils.TarFileBasicInfo, error) {
	reader, _, err := Client.CopyFromContainer(ctx, containerID, srcPath)
	if err != nil {
		return nil, err
	}
	defer func() {
		_ = reader.Close()
	}()
	tarArchiveFile, err := utils.TarToFile(reader)
	if err != nil {
		return nil, err
	}

	return tarArchiveFile, nil
}
