import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../../views/Login/';
import Register from '../../views/Register/';
import Appo from './Appo.js';

const mapStateToProps = state => ({
  appName: state.appName
});

class Home extends React.Component {
  render() {
    return (
       <div data-reactroot className="app">
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
      </div>
      );
  }
}

export default connect(mapStateToProps, () => ({}))(Home);
