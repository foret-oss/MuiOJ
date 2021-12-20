package submission

import (
	"MuiOJ-backEnd/models"
	"MuiOJ-backEnd/services/db"
	"errors"
)

func Detail(sid uint32) (*models.SubmissionExtended, error) {
	submission := models.SubmissionExtended{}

	found, err := db.DB.Table("submission").
		Select("`submission`.*, `question`.`title` AS question_title").
		Join("INNER", "question", "`submission`.`tid` = `question`.`tid`").
		Where("sid = ?", sid).
		Get(&submission)

	if err != nil {
		return nil, err
	}
	if !found {
		return nil, errors.New("submission doesn't exist")
	}
	return &submission, nil
}