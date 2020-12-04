$widget.setTimeline({
  policy: {
    afterDate: new Date()
  },
  render: ctx => {
    console.log(ctx)
    return {
      type: 'text',
      props: {
        text: new Date().getSeconds() + 's'
      }
    }
  }
})
