import React from 'react';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import CommentItem from './CommentItem';

/*
* {
*   comments: [
 *    {
 *
 *    }
 *  ]
* }
* */
const CommentList = ({
  comments,
  max
}) => {
  return (
    <div>
      <List>
        <Subheader>Comment</Subheader>
        {
          comments.map((comment, i) =>
            <div key={i}>
              <CommentItem comment={comment} />
              <Divider inset={true} />
            </div>
          )
        }
      </List>
    </div>
  )
};

export default CommentList;
