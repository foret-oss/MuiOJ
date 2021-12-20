package user

import (
	"MuiOJ-backEnd/models"
	"MuiOJ-backEnd/services/db"
)

func UsernameToUid(username string) (uint32, error){
	var user = models.User{
		Username: username,
	}
	has, err := db.DB.Table("user").Get(&user)
	if err != nil || !has {
		return InvalidUid, err
	}
	return user.Uid, nil
}

func InfoByUsername(username string) (*models.User, error){
	var user = models.User{
		Username: username,
	}
	has, err := db.DB.Table("user").Get(&user)
	if err != nil || !has {
		return nil, err
	}
	return &user, nil
}

func InfoByEmail(email string) (*models.User, error){
	var user = models.User{
		Email: email,
	}
	has, err := db.DB.Table("user").Get(&user)
	if err != nil || !has {
		return nil, err
	}
	return &user, nil
}

func EmailToUid(email string) (uint32, error) {
	var user = models.User{
		Email: email,
	}
	has, err := db.DB.Table("user").Get(&user)
	if err != nil || !has{
		return InvalidUid, err
	}
	return user.Uid, nil
}

func UidToInfo(uid uint32)(*models.User, error) {
	var user = models.User{
		Uid: uid,
	}
	has, err := db.DB.Table("user").Get(&user)
	if err != nil || !has {
		return &user, err
	}
	return &user, nil
}