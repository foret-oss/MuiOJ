package forms

type LoginUsernameForm struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginEmailForm struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}