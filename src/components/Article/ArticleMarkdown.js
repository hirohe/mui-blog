import React from 'react';
import ReactMarkdown from 'react-markdown';
/* custom renderers */
import CodeBlock from './CodeBlock';
import BlockQuote from './BlockQuote';

import styles from './ArticleMarkdown.less';

const Article = ({ content, htmlMode }) => {

  content = content || '';

  return (
    <div className={styles.article}>
      <div className={styles.header}>
        Title
      </div>
      <div className={styles.content}>
        <ReactMarkdown
          source={content}
          skipHtml={htmlMode === 'skip'}
          escapeHtml={htmlMode === 'escape'}
          renderers={{ ...ReactMarkdown.renderers, CodeBlock, BlockQuote }}
        />
      </div>
    </div>
  )
};

export default Article;
