import { articleComments } from '../services/Article';

export default {

  namespace: 'comment',

  state: {
    name: '',
    email: '',
    comment: '',
    comments: [],
    total: null,
    current: 1,
    pageSize: 10,
  },

  effects: {
    *getComments({payload}, {put, call, select}) {
      const { id, page, pageSize } = payload;
      const { data } = yield call(articleComments, id, page, pageSize);
      if (data) {
        console.log(data);
        const { comments, total, page, pageSize } = data;
        yield put({
          type: 'getCommentsSuccess',
          payload: {
            comments,
            total,
            current: page,
            pageSize,
          }
        });
      }
    },
    *sendComment({payload}, {put, call, select}) {

    }
  },

  reducers: {
    getCommentsSuccess(state, action) {
      const { comments, total, current, pageSize } = action.payload;
      return {
        ...state,
        comments,
        total,
        current,
        pageSize,
      }
    },
    updateComment(state, action) {
      return { ...state, comment: action.payload.comment }
    }
  }

}