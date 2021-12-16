package main

import (
	"MuiOJ-backEnd/controllers/middlewares"
	"MuiOJ-backEnd/controllers/user"
	"MuiOJ-backEnd/services/config"
	"MuiOJ-backEnd/services/db"
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"xorm.io/xorm"
)

func main() {
	server := gin.Default()
	server.Use(middlewares.Cors())
	var err error
	if db.DB, err = xorm.NewEngine("mysql", "root:wadwings@tcp(127.0.0.1:3306)/oj?charset=utf8"); err != nil {
		fmt.Println(err)
	}
	config.Secret = "1idajsihgaopkopckafpo123"
	user.Router(server)
	if err := server.Run(fmt.Sprintf("%s:%s", config.Address, config.Port)); err != nil {
		fmt.Println(err)
	}
}