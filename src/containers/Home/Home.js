import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Login from '../../views/Login/';
import Register from '../../views/Register/';
import ConfirmRegistration from '../../views/Register/ConfirmRegistration.js';
import ResetPassword from '../../views/ResetPassword/ResetPassword'
import ConfirmReset from '../../views/ResetPassword/ConfirmReset'
import HomeHeader from '../../components/Header/Home/Header'

class Home extends React.Component {

  componentDidMount(){
    const { loggedUser } = this.props
  
    if(loggedUser && loggedUser.mail){
      this.props.history.push('/private/home')
    }
  }

  render() {
    return (
      <div className="app">
        <HomeHeader/>
        <div data-reactroot className="app-body pub flex-row align-items-center">
            <Switch>
              <Route path='/private' exact component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/confirmregistration" component={ConfirmRegistration} />
              <Route path="/requestreset" component={ResetPassword} />
              <Route path="/resetpwd" component={ConfirmReset} />
            </Switch>
        </div>
      </div>
      );
  }
}

function mapStateToProps(state) {
  const { loggedUser } = state.userReducer['obj'] || {}
  return { loggedUser }
}

export default connect(mapStateToProps)(Home);
