package models

type QuestionContent struct {
	Tid     uint32   `json:"tid"`
	Content string   `json:"content"`
	Sample  []Test `json:"sample"`
}

type Test struct {
	In  string `json:"in"`
	Out string `json:"out"`
}