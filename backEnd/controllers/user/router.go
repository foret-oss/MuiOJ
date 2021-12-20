package user

import (
	"MuiOJ-backEnd/controllers/middlewares"
	"github.com/gin-gonic/gin"
)

func Router(baseRouter *gin.Engine){
	userRouter := baseRouter.Group("/user")
	userRouter.POST("/login", Login)
	userRouter.POST("/register", Register)
	userRouter.GET("/my", middlewares.AuthJWT(), My)
}