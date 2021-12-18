package question

import (
	"MuiOJ-backEnd/models"
	"MuiOJ-backEnd/models/forms"
	"MuiOJ-backEnd/services/db"
	"time"
	"xorm.io/xorm"
)

const InvalidTid = 0

func Create(uid uint32, questionForm *forms.QuestionEditForm) (int, error){
	tid, err := db.DB.Transaction(func(session *xorm.Session) (interface{}, error) {
		questionOverview := models.Question{
			Uid: uid,
			Title: questionForm.Title,
			Difficulty: questionForm.Difficulty,
			TimeLimit: questionForm.TimeLimit,
			SpaceLimit: questionForm.SpaceLimit,
			CreatedAt: time.Now(),
		}
		questionContent := models.QuestionContent{
			Tid: questionOverview.Tid,
			Content: questionForm.Content,
			Sample: questionForm.Sample,
		}

		if _, err := session.Table("question").Insert(&questionOverview); err != nil {
			return InvalidTid, err
		}
		if _, err := session.Table("question_content").Insert(&questionContent); err != nil {
			return InvalidTid, err
		}
		return questionOverview.Tid, nil
	})
	if val, ok := tid.(int); ok {
		return val, err
	}else {
		return InvalidTid, err
	}
}