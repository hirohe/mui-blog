import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ArticlePage from './routes/ArticlePage';
import ArticleListPage from './routes/ArticleListPage';
import AboutPage from './routes/AboutPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage}>
        <Route path="/articles/page/:page" title="文章列表" component={ArticleListPage}/>
        <Route path="/article/:id" title="文章" component={ArticlePage} />
        <Route path="/about" title="关于" component={AboutPage} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
