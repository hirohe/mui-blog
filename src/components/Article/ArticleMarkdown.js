import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

import styles from './ArticleMarkdown.less';

const Article = ({ content, htmlMode }) => {
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
          renderers={{ ...ReactMarkdown.renderers, CodeBlock }}
        />
      </div>
    </div>
  )
};

export default Article;
