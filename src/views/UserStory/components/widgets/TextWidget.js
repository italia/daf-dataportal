import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class TextWidget extends React.Component {
  constructor(props) {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    //console.log('mount');
  }

  componentWillUnmount() {
    //console.log('unmount');
  }

  render() {
    return (
      <div>
         <Editor />
      </div>
    );
  }
}

export default TextWidget;
