import React, { Component } from 'react';
import Components from 'react';
import StoriesEditor from './components/StoriesEditor';

class Stories extends Component {
  constructor(props) {
    super(props);
  } 

  render() {
    return (
      <StoriesEditor/>
    );
  }

}

export default Stories;

