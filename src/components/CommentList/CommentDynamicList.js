import React from 'react';
import ReactList from 'react-list';

import CommentItem from './CommentItem';

class CommentDynamicList extends React.Component {
  constructor(props) {
    super(props);

    const comment = {
      username: 'Hirohe',
      hash: '3ec22854fb8d2a44c9569cc5b27afddd',
      comment: 'asdas fdajkodif asdhjo hjas w dasdji asdhac asdo j asdaso  sadio asdoic ido asdjo cjiojiojo as',
      date: new Date()
    };

    this.state = {
      comments: [
        <CommentItem comment={comment}/>,
        <CommentItem comment={comment}/>,
        <CommentItem comment={comment}/>,
        <CommentItem comment={comment}/>,
        <CommentItem comment={comment}/>,
        <CommentItem comment={comment}/>,
        <CommentItem comment={comment}/>,
        <CommentItem comment={comment}/>,
        <CommentItem comment={comment}/>,
        <CommentItem comment={comment}/>,
      ]
    }
  }

  componentDidMount() {
    //this.fetchComments();
  }

  fetchComments() {
    //test
    return {
      username: 'Hirohe',
      hash: '3ec22854fb8d2a44c9569cc5b27afddd',
      comment: 'asdas fdajkodif asdhjo hjas w dasdji asdhac asdo j asdaso  sadio asdoic ido asdjo cjiojiojo as',
      date: new Date()
    };
  }

  renderCommentItem = (comment) => {

  };

  itemRenderer = (index, key) => {
    if (index == this.state.comments.length - 1) {
      console.log('add');
      const comment = this.fetchComments();
      return (
        <CommentItem comment={comment}/>
      )
    }
  };

  render() {
    return(
      <div>
        <ReactList
          length={1000}
          itemRenderer={this.itemRenderer}
        />
      </div>
    )
  }
}

export default CommentDynamicList;
