import { delay } from '../utils/common';

export default {

  namespace: 'index',

  state: {
    loading: false
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
