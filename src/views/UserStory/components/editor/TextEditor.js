import React, { Component } from 'react';
import Components from 'react';

class TextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text
    }

    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange = function(e) {
    let value = e.target.value;
    this.setState({text: value});
    this.props.onChange(this.props.keyValue, value)
  };

  /**
   * Render Function
   */
  render() {
    return (
    <div className={this.props.className}>
        <input type="text" value={this.state.text} onChange={this.handleChange} />
    </div>
    );
  }

}

export default TextEditor;
