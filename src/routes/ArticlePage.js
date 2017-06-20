import React from 'react';
import { connect } from 'dva';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import ShareIcon from 'material-ui/svg-icons/social/share';
import MessageIcon from 'material-ui/svg-icons/communication/message';

import CommentDynamicList from '../components/CommentList/CommentDynamicList';
import CommentEditor from '../components/CommentEditor/CommentEditor';
import ArticleMarkdown from '../components/Article/ArticleMarkdown';

import styles from './ArticlePage.less';
import commonStyle from './CommonStyle.less';

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);

    this.dispatch = props.dispatch;
    this.articleId = props.routeParams.id;

    this.state = {
      commentActive: false
    };
  }

  componentWillMount() {
    this.dispatch({
      type: 'article/getArticle',
      payload: { id: this.articleId }
    })
  }

  onCommentEditorActiveChange = (commentActive) => {
    this.setState({commentActive})
  };

  render() {

    const { article } = this.props.article;

    const createDate = new Date(article.created_at);

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
          <div className={styles.articleContent} style={{ height: window.innerHeight - 64 }}>
            <Paper className={styles.paper}>
              <ArticleMarkdown content={article.content}/>
              {/*article info*/}
              <div className={styles.info}>
                <span>Author: {article.author}</span><br/>
                <span>Publish date: {`${createDate.getFullYear()}-${createDate.getMonth() + 1}-${createDate.getDate()}`}</span><br/>
                <span>Likes: {article.likes}</span>
              </div>
              {/*article action*/}
              <div className={styles.action}>
                <IconButton><ShareIcon/></IconButton>
                <IconButton><FavoriteIcon/></IconButton>
                <IconButton><MessageIcon/></IconButton>
              </div>
            </Paper>
            <CommentEditor
              active={this.state.commentActive}
              onActiveChange={this.onCommentEditorActiveChange}
              onSend={()=>{}}
            />
            <CommentDynamicList
              comments={comments}
              pagination={{total: 100, current: 1}}
            />
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
