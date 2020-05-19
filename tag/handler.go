package tag

import (
	"github.com/gin-gonic/gin"
	"github.com/life-assistant-go/utils"
)

// CreateTag create tag
func CreateTag(c *gin.Context) {
	var tag Tag
	utils.CreateObj(c, &tag)
}

// DeleteTag delete tag
func DeleteTag(c *gin.Context) {
	var tag Tag
	utils.DeleteObj(c, &tag)
}

// UpdateTag update tag
func UpdateTag(c *gin.Context) {
	var tag Tag
	form := map[string]string{
		"name": "string",
		"type": "int",
	}
	utils.UpdateObj(c, form, &tag)
}

// GetTag get tag
func GetTag(c *gin.Context) {
	var tag Tag
	utils.GetObj(c, &tag)
}

// GetTags get tags
func GetTags(c *gin.Context) {
	var tags []Tag
	query := map[string]bool{
		"name": true,
		"type": false,
	}
	utils.GetObjs(c, query, &tags)
}
