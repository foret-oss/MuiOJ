package auth

import (
	"errors"
	"github.com/gin-gonic/gin"
)

func GetAuthObj(c *gin.Context) (*Claims, error) {
	authObjectRaw, exists := c.Get("AuthObject")
	if !exists{
		return nil, errors.New("access denied")
	}
	authObject, ok := authObjectRaw.(*Claims)
	if !ok {
		return nil, errors.New("token format invalid")
	}

	return authObject, nil
}

func GetAuthObjWithAdmin(c *gin.Context) (*Claims, error) {
	authObjectRaw, exists := c.Get("AuthObject")
	if !exists{
		return nil, errors.New("access denied")
	}
	authObject, ok := authObjectRaw.(*Claims)
	if !ok {
		return nil, errors.New("token format invalid")
	}
	if !authObject.IsAdmin{
		return nil, errors.New("admin required")
	}
	return authObject, nil
}