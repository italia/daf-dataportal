import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

class TextWidget extends Component {

  constructor(props) {
    super(props);
    const html = props.text;
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (<div className="rdw-storybook-root">
      <span>HTML Content: <pre>{ draftToHtml(convertToRaw(editorState.getCurrentContent())) }</pre></span>
      <Editor
        editorState={editorState}
        toolbarClassName="rdw-storybook-toolbar"
        wrapperClassName="rdw-storybook-wrapper"
        editorClassName="rdw-storybook-editor"
        onEditorStateChange={this.onEditorStateChange}
      />
    </div>);
  }
}

export default TextWidget;
