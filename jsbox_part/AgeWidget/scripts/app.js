// 由于小组件的刷新机制暂时先显示到小时

const emptyWidget = require('./widget/empty')
const smallWidget = require('./widget/small')
const mediumWidget = require('./widget/medium')
const api = require('./api')
// const inputValue = $widget.inputValue
const inputValue =
  '{ "birthDate": "1996/8/1 9:0:0", "dateType": 0, "name": "cactusnix" }'

exports.init = () => {
  const obj = api.checkAndInit(inputValue)
  console.log(obj)
  $widget.setTimeline({
    policy: {
      afterDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1,
        0,
        0,
        0,
        0
      )
    },
    render: ctx => {
      if (!obj) {
        return emptyWidget()
      }
      switch (ctx.family) {
        case 0:
          return smallWidget(ctx, obj)
        case 1:
          return mediumWidget(ctx, obj)
        case 2:
          break
        default:
          break
      }
    }
  })
}