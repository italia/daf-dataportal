import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


class TextWidget extends React.Component {
  constructor(props) {
    super();

    this.state = {
      edit: false,
      editorContent: this._getInitialHTML(props.text),
      text: props.text
    };

    this.onEditorChange = this.onEditorChange.bind(this)
  }

  _getInitialHTML(text) {
    const contentBlocks = convertFromHTML(text);
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    return convertToRaw(contentState);
  }

  componentDidMount() {
    //console.log('mount');
  }

  componentWillUnmount() {
    //console.log('unmount');
  }

  onEditorChange(editorContent) {
    let text = draftToHtml(editorContent);

    this.setState({ 
      editorContent, 
      text: text
    });
  };

  save(){

    this.setState({
      edit: false
    })
  }

  edit(){
    debugger
    this.setState({
      edit: true
    })
  }

  render() {
    return (
      <div>
        {!this.state.edit && 
          <div>
            {this.state.text}
            <div className="mt-20">
              <button onClick={() => this.edit()} type="button" className="btn btn-link" >Edit</button>
            </div>
          </div>
        }
        
        {this.state.edit && 
          <div>
            <Editor 
        
              rawContentState={this.state.editorContent}
              onChange={this.onEditorChange.bind(this)}

            />
            <button onClick={() => this.save()} type="button" className="btn btn-primary" >Save</button>
          </div>
        }
      </div>
    );
  }
}

export default TextWidget;
