import React from 'react';
import { connect } from 'dva';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import ArticleList from '../components/ArticleList/ArticleList';
import CommentDynamicList from '../components/CommentList/CommentDynamicList';

import styles from './ArticlePage.less';
import commonStyle from './CommonStyle.less';

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);

    this.dispatch = props.dispatch;
    this.articleId = props.routeParams.id;
  }

  componentWillMount() {

  }

  render() {

    const article = {
      id: 1,
      title: 'title',
      subtitle: 'asdasd',
      picUrl: 'http://design.1sters.com/material_design/material-design/images/materialdesign-goals-landingimage_large_mdpi.png',
      content: 'asdasd asda asdasd fadsf',
      likes: 1,
    };

    const articleList = [
      article,
      article,
      article
    ];

    const comments = [
      {
        username: 'Hirohe',
        hash: '3ec22854fb8d2a44c9569cc5b27afddd',
        comment: 'asdas fdajkodif asdhjo hjas w dasdji asdhac asdo j asdaso  sadio asdoic ido asdjo cjiojiojo as',
        date: new Date('2017-01-02')
      },
      {
        username: 'Hirohe',
        hash: '8d89c3087cc6cb98793ab7c0f5658c56',
        comment: 'asdas fdajkodif asdhjo hjas w dasdji asdhac asdo j asdaso  sadio asdoic ido asdjo cjiojiojo as',
        date: new Date(),
        referenceId: 123
      },
      {
        username: 'Hirohe',
        hash: '3ec22854fb8d2a44c9569cc5b27afddd',
        comment: 'asdas fdajkodif asdhjo hjas w dasdji asdhac asdo j asdaso  sadio asdoic ido asdjo cjiojiojo as',
        date: new Date()
      },
      {
        username: 'Hirohe',
        hash: '3ec22854fb8d2a44c9569cc5b27afddd',
        comment: 'asdas fdajkodif asdhjo hjas w dasdji asdhac asdo j asdaso  sadio asdoic ido asdjo cjiojiojo as',
        date: new Date()
      },
      {
        username: 'Hirohe',
        hash: '3ec22854fb8d2a44c9569cc5b27afddd',
        comment: 'asdas fdajkodif asdhjo hjas w dasdji asdhac asdo j asdaso  sadio asdoic ido asdjo cjiojiojo as',
        date: new Date('2017-01-02')
      },
      {
        username: 'Hirohe',
        hash: '8d89c3087cc6cb98793ab7c0f5658c56',
        comment: 'asdas fdajkodif asdhjo hjas w dasdji asdhac asdo j asdaso  sadio asdoic ido asdjo cjiojiojo as',
        date: new Date(),
        referenceId: 123
      },
      {
        username: 'Hirohe',
        hash: '3ec22854fb8d2a44c9569cc5b27afddd',
        comment: 'asdas fdajkodif asdhjo hjas w dasdji asdhac asdo j asdaso  sadio asdoic ido asdjo cjiojiojo as',
        date: new Date()
      },
      {
        username: 'Hirohe',
        hash: '3ec22854fb8d2a44c9569cc5b27afddd',
        comment: 'asdas fdajkodif asdhjo hjas w dasdji asdhac asdo j asdaso  sadio asdoic ido asdjo cjiojiojo as',
        date: new Date()
      },
    ];

    return (
      <MuiThemeProvider>
        <div>
          {/*<div className={commonStyle.fixedAppBar}>
            <AppBar title="Article"/>
          </div>*/}
          <div className={styles.articleContent} style={{ height: window.innerHeight - 64 }}>
            <div className={commonStyle.headTitle}>hello</div>
            <ArticleList articleList={articleList} pagination={{ current: 1, total: 11, onChange: (page, pageSize) => console.log(page, pageSize) }}/>
            <CommentDynamicList comments={comments} pagination={{total: 100, current: 1}} />
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
