import React from 'react';
const hljs = require('highlightjs');

class CodeBlock extends React.Component {

  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode = () => {
    hljs.highlightBlock(this.refs.code);
  };

  render() {
    return (
      <pre>
        <code ref="code" className={this.props.language}>
          {this.props.literal}
        </code>
      </pre>
    )
  }

}

export default CodeBlock;
