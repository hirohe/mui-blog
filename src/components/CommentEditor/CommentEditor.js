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
      active: false,
      comment: '',
    }
  }

  textFieldOnClick = () => {
    this.props.onActiveChange(true)
  };

  textFieldOnChange = (e) => {
    this.props.onChange(e)
  };

  maskOnClick = () => {
    this.props.onActiveChange(false)
  };

  sendOnClick = () => {
    this.props.onSend()
  };

  render() {

    const { active, value } = this.props;

    return (
      <div>
        {active?<div className={styles.mask} onClick={this.maskOnClick}/>:null}
        <div
          className={active?styles.editorActive:styles.editor}
          style={{width: active?(window.innerWidth - 20):null}}
        >
          <TextField
            value={value}
            className={styles.textField}
            hintText="write your comment here"
            multiLine={true}
            rows={1}
            rowsMax={4}
            onClick={this.textFieldOnClick}
            onChange={this.textFieldOnChange}
          />
          <FloatingActionButton mini className={styles.sendBtn} onTouchTap={this.sendOnClick}>
            <SendIcon/>
          </FloatingActionButton>
        </div>
      </div>
    )
  }

}

export default CommentEditor;
