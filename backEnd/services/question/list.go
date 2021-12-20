package question

import (
	"MuiOJ-backEnd/models"
	"MuiOJ-backEnd/services/config"
	"MuiOJ-backEnd/services/db"
)

func List(page int, showHide bool) ([]models.Question, error){
	list := make([]models.Question, 0)
	var err error
	if showHide{
		err = db.DB.Table("question").
			Asc("tid").Limit(config.PageSize, (page - 1)*config.PageSize).
			Find(&list)
	} else {
		err = db.DB.Table("question").
			Where("hide = ?", 0).
			Asc("tid").Limit(config.PageSize, (page-1) * config.PageSize).
			Find(&list)
	}
	if err != nil {
		return nil, err
	}
	return list, nil
}