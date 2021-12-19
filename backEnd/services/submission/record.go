package submission

import (
	"MuiOJ-backEnd/models"
	"MuiOJ-backEnd/services/db"
)

func Record(uid string) ([]models.SubmissionLite, error) {
	list := make([]models.SubmissionLite, 0)

	err := db.DB.
		Select("`submission`.*, `question`.`title` AS question_title").
		Table("submission").
		Join("INNER", "question", "`submission`.`tid` = `question`.`tid`").
		Where("`submission`.`uid` = ?", uid).
		Desc("`submission`.`sid`").
		Find(&list)

	if err != nil {
		return nil, err
	}
	return list, nil
}