import { articleComments, sendComment } from '../services/Article';

export default {

  namespace: 'comment',

  state: {
    name: '',
    email: '',
    comment: '',
    referenceId: null,

    commentEditorActive: false,

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
      const { name, email, comment, referenceId } = yield select(state => state.comment);
      const { data } = yield call(sendComment, payload.id, { name, email, comment, referenceId });
      if (data) {
        console.log(data);
        if (data.success) {
          yield put({
            type: 'updateCommentEditorActive',
            payload: { commentEditorActive: false }
          });
          yield put({
            type: 'snackbar/show',
            payload: { message: 'send comment success' }
          });
          yield put({
            type: 'getComments',
            payload: { id: payload.id, page: 1 }
          });
          yield put({ type: 'clearCommentInfo' })
        }
      }
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
    updateCommentInfo(state, action) {
      const { field, value } = action.payload;
      return { ...state, [field]: value }
    },
    updateReferenceId(state, action) {
      return { ...state, referenceId: action.payload.referenceId }
    },
    updateCommentEditorActive(state, action) {
      return { ...state, commentEditorActive: action.payload.commentEditorActive }
    },
    clearCommentInfo(state) {
      return { ...state, name: '', email: '', comment: '', referenceId: null }
    }
  }

}
