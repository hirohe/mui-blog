import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'dva';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import CommentItem from './CommentItem';

import styles from './CommentList.less';

class CommentDynamicList extends React.Component {
  constructor(props) {
    super(props);

    this.dispatch = props.dispatch;
    this.articleId = props.articleId;
  }

  componentWillMount() {
    this.dispatch({
      type: 'comment/getComments',
      payload: { id: this.articleId, page: 1 }
    })
  }

  prevPage = () => {
    const page = this.props.comment.current - 1;
    this.dispatch({
      type: 'comment/getComments',
      payload: { id: this.articleId, page }
    });
  };

  nextPage = () => {
    const page = this.props.comment.current + 1;
    this.dispatch({
      type: 'comment/getComments',
      payload: { id: this.articleId, page }
    });
  };

  onReply = (referenceId) => {
    this.dispatch({
      type: 'comment/addReferenceIdToComment',
      payload: { referenceId }
    })
  };

  referenceOnClick = (referenceId) => {
    if (findDOMNode(this['comment_' + referenceId]))
      findDOMNode(this['comment_' + referenceId]).scrollIntoView();
  };

  render() {

    const { comments, current, total, pageSize } = this.props.comment;

    return (
      <div>
        <List>
          <Subheader>Comments</Subheader>
          {
            comments.map((comment, i) =>
              <CommentItem
                ref={commentEl => this['comment_' + comment.id] = commentEl}
                comment={comment}
                onReply={this.onReply}
                referenceOnClick={this.referenceOnClick}
                key={i}
              />
            )
          }
        </List>
        <div className={styles.pagination}>
          <FlatButton
            label="previous"
            onClick={this.prevPage}
            disabled={current === 1}
          />
          <span className={styles.pageInfo}>{`${current}/${Math.ceil(total / pageSize)}`}</span>
          <FlatButton
            label="next"
            onClick={this.nextPage}
            disabled={current * pageSize >= total}
          />
        </div>
      </div>
    );
  }
}

CommentDynamicList.propTypes = {
  onPageChange: PropTypes.func,
};

function mapStateToProps({ comment }) {
  return { comment }
}

export default connect(mapStateToProps)(CommentDynamicList);
