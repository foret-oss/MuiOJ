package test

import (
	"MuiOJ-backEnd/models"
	JudgerModels "MuiOJ-backEnd/models/judger"
	"MuiOJ-backEnd/services/config/judger"
	JudgerService "MuiOJ-backEnd/services/judger"
	"fmt"
	"testing"
)

func testJudgeHelper(code []byte, language string, test []*models.Test) (string, []*JudgerModels.JudgeCaseResult, error) {
	JudgerService.InitJudger()

	judger.Global.Extensions.HostBind = false
	status, result, err := JudgerService.Scheduler(&JudgerModels.StarterType{
		Sid:        1,
		Tid:        1,
		Language:   language,
		Code:       code,
		Test:		test,
	})
	if err != nil {
		return "", nil, err
	}
	fmt.Printf("[Result] %+v \n", result)

	return status, result, err
}

func TestShouldEmitAC(t *testing.T) {
	defer func() {
		if err := recover(); err != nil {
			fmt.Printf("%+v \n", err)
			t.Fail()
		}
	}()

	code := []byte("#include <iostream> \n" +
		"int main() { \n" +
		"    int x, y; \n" +
		"    std::cin >> x >> y; \n" +
		"    std::cout << (x + y) << std::endl; \n" +
		"    return 0; \n" +
		"}")
	var test[]*models.Test
	test = append(test, &models.Test{
		In: "1  3",
		Out: "4\n",
	})
	test = append(test, &models.Test{
		In: "1 293",
		Out: "294\n",
	})
	status, judgeResult, _ := testJudgeHelper(code, "cpp17", test)

	if status != "OK" {
		fmt.Println("[Should Emit AC] Status NOT OK")
		t.Fail()
		return
	}
	for _, result := range judgeResult {
		if result.Status != "AC" {
			fmt.Println("[Should Emit AC] Some Case Status NOT AC", result)
			t.Fail()
			return
		}
	}
}