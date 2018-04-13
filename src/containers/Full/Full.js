import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Home from '../../views/Home/Home';
import IngestionWizard from '../../views/IngestionWizard/';
import Ontologies from '../../views/Ontologies/';
import Vocabulary from '../../views/Vocabulary/';
import Dashboard from '../../views/Dashboard/';
import Dataset from '../../views/Dataset/';
import DatasetList from '../../views/DataseList/';
import DatasetDetail from '../../views/DatasetDetail/DatasetDetail';
import UserStory from '../../views/UserStory/';
import Profile from '../../views/Profile/';
import Settings from '../../views/Settings/';
import DashboardManager from '../../views/DashboardManager/DashboardManager';
import Organizations from '../../views/Settings/Organizations';
import Users from '../../views/Settings/Users';
import Crea from "../../views/Crea/Crea";
import Widgets from '../../views/Widgets/Widgets';
import SearchBar from '../../components/SearchBar/SearchBar';

class Full extends Component {

  constructor(props){
    super(props)
    this.state = {
      open: false
    }

    this.openSearch = this.openSearch.bind(this)
  }

  openSearch(){
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const { history } = this.props
    const divStyle = {
      'paddingLeft': '10px',
      'paddingRigth': '0px',
    };
    let mainDiv = 'bg-white'
    let home = ''

    if (history.location.pathname === '/user_story/list' || history.location.pathname === '/widget')
      mainDiv='bg-light'
    
    if (history.location.pathname === '/home' || history.location.pathname.indexOf('/search')!==-1 || history.location.pathname.indexOf('/dataset')!==-1)
      home = 'p-0'
    return (
      <div className="app">
        <Header history={history} openSearch={this.openSearch}/>
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className={"main "+mainDiv} >
            {this.state.open && <SearchBar history={history} open={this.state.open}/>}
            <Breadcrumb />
            <div className={"container-fluid "+home} style={divStyle}>
              <Switch>
                <Route path="/home" name="Home" exact component={Home}/>
                <Route path="/ingestionwizzard" name="Forms" component={IngestionWizard} history={history} />
                <Route path="/ontologies" name="Ontologies" component={Ontologies} />
                <Route path="/vocabulary" name="Vocabulary" component={Vocabulary} />
                <Route path="/dashboard" name="Dashboard manager" component={DashboardManager} />
                <Route path="/user_story" name="User Story" component={UserStory} />
                <Route path="/widget" name="Widget" component={Widgets} />
                {<Route exact path="/dataset_old" name="Dataset" component={Dataset} />}
                {<Route exact path="/dataset" name="Dataset" component={DatasetList} />}
                {<Route exact path="/search" name="Search" component={DatasetList} />} 
                <Route exact path="/dataset/:id" name="Dataset Detail" component={DatasetDetail} />
                <Route path="/profile" name="Profile" component={Profile} />
                <Route path="/settings" name="Settings" component={Settings} />
                <Route path="/organizations" name="Organizations" component={Organizations} />
                <Route path="/users" name="Users" component={Users} />
                <Route path="/crea" name="Crea" component={Crea} />
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
