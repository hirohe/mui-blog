import React from 'react';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import styles from './MyDrawer.less';

const MyDrawer = ({ open, onRequestChange }) => {

  return (
    <Drawer
      docked={false}
      width={200}
      open={open}
      onRequestChange={onRequestChange}
    >
      <div className={styles.info}>
        <Avatar
          src="https://avatars2.githubusercontent.com/u/14357567?v=3&u=d3788aa9932f57e8e5aa64389d3f148535c36458&s=400"
          size={80}
        />
        <div className={styles.name}>Hirohe</div>
        {/* social */}
      </div>
      <Divider/>
      <List>
        <ListItem primaryText="Articles"/>
        <ListItem primaryText="About Me"/>
        <ListItem primaryText="..."/>
      </List>
      {/*menu*/}
    </Drawer>
  )

};

export default MyDrawer;
