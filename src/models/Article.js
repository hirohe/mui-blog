import { articles, queryArticles, article, articleComments, likeArticle, dislikeArticle } from '../services/Blog';
import { routerRedux } from 'dva/router';

const articleListRegex = /^\/articles\/page\/(\d+)/;

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

  subscriptions: {
    setup({ history, dispatch }) {
      history.listen(({ pathname, query }) => {
        const result = articleListRegex.exec(pathname)
        if (result) {
          if (query.labels) {
            dispatch({
              type: 'getArticles',
              payload: { page: result[1], queryFields: { labels: query.labels } }
            })
          } else {
            dispatch({
              type: 'getArticles',
              payload: { page: result[1] }
            })
          }
        }
      })
    }
  },

  effects: {
    *getArticles({payload}, {put, call, select}) {
      yield put({type: 'index/startLoading'});
      const { data, error } = yield call(articles, payload.page, payload.queryFields);
      if (data) {
        yield put({
          type: 'getArticlesSuccess',
          payload: {
            articles: data.articles,
            current: data.page,
            total: data.total,
            pageSize: data.pageSize
          }
        })
      } else if (error) {
        yield put({type: 'index/endLoading'});
        throw error
      }
      yield put({type: 'index/endLoading'});
    },
    *queryArticles({payload}, {put, call, select}) {
      const { fields, sort, order, exclude } = payload;
      yield put({type: 'index/startLoading'});
      const { data, error } = yield call(queryArticles, fields, sort, order, exclude);
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
      } else if (error) {
        yield put({type: 'index/endLoading'});
        throw error
      }
      yield put({type: 'index/endLoading'});
    },
    *changeArticlesPage({payload}, {put, call, select}) {
      const routing = yield select(state => state.routing);
      const { search } = routing.locationBeforeTransitions;
      yield put(routerRedux.push('articles/page/' + payload.page + search))
    },
    *getArticle({payload}, {put, call, select}) {
      const { data, error } = yield call(article, payload.id);
      if (data) {
        yield put({
          type: 'updateArticle',
          payload: { article: data }
        })
      } else if (error) {
        throw error
      }
    },
    *getComments({payload}, {put, call, select}) {
      const { data, error } = yield call(articleComments, payload.id);
      if (data) {
        yield put({
          type: 'updateComments',
          payload: { comments: data }
        })
      } else if (error) {
        throw error
      }
    },
    *like({payload}, {put, call, select}) {
      const { data, error } = yield call(likeArticle, payload.id);
      if (data) {
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
      } else if (error) {
        throw error
      }
    },
    *dislike({payload}, {put, call, select}) {
      const { data, error } = yield call(dislikeArticle, payload.id);
      if (data) {
        yield put({
          type: 'updateLike',
          payload: { like: false }
        });
        yield put({
          type: 'snackbar/show',
          payload: { message: 'Thank you!' }
        })
      } else if (error) {
        throw error
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
      articles.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
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
