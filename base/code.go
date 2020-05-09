package base

// CodeMsg res object for map
type CodeMsg struct {
	Code int
	Msg  string
}

// ResCode map for response msg
var ResCode = map[string]CodeMsg{
	"success":      {0, "success"},
	"paramError":   {1, "parameters error"},
	"sqlError":     {2, "sql execute error"},
	"executeError": {3, "code execute error"},
}
