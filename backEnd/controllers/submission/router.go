package submission

import (
	"MuiOJ-backEnd/controllers/middlewares"
	"github.com/gin-gonic/gin"
)

func Router(baseRouter *gin.Engine) {
	submissionRouter := baseRouter.Group("/submission")
	submissionRouter.GET("/:uid", middlewares.AuthJWT(), Record)
	//submissionRouter.GET("/list/:uid/:page", List)
	submissionRouter.GET("/detail/:sid", middlewares.AuthJWT(), Detail)
	//submissionRouter.POST("/code/:sid", middlewares.AuthJWT(false), Code)
	//submissionRouter.GET("/language", Language)
}
