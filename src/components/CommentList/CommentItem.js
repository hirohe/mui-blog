import React from 'react';

import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { grey400 } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import jdenticon from 'jdenticon';

import styles from './CommentList.less';

const referenceIdRegex = /^<<(\d)+ /;

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip={'选项'}
    tooltipPosition='bottom-left'
  >
    <MoreVertIcon color={grey400}/>
  </IconButton>
);

const RightIconMenu = ({ onReply }) => {
  return (
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem onTouchTap={onReply}>回复</MenuItem>
    </IconMenu>
  );
};

/*
* {
*   username,
*   hash,
*   comment,
*   date
* }
* */

class CommentItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    const { onReply, referenceOnClick } = this.props;
    const { id, name, email_hash, created_at, reference_id, } = this.props.comment;
    let { comment } = this.props.comment;

    const createdDate = new Date(created_at);

    let secondaryTextComponent;

    function toggleExpended() {
      if (secondaryTextComponent.style.overflow === 'hidden') {
        secondaryTextComponent.style.webkitLineClamp = null;
        secondaryTextComponent.style.overflow = 'auto';
        secondaryTextComponent.style.textOverflow = null;
        secondaryTextComponent.style.height = 'auto';
        secondaryTextComponent.style.minHeight = '36px';
      } else {
        secondaryTextComponent.style.webkitLineClamp = '2';
        secondaryTextComponent.style.overflow = 'hidden';
        secondaryTextComponent.style.textOverflow = 'ellipsis';
        secondaryTextComponent.style.height = '36px'
      }
    }

    let dateStr;
    const now = Date.now();
    if (now - created_at.valueOf() < 1000 * 60) {
      dateStr = '刚刚';
    } else {
      dateStr = `${createdDate.getFullYear()}-${createdDate.getMonth() + 1}-${createdDate.getDate()} ${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`;
    }

    const primaryText = (
      <span>
      {name}
        <span className={styles.date}>
        {'回复时间 : ' + dateStr}
      </span>
    </span>
    );

    const avatarSVG = jdenticon.toSvg(email_hash, 40);
    const avatarDiv = (
      <div className={styles.avatarDiv} dangerouslySetInnerHTML={{__html: avatarSVG}} />
    );

    let reference;
    if (reference_id) {
      reference = <a style={{color: 'blue'}} onClick={()=>{referenceOnClick(reference_id)}}>{referenceIdRegex.exec(comment)[0]}</a>;
      comment = comment.replace(referenceIdRegex, '')
    }

    const secondaryText = (
      <span ref={(c => secondaryTextComponent = c)} style={{wordWrap: 'break-word'}}>
      {/*{reference_id?<a style={{color: 'blue'}} onClick={referenceOnClick}>{`<<${reference_id} `}</a>:null}*/}
        {reference}
        {comment}
    </span>
    );

    return (
      <ListItem
        leftAvatar={<Avatar icon={avatarDiv}/>}
        rightIconButton={(
          <IconMenu iconButtonElement={iconButtonElement}>
            <MenuItem onTouchTap={(e)=>{e.preventDefault(); onReply(id)}}>回复</MenuItem>
          </IconMenu>
        )}
        primaryText={primaryText}
        secondaryText={secondaryText}
        secondaryTextLines={2}
        onTouchTap={toggleExpended}
      >
      </ListItem>
    )
  }
}

/*const CommentItem = ({
  comment: {
    id,
    name,
    email_hash,
    comment,
    created_at,
    reference_id,
  },
  onReply,
  referenceOnClick
}) => {

  created_at = new Date(created_at);

  let secondaryTextComponent;

  function toggleExpended() {
    if (secondaryTextComponent.style.overflow === 'hidden') {
      secondaryTextComponent.style.webkitLineClamp = null;
      secondaryTextComponent.style.overflow = 'auto';
      secondaryTextComponent.style.textOverflow = null;
      secondaryTextComponent.style.height = 'auto';
      secondaryTextComponent.style.minHeight = '36px';
    } else {
      secondaryTextComponent.style.webkitLineClamp = '2';
      secondaryTextComponent.style.overflow = 'hidden';
      secondaryTextComponent.style.textOverflow = 'ellipsis';
      secondaryTextComponent.style.height = '36px'
    }
  }

  function referenceLinkOnClick(e) {
    console.log(e);
  }

  let dateStr;
  const now = Date.now();
  if (now - created_at.valueOf() < 1000 * 60) {
    dateStr = '刚刚';
  } else {
    dateStr = `${created_at.getFullYear()}-${created_at.getMonth() + 1}-${created_at.getDate()} ${created_at.getHours()}:${created_at.getMinutes()}:${created_at.getSeconds()}`;
  }

  const primaryText = (
    <span>
      {name}
      <span className={styles.date}>
        {'回复时间 : ' + dateStr}
      </span>
    </span>
  );

  const avatarSVG = jdenticon.toSvg(email_hash, 40);
  const avatarDiv = (
    <div className={styles.avatarDiv} dangerouslySetInnerHTML={{__html: avatarSVG}} />
  );

  let reference;
  if (reference_id) {
    reference = <a style={{color: 'blue'}} onClick={()=>{referenceOnClick(reference_id)}}>{referenceIdRegex.exec(comment)[0]}</a>;
    comment = comment.replace(referenceIdRegex, '')
  }

  const secondaryText = (
    <span ref={(c => secondaryTextComponent = c)} style={{wordWrap: 'break-word'}}>
      {/!*{reference_id?<a style={{color: 'blue'}} onClick={referenceOnClick}>{`<<${reference_id} `}</a>:null}*!/}
      {reference}
      {comment}
    </span>
  );

  return (
    <ListItem
      leftAvatar={<Avatar icon={avatarDiv}/>}
      rightIconButton={(
        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem onTouchTap={(e)=>{e.preventDefault(); onReply(id)}}>回复</MenuItem>
        </IconMenu>
      )}
      primaryText={primaryText}
      secondaryText={secondaryText}
      secondaryTextLines={2}
      onTouchTap={toggleExpended}
    >
    </ListItem>
  )
};*/

export default CommentItem;
