const fonts = require('../constants/fonts')
const api = require('../api')

module.exports = (ctx, obj) => {
  if (obj.dateType === 0) {
    return getDateTypeView(ctx, obj.name, obj.dateType, obj.passDiff)
  }
  if (obj.dateType === 1) {
    return getDateTypeView(ctx, obj.name, obj.dateType, obj.futureDiff)
  }
}

function getDateTypeView(ctx, name, dateType, diffObj) {
  const dateTypeText1 = [$l10n('LIVE'), $l10n('STILL_HAVE')][dateType]
  const dateTypeText2 = [$l10n('ALREADY_EXPERIENCE'), $l10n('STILL_LEFT')][
    dateType
  ]
  let viewList1 = []
  const dataList = [diffObj.weeksAll, diffObj.daysAll, diffObj.hoursAll]
  const textList = [$l10n('WEEK'), $l10n('DAY'), $l10n('HOUR')]
  dataList.forEach((v, i) => {
    viewList1.push({
      type: 'text',
      props: {
        text: v + textList[i],
        padding: $insets(10, 10, 10, 10),
        font: $font('bold', fonts.small),
        background: {
          type: 'color',
          props: {
            color: ctx.isDarkMode ? $color('#57606f') : $color('#f1f2f6'),
            cornerRadius: {
              value: 10,
              style: 1
            }
          }
        }
      }
    })
  })
  const viewList2 = api.generateYearView(new Date(), ctx.isDarkMode)
  return {
    type: 'vstack',
    props: {
      frame: {
        maxHeight: Infinity,
        maxWidth: Infinity,
        alignment: $widget.alignment.leading
      },
      alignment: $widget.verticalAlignment.top,
      padding: 15
    },
    views: [
      {
        type: 'text',
        props: {
          text: name,
          font: /^[a-zA-Z]+$/.test(name)
            ? $font(fonts.enFonts, fonts.medium)
            : $font(fonts.small),
          color: $color('#ff7f50')
        }
      },
      {
        type: 'hstack',
        views: [
          {
            type: 'text',
            props: {
              text: dateTypeText1,
              font: /^[a-zA-Z]+$/.test(dateTypeText1)
                ? $font(fonts.enFonts, fonts.small)
                : $font('bold', fonts.small)
            }
          },
          {
            type: 'text',
            props: {
              text: diffObj.year,
              font: $font(fonts.enFonts, fonts.xLarge)
            }
          },
          {
            type: 'text',
            props: {
              text: $l10n('YEAR') + ',',
              font: /^[a-zA-Z]+$/.test($l10n('YEAR'))
                ? $font(fonts.enFonts, fonts.small)
                : $font('bold', fonts.small)
            }
          },
          {
            type: 'text',
            props: {
              text: diffObj.month,
              font: $font(fonts.enFonts, fonts.medium)
            }
          },
          {
            type: 'text',
            props: {
              text: $l10n('MONTH') + ',',
              font: /^[a-zA-Z]+$/.test($l10n('MONTH'))
                ? $font(fonts.enFonts, fonts.small)
                : $font('bold', fonts.small)
            }
          },
          {
            type: 'text',
            props: {
              text: diffObj.day,
              font: $font(fonts.enFonts, fonts.medium)
            }
          },
          {
            type: 'text',
            props: {
              text: $l10n('DAY'),
              font: /^[a-zA-Z]+$/.test($l10n('DAY'))
                ? $font(fonts.enFonts, fonts.small)
                : $font('bold', fonts.small)
            }
          }
        ]
      },
      {
        type: 'vstack',
        props: {
          frame: {
            maxWidth: Infinity,
            alignment: $widget.alignment.trailing
          },
          alignment: $widget.verticalAlignment.bottom
        },
        views: [
          {
            type: 'text',
            props: {
              text: dateTypeText2,
              font: /^[a-zA-Z]+$/.test(dateTypeText2)
                ? $font(fonts.enFonts, fonts.small)
                : $font('bold', fonts.mini),
              padding: $insets(4, 0, 0, 0)
            }
          },
          {
            type: 'hstack',
            props: {
              frame: {
                alignment: $widget.alignment.trailing
              }
            },
            views: viewList1
          }
        ]
      },
      {
        type: 'divider'
      },
      {
        type: 'vstack',
        props: {
          frame: {
            maxHeight: Infinity,
            maxWidth: Infinity
          },
          background: {
            type: 'color',
            props: {
              color: ctx.isDarkMode ? $color('#57606f') : $color('#f1f2f6'),
              cornerRadius: {
                value: 10,
                style: 1
              }
            }
          }
        },
        views: [
          {
            type: 'vgrid',
            props: {
              frame: {
                maxWidth: Infinity
              },
              columns: Array(15).fill({
                flexible: {
                  minimum: 5,
                  maximum: 10
                }
              })
            },
            views: viewList2
          }
        ]
      }
    ]
  }
}
