import React, { PropTypes } from 'react';
import { List } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import CommentItem from './CommentItem';

import styles from './CommentList.less';

class CommentDynamicList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [
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
          date: new Date()
        },
        {
          username: 'Hirohe',
          hash: '3ec22854fb8d2a44c9569cc5b27afddd',
          comment: 'asdas fdajkodif asdhjo hjas w dasdji asdhac asdo j asdaso  sadio asdoic ido asdjo cjiojiojo as',
          date: new Date()
        },
      ],

      total: props.pagination.total,
      current: 1,
      pageSize: 10
    };
  }

  componentDidMount() {
    //this.fetchComments();
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

  isLastPage = () => {
    return this.state.current * this.state.pageSize >= this.state.total;
  };

  render() {
    return(
      <div>
        <List>
          {
            this.props.comments.map((comment, i) =>
              <CommentItem comment={comment} key={i}/>
            )
          }
        </List>
        {/*<FlatButton className={styles.btnMore}>more</FlatButton>*/}
        <div className={styles.pagination}>
          <FlatButton
            label='previous'
            onClick={this.prevPage}
            disabled={this.state.current == 1}
          />
          <span className={styles.pageInfo}>{`${this.state.current}/${this.state.total / this.state.pageSize}`}</span>
          <FlatButton
            label='next'
            onClick={this.nextPage}
            disabled={this.isLastPage()}
          />
        </div>
      </div>
    )
  }
}

CommentDynamicList.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

export default CommentDynamicList;
