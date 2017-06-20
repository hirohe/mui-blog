import { articles, article } from '../services/Article';

export default {

  namespace: 'article',

  state: {
    article: {},
    articleList: [],
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
    }
  },

  reducers: {
    updateArticle(state, action) {
      return { ...state, article: action.payload.article }
    }
  }

}
