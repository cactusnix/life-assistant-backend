package utils

import (
	"github.com/sirupsen/logrus"
)

// Logger obj
func Logger() *logrus.Logger {
	l := logrus.New()
	l.SetFormatter(&logrus.TextFormatter{
		TimestampFormat: "2006-01-02 15:04:05",
		FullTimestamp:   true,
	})
	return l
}
