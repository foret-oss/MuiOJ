package submission

import (
	"MuiOJ-backEnd/models"
	JudgerModels "MuiOJ-backEnd/models/judger"
	"MuiOJ-backEnd/services/question"
	"MuiOJ-backEnd/services/user"
)

func Result(sid uint32, judgeResult []*JudgerModels.JudgeCaseResult) (string, error) {
	submissionDetail, err := Detail(sid)
	if err != nil {
		return "", err
	}

	if submissionDetail.Status != "ING" {
		return "", err
	}

	status, spaceUsed, timeUsed := "AC", uint32(0), uint32(0)
	for _, res := range judgeResult {
		spaceUsed += res.SpaceUsed
		timeUsed += res.TimeUsed

		if res.Status != "AC" {
			status = "NO"
		}
	}

	if caseLen := len(judgeResult); caseLen >= 1 {
		timeUsed /= uint32(caseLen)
		spaceUsed /= uint32(caseLen)
	}

	resultObj := make([]models.JudgeResult, len(judgeResult))
	for i, item := range judgeResult {
		resultObj[i] = models.JudgeResult{
			Status:    item.Status,
			TimeUsed:  item.TimeUsed,
			SpaceUsed: item.SpaceUsed,
		}
	}

	if err := Update(sid, timeUsed, spaceUsed, status, resultObj); err != nil {
		return "", err
	}

	if status == "AC" {
		go question.UpdateAcceptedCount(submissionDetail.Tid)
		go user.UpdateAcceptedCount(submissionDetail.Uid)
	}

	return status, nil
}

func CE(sid uint32,judgeResult []*JudgerModels.JudgeCaseResult) error {
	resultObj := make([]models.JudgeResult, len(judgeResult))
	for i := range judgeResult {
		resultObj[i] = models.JudgeResult{
			Status:    "CE",
			TimeUsed:  0,
			SpaceUsed: 0,
		}
	}
	return Update(sid, 0, 0, "CE", resultObj)
}