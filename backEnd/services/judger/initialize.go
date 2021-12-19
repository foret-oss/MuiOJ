package judger

import (
	"MuiOJ-backEnd/services/config/judger"
	"MuiOJ-backEnd/services/docker"
	"encoding/json"
	"sync"

)

var (
	alreadyInit = false
	initMu sync.Mutex

)

func InitJudger() {
	judger.Global = &judger.ConfigType{}
	judger.Global.Extensions.HostBind = false
	initMu.Lock()
	defer initMu.Unlock()
	if alreadyInit {
		return
	}

	alreadyInit = true
	cfg := &judger.ConfigType{
		Rpc: "",
		AutoRemove: judger.AutoRemoveType{
			Containers: true,
			Files:      true,
		},
		Concurrent: judger.ConcurrentType{
			Judge: 2,
		},
		BuildImages: []string{},
		Languages: []judger.LanguageType{
			{
				ID:      "cpp17",
				Name:    "C++/17",
				Enabled: true,
				Args: judger.CompileInfo{
					BuildArgs: []string{
						"g++",
						"-std=c++17",
						"/home/code.cpp",
						"-Wall",
						"-lm",
						"-fno-asm",
						"--static",
						"-O2",
						"-o",
						"/home/code.o",
					},
					Source:      "/home/code.cpp",
					NoBuild:     false,
					BuildTarget: "/home/code.o",
					BuildImage:  "gcc:10.2.0",
					Constraints: judger.Constraints{
						CPU:          1000000000,
						Memory:       1073741824,
						BuildTimeout: 120,
						RunTimeout:   120,
					},
					RunArgs:     []string{"/home/code.o"},
					RunArgsJSON: "[\"/home/code.o\"]",
					RunImage:    "rabbitoj/alpine_tester:0.19",
				},
			},
			{
				ID:      "rust",
				Name:    "Rust/1.46",
				Enabled: true,
				Args: judger.CompileInfo{
					BuildArgs: []string{
						"rustc",
						"-O",
						"/home/code.rs",
						"-o",
						"/home/code.o",
						"--target",
						"x86_64-unknown-linux-musl",
					},
					Source:      "/home/code.rs",
					NoBuild:     false,
					BuildTarget: "/home/code.o",
					BuildImage:  "rust:alpine",
					Constraints: judger.Constraints{
						CPU:          1000000000,
						Memory:       1073741824,
						BuildTimeout: 120,
						RunTimeout:   120,
					},
					RunArgs:     []string{"/home/code.o"},
					RunArgsJSON: "[\"/home/code.o\"]",
					RunImage:    "rabbitoj/alpine_tester:0.19",
				},
			},
			{
				ID:      "java11",
				Name:    "Java/11",
				Enabled: true,
				Args: judger.CompileInfo{
					BuildArgs: []string{
						"javac",
						"/home/Main.java",
					},
					Source:      "/home/Main.java",
					NoBuild:     false,
					BuildTarget: "/home/Main.class",
					BuildImage:  "openjdk:11",
					Constraints: judger.Constraints{
						CPU:          1000000000,
						Memory:       1073741824,
						BuildTimeout: 120,
						RunTimeout:   120,
					},
					RunArgs: []string{
						"java",
						"-cp",
						"/home",
						"Main",
					},
					RunArgsJSON: "[\"java\",\"-cp\",\"/home\",\"Main\"]",
					RunImage:    "rabbitoj/java_tester:0.19",
				},
			},
			{
				ID:      "python3",
				Name:    "Python/3",
				Enabled: true,
				Args: judger.CompileInfo{
					BuildArgs:   []string{},
					Source:      "/home/code.py",
					NoBuild:     true,
					BuildTarget: "",
					BuildImage:  "-",
					Constraints: judger.Constraints{
						CPU:          1000000000,
						Memory:       1073741824,
						BuildTimeout: 120,
						RunTimeout:   120,
					},
					RunArgs: []string{
						"python",
						"/home/code.py",
					},
					RunArgsJSON: "[\"python\",\"/home/code.py\"]",
					RunImage:    "rabbitoj/python_tester:0.19",
				},
			},
		},
		Extensions: judger.ExtensionsType{
			HostBind: false,
			AutoPull: true,
			CheckJudge: judger.CheckJudgeType{
				Enabled:  false,
				Interval: 0,
				Requeue:  false,
			},
			Expire: judger.ExpireType{
				Enabled:  false,
				Interval: 0,
			},
		},
	}

	//os.Setenv("DEV", "1")
	InitJudgerWithConf(cfg, true, "Judge")

	//OnJudgeResponse = append(OnJudgeResponse, func(sid uint32, isContest bool, judgeResult []*JudgerModels.JudgeResult) {
	//	fmt.Println(sid, isContest, judgeResult)
	//})
}

func InitJudgerWithConf(config *judger.ConfigType, withDocker bool, role string) {
	judger.Global = config
	judger.Role = role

	Language()
	if withDocker {
		docker.InitDocker()
	}

	//if withKafka {
	//	MQ(ctx)
	//}
}

func Language() {
	languageCount := 0
	for _, item := range judger.Global.Languages {
		if item.Enabled {
			languageCount++
		}
	}

	judger.LocalImages = map[string]bool{}
	judger.CompileObject = map[string]judger.CompileInfo{}
	judger.SupportLanguage = make([]judger.SupportLanguageType, languageCount)

	for _, item := range judger.Global.BuildImages {
		judger.LocalImages[item] = true
	}
	for index, item := range judger.Global.Languages {
		if !item.Enabled {
			continue
		}

		judger.SupportLanguage[index] = judger.SupportLanguageType{
			Name:  item.Name,
			Value: item.ID,
		}

		runArgsJson, err := json.Marshal(item.Args.RunArgs)
		if err != nil {
			panic(err)
		}

		currentCompileObject := item.Args
		currentCompileObject.RunArgsJSON = string(runArgsJson)
		judger.CompileObject[item.ID] = currentCompileObject
	}
}