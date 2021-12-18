package question

import (
	"MuiOJ-backEnd/models"
	"MuiOJ-backEnd/services/db"
	"xorm.io/xorm"
)

func Delete(tid uint32) error{
	_, err := db.DB.Transaction(func(session *xorm.Session) (interface{}, error){
		if _, err := session.Table("question").
			Delete(&models.Question{
				Tid: tid,
		}); err != nil {
				return nil, err
		}
		if _, err := session.Table("question_content").
			Delete(&models.QuestionContent{
				Tid: tid,
		}); err != nil {
				return nil, err
		}
		return nil, nil
	})
	return err
}