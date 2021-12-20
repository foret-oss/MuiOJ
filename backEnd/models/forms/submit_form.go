package forms

type SubmitForm struct {
	Language string `json:"language" binding:"required"`
	Code     string `json:"code" binding:"required"`
}
