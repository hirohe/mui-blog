import React from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SendIcon from 'material-ui/svg-icons/content/send';

import styles from './CommentEditor.less';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class CommentEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      comment: '',
      nameErrorText: null,
      emailErrorText: null,
      commentErrorText: null,
    }
  }

  textFieldOnClick = () => {
    this.props.onActiveChange(true)
  };

  textFieldOnChange = (field, e) => {
    this.validate(field, e.target.value);
    this.props.onChange(field, e.target.value)
  };

  maskOnClick = () => {
    this.props.onActiveChange(false)
  };

  sendOnClick = () => {
    const { name, email, comment } = this.props;
    if (this.validate('name', name) && this.validate('email', email) && this.validate('comment', comment)){
      this.props.onSend()
    }
  };

  validate = (field, value) => {
    let flag = true;

    switch (field) {
      case 'name': {
        if (value.length <= 0) {
          flag = false;
          this.setState({nameErrorText: 'Name required'})
        } else  {
          this.setState({nameErrorText: null})
        }
        break;
      }
      case 'email': {
        if (!emailRegex.test(value)) {
          flag = false;
          this.setState({emailErrorText: 'must be a valid email'})
        } else  {
          this.setState({emailErrorText: null})
        }
        break;
      }
      case 'comment': {
        if (value.length < 5) {
          flag = false;
          this.setState({commentErrorText: 'Comment length at less 5 words'})
        } else  {
          this.setState({commentErrorText: null})
        }
        break;
      }
    }
    return flag;
  };

  render() {

    const { active, name, email, comment, sending } = this.props;

    return (
      <div>
        {active?<div className={styles.mask} onClick={this.maskOnClick}/>:null}
        <div
          className={active?styles.editorActive:styles.editor}
          style={{width: active?(window.innerWidth - 20):null}}
        >
          <div>
            <TextField
              fullWidth
              floatingLabelText="Name"
              value={name}
              onClick={this.textFieldOnClick}
              onChange={e => this.textFieldOnChange('name', e)}
              errorText={this.state.nameErrorText}
            />
            <TextField
              fullWidth
              floatingLabelText="Email"
              value={email}
              type="email"
              onClick={this.textFieldOnClick}
              onChange={e => this.textFieldOnChange('email', e)}
              errorText={this.state.emailErrorText}
            />
            <TextField
              fullWidth
              floatingLabelText="Comment"
              value={comment}
              hintText="write your comment here"
              multiLine={true}
              rows={1}
              rowsMax={4}
              onClick={this.textFieldOnClick}
              onChange={e => this.textFieldOnChange('comment', e)}
              errorText={this.state.commentErrorText}
            />
          </div>
          <FloatingActionButton
            mini
            className={styles.sendBtn}
            onTouchTap={this.sendOnClick}
            disabled={sending}
          >
            <SendIcon/>
          </FloatingActionButton>
        </div>
      </div>
    )
  }

}

export default CommentEditor;
