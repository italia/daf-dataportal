import React, { Component } from 'react';
import VocabularyList from './components/VocabularyList';
import { Switch, Route, Redirect } from 'react-router-dom';

class Vocabulary extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
      <Switch>
        <Route path="/vocabulary/list" exact component={VocabularyList} />
      </Switch>
    </div>
    )
  }
}

export default Vocabulary;
