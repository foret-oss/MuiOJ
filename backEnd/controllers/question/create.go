package question

import (
	"MuiOJ-backEnd/controllers/auth"
	"MuiOJ-backEnd/models/forms"
	QuestionService "MuiOJ-backEnd/services/question"
	"github.com/gin-gonic/gin"
)

func Create(c *gin.Context) {
	authObject, err := auth.GetAuthObj(c)
	if err != nil {
		c.JSON(400, gin.H{
			"code":    400,
			"message": err.Error(),
		})
	}

	isAdmin := authObject.IsAdmin
	if !isAdmin {
		c.JSON(400, gin.H{
			"code":    400,
			"message": err.Error(),
		})
	}

	questionCreateForm := forms.QuestionEditForm{}
	if err := c.BindJSON(&questionCreateForm); err != nil {
		c.JSON(400, gin.H{
			"code":    400,
			"message": err.Error(),
		})
	}

	tid, err := QuestionService.Create(
		authObject.Uid,
		&questionCreateForm,
	)

	if err != nil {
		c.JSON(500, gin.H{
			"code":    500,
			"message": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"code":    200,
		"message": tid,
	})
}
