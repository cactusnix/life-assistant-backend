const fonts = require('../constants/fonts')

module.exports = (ctx, obj) => {
  // 累计模式
  if (obj.dateType === 0) {
    return getDateTypeView(ctx, obj.name, obj.dateType, obj.passDiff)
  }
  // 倒计时模式
  if (obj.dateType === 1) {
    return getDateTypeView(ctx, obj.name, obj.dateType, obj.futureDiff)
  }
}

function getDateTypeView(ctx, name, dateType, diffObj) {
  const dateTypeText = [$l10n('LIVE'), $l10n('STILL_HAVE')][dateType]
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
          text: name,
          font: /^[a-zA-Z]+$/.test(name)
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
              text: dateTypeText,
              font: /^[a-zA-Z]+$/.test(dateTypeText)
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
      }
    ]
  }
}
