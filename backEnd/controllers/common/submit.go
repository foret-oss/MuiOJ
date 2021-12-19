package common

import (
	"MuiOJ-backEnd/controllers/auth"
	"MuiOJ-backEnd/models"
	"MuiOJ-backEnd/models/forms"
	JudgetModels "MuiOJ-backEnd/models/judger"
	_ "MuiOJ-backEnd/services/judger"
	"MuiOJ-backEnd/services/question"
	SubmissionService "MuiOJ-backEnd/services/submission"
	"MuiOJ-backEnd/utils/file"
	"errors"
	_ "fmt"
	"io/ioutil"
)

func CodeSubmit(tid uint32, submitForm *forms.SubmitForm, authObject *auth.Claims, isContest bool) (uint32, error) {
	questionJudge, err := question.JudgeInfo(tid)
	if err != nil {
		return 0, err
	}

	questionDetail, err := question.Detail(tid)
	if err != nil {
		return 0, err
	}

	if !isContest && questionDetail.Hide && !authObject.IsAdmin {
		return 0, errors.New("permission denied")
	}

	fileName, err := files.CodeGenerateFileNameWithMkdir(authObject.Uid)
	if err != nil {
		return 0, err
	}

	filePath, err := files.CodePath(fileName)
	if err != nil {
		return 0, err
	}

	if err := ioutil.WriteFile(filePath, []byte(submitForm.Code), 0644); err != nil {
		return 0, err
	}

	submission, err := SubmissionService.Create(tid, authObject.Uid, submitForm.Language, fileName)
	if err != nil {
		return 0, err
	}



	go func(submission *models.Submission) {
		_ = &JudgetModels.StarterType{
			Code:       []byte(submitForm.Code),
			Sid:        submission.Sid,
			Tid:        submission.Tid,
			Language:   submission.Language,
			Test:		questionJudge.Dataset,
		}

		//if err := judger.Starter(starterParameter); err != nil {
		//	fmt.Print(err)
		//}
		//question.UpdateAttemptCount(tid)
		//user.UpdateAttemptCount(authObject.Uid)
	}(submission)

	return submission.Sid, nil
}
