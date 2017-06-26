import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import styles from './Spin.less';

class Spin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const currentLoading = this.state.loading;
    const loading = nextProps.loading;
    const delay = this.props.delay;

    if (!currentLoading && loading) {

      let ms = 300;
      if (delay && !isNaN(Number(delay))) ms = delay;

      this.delayTimeout = setTimeout(() => {
        this.setState({ loading })
      }, ms)
    } else if (!currentLoading && !loading) {
      if (this.delayTimeout) {
        clearTimeout(this.delayTimeout);
      }
    } else if (currentLoading) {
      this.setState({ loading })
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div className={styles.loading}>
          <CircularProgress/>
        </div>
      )
    } else {
      return null;
    }
  }

}

export default Spin;
