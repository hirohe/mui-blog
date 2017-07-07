import { delay } from '../utils/common';

export default {

  namespace: 'index',

  state: {
    loading: false,
    title: '',
  },

  subscriptions: {

  },

  reducers: {
    startLoading(state) {
      return { ...state, loading: true}
    },
    endLoading(state) {
      return { ...state, loading: false }
    }
  }

}
