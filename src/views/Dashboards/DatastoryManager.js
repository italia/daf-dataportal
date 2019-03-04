import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './Dashboard'
import DatastoryList from './DatastoryList';

class DatastoryManager extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path='/private/datastory/create' exact component={Dashboard} />
          <Route path="/private/datastory/list" exact component={DatastoryList} />
          <Route path="/private/datastory/:id" exact component={Dashboard} />
          <Route path="/private/datastory/:id/edit" exact component={Dashboard} />
        </Switch>
      </div>
    )
  }
}


export default DatastoryManager;