package question

import (
	"MuiOJ-backEnd/models"
	"MuiOJ-backEnd/models/forms"
	"MuiOJ-backEnd/services/db"
	"xorm.io/xorm"
)

func Edit(uid, tid uint32, questionEditForm *forms.QuestionEditForm) error {
	_, err := db.DB.Transaction(func(session *xorm.Session) (interface{}, error) {
		questionOverview := models.Question{
			Uid: uid,
			Title: questionEditForm.Title,
			Difficulty: questionEditForm.Difficulty,
			TimeLimit: questionEditForm.TimeLimit,
			SpaceLimit: questionEditForm.SpaceLimit,
			Hide: questionEditForm.Hide,
		}
		if _, err := session.Table("question").
			Where("tid = ?", tid).
			Cols("uid", "title", "difficulty", "time_limit", "space_limit", "hide").
			Update(&questionOverview); err != nil {
				return nil, err
		}
		questionContent := models.QuestionContent{
			Content: questionEditForm.Content,
			Sample: questionEditForm.Sample,
		}
		if _, err := session.Table("question").
			Where("tid = ?", tid).
			Cols("content", "sample").
			Update(&questionContent); err != nil {
				return nil, err
		}
		return nil, nil
	})
	return err
}