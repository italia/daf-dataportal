import React, { Component } from 'react';
import $ from 'jquery';

//medium text editor
import Editor from 'react-medium-editor';

require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text
    }

    this.handleChange = this.handleChange.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      text : nextProps.text
    });
  }
  
  handleChange = function(value) {
    if (this.props.disableHtml)
      value = $('<span>' + value + '</span>').text();

    this.setState({text: value});
    this.props.onChange(this.props.keyValue, value)
  };

  /**
   * Render Function
   */
  render() {
    return (
    <div className={"text-center mx-auto text-editor " + this.props.className}>
      {
        this.props.readonly!=true &&

        <Editor
          data-placeholder="Inserisci il testo"
          text={this.state.text}
          onChange={this.handleChange}
          options={{toolbar: {buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3'],}}}
        />
//        <TextareaAutosize placeholder={this.props.placeholder} type="text" value={this.state.text} onChange={this.handleChange} />
      }
      {
        this.props.readonly==true &&
        <div dangerouslySetInnerHTML={{__html: this.state.text}} />
      }
    </div>
    );
  }

}

export default TextEditor;
