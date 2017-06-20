import React from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SendIcon from 'material-ui/svg-icons/content/send';

import styles from './CommentEditor.less';

class CommentEditor extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.editor}>
        <TextField
          className={styles.textField}
          hintText="write your comment here"
          multiLine={true}
          rows={1}
          rowsMax={4}
        />
        <FloatingActionButton mini className={styles.sendBtn}>
          <SendIcon/>
        </FloatingActionButton>
      </div>
    )
  }

}

export default CommentEditor;
