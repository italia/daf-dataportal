import React, { Component } from 'react'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default class CodeSyntax extends Component {
  render() {
    return <SyntaxHighlighter language={this.props.language} style={docco}>{this.props.code}</SyntaxHighlighter>
  }
}
