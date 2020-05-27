package utils

import (
	"io/ioutil"
	"strconv"
	"syscall"
	"time"

	"github.com/life-assistant-go/base"
	log "github.com/sirupsen/logrus"
)

// GetFilesInfo get all file info
func GetFilesInfo(dirname string) ([]base.File, error) {
	var results []base.File
	err := GetAllFiles(dirname, &results)
	if err != nil {
		return results, err
	}
	return results, nil
}

// GetAllFiles get file info
func GetAllFiles(dirname string, results *[]base.File) error {
	files, err := ioutil.ReadDir(dirname)
	if err != nil {
		return err
	}
	for _, v := range files {
		if v.IsDir() {
			GetAllFiles(dirname+"/"+v.Name(), results)
		} else {
			// filter some file eg: .DS_Store
			if v.Name()[:1] != "." {
				sys := v.Sys()
				switch dataType := sys.(type) {
				case *syscall.Stat_t:
					*results = append(*results, base.File{
						Name:     v.Name(),
						Size:     GetFileSize(int(v.Size())),
						Created:  timespecToTime(dataType.Ctimespec),
						Modified: v.ModTime(),
					})
				default:
					log.Panic("unexpected type")
				}
			}
		}
	}
	return nil
}

// GetFileSize get file size only to mb
func GetFileSize(size int) string {
	if size >= 1000*1000 {
		return strconv.Itoa(size/(1000*1000)) + "MB"
	} else if size >= 1000 {
		return strconv.Itoa(size/1000) + "KB"
	} else {
		return strconv.Itoa(size) + "B"
	}
}

func timespecToTime(ts syscall.Timespec) time.Time {
	return time.Unix(int64(ts.Sec), int64(ts.Nsec))
}
