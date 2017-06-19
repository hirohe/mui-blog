import React from 'react';
import { connect } from 'dva';
import { Card, CardHeader, CardMedia, CardText, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import ShareIcon from 'material-ui/svg-icons/social/share';
import CopyToClipboard from 'react-copy-to-clipboard';
import { red500, grey500 } from 'material-ui/styles/colors';

import styles from './Article.less';

class ArticleCard extends React.Component {
  constructor(props) {
    super(props);

    this.dispatch = props.dispatch;
    this.state = {
      like: false,
    }
  }

  componentDidMount() {

  }

  toggleLike = () => {
    this.dispatch({
      type: 'snackbar/show',
      payload: {
        message: 'Thank you!'
      }
    })
    this.setState({like: !this.state.like})
  };

  onCopy = () => {
    this.dispatch({
      type: 'snackbar/show',
      payload: {
        message: 'Copied'
      }
    })
  };

  render() {

    const { id, title, subtitle, picUrl, content, likes } = this.props.article;

    return (
      <Card className={styles.articleCard}>
        <CardHeader title={title} subtitle={subtitle}/>
        <CardMedia>
          <img src={picUrl} />
        </CardMedia>
        <CardText className={styles.cardText}>{content}</CardText>
        <CardActions className={styles.cardActions}>
          <div className={styles.likes}>{this.state.like?likes+1:likes}</div>
          <IconButton onTouchTap={this.toggleLike}>
            <FavoriteIcon color={this.state.like?red500:grey500}/>
          </IconButton>
          <IconButton>
            <CopyToClipboard text={'article ' + id} onCopy={this.onCopy}>
              <ShareIcon color={grey500}/>
            </CopyToClipboard>
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}

export default connect()(ArticleCard);
