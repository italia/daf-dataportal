import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import IngestionWizard from '../../views/IngestionWizard/';
import Ontologies from '../../views/Ontologies/';
import Dashboard from '../../views/Dashboard/';
import Dataset from '../../views/Dataset/';
import UserStory from '../../views/UserStory/';
import Profile from '../../views/Profile/';
import DashboardManager from '../../views/DashboardManager/DashboardManager';

class Full extends Component {
  render() {
    const { history } = this.props
    const divStyle = {
      'paddingLeft': '10px',
      'paddingRigth': '0px',
    };
    const mainDiv = {
      'backgroundColor' : 'white'
    }
    return (
      <div className="app">
        <Header history={history}/>
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main" style={mainDiv}>
            <Breadcrumb />
            <div className="container-fluid" style={divStyle}>
              <Switch>
                <Route path="/home" name="Dashboard" exact component={Dashboard}/>
                <Route path="/ingestionwizzard" name="Forms" component={IngestionWizard} />
                <Route path="/ontologies" name="Ontologies" component={Ontologies} />
                <Route path="/dashboard" name="Dashboard manager" component={DashboardManager} />
                <Route path="/user_story" name="User Story" component={UserStory} />
                <Route path="/dataset" name="Dataset" component={Dataset} />
                <Route path="/profile" name="Profile" component={Profile} />
                <Redirect from="/" to="/home"/>
              </Switch>
            </div>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
