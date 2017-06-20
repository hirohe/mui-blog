import { articles, article, articleComments } from '../services/Article';

export default {

  namespace: 'article',

  state: {
    article: {},
    articleList: [],
    comments: []
  },

  effects: {
    *getArticles({payload}, {put, call, select}) {
      const { data } = yield call(articles);
      if (data) {
        console.log(data)
      }
    },
    *getArticle({payload}, {put, call, select}) {
      const { data } = yield call(article, payload.id);
      if (data) {
        console.log(data);
        yield put({
          type: 'updateArticle',
          payload: { article: data }
        })
      }
    },
    *getComments({payload}, {put, call, select}) {
      const { data } = yield call(articleComments, payload.id);
      if (data) {
        console.log(data);
        yield put({
          type: 'updateComments',
          payload: { comments: data }
        })
      }
    }
  },

  reducers: {
    updateArticle(state, action) {
      return { ...state, article: action.payload.article }
    },
    updateComments(state, action) {
      return { ...state, comments: action.payload.comments }
    }
  }

}
