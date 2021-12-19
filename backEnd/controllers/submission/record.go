package submission

import (
	"MuiOJ-backEnd/controllers/auth"
	"MuiOJ-backEnd/services/submission"
	"github.com/gin-gonic/gin"
	"strconv"
)

func Record(c *gin.Context) {
	authObject, err := auth.GetAuthObj(c)
	if err != nil {
		c.JSON(400, gin.H{
			"code": 400,
			"message": err.Error(),
		})
		return
	}
	uid, err := strconv.Atoi(c.Param("uid"))
	if err != nil {
		c.JSON(400, gin.H{
			"code": 400,
			"message": err.Error(),
		})
		return
	}
	if uint32(uid) != authObject.Uid && !authObject.IsAdmin{
		c.JSON(400, gin.H{
			"code": 403,
			"message": "access denied",
		})
		return
	}
	record, err := submission.Record(strconv.Itoa(uid))
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
