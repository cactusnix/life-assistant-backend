const fonts = require('../constants/fonts')

module.exports = (ctx, obj) => {
  // 累计模式
  if (obj.dateType === 0) {
    return {
      type: 'vstack',
      props: {
        frame: {
          maxHeight: Infinity,
          maxWidth: Infinity
        },
        padding: 15
      },
      views: [
        {
          type: 'text',
          props: {
            text: obj.name,
            font: /^[a-zA-Z]+$/.test(obj.name)
              ? $font(fonts.enFonts, fonts.medium)
              : $font(fonts.small),
            color: $color('#ff7f50')
          }
        },
        {
          type: 'spacer'
        },
        {
          type: 'hstack',
          views: [
            {
              type: 'text',
              props: {
                text: obj.passDiff.year,
                font: $font(fonts.enFonts, fonts.large)
              }
            },
            {
              type: 'text',
              props: {
                text: $l10n('YEAR'),
                font: /^[a-zA-Z]+$/.test($l10n('YEAR'))
                  ? $font(fonts.enFonts, fonts.small)
                  : $font('bold', fonts.small)
              }
            }
          ]
        },
        {
          type: 'spacer'
        },
        {
          type: 'hstack',
          views: [
            {
              type: 'text',
              props: {
                text: obj.passDiff.month,
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
                text: obj.passDiff.day,
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
        }
      ]
    }
  }
  // 倒计时模式
  if (obj.dateType === 1) {
    return {
      type: 'zstack',
      props: {
        frame: {
          maxHeight: Infinity,
          maxWidth: Infinity
        },
        padding: 15
      },
      views: [
        {
          type: 'vstack',
          props: {
            frame: {
              maxHeight: Infinity,
              maxWidth: Infinity
            }
          },
          views: [
            {
              type: 'text',
              props: {
                text: obj.name,
                font: /^[a-zA-Z]+$/.test(obj.name)
                  ? $font(fonts.enFonts, fonts.medium)
                  : $font(fonts.small),
                color: $color('#ff7f50')
              }
            },
            {
              type: 'spacer'
            },
            {
              type: 'hstack',
              views: [
                {
                  type: 'text',
                  props: {
                    text: $l10n('STILL_HAVE'),
                    font: /^[a-zA-Z]+$/.test($l10n('STILL_HAVE'))
                      ? $font(fonts.enFonts, fonts.small)
                      : $font('bold', fonts.small)
                  }
                },
                {
                  type: 'text',
                  props: {
                    text: obj.futureDiff.year,
                    font: $font(fonts.enFonts, fonts.large)
                  }
                },
                {
                  type: 'text',
                  props: {
                    text: $l10n('YEAR'),
                    font: /^[a-zA-Z]+$/.test($l10n('YEAR'))
                      ? $font(fonts.enFonts, fonts.small)
                      : $font('bold', fonts.small)
                  }
                }
              ]
            },
            {
              type: 'spacer'
            },
            {
              type: 'hstack',
              views: [
                {
                  type: 'text',
                  props: {
                    text: obj.futureDiff.month,
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
                    text: obj.futureDiff.day,
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
            }
          ]
        }
      ]
    }
  }
}
