package utils

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
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
		if err := DB.Create(obj).Error; err != nil {
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
	if id, err := strconv.Atoi(c.Param("id")); err != nil {
		c.JSON(
			http.StatusBadRequest,
			GenerateRes("paramError", map[string]interface{}{"error": err.Error()}),
		)
	} else {
		if err := DB.Where("id = ?", id).Find(obj).Delete(obj).Error; err != nil {
			c.JSON(
				http.StatusBadRequest,
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
func UpdateObj(c *gin.Context, form map[string]string, obj interface{}) {
	param := make(map[string]interface{})
	if id, err := strconv.Atoi(c.Param("id")); err != nil {
		c.JSON(
			http.StatusBadRequest,
			GenerateRes("paramError", map[string]interface{}{"error": err.Error()}),
		)
	} else {
		for k, v := range form {
			if c.PostForm(k) != "" {
				switch v {
				// temporarily used
				case "int":
					if temp, err := strconv.Atoi(c.PostForm(k)); err != nil {
						c.JSON(
							http.StatusBadRequest,
							GenerateRes("paramError", map[string]interface{}{"error": err.Error()}),
						)
					} else {
						param[k] = temp
					}
				default:
					param[k] = c.PostForm(k)
				}
			}
		}
		if err := DB.Where("id = ?", id).Find(obj).Error; gorm.IsRecordNotFoundError(err) {
			c.JSON(
				http.StatusBadRequest,
				GenerateRes("sqlError", map[string]interface{}{"error": err.Error()}),
			)
			return
		}
		if err := DB.Where("id = ?", id).Model(obj).Updates(param).Error; err != nil {
			c.JSON(
				http.StatusBadRequest,
				GenerateRes("sqlError", map[string]interface{}{"error": err.Error()}),
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
	if id, err := strconv.Atoi(c.Param("id")); err != nil {
		c.JSON(
			http.StatusBadRequest,
			GenerateRes("paramError", map[string]interface{}{"error": err.Error()}),
		)
	} else {
		if err := DB.Where("id = ?", id).First(obj).Error; err != nil {
			c.JSON(
				http.StatusBadRequest,
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
func GetObjs(c *gin.Context, query map[string]bool, objs interface{}) {
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
	for k, v := range query {
		if c.Query(k) != "" {
			sql += k + " like ? and "
			if v {
				param = append(param, "%"+c.Query(k)+"%")
			} else {
				param = append(param, c.Query(k))
			}
		}
	}
	sql = sql[:len(sql)-5]
	if err := DB.Where(sql, param...).Limit(pagination.PageSize).Offset((pagination.PageNo - 1) * pagination.PageSize).Find(objs).Count(&pagination.Total).Error; err != nil {
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
