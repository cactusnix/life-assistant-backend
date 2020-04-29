package base

// Pagination struct
type Pagination struct {
	PageNo   uint `json:"pageNo"`
	PageSize uint `json:"pageSize"`
	Total    uint `json:"total"`
}
