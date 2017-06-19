import React from 'react';
import ArticleCard from './ArticleCard';
import FlatButton from 'material-ui/FlatButton';

import styles from './ArticleList.less';

class ArticleList extends React.Component {
  constructor(props) {
    super(props);

    const { pagination } = props;

    this.current = pagination.current || 1;
    this.total = pagination.total;
    this.pageSize = pagination.pageSize || 10;
    this.onChange = pagination.onChange;
  }

  componentWillMount() {

  }

  prevPage = () => {
    this.onChange(this.current - 1, this.pageSize)
  };

  nextPage = () => {
    this.onChange(this.current + 1, this.pageSize)
  };

  isLastPage = () => {
    return this.current * this.pageSize >= this.total
  };

  render() {

    const articleList = this.props.articleList;

    return (
      <div>
        {
          articleList.map((article, i) => {
            return <ArticleCard key={i} article={article} />
          })
        }
        <div className={styles.pagination}>
          <FlatButton
            label="上一页"
            onClick={this.prevPage}
            disabled={this.current === 1}
          />
          <span className={styles.page}>{this.current}/{Math.ceil(this.total/this.pageSize)}</span>
          <FlatButton
            label="下一页"
            onClick={this.nextPage}
            disabled={this.isLastPage()}
          />
        </div>
      </div>
    )
  }
}

export default ArticleList;
