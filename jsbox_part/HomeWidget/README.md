### 开头说明

目前脚本仍算简陋，但基本功能都有，谨慎使用，可以自行修改。

有建议、bug 都可以提 issue，有时间会优化修改。

之后有时间会优化日历、提醒模块，或者加上电池模块，但大道至简嘛，目前就这样了。

版本 0.9 🎉

### 介绍

> 此小组件基于 iOS 上的 [JSBox](https://apps.apple.com/cn/app/jsbox-学习写代码/id1312014438) 编程软件开发，JSBox 使用小组件功能需要订阅，具体订阅方式可以自行查看。

1. 只支持 4\*4 布局。

2. 只支持英文

3. 内容模块有问候信息、日期、天气、日历、提醒。信息模块单纯根据时间进行区分 Sleeping Time 为[22:00, 24:00] || (24:00, 07:00]，Good Morning 为[07:00, 12:00)，Good Afternoon 为[12:00, 17:00)，Good Evening 为[17:00, 22:00)。日期模块会展示星期几，日期，以及第一个全天日程。天气模块需要自定配置和风天气的 key，展示当前温度和体感温度。日历模块展示第一个非全天日程，提醒展示第一个提醒以及剩余提醒个数。

4. 由于小组件不支持背景透明，所以颜色是设定好的，建议使用纯色背景，如有特殊需求可以自行修改代码。

5. 示例背景![背景](./assets/bg.jpg)

### 用法

1. 安装[JSBox](https://apps.apple.com/cn/app/jsbox-学习写代码/id1312014438)
2. 下载[HomeWidget 小组件脚本](https://xteko.com/redir?name=HomeWidget&url=https://github.com/cactusnix/life-assistant-backend/blob/master/jsbox_part/HomeWidget/.output/HomeWidget.box)
3. 桌面添加小组件选择 JSBox
4. 编辑小组件选择 HomeWidget 脚本，选取配置正确的 JSON 入参
5. 参数说明:

```json
{
  "weatherKey": "personalkey"
}
```

```text
- weatherKey: 非必填/string eg: "personalkey"，不填写没有天气模块
```

### 运行截图

![light](./assets/light.png)
![dark](./assets/dark.png)
