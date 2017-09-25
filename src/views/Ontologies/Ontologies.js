import React, { Component } from 'react';
import OntologiesList from './components/OntologiesList';
//import OntologiesView from './components/OntologiesView';
import { Switch, Route, Redirect } from 'react-router-dom';

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

/*

<Route path="/ontologies/list/:id" exact component={OntologiesView} />
      <div className="container body">
        <div className="main_container">
            <div className="top_nav">
              <div className="nav_menu">
                  <nav className="dashboardHeader">
                      <h2>Ontologie</h2>
                  </nav>
              </div>
          </div>
          <div className="container" ref="auto">
          <div className="row">
            <div className="col-10">
              <div className="input-prepend input-group mb-20">
                  <i className="fa fa-search input-group-addon transparent-frame"></i>
                  <input id="prependedInput" className="form-control transparent-frame" size="25" type="text" placeholder="Filtra la lista ..."/>
              </div>
            </div>
          </div> 
        </div>
        </div>
    </div>
*/
export default Ontologies;
