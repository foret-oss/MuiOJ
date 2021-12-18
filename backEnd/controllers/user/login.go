package user

import (
	"MuiOJ-backEnd/controllers/auth"
	"MuiOJ-backEnd/models/forms"
	"MuiOJ-backEnd/models/responses"
	UserService "MuiOJ-backEnd/services/user"
	"MuiOJ-backEnd/utils"
	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {

	loginType := c.Query("type")
	if loginType == "username"{
		LoginByUsername(c)
	}else if loginType == "email"{
		LoginByEmail(c)
	}else{
		c.JSON(400, gin.H{
			"code": 400,
			"message": "wrong login type",
		})
	}

}

func LoginByUsername(c *gin.Context){
	loginForm := forms.LoginUsernameForm{}
	if err := c.BindJSON(&loginForm); err != nil {
		c.JSON(400, gin.H{
			"code":    400,
			"message": err.Error(),
		})
		return
	}

	if _, err := UserService.UsernameToUid(loginForm.Username); err != nil {
		c.JSON(404, gin.H{
			"code":    404,
			"message": "Username or Password wrong.",
		})
	}

	userInfo, err := UserService.InfoByUsername(loginForm.Username)
	if err != nil {
		c.JSON(500, gin.H{
			"code": 500,
			"message": err.Error(),
		})
	}

	saltPassword := utils.SaltPasswd(loginForm.Password)
	if userInfo != nil && saltPassword == userInfo.Password {
		token, err := auth.SignJWT(userInfo)
		if err != nil {
			c.JSON(500, gin.H{
				"code":    500,
				"message": err.Error(),
			})
		} else {
			c.JSON(200, gin.H{
				"code": 200,
				"message": &responses.LoginResponse{
					Token:    token,
					Uid:      userInfo.Uid,
					Username: userInfo.Username,
					IsAdmin:  userInfo.IsAdmin,
				},
			})
		}
	} else {
		c.JSON(404, gin.H{
			"code":    404,
			"message": "Username or Password wrong",
		})
	}
}

func LoginByEmail(c *gin.Context){
	loginForm := forms.LoginEmailForm{}
	if err := c.BindJSON(&loginForm); err != nil {
		c.JSON(400, gin.H{
			"code":    400,
			"message": err.Error(),
		})
		return
	}
	if _, err := UserService.EmailToUid(loginForm.Email); err != nil {
		c.JSON(404, gin.H{
			"code":    404,
			"message": "Username or Password wrong.",
		})
	}

	userInfo, err := UserService.InfoByEmail(loginForm.Email)
	if err != nil {
		c.JSON(500, gin.H{
			"code": 500,
			"message": err.Error(),
		})
	}

	saltPassword := utils.SaltPasswd(loginForm.Password)
	if userInfo != nil && saltPassword == userInfo.Password {
		token, err := auth.SignJWT(userInfo)
		if err != nil {
			c.JSON(500, gin.H{
				"code":    500,
				"message": err.Error(),
			})
		} else {
			c.JSON(200, gin.H{
				"code": 200,
				"message": &responses.LoginResponse{
					Token:    token,
					Uid:      userInfo.Uid,
					Username: userInfo.Username,
					IsAdmin:  userInfo.IsAdmin,
				},
			})
		}
	} else {
		c.JSON(404, gin.H{
			"code":    404,
			"message": "Username or Password wrong",
		})
	}
}