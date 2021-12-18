package question

import (
	"MuiOJ-backEnd/controllers/auth"
	"MuiOJ-backEnd/services/question"
	"github.com/gin-gonic/gin"
	"strconv"
)

func List(c *gin.Context){
	page, err := strconv.Atoi(c.Param("page"))
	if err != nil {
		c.JSON(400, gin.H{
			"code": 400,
			"message": err.Error(),
		})
		return
	}
	authObject, err := auth.GetAuthObj(c)
	if err != nil {
		c.JSON(400, gin.H{
			"code":400,
			"message": err.Error(),
		})
		return
	}
	showHide := authObject.IsAdmin
	list, err:= question.List(page, showHide)
	if err != nil {
		c.JSON(500, gin.H{
			"code": 500,
			"message": err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"code": 200,
		"message": list,
	})
}