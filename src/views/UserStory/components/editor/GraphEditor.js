import React, { Component } from 'react';
import Components from 'react';

class GraphEditor extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Render Function
   */
  render() {
    return (
    <div>
        {this.props.graph}
    </div>
    );
  }

}

export default GraphEditor;
