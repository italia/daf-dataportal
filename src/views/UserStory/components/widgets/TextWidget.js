require('react-draft-wysiwyg/dist/react-draft-wysiwyg.css');

import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');


class TextWidget extends Component {

  constructor(props) {
    super(props);

    this.state= {
      editorState: undefined,
      oldeditorState: undefined
    }
    
    const contentBlock = props.text?htmlToDraft(props.text):undefined;
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state.editorState = editorState
    }
    this.save = this.save.bind(this)
    this.close = this.close.bind(this)
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
  }

  handleChangeHeight(){
    const { identifier, handleHeight } = this.props
  
    handleHeight(identifier)
  }

  componentDidMount(){

    window.addEventListener("resize", this.handleChangeHeight.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleChangeHeight.bind(this));
  }

  onEditorStateChange = (editorState) => {
    const { identifier, handleHeight } = this.props
    
    // handleHeight(identifier)

    this.setState({
      editorState
    });
  };

  save() {
    let html = "";
    if (this.state.editorState)
     html = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    
    this.setState({
      edit: false,
    })
    
    this.props.onSave(this.props.identifier, html);
  }

  edit() {
    this.setState({
      edit: true,
      oldeditorState: this.state.editorState
    })
  }

  close() {
    
    this.setState({
      editorState: this.state.oldeditorState,
      edit: false
    })
  }

  render() {
    const { editorState } = this.state;
    var toolbar= {
      options: ['inline', 'blockType', 'list', 'link', 'history'],
      inline: {
        options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'],
      },
      blockType: {
        inDropdown: true,
        options: ['Normal', 'H3', 'Blockquote', 'Code'],
      }
    }
    var text = editorState?draftToHtml(convertToRaw(editorState.getCurrentContent())).replaceAll('<p></p>','<br></br>'):''
    return (
    <div id={this.props.identifier+"element"} className="x_content">
        {!this.state.edit && 
          <div>
            <div dangerouslySetInnerHTML={{__html: text}}></div>
            {
              !this.props.readOnly &&
              <div className="mt-20">
                <button onClick={this.edit.bind(this)} type="button" className="btn btn-link" >Edita testo</button>
              </div>
            }
          </div>
        }
        
        {this.state.edit && 
          <div>
            
            <Editor
              stripPastedStyles={true}
              toolbar={toolbar} 
              data-placeholder="Inserisci il testo"
              editorState={editorState}
              toolbarClassName="rdw-storybook-toolbar"
              wrapperClassName="rdw-storybook-wrapper"
              editorClassName="rdw-storybook-editor"
              onEditorStateChange={this.onEditorStateChange}
            />

            {/*  OLD EDITOR
            <Editor
              editorState={editorState}
              toolbarClassName="rdw-storybook-toolbar"
              wrapperClassName="rdw-storybook-wrapper"
              editorClassName="rdw-storybook-editor"
              onEditorStateChange={this.onEditorStateChange}
            /> */}
            
          <button onClick={() => this.close()} type="button" className="btn btn-gray-200" >Annulla</button>
            <button onClick={() => this.save()} type="button" className="btn btn-primary" >Salva</button>
            <div className="clearfix"></div>
          </div>
        }
    </div>
    )
  }
}

export default TextWidget;
