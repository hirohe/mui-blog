import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ArticlePage from './routes/ArticlePage';
import ArticleListPage from './routes/ArticleListPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage}>
        <Route path="/articles/page/:page" component={ArticleListPage}/>
        <Route path="/article/:id" component={ArticlePage} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
