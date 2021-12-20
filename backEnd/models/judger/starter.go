package judger

import "MuiOJ-backEnd/models"

type StarterType struct {
	Code     []byte        `json:"code,omitempty"`
	Sid      uint32        `json:"sid,omitempty"`
	Tid      uint32        `json:"tid,omitempty"`
	Language string        `json:"language,omitempty"`
	Test     []*models.Test `json:"test,omitempty"`
}
