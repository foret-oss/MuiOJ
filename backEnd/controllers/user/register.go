package user

import (
	"fmt"
	"github.com/gin-gonic/gin"
)
import "MuiOJ-backEnd/models/forms"
import "MuiOJ-backEnd/services/user"

func Register(c *gin.Context){
	registerForm := forms.RegisterForm{}

	if err := c.ShouldBindJSON(&registerForm); err != nil{
		c.JSON(404, gin.H{
			"code": 404,
			"message": err.Error(),
		})
		return
	}

	if uid, err := user.Register(&registerForm); err != nil {
		fmt.Println(err)
		c.JSON(500, gin.H{
			"code": 500,
			"message": err.Error(),
		})
		return
	}else{
		c.JSON(200, gin.H{
			"code": 200,
			"message": uid,
		})
	}

}