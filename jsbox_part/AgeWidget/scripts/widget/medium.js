const fonts = require('../constants/fonts')

module.exports = (ctx, obj) => {
  if (obj.dateType === 0) {
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
            text: obj.name,
            font: /^[a-zA-Z]+$/.test(obj.name)
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
                text: obj.passDiff.year,
                font: $font(fonts.enFonts, fonts.large)
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
        },
        {
          type: 'spacer'
        },
        {
          type: 'vstack',
          props: {
            frame: {
              maxHeight: Infinity,
              maxWidth: Infinity
            },
            background: $color('red')
          },
          views: [
            {
              type: 'hstack',
              views: [
                {
                  type: 'vstack',
                  views: [
                    {
                      type: 'text',
                      props: {
                        text: 'test3'
                      }
                    },
                    {
                      type: 'text',
                      props: {
                        text: 'test3'
                      }
                    }
                  ]
                },
                {
                  type: 'spacer'
                },
                {
                  type: 'vstack',
                  views: [
                    {
                      type: 'text',
                      props: {
                        text: 'test3'
                      }
                    },
                    {
                      type: 'text',
                      props: {
                        text: 'test3'
                      }
                    }
                  ]
                }
              ]
            },
            {
              type: 'hstack',
              views: [
                {
                  type: 'vstack',
                  views: [
                    {
                      type: 'text',
                      props: {
                        text: 'test3'
                      }
                    },
                    {
                      type: 'text',
                      props: {
                        text: 'test3'
                      }
                    }
                  ]
                },
                {
                  type: 'spacer'
                },
                {
                  type: 'vstack',
                  views: [
                    {
                      type: 'text',
                      props: {
                        text: 'test3'
                      }
                    },
                    {
                      type: 'text',
                      props: {
                        text: 'test3'
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
