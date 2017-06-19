import React from 'react';
import { connect } from 'dva';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';

import MyDrawer from '../components/MyDrawer';

import styles from './IndexPage.css';
import commonStyle from './CommonStyle.less';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.dispatch = props.dispatch;
    this.state = {
      index: 0,
      selectedIndex: 0,
      drawVisible: false,
    }
  }

  indexOnChange = (value) => {
    this.setState({index: value})
  };

  select = (index) => this.setState({selectedIndex: index});

  hiddenSnackbar = () => {
    this.dispatch({type: 'snackbar/hidden'})
  };

  openDrawer = () => {
    this.setState({drawVisible: true});
  };

  render() {

    const { snackbar, children } = this.props;

    return (
      <MuiThemeProvider>
        <div>
          <div className={commonStyle.fixedAppBar}>
            <AppBar onLeftIconButtonTouchTap={this.openDrawer} title="Title..." />
          </div>
          <div className={styles.tabContent}>
            {children}
          </div>
          <MyDrawer
            open={this.state.drawVisible}
            onRequestChange={drawVisible => this.setState({ drawVisible })}
          />
          <Snackbar
            message={snackbar.message}
            open={snackbar.open}
            autoHideDuration={snackbar.duration}
            onRequestClose={this.hiddenSnackbar}
          />
        </div>
      </MuiThemeProvider>
    );
  }

}

function mapStateToProps({ snackbar }) {
  return { snackbar }
}

export default connect(mapStateToProps)(IndexPage);
