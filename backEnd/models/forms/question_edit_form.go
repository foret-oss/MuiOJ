package forms

import "MuiOJ-backEnd/models"

type QuestionEditForm struct {
	Title      string          `json:"title" binding:"required"`
	Difficulty uint8           `json:"difficulty omitempty"`
	TimeLimit  uint32          `json:"time_limit omitempty"`
	SpaceLimit uint32          `json:"space_limit omitempty"`
	Content    string          `json:"content" binding:"required"`
	Hide       bool            `json:"hide omitempty"`
	Sample     []models.Test `json:"sample" binding:"required"`
	Test	   []models.Test `json:"test" binding:"required"`
}