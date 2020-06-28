package utils

import (
	"reflect"

	log "github.com/sirupsen/logrus"
)

// ValidateStruct validate struct string type can not be ""
func ValidateStruct(obj interface{}) {
	v := reflect.ValueOf(obj)
	t := reflect.TypeOf(obj)
	for i := 0; i < t.NumField(); i++ {
		tField := t.Field(i)
		log.Info("type", tField.Type.Name())
		switch tField.Type.Name() {
		case "string":
			log.Info(v.Field(i).String())
		}
	}
}
