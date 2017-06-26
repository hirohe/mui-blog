import React from 'react';
import { connect } from 'dva';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ArticleList from '../components/ArticleList/ArticleList';

import styles from './ArticlePage.less';
import commonStyle from './CommonStyle.less';

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);

    this.dispatch = props.dispatch;
    this.page = props.routeParams.page;
  }

  componentWillMount() {
    this.dispatch({
      type: 'article/getArticles',
      payload: { page: this.page }
    })
  }

  render() {

    const { articles } = this.props.article;

    return (
      <MuiThemeProvider>
        <div>
          <div className={styles.articleContent} style={{ height: window.innerHeight - 64 }}>
            <div className={commonStyle.headTitle}>Articles</div>
            <ArticleList articleList={articles} />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps({ article }) {
  return { article }
}

export default connect(mapStateToProps)(ArticlePage);
