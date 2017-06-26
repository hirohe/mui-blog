import { articles, article, articleComments, likeArticle, dislikeArticle } from '../services/Article';

export default {

  namespace: 'article',

  state: {
    article: {},

    articles: [],
    current: 1,
    total: null,
    pageSize: 10,

    comments: [],
    like: false,
  },

  effects: {
    *getArticles({payload}, {put, call, select}) {
      yield put({type: 'index/startLoading'});
      const { data } = yield call(articles, payload.page);
      if (data) {
        console.log(data);
        yield put({
          type: 'getArticlesSuccess',
          payload: {
            articles: data.articles,
            current: data.page,
            total: data.total,
            pageSize: data.pageSize
          }
        })
      }
      yield put({type: 'index/endLoading'});
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
    },
    *like({payload}, {put, call, select}) {
      const { data } = yield call(likeArticle, payload.id);
      if (data) {
        console.log(data);
        if (data.success) {
          yield put({
            type: 'snackbar/show',
            payload: { message: 'Thank you!' }
          })
        } else {
          yield put({
            type: 'snackbar/show',
            payload: { message: 'already like it!' }
          })
        }
        yield put({
          type: 'updateLike',
          payload: { like: true }
        });
      }
    },
    *dislike({payload}, {put, call, select}) {
      const { data } = yield call(dislikeArticle, payload.id);
      if (data) {
        console.log(data);
        yield put({
          type: 'updateLike',
          payload: { like: false }
        });
        yield put({
          type: 'snackbar/show',
          payload: { message: 'Thank you!' }
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
    },
    updateLike(state, action) {
      return { ...state, like: action.payload.like }
    },
    getArticlesSuccess(state, action) {
      const { articles, current, pageSize, total } = action.payload;
      return {
        ...state,
        articles,
        current,
        pageSize,
        total,
      }
    }
  }

}
