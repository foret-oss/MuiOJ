package utils

import "MuiOJ-backEnd/services/config"

func SaltPasswdWithSecret(passwdMd5 string) string {
	return Md5(passwdMd5 + config.Secret)
}

func SaltPasswd(password string) string {
	passwdMd5 := Md5(password)
	return SaltPasswdWithSecret(passwdMd5)
}