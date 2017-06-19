import { articles } from '../services/Article';

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
    }
  },

  reducers: {

  }

}
