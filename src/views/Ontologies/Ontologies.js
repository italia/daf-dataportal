import React, { Component } from 'react';
import OntologiesList from './components/OntologiesList';
import { Switch, Route } from 'react-router-dom';

class Ontologies extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
      <Switch>
        <Route path="/ontologies/list" exact component={OntologiesList} />
      </Switch>
    </div>
    )
  }
}

export default Ontologies;
