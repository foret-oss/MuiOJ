package question

import (
	"MuiOJ-backEnd/services/question"
	"github.com/gin-gonic/gin"
	"strconv"
)

func Detail(c *gin.Context){
	tid, err := strconv.Atoi(c.Param("tid"))
	if err != nil {
		c.JSON(404, gin.H{
			"code": 404,
			"message": err.Error(),
		})
		return
	}
	detail, err := question.Detail(uint32(tid))
	if err != nil {
		c.JSON(404, gin.H{
			"code": 404,
			"message": err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"code": 200,
		"message": detail,
	})
}