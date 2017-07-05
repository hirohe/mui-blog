import React from 'react';
import { connect } from 'dva';
import { Card, CardHeader, CardMedia, CardText, CardActions } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import ShareIcon from 'material-ui/svg-icons/social/share';
import CopyToClipboard from 'react-copy-to-clipboard';
import { red500, grey500 } from 'material-ui/styles/colors';

import { randomMDColors } from '../../utils/common';

import { likeArticle, dislikeArticle } from '../../services/Blog';

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

    let message = 'Thank you!';
    if (this.state.like) {
      dislikeArticle(this.articleId).then(response => {
        this.setState({ like: false });
      })
    } else {
      likeArticle(this.articleId).then(response => {
        if (!response.data.success) {
          message = 'already like it'
        }
        this.setState({ like: true })
      })
    }

    this.dispatch({
      type: 'snackbar/show',
      payload: { message }
    });
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

  onLabelSelect =(label) => {
    console.log(label)
  };

  render() {

    const { id, title, sub_title, author, created_at, cover_url, preview, labels, likes } = this.props.article;
    const labelList = labels?labels.split(','):[];
    const colors = randomMDColors(labelList.length);

    const createdDate = new Date(created_at);

    return (
      <Card className={styles.articleCard}>
        <CardHeader
          onTouchTap={this.onSelect}
          title={title}
          subtitle={(
            <span>{sub_title}
              <span>{` | 创建日期:${createdDate.getFullYear()}-${createdDate.getMonth() + 1}-${createdDate.getDate()} | ${author}`}</span>
            </span>
          )}
        />
        {cover_url?(
          <CardMedia onTouchTap={this.onSelect}>
            <img src={cover_url} />
          </CardMedia>
        ):null}
        <CardText onTouchTap={this.onSelect} className={styles.cardText}>
          {preview}
        </CardText>
        {
          labelList.length > 0?(
            <div className={styles.labels}>
              {
                labelList.map((label, i) => <Chip style={{marginRight: 10}} backgroundColor={colors[i]} onTouchTap={()=>{this.onLabelSelect(label)}} key={i}>{label}</Chip>)
              }
            </div>
          ):null
        }
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
