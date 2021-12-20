package judger

import (
	"MuiOJ-backEnd/models/judger"
)

const (
	StatusOK = "OK"
)

func JudgeOneCase(testResult *judger.TestResult, stdout, rightStdout, compMode string) *judger.JudgeResult {
	result := &judger.JudgeResult{}

	if testResult.Status != StatusOK {
		result.Status = testResult.Status
	} else {
		isAC := false
		if compMode == "STDIN_F" {
			isAC, _ = ModeStdinFloat64(stdout, rightStdout)
		} else if compMode == "STDIN_S" {
			isAC, _ = ModeStdinString(stdout, rightStdout)
		} else {
			isAC = ModeCMP(stdout, rightStdout)
		}

		if isAC {
			result.Status = "AC"
		} else {
			result.Status = "WA"
		}
	}

	result.TimeUsed, result.SpaceUsed = testResult.TimeUsed, testResult.SpaceUsed
	return result
}
