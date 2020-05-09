package utils

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/life-assistant-go/base"
)

// CreateObj create obj
func CreateObj(c *gin.Context, obj interface{}) {
	if err := c.ShouldBind(obj); err != nil {
		c.JSON(
			http.StatusBadRequest,
			GenerateRes("paramError", map[string]interface{}{"error": err.Error()}),
		)
	} else {
		if err := DB().Create(obj).Error; err != nil {
			c.JSON(
				http.StatusBadRequest,
				GenerateRes("paramError", map[string]interface{}{"error": err.Error()}),
			)
		} else {
			c.JSON(
				http.StatusOK,
				GenerateRes("success", map[string]interface{}{
					"msg": base.CreateSuccess,
				}),
			)
		}
	}
}

// DeleteObj Delete obj
func DeleteObj(c *gin.Context, obj interface{}) {
	if id, err := strconv.Atoi(c.Query("id")); err != nil {
		c.JSON(
			http.StatusBadRequest,
			GenerateRes("paramError", map[string]interface{}{"error": err.Error()}),
		)
	} else {
		if err := DB().Where("id = ?", id).Find(obj).Delete(obj).Error; err != nil {
			c.JSON(
				http.StatusInternalServerError,
				GenerateRes("sqlError", map[string]interface{}{"error": err.Error()}),
			)
		} else {
			c.JSON(
				http.StatusOK,
				GenerateRes("success", map[string]interface{}{
					"msg": base.DeleteSuccess,
				}),
			)
		}
	}
}

// UpdateObj update obj
func UpdateObj(c *gin.Context, form []string, obj interface{}) {
	var param map[string]interface{}
	if id, err := strconv.Atoi(c.Query("id")); err != nil {
		c.JSON(
			http.StatusBadRequest,
			GenerateRes("paramError", map[string]interface{}{"error": err.Error()}),
		)
	} else {
		for _, v := range form {
			if c.PostForm("v") != "" {
				param[v] = c.PostForm("v")
			}
		}
		if err := DB().Where("id = ?", id).Model(obj).Updates(param).Error; err != nil {
			c.JSON(
				http.StatusBadRequest,
				GenerateRes("paramError", map[string]interface{}{"error": err.Error()}),
			)
		} else {
			c.JSON(
				http.StatusOK,
				GenerateRes("success", map[string]interface{}{
					"msg": base.UpdateSuccess,
				}),
			)
		}
	}
}

// GetObj get obj
func GetObj(c *gin.Context, obj interface{}) {
	if id, err := strconv.Atoi(c.Query("id")); err != nil {
		c.JSON(
			http.StatusBadRequest,
			GenerateRes("paramError", map[string]interface{}{"error": err.Error()}),
		)
	} else {
		if err := DB().Where("id = ?", id).First(obj).Error; err != nil {
			c.JSON(
				http.StatusInternalServerError,
				GenerateRes("sqlError", map[string]interface{}{"error": err.Error()}),
			)
		} else {
			c.JSON(
				http.StatusOK,
				GenerateRes("success", map[string]interface{}{
					"data": obj,
					"msg":  base.ReadSuccess,
				}),
			)
		}
	}
}

// GetObjs get objs
func GetObjs(c *gin.Context, query []string, objs interface{}) {
	var (
		sql        string
		param      []interface{}
		pagination base.Pagination
	)
	// TODO
	// optimize later
	// count error now rows in result set
	if pageNo, err := strconv.Atoi(c.Query("pageNo")); err == nil {
		pagination.PageNo = pageNo
	} else {
		c.JSON(
			http.StatusBadRequest,
			GenerateRes("paramError", map[string]interface{}{"error": err.Error()}),
		)
		return
	}
	if pageSize, err := strconv.Atoi(c.Query("pageSize")); err == nil {
		pagination.PageSize = pageSize
	} else {
		c.JSON(
			http.StatusBadRequest,
			GenerateRes("paramError", map[string]interface{}{"error": err.Error()}),
		)
		return
	}
	length := len(query)
	for i, v := range query {
		if c.Query(v) != "" {
			if i < length-1 {
				sql += v + " like ? and "
			} else {
				sql += v + " like ?"
			}
			param = append(param, "%"+c.Query(v)+"%")
		}
	}
	if err := DB().Where(sql, param...).Limit(pagination.PageSize).Offset((pagination.PageNo - 1) * pagination.PageSize).Find(objs).Count(&pagination.Total).Error; err != nil {
		c.JSON(
			http.StatusOK,
			GenerateRes("sqlError", map[string]interface{}{"error": err.Error()}),
		)
	} else {
		c.JSON(
			http.StatusOK,
			GenerateRes("success", map[string]interface{}{
				"list":     objs,
				"pageNo":   pagination.PageNo,
				"pageSize": pagination.PageSize,
				"total":    pagination.Total,
				"msg":      base.ReadSuccess,
			}),
		)
	}
}
