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
    
    const iframeStyle = {
      width: '100%',
      height: '300px',
      border: '0'
    }

    return (
      <div>
        <iframe
          className={this.props.class}
          ref="iframe"
          frameBorder={'0'}
          style={iframeStyle}
          src={this.props.graph}
        />
        
        <div className="text-center mt-20">
          <button type="button" className="btn btn-default">
              Change Graph
          </button>
        </div>
      </div>
    )
  }

}

export default GraphEditor;
