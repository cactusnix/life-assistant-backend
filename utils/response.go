package utils

import "github.com/life-assistant-go/base"

// GenerateRes generate different res
func GenerateRes(codeKey string, obj map[string]interface{}) map[string]interface{} {
	result := make(map[string]interface{})
	result["code"] = base.ResCode[codeKey].Code
	result["msg"] = base.ResCode[codeKey].Msg
	if obj != nil {
		for k, v := range obj {
			result[k] = v
		}
	}
	return result
}
