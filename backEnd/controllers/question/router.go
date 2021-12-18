package question

import (
	"MuiOJ-backEnd/controllers/middlewares"
	"github.com/gin-gonic/gin"
)

func Router(baseRouter *gin.Engine){
	questionRouter := baseRouter.Group("/question")
	questionRouter.POST("/item", middlewares.AuthJWT(), Create)
	questionRouter.GET("/item/:tid", middlewares.AuthJWT(), Detail)
	questionRouter.PUT("/item/:tid", middlewares.AuthJWT(), Edit)
	questionRouter.DELETE("/item/:tid", middlewares.AuthJWT(), Delete)
	questionRouter.GET("/list/:page", middlewares.AuthJWT(), List)
}