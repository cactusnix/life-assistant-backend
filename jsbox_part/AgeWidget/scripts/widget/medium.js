const fonts = require('../constants/fonts')

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
            maxHeight: Infinity,
            maxWidth: Infinity,
            alignment: $widget.alignment.leading
          },
          alignment: $widget.verticalAlignment.top
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
                maxHeight: Infinity,
                maxWidth: Infinity,
                alignment: $widget.alignment.leading
              }
            },
            views: [
              {
                type: 'text',
                props: {
                  text: diffObj.weeksAll + '周',
                  padding: $insets(10, 10, 10, 10),
                  font: $font('bold', fonts.small),
                  background: {
                    type: 'color',
                    props: {
                      color: $color('#57606f'),
                      cornerRadius: {
                        value: 10,
                        style: 1
                      }
                    }
                  }
                }
              },
              {
                type: 'text',
                props: {
                  text: diffObj.daysAll + '天',
                  padding: $insets(10, 10, 10, 10),
                  font: $font('bold', fonts.small),
                  background: {
                    type: 'color',
                    props: {
                      color: ctx.isDarkMode
                        ? $color('#57606f')
                        : $color('#ced6e0'),
                      cornerRadius: {
                        value: 10,
                        style: 1
                      }
                    }
                  }
                }
              },
              {
                type: 'text',
                props: {
                  text: diffObj.hoursAll + '小时',
                  padding: $insets(10, 10, 10, 10),
                  font: $font('bold', fonts.small),
                  background: {
                    type: 'color',
                    props: {
                      color: $color('#57606f'),
                      cornerRadius: {
                        value: 10,
                        style: 1
                      }
                    }
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  }
}
