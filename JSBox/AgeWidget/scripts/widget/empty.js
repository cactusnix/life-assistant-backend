module.exports = () => {
  return {
    type: 'text',
    props: {
      text: $l10n('EMPTY_MSG'),
      font: $font(14)
    }
  }
}
