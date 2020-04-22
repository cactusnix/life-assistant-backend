package base

// Res res object for map
type Res struct {
	Code int
	Msg  string
}

// ResCode map for response msg
var ResCode = map[string]Res{
	"success":    {0, "success"},
	"paramError": {1, "parameters error"},
	"sqlError":   {2, "sql execute error"},
}
