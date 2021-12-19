package submission

import (
	JudgerModels "MuiOJ-backEnd/models/judger"
	"fmt"
)

func JudgeResponseCallback(sid uint32, judgeResult []*JudgerModels.JudgeCaseResult) {
	_, err := Result(sid, judgeResult)
	if err != nil {
		fmt.Println(err)
		return
	}
}