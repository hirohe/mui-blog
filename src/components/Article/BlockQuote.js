import React from 'react';
import { Tweet } from 'react-twitter-widgets';

const tweetIdRegex = /^tweet:(\d+)/;

/* render for twitter '> tweet:842211276147179520' or normal blockquote '> hello'*/
class BlockQuote extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    const { children } = this.props;

    return (
      <div>
        {
          children.map((child, i) => {
            const text = child.props.children[0];
            if (text) {
              const result = tweetIdRegex.exec(text);
              if (result) {
                const tweetId = result[1];
                return <Tweet tweetId={tweetId} key={i}/>
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
