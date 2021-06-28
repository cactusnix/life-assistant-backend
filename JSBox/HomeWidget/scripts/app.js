const api = require('./api')
const inputValue = $widget.inputValue

// 和风天气 key 个人开发者
// const inputValue = '{ "weatherKey": "personalkey" }'

exports.init = async () => {
  const currentDate = new Date()
  const obj = api.checkAndInit(inputValue)
  const views = await api.generateWidgetView(currentDate, obj)
  // 时间线
  $widget.setTimeline({
    render: ctx => {
      switch (ctx.family) {
        case 0:
          return {
            type: 'text',
            props: {
              text: 'Only support large widget!'
            }
          }
        case 1:
          return {
            type: 'text',
            props: {
              text: 'Only support large widget!'
            }
          }
        case 2:
          return views
        default:
          return {
            type: 'text',
            props: {
              text: 'Maybe this is a special view!'
            }
          }
      }
    }
  })
}
