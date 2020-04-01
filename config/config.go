package config

import (
	"fmt"

	"github.com/fsnotify/fsnotify"
	"github.com/spf13/viper"
)

// InitViper 初始化读取配置文件
func InitViper(fileName string) *viper.Viper {
	v := viper.New()
	v.AddConfigPath("./config")
	v.SetConfigName(fileName)
	v.SetConfigType("toml")
	err := v.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("Fatal error config file: %s", err))
	}
	v.WatchConfig()
	v.OnConfigChange(func(e fsnotify.Event) {
		fmt.Println("Config file changed:", e.Name)
	})
	return v
}
