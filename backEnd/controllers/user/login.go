package user

import "github.com/gin-gonic/gin"
import "MuiOJ-backEnd/models/forms"

func login(c *gin.Context){
	loginForm := forms.LoginForm{}

	if err := c.BindJSON(loginForm); err != nil{
		c.JSON(400, gin.H{
			"code": 400,
			"message": err.Error(),
		})
		return
	}
}