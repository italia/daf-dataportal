import React, { Component } from 'react';
import UserStoryEditor from './components/UserStoryEditor.jsx';
import UserStoryList from './components/UserStoryList.jsx';
import UserStoryView from './components/UserStoryView.jsx';
import { Switch, Route } from 'react-router-dom';

// Our styles
require ('./styles/custom.css');

class UserStory extends Component {
  constructor(props) {
    super(props);
  } 

  render() {
    return (
      <Switch>
        <Route path='/private/userstory/create'         exact component={UserStoryEditor} />
        <Route path="/private/userstory/list"           exact component={UserStoryList} />
        <Route path="/userstory/list"                    exact component={UserStoryList} />        
        <Route path="/private/userstory/list/:id"       exact component={UserStoryView} />
        <Route path="/private/userstory/list/:id/edit"  exact component={UserStoryEditor} />
      </Switch>
    );
  }

}

export default UserStory;

