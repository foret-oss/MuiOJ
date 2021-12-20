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
		return status, nil, err
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


func TestShouldEmitWA(t *testing.T) {
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
		"    std::cout << (x * y) << std::endl; \n" +
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
		fmt.Println("[Should Emit WA] Status NOT OK")
		t.Fail()
		return
	}
	for _, result := range judgeResult {
		if result.Status != "WA" {
			fmt.Println("[Should Emit WA] Some Case Status NOT WA", result)
			t.Fail()
			return
		}
	}
}

func TestShouldEmitMLE(t *testing.T) {
	defer func() {
		if err := recover(); err != nil {
			fmt.Printf("%+v \n", err)
			t.Fail()
		}
	}()
	code := []byte("#include <iostream> \n" +
		"#include <cstring> \n" +
		"using namespace std; \n" +
		"int main() { \n" +
		"    for (int i = 0; i < 10; i++) { \n" +
		"        int* a = new int[10000000]; \n" +
		"        memset(a, 0xff, 10000000 * sizeof(int)); \n" +
		"    } \n" +
		"    while (1) {} \n" +
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
		fmt.Println("[Should Emit MLE] Status NOT OK")
		t.Fail()
		return
	}
	for _, result := range judgeResult {
		if result.Status != "MLE" {
			fmt.Println("[Should Emit MLE] Some Case Status NOT MLE", result)
			t.Fail()
			return
		}
	}
}


func TestShouldEmitCE(t *testing.T) {
	defer func() {
		if err := recover(); err != nil {
			fmt.Printf("%+v \n", err)
			t.Fail()
		}
	}()

	code := []byte("#include <iostream> \n" +
		"int mian() { \n" +
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
	status, _, _ := testJudgeHelper(code, "cpp17", test)
	if status != "CE" {
		t.Fail()
		return
	}
}

func TestShouldEmitRE(t *testing.T) {
	defer func() {
		if err := recover(); err != nil {
			fmt.Printf("%+v \n", err)
			t.Fail()
		}
	}()
	var test[]*models.Test
	test = append(test, &models.Test{
		In: "1  3",
		Out: "4\n",
	})
	test = append(test, &models.Test{
		In: "1 293",
		Out: "294\n",
	})
	code := []byte("#include <iostream> \n" +
		"int main() { \n" +
		"    exit(9); \n" +
		"    return 0; \n" +
		"}")
	status, judgeResult, _ := testJudgeHelper(code, "cpp17", test)

	if status != "OK" {
		fmt.Println("[Should Emit RE] Status NOT OK")
		t.Fail()
		return
	}
	for _, result := range judgeResult {
		if result.Status != "RE" {
			fmt.Println("[Should Emit RE] Some Case Status NOT RE", result)
			t.Fail()
			return
		}
	}
}

func TestShouldEmitTLE(t *testing.T) {
	defer func() {
		if err := recover(); err != nil {
			fmt.Printf("%+v \n", err)
			t.Fail()
		}
	}()
	var test[]*models.Test
	test = append(test, &models.Test{
		In: "1  3",
		Out: "4\n",
	})
	test = append(test, &models.Test{
		In: "1 293",
		Out: "294\n",
	})
	code := []byte("#include <iostream> \n" +
		"int main() { \n" +
		"    while (1) {} \n" +
		"    return 0; \n" +
		"}")
	status, judgeResult, _ := testJudgeHelper(code, "cpp17", test)

	if status != "OK" {
		fmt.Println("[Should Emit TLE] Status NOT OK")
		t.Fail()
		return
	}
	for _, result := range judgeResult {
		if result.Status != "TLE" {
			fmt.Println("[Should Emit TLE] Some Case Status NOT TLE", result)
			t.Fail()
			return
		}
	}
}