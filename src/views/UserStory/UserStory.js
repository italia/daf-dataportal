import React, { Component } from 'react';
import Components from 'react';
import UserStoryEditor from './components/UserStoryEditor';

// Our styles
import './styles/custom.css';

class UserStory extends Component {
  constructor(props) {
    super(props);
  } 

  render() {
    return (
      <UserStoryEditor/>
    );
  }

}

export default UserStory;

