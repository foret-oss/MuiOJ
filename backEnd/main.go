package main

import (
	"MuiOJ-backEnd/controllers/middlewares"
	"MuiOJ-backEnd/controllers/question"
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
	mysqlConnect := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8", config.MysqlUser, config.MysqlPassword, config.MysqlAddress, config.MysqlPort, config.MysqlDataBase)
	fmt.Println(mysqlConnect)
	if db.DB, err = xorm.NewEngine("mysql", mysqlConnect); err != nil{
		panic(err)
	}
	if err := db.DB.Ping(); err != nil {
		panic(err)
	}
	config.Secret = "1idajsihgaopkopckafpo123"
	user.Router(server)
	question.Router(server)
	if err := server.Run(fmt.Sprintf("%s:%s", config.Address, config.Port)); err != nil {
		fmt.Println(err)
	}
}
