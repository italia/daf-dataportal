import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import React, { Component } from 'react';
//import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

//medium text editor
import Editor from 'react-medium-editor';

require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');

class TextWidget extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      text: props.text
    };
    
  }

  onEditorStateChange = (text) => {
    this.setState({
      text: text
    });
  };

  save() {
    //let html = "";
    //if (this.state.editorState)
    //  html = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    
    this.setState({
      edit: false,
      text: this.state.text
    })
    
    this.props.onSave(this.props.wid_key, this.state.text);
  }

  edit() {
    this.setState({
      edit: true,
      oldText: this.state.text
    })
  }

  close() {
    this.setState({
      text: this.state.oldText,
      edit: false
    })
  }

  render() {
    const { editorState } = this.state;
    return (
    <div>
        {!this.state.edit && 
          <div>
            <div dangerouslySetInnerHTML={{__html: this.state.text}}></div>
            {
              !this.props.readOnly &&
              <div className="mt-20">
                <button onClick={() => this.edit()} type="button" className="btn btn-link" >Edita testo</button>
              </div>
            }
          </div>
        }
        
        {this.state.edit && 
          <div>
            
            <Editor
              data-placeholder="Inserisci il testo"
              text={this.state.text}
              onChange={this.onEditorStateChange}
              options={{toolbar: {buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3'],}}}
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
