import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import ShareIcon from 'material-ui/svg-icons/social/share';
import MessageIcon from 'material-ui/svg-icons/communication/message';
import { red500 } from 'material-ui/styles/colors';
import CopyToClipboard from 'react-copy-to-clipboard';

import { randomMDColors } from '../utils/common';

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

  onCopy = () => {
    this.dispatch({
      type: 'snackbar/show',
      payload: {
        message: 'Copied'
      }
    })
  };

  likeBtnOnClick = () => {
    const like = this.props.article.like;
    let type;
    if (like) {
      type = 'article/dislike'
    } else {
      type = 'article/like'
    }
    this.dispatch({
      type,
      payload: { id: this.articleId }
    })
  };

  messageBtnOnClick = (e) => {
    e.preventDefault();
    this.dispatch({
      type: 'comment/updateCommentEditorActive',
      payload: { commentEditorActive: true }
    })
  };

  onLabelSelect = (label) => {
    this.dispatch(routerRedux.push('/articles/page/1?labels='+label))
  };

  render() {

    const { article, like } = this.props.article;
    const { comment } = this.props;

    const labelList = article.labels?article.labels.split(','):[];
    if (labelList.length > 0 && !this.colors) this.colors = randomMDColors(labelList.length);

    const createDate = new Date(article.created_at);

    return (
      <MuiThemeProvider>
        <div>
          <div className={styles.articleContent} style={{ height: window.innerHeight - 64 }}>
            <Paper className={styles.paper}>
              <ArticleMarkdown content={article.content}/>
              {/*labels*/}
              {
                labelList.length > 0?(
                  <div className={styles.labels}>
                    {
                      labelList.map((label, i) => <Chip style={{marginRight: 10}} backgroundColor={this.colors[i]} onTouchTap={()=>{this.onLabelSelect(label)}} key={i}>{label}</Chip>)
                    }
                  </div>
                ):null
              }
              {/*article info*/}
              <div className={styles.info}>
                <span>Author: {article.author}</span><br/>
                <span>Publish date: {`${createDate.getFullYear()}-${createDate.getMonth() + 1}-${createDate.getDate()}`}</span><br/>
                <span>Likes: {like?article.likes + 1:article.likes}</span>
              </div>
              {/*article action*/}
              <div className={styles.action}>
                <CopyToClipboard text={window.location.href} onCopy={this.onCopy}>
                  <IconButton><ShareIcon/></IconButton>
                </CopyToClipboard>
                <IconButton onTouchTap={this.likeBtnOnClick}><FavoriteIcon color={like?red500:null}/></IconButton>
                <IconButton onTouchTap={this.messageBtnOnClick}><MessageIcon/></IconButton>
              </div>
            </Paper>
            <CommentEditor
              active={comment.commentEditorActive}
              name={comment.name}
              email={comment.email}
              comment={comment.comment}
              sending={comment.sending}
              referenceId={comment.referenceId}
              onActiveChange={this.onCommentEditorActiveChange}
              onChange={this.onCommentEditorChange}
              onSend={this.sendComment}
            />
            <div className={styles.commentList}>
              <CommentDynamicList
                articleId={this.articleId}
              />
            </div>
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
