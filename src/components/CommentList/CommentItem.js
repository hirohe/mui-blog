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

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip={'选项'}
    tooltipPosition='bottom-left'
  >
    <MoreVertIcon color={grey400}/>
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>回复</MenuItem>
  </IconMenu>
);

/*
* {
*   username,
*   hash,
*   comment,
*   date
* }
* */
const CommentItem = ({
  comment: {
    username,
    hash,
    comment,
    date,
    referenceId,
  }
}) => {

  let secondaryTextComponent;

  function toggleExpended() {
    if (secondaryTextComponent.style.overflow == 'hidden') {
      secondaryTextComponent.style.webkitLineClamp = 'initial';
      secondaryTextComponent.style.overflow = 'initial';
      secondaryTextComponent.style.textOverflow = 'initial';
      secondaryTextComponent.style.height = 'auto'
    } else {
      secondaryTextComponent.style.webkitLineClamp = '2';
      secondaryTextComponent.style.overflow = 'hidden';
      secondaryTextComponent.style.textOverflow = 'ellipsis';
      secondaryTextComponent.style.height = '36px'
    }
  }

  function referenceOnClick(e) {
    console.log(e);
  }

  let dateStr;
  const now = Date.now();
  if (now - date.valueOf() < 1000 * 60) {
    dateStr = '刚刚';
  } else {
    dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  const primaryText = (
    <span>
      {username}
      <span className={styles.date}>
        {'回复时间 : ' + dateStr}
      </span>
    </span>
  );

  const avatarSVG = jdenticon.toSvg(hash, 40);
  const avatarDiv = (
    <div className={styles.avatarDiv} dangerouslySetInnerHTML={{__html: avatarSVG}} />
  );

  const secondaryText = (
    <span ref={(c => secondaryTextComponent = c)}>
      {typeof referenceId === 'undefined'?null:<a style={{color: 'blue'}} onClick={referenceOnClick}>{`<<${referenceId} `}</a>}
      {comment}
    </span>
  );

  return (
    <ListItem
      leftAvatar={<Avatar icon={avatarDiv}/>}
      rightIconButton={rightIconMenu}
      primaryText={primaryText}
      secondaryText={secondaryText}
      secondaryTextLines={2}
      onTouchTap={toggleExpended}
    >
    </ListItem>
  )
};

export default CommentItem;
