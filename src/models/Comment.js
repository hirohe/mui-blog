import { articleComments, sendComment } from '../services/Blog';

export default {

  namespace: 'comment',

  state: {
    name: '',
    email: '',
    comment: '',
    referenceId: null,

    commentEditorActive: false,
    sending: false,

    comments: [],
    loading: false,
    total: null,
    current: 1,
    pageSize: 10,
  },

  effects: {
    *getComments({payload}, {put, call, select}) {
      const { id, page, pageSize } = payload;
      yield put({type: 'startLoading'});
      const { data } = yield call(articleComments, id, page, pageSize);
      if (data) {
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
      yield put({type: 'endLoading'});
    },
    *sendComment({payload}, {put, call, select}) {
      const { name, email, comment, referenceId } = yield select(state => state.comment);
      yield put({type: 'startSending'});
      yield put({type: 'index/startLoading'});
      const { data } = yield call(sendComment, payload.id, { name, email, comment, referenceId });
      if (data) {
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
      yield put({type: 'endSending'});
      yield put({type: 'index/endLoading'});
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
    },
    addReferenceIdToComment(state, action) {
      const { referenceId } = action.payload;
      return { ...state, referenceId, comment: `<<${referenceId} ${state.comment}`, commentEditorActive: true }
    },
    startSending(state) {
      return { ...state, sending: true }
    },
    endSending(state) {
      return { ...state, sending: false }
    },
    startLoading(state) {
      return { ...state, loading: true }
    },
    endLoading(state) {
      return { ...state, loading: false }
    }
  }

}
