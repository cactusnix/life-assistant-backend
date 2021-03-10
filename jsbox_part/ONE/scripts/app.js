const { updateApp } = require('./api')

exports.init = async () => {
  const updateResult = updateApp()
  if (updateResult) {
    const oneURL = 'http://m.wufazhuce.com/one'
    const logURL = 'http://image.wufazhuce.com/icon_4.0.png'
    let resp = await $http.get(oneURL)
    let token = resp.data
      .match(/One.token = '.*'/)[0]
      .split(' = ')[1]
      .replaceAll("'", '')
    const apiURL = 'http://m.wufazhuce.com/one/ajaxlist/0?_token=' + token
    let todayData = (await $http.get(apiURL)).data.data[0]
    let logoView = {
      type: 'image',
      props: {
        frame: {
          width: 20,
          height: 20
        },
        position: $point(25, 25),
        image: $image(logURL),
        resizable: true
      }
    }
    $widget.setTimeline({
      render: ctx => {
        switch (ctx.family) {
          case 0:
            return {
              type: 'zstack',
              views: [
                {
                  type: 'image',
                  props: {
                    image: $image(todayData.img_url),
                    resizable: true
                  }
                },
                logoView
              ]
            }
          case 1:
            return {
              type: 'zstack',
              views: [
                {
                  type: 'image',
                  props: {
                    image: $image(todayData.img_url),
                    resizable: true,
                    opacity: 0.8
                  }
                },
                logoView,
                {
                  type: 'vstack',
                  props: {
                    frame: {
                      maxWidth: Infinity,
                      maxHeight: Infinity
                    },
                    padding: $insets(40, 14, 0, 14)
                  },
                  views: [
                    {
                      type: 'text',
                      props: {
                        frame: {
                          maxWidth: Infinity,
                          maxHeight: Infinity
                        },
                        padding: $insets(5, 0, 5, 0),
                        text: todayData.content,
                        font: $font(14),
                        color: $color('#f9f3f3'),
                        minimumScaleFactor: 0.5
                      }
                    },
                    {
                      type: 'text',
                      props: {
                        frame: {
                          maxWidth: Infinity,
                          alignment: $widget.alignment.trailing
                        },
                        padding: $insets(0, 0, 14, 0),
                        text: 'From：' + todayData.text_authors,
                        font: $font(12),
                        color: $color('#f9f3f3'),
                        minimumScaleFactor: 0.5
                      }
                    }
                  ]
                }
              ]
            }
          case 2:
            return {
              type: 'vstack',
              views: [
                {
                  type: 'zstack',
                  props: {
                    frame: {
                      height: 245
                    }
                  },
                  views: [
                    {
                      type: 'image',
                      props: {
                        image: $image(todayData.img_url),
                        resizable: true
                      }
                    },
                    logoView
                  ]
                },
                {
                  type: 'text',
                  props: {
                    frame: {
                      maxWidth: Infinity,
                      maxHeight: Infinity
                    },
                    padding: $insets(5, 14, 5, 14),
                    text: todayData.content,
                    font: $font(14),
                    color: $color('#6e7c7c'),
                    minimumScaleFactor: 0.5
                  }
                },
                {
                  type: 'text',
                  props: {
                    frame: {
                      maxWidth: Infinity,
                      alignment: $widget.alignment.trailing
                    },
                    padding: $insets(0, 0, 14, 14),
                    text: 'From：' + todayData.text_authors,
                    font: $font(12),
                    color: $color('#92967d'),
                    minimumScaleFactor: 0.5
                  }
                }
              ]
            }
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
}
