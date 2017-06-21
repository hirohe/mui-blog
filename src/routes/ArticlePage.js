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
  }

  componentWillMount() {
    this.dispatch({
      type: 'article/getArticle',
      payload: { id: this.articleId }
    })
  }

  onCommentEditorActiveChange = (commentEditorActive) => {
    this.dispatch({
      type: 'comment/updateCommentEditorActive',
      payload: { commentEditorActive }
    })
  };

  onCommentEditorChange = (field, value) => {
    this.dispatch({
      type: 'comment/updateCommentInfo',
      payload: { field, value }
    })
  };

  sendComment = () => {
    this.dispatch({
      type: 'comment/sendComment',
      payload: { id: this.articleId }
    })
  };

  render() {

    const { article } = this.props.article;
    const { comment } = this.props;

    const createDate = new Date(article.created_at);

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
              active={comment.commentEditorActive}
              name={comment.name}
              email={comment.email}
              comment={comment.comment}
              onActiveChange={this.onCommentEditorActiveChange}
              onChange={this.onCommentEditorChange}
              onSend={this.sendComment}
            />
            <CommentDynamicList
              articleId={this.articleId}
            />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps({ article, comment }) {
  return { article, comment }
}

export default connect(mapStateToProps)(ArticlePage);
