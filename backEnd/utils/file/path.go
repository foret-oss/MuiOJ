package files

import (
	"fmt"
	"github.com/dustin/go-humanize"
	"math/rand"
	"os"
	"path/filepath"
	"time"
)

const (
	CodeDir = "./files/Code/"
	SubmissionDir = "./files/submission"
)

func CodeGenerateFileNameWithMkdir(uid uint32) (string, error) {
	t := time.Now()
	path := CodeDir + t.Format("2006/01/02")

	if !Exists(path) {
		if err := os.MkdirAll(path, 0755); err != nil {
			return "", err
		}
	}

	return fmt.Sprintf("%s/%d_%d", t.Format("2006/01/02"), uid, t.UnixNano()), nil
}

func CodePath(uuid string) (string, error) {
	return filepath.Abs(fmt.Sprintf("%s/%s.code", CodeDir, uuid))
}

func SubmissionGenerateDirWithMkdir(sid uint32) (string, error) {
	t := time.Now()

	path := SubmissionDir
	path, err := filepath.Abs(fmt.Sprintf("%s/%s/%d", path, t.Format("2006/01/02"), sid))
	if err != nil {
		return "", err
	}

	if !Exists(path) {
		if err := os.MkdirAll(path, 0755); err != nil {
			return "", err
		}
	}

	return path, nil
}

func CreateTmpFile(file []byte) (string, error) {
	path := "/tmp"
	path, err := filepath.Abs(fmt.Sprintf("%s/%s", path, humanize.Ftoa(rand.Float64())))
	if err != nil {
		return "", err
	}
	if !Exists(path){
		if err := os.WriteFile(path, file, 0644); err != nil {
			return "", err
		}
	}

	return path, nil
}