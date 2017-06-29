import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Drawer from 'material-ui/Drawer';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InfoIcon from 'material-ui/svg-icons/action/info-outline'

import styles from './MyDrawer.less';

const fontIconStyle = {
  fontSize: 24
};

const shadowStyle = {
  height: 80,
  width: 80,
  borderRadius: 40,
  boxShadow: '0 -2px 8px 1px #888 inset',
  top: -80,
  position: 'relative',
  marginBottom: -80,
};

class MyDrawer extends React.Component {

  constructor(props) {
    super(props);

    this.dispatch = props.dispatch;
  }

  itemOnClick = (field) => {
    switch (field) {
      case 'twitter': {
        window.location.href = 'http://twitter.com/heecn';
        break
      }
      case 'github': {
        window.location.href = 'http://github.com/hirohe';
        break
      }
      case 'articles': {
        this.dispatch(routerRedux.push('articles/page/1'));
        this.props.onRequestChange(false);
        break
      }
      case 'about': {
        this.dispatch(routerRedux.push('about'));
        this.props.onRequestChange(false);
        break
      }
    }
  };

  render() {

    const { open, onRequestChange } = this.props;

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
          <div style={shadowStyle} />
          <div className={styles.name}>Hirohe</div>
        </div>
        <List>
          <ListItem
            primaryText="@Heecn"
            leftIcon={<span style={fontIconStyle} className="icon-twitter" />}
            onTouchTap={()=>{this.itemOnClick('twitter')}}
          />
          <ListItem
            primaryText="github/hirohe"
            leftIcon={<span style={fontIconStyle} className="icon-github"/>}
            onTouchTap={()=>{this.itemOnClick('github')}}
          />
          <Divider/>
          <ListItem
            primaryText="文章"
            leftIcon={<span style={fontIconStyle} className="icon-book" />}
            onTouchTap={()=>{this.itemOnClick('articles')}}
          />
          <ListItem
            primaryText="关于"
            leftIcon={<InfoIcon/>}
            onTouchTap={()=>{this.itemOnClick('about')}}
          />
          <ListItem primaryText="..."/>
        </List>
      </Drawer>
    )
  }

}

export default connect()(MyDrawer);
