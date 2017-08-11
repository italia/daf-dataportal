import React, { Component } from 'react';
import DashboardEditor from './components/DashboardEditor';

class DashboardManager extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <DashboardEditor/>
    )
  }
}


export default DashboardManager;