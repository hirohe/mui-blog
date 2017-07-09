import React from 'react';
import { Tweet } from 'react-twitter-widgets';

const tweetIdRegex = /^tweet:(\d+)/;
const biliIdRegex = /^bilibili:(\d+):?(\d+)?/;

class BlockQuote extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {

    const { children } = this.props;

    return (
      <div>
        {
          children.map((child, i) => {
            const text = child.props.children[0];
            if (text) {

              //render for twitter '> tweet:842211276147179520'
              if (text.startsWith('tweet')) {
                const result = tweetIdRegex.exec(text);
                if (result) {
                  const tweetId = result[1];
                  return <Tweet tweetId={tweetId} key={i}/>
                }
              }

              //render for bilibili '> bilibili:123:123'
              if (text.startsWith('bilibili')) {
                const result = biliIdRegex.exec(text);
                if (result) {
                  const aid = result[1];
                  const cid = result[2];
                  return <iframe key={i} src={`//www.bilibili.com/blackboard/player.html?aid=${aid}&cid=${cid}`} scrolling="no" frameBorder="no" width="100%"></iframe>
                }
              }

            }
            return <blockquote key={i}>{child}</blockquote>
          })
        }
      </div>
    )

  }

}

export default BlockQuote
