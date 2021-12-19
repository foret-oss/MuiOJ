package submission

import (
	"MuiOJ-backEnd/services/submission"
	"github.com/gin-gonic/gin"
	"strconv"
)

func Detail(c *gin.Context){
	sid, err := strconv.Atoi(c.Param("sid"))
	if err != nil {
		c.JSON(400, gin.H{
			"code": 400,
			"message": err.Error(),
		})
		return
	}
	record, err := submission.Detail(uint32(sid))
	if err != nil {
		c.JSON(500, gin.H{
			"code": 500,
			"message": err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"code": 200,
		"message": record,
	})
}