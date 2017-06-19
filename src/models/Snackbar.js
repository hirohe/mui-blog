export default {

  namespace: 'snackbar',

  state: {
    open: false,
    message: '',
    duration: 4000,
  },

  reducers: {
    show(state, action) {
      const { message, duration } = action.payload;
      return { ...state, open: true, message, duration: duration || 4000 }
    },
    hidden(state, action) {
      return { ...state, open: false }
    }
  }

}
