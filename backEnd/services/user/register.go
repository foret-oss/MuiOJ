package user

import (
	"MuiOJ-backEnd/models"
	"MuiOJ-backEnd/models/forms"
	"MuiOJ-backEnd/services/db"
	"time"
)

const InvalidUid = 0

func Register(form *forms.RegisterForm) (uint32, error){
	user := models.User{
		Username:  form.Username,
		Password:  form.Password,
		Email:     form.Email,
		LoginAt:   time.Now(),
		CreatedAt: time.Now(),
		Attempt:   0,
		Accept:    0,
	}
	if _, err := db.DB.Table("user").Insert(&user); err != nil {
		return InvalidUid, err
	}
	return user.Uid, nil
}