import React from 'react';
import { connect } from 'dva';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
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

  }

  render() {

    const { articles } = this.props.article;

    return (
      <MuiThemeProvider>
        <div>
          {/*<div className={commonStyle.fixedAppBar}>
            <AppBar title="Article"/>
          </div>*/}
          <div className={styles.articleContent} style={{ height: window.innerHeight - 64 }}>
            <div className={commonStyle.headTitle}>Articles</div>
            <ArticleList articleList={articles} pagination={{ current: this.page, total: 11, onChange: (page, pageSize) => console.log(page, pageSize) }}/>
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
