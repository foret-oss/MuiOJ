package user

import (
	"MuiOJ-backEnd/controllers/auth"
	userService "MuiOJ-backEnd/services/user"
	"github.com/gin-gonic/gin"
)

func My(c *gin.Context) {
	authObject, err := auth.GetAuthObj(c)
	if err != nil {
		c.JSON(400, gin.H{
			"code": 400,
			"message": err.Error(),
		})
		return
	}

	uid := authObject.Uid
	user, err := userService.UidToInfo(uid)
	if err != nil {
		c.JSON(400, gin.H{
			"code": 400,
			"message": err.Error(),
		})
		return
	} else {
		c.JSON(200, gin.H{
			"code": 200,
			"message": user,
		})
	}
}