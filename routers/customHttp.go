package routers

import (
	"net/http"
	"time"

	"github.com/fund-go/config"
)

// CustomHTTP custom http
func CustomHTTP() {
	v := config.InitViper("server")
	port := ":" + v.GetString("port")
	r := InitRouter()
	// custom http config
	s := &http.Server{
		Addr:           port,
		Handler:        r,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	s.ListenAndServe()
}
