import React, { Component } from 'react';

export default class SectionTitle extends Component {

  render() {
    return (
    <div className="title-story-content">
        <h3>{this.props.title}</h3>
    </div>
    );
  }

}

