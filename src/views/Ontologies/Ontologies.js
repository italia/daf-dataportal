import React, { Component } from 'react';
import AutocompleteOntologies from '../../components/Autocomplete/AutocompleteOntologies.js';
class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="animated fadeIn">
        <h1>Ontologie</h1>
        <AutocompleteOntologies/>
      </div>
    )
  }
}


export default Dashboard;
