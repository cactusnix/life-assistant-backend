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
	form := []string{
		"name",
		"type",
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
	query := []string{
		"name",
		"type",
	}
	utils.GetObjs(c, query, &tags)
}
