import React, { Component } from 'react';
import UserStoryEditor from './components/UserStoryEditor';
import UserStoryList from './components/UserStoryList';
import UserStoryView from './components/UserStoryView';
import { Switch, Route } from 'react-router-dom';

// Our styles
import './styles/custom.css';

class UserStory extends Component {
  constructor(props) {
    super(props);
  } 

  render() {
    return (
      <Switch>
        <Route path='/private/user_story/create'         exact component={UserStoryEditor} />
        <Route path="/private/user_story/list"           exact component={UserStoryList} />
        <Route path="/userstory/list"                    exact component={UserStoryList} />        
        <Route path="/private/user_story/list/:id"       exact component={UserStoryView} />
        <Route path="/private/user_story/list/:id/edit"  exact component={UserStoryEditor} />
      </Switch>
    );
  }

}

export default UserStory;

