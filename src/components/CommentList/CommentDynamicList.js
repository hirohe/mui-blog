import React, { PropTypes } from 'react';
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
    console.log('to previous');
    this.setState({current: this.state.current - 1});
    this.props.onPageChange(this.state.current);
  };

  nextPage = () => {
    console.log('to next');
    this.setState({current: this.state.current + 1});
    this.props.onPageChange(this.state.current);
  };

  render() {

    const { comments, current, total, pageSize } = this.props.comment;

    return (
      <div>
        <List>
          <Subheader>Comments</Subheader>
          {
            comments.map((comment, i) =>
              <CommentItem comment={comment} key={i} />
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
