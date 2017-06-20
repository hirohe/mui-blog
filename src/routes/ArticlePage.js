import React from 'react';
import { connect } from 'dva';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import ShareIcon from 'material-ui/svg-icons/social/share';
import MessageIcon from 'material-ui/svg-icons/communication/message';

import CommentDynamicList from '../components/CommentList/CommentDynamicList';
import CommentEditor from '../components/CommentEditor/CommentEditor';
import ArticleMarkdown from '../components/Article/ArticleMarkdown';

import styles from './ArticlePage.less';
import commonStyle from './CommonStyle.less';

class ArticlePage extends React.Component {
  constructor(props) {
    super(props);

    this.dispatch = props.dispatch;
    this.articleId = props.routeParams.id;
  }

  componentWillMount() {

  }

  render() {

    const article = {
      id: 1,
      title: 'title',
      subtitle: 'asdasd',
      picUrl: 'http://design.1sters.com/material_design/material-design/images/materialdesign-goals-landingimage_large_mdpi.png',
      content: 'asdasd asda asdasd fadsf',
      likes: 1,
    };

    const articleList = [
      article,
      article,
      article
    ];

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

    const articleMD = `# Live demo

Changes are automatically rendered as you type.

* Follows the [CommonMark](http://commonmark.org/) spec
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no dangerouslySetInnerHTML is used! Yay!

## HTML block below

<blockquote>
    This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');

React.render();
\`\`\`

Pretty neat, eh?
![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)
## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [VaffelNinja](http://vaffel.ninja) / Espen Hovlandsdal    
    `;

    return (
      <MuiThemeProvider>
        <div>
          <div className={styles.articleContent} style={{ height: window.innerHeight - 64 }}>
            <Paper className={styles.paper}>
              <ArticleMarkdown content={articleMD}/>
              {/*article info*/}
              <div className={styles.info}>
                <span>Author: hirohe</span><br/>
                <span>Publish date: 2017-06-17</span><br/>
                <span>Likes: 0</span>
              </div>
              {/*article action*/}
              <div className={styles.action}>
                <IconButton><ShareIcon/></IconButton>
                <IconButton><FavoriteIcon/>123</IconButton>
                <IconButton><MessageIcon/></IconButton>
              </div>
            </Paper>
            <CommentEditor/>
            <CommentDynamicList comments={comments} pagination={{total: 100, current: 1}} />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps({ article }) {
  return { article }
}

export default connect(mapStateToProps)(ArticlePage);
