package judger

type JudgeCaseResult struct {
	Status               string   `protobuf:"bytes,1,opt,name=status,proto3" json:"status,omitempty"`
	SpaceUsed            uint32   `protobuf:"varint,2,opt,name=space_used,json=spaceUsed,proto3" json:"space_used,omitempty"`
	TimeUsed             uint32   `protobuf:"varint,3,opt,name=time_used,json=timeUsed,proto3" json:"time_used,omitempty"`
}

type TestCase struct {
	Id         int    `json:"id"`
	StdinPath  string `json:"stdin_path"`
	StdoutPath string `json:"stdout_path"`
	Stdin      []byte `json:"stdin"`
	Stdout     []byte `json:"stdout"`
}

type TestResult struct {
	CaseId    int64  `json:"case_id"`
	Status    string `json:"status"`
	TimeUsed  uint32 `json:"time_used"`
	SpaceUsed uint32 `json:"space_used"`
}

type JudgeResult struct {
	Status    string `json:"status"`
	TimeUsed  uint32 `json:"time_used"`
	SpaceUsed uint32 `json:"space_used"`
}

type JudgeRequest struct {
	Sid                  uint32   `protobuf:"varint,1,opt,name=sid,proto3" json:"sid,omitempty"`
	Tid                  uint32   `protobuf:"varint,2,opt,name=tid,proto3" json:"tid,omitempty"`
	Version              string   `protobuf:"bytes,3,opt,name=version,proto3" json:"version,omitempty"`
	Language             string   `protobuf:"bytes,4,opt,name=language,proto3" json:"language,omitempty"`
	TimeLimit            uint32   `protobuf:"varint,5,opt,name=time_limit,json=timeLimit,proto3" json:"time_limit,omitempty"`
	SpaceLimit           uint32   `protobuf:"varint,6,opt,name=space_limit,json=spaceLimit,proto3" json:"space_limit,omitempty"`
	CompMode             string   `protobuf:"bytes,7,opt,name=comp_mode,json=compMode,proto3" json:"comp_mode,omitempty"`
	Code                 []byte   `protobuf:"bytes,8,opt,name=code,proto3" json:"code,omitempty"`
	Time                 int64    `protobuf:"varint,9,opt,name=time,proto3" json:"time,omitempty"`
	IsContest            bool     `protobuf:"varint,10,opt,name=is_contest,json=isContest,proto3" json:"is_contest,omitempty"`
}