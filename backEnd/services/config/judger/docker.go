package judger


type SupportLanguageType struct {
	Name  string `json:"name"`
	Value string `json:"value"`
}

var (
	LocalImages map[string] bool
	SupportLanguage []SupportLanguageType
)