import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ArticleCard from './ArticleCard';
import FlatButton from 'material-ui/FlatButton';

import styles from './ArticleList.less';

class ArticleList extends React.Component {
  constructor(props) {
    super(props);

    this.dispatch = props.dispatch;
  }

  componentWillMount() {

  }

  prevPage = () => {
    const page = this.props.article.current - 1;
    this.dispatch({
      type: 'article/getArticles',
      payload: { page }
    })
  };

  nextPage = () => {
    const page = this.props.article.current + 1;
    this.dispatch({
      type: 'article/getArticles',
      payload: { page }
    })
  };

  articleOnSelect = (id) => {
    this.dispatch(routerRedux.push({pathname: '/article/' + id}))
  };

  render() {

    const { articles, current, total, pageSize } = this.props.article;

    return (
      <div>
        {
          articles.map((article, i) => {
            return <ArticleCard key={i} article={article} onSelect={this.articleOnSelect} />
          })
        }
        <div className={styles.pagination}>
          <FlatButton
            label="上一页"
            onClick={this.prevPage}
            disabled={current === 1}
          />
          <span className={styles.page}>{`${current}/${Math.ceil(total / pageSize)}`}</span>
          <FlatButton
            label="下一页"
            onClick={this.nextPage}
            disabled={current * pageSize >= total}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ article }) {
  return { article }
}

export default connect(mapStateToProps)(ArticleList);
