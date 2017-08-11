import React, { Component } from 'react';
import Components from 'react';

class ImageEditor extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Render Function
   */
  render() {
    return (
    <div>
        {this.props.image.url}
        <h5>
          {this.props.image.caption}
        </h5>
    </div>
    );
  }

}

export default ImageEditor;
