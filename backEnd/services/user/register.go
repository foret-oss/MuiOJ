package user

import (
	"MuiOJ-backEnd/models"
	"MuiOJ-backEnd/models/forms"
	"MuiOJ-backEnd/services/db"
	"MuiOJ-backEnd/utils"
	"fmt"
	"time"
)

const InvalidUid = 0

func Register(form *forms.RegisterForm) (uint32, error){
	if uid, err := UsernameToUid(form.Username); err != nil || uid != InvalidUid {
		return InvalidUid, fmt.Errorf("username has already been registered")
	}
	if uid, err := EmailToUid(form.Email); err != nil || uid != InvalidUid {
		return InvalidUid, fmt.Errorf("email has already been registered")
	}
	user := models.User{
		Username:  form.Username,
		Password:  utils.SaltPasswd(form.Password),
		Email:     form.Email,
		LoginAt:   time.Now(),
		CreatedAt: time.Now(),
		Attempt:   0,
		Accept:    0,
	}
	if _, err := db.DB.Table(&models.User{}).Insert(&user); err != nil {
		return InvalidUid, err
	}
	return user.Uid, nil
}