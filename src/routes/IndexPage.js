import React from 'react';
import { connect } from 'dva';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import { Tabs, Tab } from 'material-ui/Tabs';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';

import CommentList from '../components/CommentList/CommentList';
import CommentDynamicList from '../components/CommentList/CommentDynamicList';

import styles from './IndexPage.css';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      selectedIndex: 0,
    }
  }

  indexOnChange = (value) => {
    this.setState({index: value})
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {

    const comments = [
      {
        username: 'Hirohe',
        hash: '3ec22854fb8d2a44c9569cc5b27afddd',
        comment: 'asdas fdajkodif asdhjo hjas w dasdji asdhac asdo j asdaso  sadio asdoic ido asdjo cjiojiojo as',
        date: new Date('2017-01-02')
      },
      {
        username: 'Hirohe',
        hash: '8d89c3087cc6cb98793ab7c0f5658c56',
        comment: 'asdas fdajkodif asdhjo hjas w dasdji asdhac asdo j asdaso  sadio asdoic ido asdjo cjiojiojo as',
        date: new Date(),
        referenceId: 123
      },
      {
        username: 'Hirohe',
        hash: '3ec22854fb8d2a44c9569cc5b27afddd',
        comment: 'asdas fdajkodif asdhjo hjas w dasdji asdhac asdo j asdaso  sadio asdoic ido asdjo cjiojiojo as',
        date: new Date()
      },
      {
        username: 'Hirohe',
        hash: '3ec22854fb8d2a44c9569cc5b27afddd',
        comment: 'asdas fdajkodif asdhjo hjas w dasdji asdhac asdo j asdaso  sadio asdoic ido asdjo cjiojiojo as',
        date: new Date()
      },
      {
        username: 'Hirohe',
        hash: '3ec22854fb8d2a44c9569cc5b27afddd',
        comment: 'asdas fdajkodif asdhjo hjas w dasdji asdhac asdo j asdaso  sadio asdoic ido asdjo cjiojiojo as',
        date: new Date('2017-01-02')
      },
      {
        username: 'Hirohe',
        hash: '8d89c3087cc6cb98793ab7c0f5658c56',
        comment: 'asdas fdajkodif asdhjo hjas w dasdji asdhac asdo j asdaso  sadio asdoic ido asdjo cjiojiojo as',
        date: new Date(),
        referenceId: 123
      },
      {
        username: 'Hirohe',
        hash: '3ec22854fb8d2a44c9569cc5b27afddd',
        comment: 'asdas fdajkodif asdhjo hjas w dasdji asdhac asdo j asdaso  sadio asdoic ido asdjo cjiojiojo as',
        date: new Date()
      },
      {
        username: 'Hirohe',
        hash: '3ec22854fb8d2a44c9569cc5b27afddd',
        comment: 'asdas fdajkodif asdhjo hjas w dasdji asdhac asdo j asdaso  sadio asdoic ido asdjo cjiojiojo as',
        date: new Date()
      },
    ];

    function onPageChange(current) {
      console.log(current)
    }

    return (
      <MuiThemeProvider>
        <div>
          <div className={styles.fixedAppBar}>
            <AppBar title="Title..." />
            <Tabs
              onChange={this.indexOnChange}
              value={this.state.index}
            >
              <Tab label="Tab 1" value={0} />
              <Tab label="Tab 2" value={1} />
              <Tab label="Tab 3" value={2} />
            </Tabs>
          </div>

          <div className={styles.tabContent}>
            <SwipeableViews
              index={this.state.index}
              onChangeIndex={this.indexOnChange}
            >
              <div style={{height: '100%', width: '100%'}}>
                <CommentDynamicList
                  comments={comments}
                  pagination={{total: 100, current: 1}}
                  onPageChange={(current)=>{console.log(current)}}
                />

              </div>
              <div>
                <CommentList comments={comments}/>
              </div>
              <div>
                <p>Tab 3</p>
              </div>
            </SwipeableViews>
          </div>

        </div>
      </MuiThemeProvider>
    );
  }

}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
