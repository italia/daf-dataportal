import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Login from '../../views/Login/';
import Register from '../../views/Register/';
import ConfirmRegistration from '../../views/Register/ConfirmRegistration.js';

const mapStateToProps = state => ({
  appName: state.appName
});

class Home extends React.Component {
  render() {
    return (
       <div data-reactroot className="app flex-row align-items-center">
          <Switch>
            <Route path='/' exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/confirmregistration" component={ConfirmRegistration} />
          </Switch>
      </div>
      );
  }
}

export default connect(mapStateToProps, () => ({}))(Home);
