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

    this.articleId = props.article.id;
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
    });
    this.setState({like: !this.state.like})
  };

  onSelect = () => {
    this.props.onSelect(this.articleId)
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

    const { id, title, sub_title, cover_url, preview, likes } = this.props.article;

    return (
      <Card className={styles.articleCard}>
        <CardHeader onTouchTap={this.onSelect} title={title} subtitle={sub_title}/>
        {cover_url?(
          <CardMedia onTouchTap={this.onSelect}>
            <img src={cover_url} />
          </CardMedia>
        ):null}
        <CardText onTouchTap={this.onSelect} className={styles.cardText}>{preview}</CardText>
        <CardActions className={styles.cardActions}>
          <div className={styles.likes}>{this.state.like?likes+1:likes}</div>
          <IconButton onTouchTap={this.toggleLike}>
            <FavoriteIcon color={this.state.like?red500:grey500}/>
          </IconButton>
          <IconButton>
            <CopyToClipboard text={window.location.href} onCopy={this.onCopy}>
              <ShareIcon color={grey500}/>
            </CopyToClipboard>
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}

export default connect()(ArticleCard);
