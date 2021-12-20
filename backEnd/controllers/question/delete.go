package question

import (
	"MuiOJ-backEnd/controllers/auth"
	"MuiOJ-backEnd/services/question"
	"github.com/gin-gonic/gin"
	"strconv"
)

func Delete(c *gin.Context) {
	_, err:= auth.GetAuthObjWithAdmin(c)
	if err != nil {
		c.JSON(400, gin.H{
			"code": 400,
			"message": err.Error(),
		})
		return
	}

	tid, err := strconv.Atoi(c.Param("tid"))
	if err != nil {
		c.JSON(400, gin.H{
			"code": 400,
			"message": err.Error(),
		})
	}
	if err = question.Delete(uint32(tid)); err != nil {
		c.JSON(400, gin.H{
			"code": 400,
			"message": err.Error(),
		})
	}
	c.JSON(200, gin.H{
		"code": 200,
		"message": "success",
	})
}
