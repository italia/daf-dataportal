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
    this.state = {
        text: props.text
    };
    if (html) {
      const contentBlock = htmlToDraft(html);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
        text: props.text
      };
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  save(){
    let html = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    this.setState({
      edit: false,
      text: html
    })
  }

  edit(){
    this.setState({
      edit: true
    })
  }

  render() {
    const { editorState } = this.state;
    return (
    <div>
        {!this.state.edit && 
          <div>
            <div dangerouslySetInnerHTML={{__html: this.state.text}}></div>
            <div className="mt-20">
              <button onClick={() => this.edit()} type="button" className="btn btn-link" >Edit Text</button>
            </div>
          </div>
        }
        
        {this.state.edit && 
          <div>
            <Editor
              editorState={editorState}
              toolbarClassName="rdw-storybook-toolbar"
              wrapperClassName="rdw-storybook-wrapper"
              editorClassName="rdw-storybook-editor"
              onEditorStateChange={this.onEditorStateChange}
            />
            <button onClick={() => this.save()} type="button" className="btn btn-primary" >Save</button>
            <div className="clearfix"></div>
          </div>
        }
    </div>
    )
  }
}

export default TextWidget;
