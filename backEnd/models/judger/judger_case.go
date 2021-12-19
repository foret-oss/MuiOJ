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