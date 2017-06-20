import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SendIcon from 'material-ui/svg-icons/content/send';

import styles from './CommentEditor.less';

class CommentEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false
    }
  }

  textFieldOnClick = () => {
    this.setState({active: true})
  };

  maskOnClick = () => {
    this.setState({active: false})
  };

  render() {
    return (
      <div>
        {this.state.active?<div className={styles.mask} onClick={this.maskOnClick}/>:null}
        <div
          className={this.state.active?styles.editorActive:styles.editor}
          style={{width: this.state.active?(window.innerWidth - 20):null}}
        >
          <TextField
            className={styles.textField}
            hintText="write your comment here"
            multiLine={true}
            rows={1}
            rowsMax={4}
            onClick={this.textFieldOnClick}
          />
          <FloatingActionButton mini className={styles.sendBtn}>
            <SendIcon/>
          </FloatingActionButton>
        </div>
      </div>
    )
  }

}

export default CommentEditor;
