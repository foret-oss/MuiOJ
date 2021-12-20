package utils

import "fmt"

func DockerHostConfigBinds(source, target string) string {
	return fmt.Sprintf("%s:%s", source, target)
}
