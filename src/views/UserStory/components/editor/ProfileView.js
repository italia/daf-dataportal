import React, { Component } from 'react';
import Components from 'react';

class ProfileView extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Render Function
   */
  render() {
    return (
    <div>
        {this.props.text}
    </div>
    );
  }

}

export default ProfileView;
