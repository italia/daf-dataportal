import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, HashRouter, Redirect, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from '../../configureStore'
import Full from '../Full/'
import Home from '../Home/'
import PropTypes from 'prop-types'
import { loginActionEncoded, addUserOrganizationEncoded } from './../../actions.js'

const history = createBrowserHistory();

const store = configureStore();

function PrivateRoute ({component: Component, authed, ...rest}) {
  console.log('PrivateRoute - authed?: ' + authed);
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  console.log('PublicRoute - authed?: ' + authed);
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

class App extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    console.log('APP.componentDidMount()');
    console.log('loggedUser: ' + this.props.loggedUser);
    const { dispatch} = this.props
    if(this.props.loggedUser){
      console.log('Utente loggato');
      this.setState({
            authed: true,
            loading: false
          })
    }else{
      console.log('Controllo se utente loggato da variabili presenti in localstore');
      console.log('username in localstorage: ' + localStorage.getItem('username'));
      console.log('encodedString in localstorage: ' + localStorage.getItem('encodedString'));
      if(localStorage.getItem('username') && localStorage.getItem('encodedString') &&
        localStorage.getItem('username') != 'null' && localStorage.getItem('encodedString') != 'null'){
        console.log('Variabili localstorage presenti');
        dispatch(loginActionEncoded(localStorage.getItem('username'), localStorage.getItem('encodedString')))
        .then(dispatch(addUserOrganizationEncoded(localStorage.getItem('username'), localStorage.getItem('encodedString'))))
        .then(this.setState({
                authed: true,
                loading: false
              }))
        .catch((error) => {
              this.setState({
                authed: false,
                loading: false
              })
            })
      }else{
        console.log('Variabili localstorage non presenti');
        this.setState({
              authed: false,
              loading: false
            })
      }
    }
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1 className="m-20">Loading</h1> : (
 
        <HashRouter history={history}>
        <Switch>
            <PublicRoute authed={this.props.loggedUser?true:false} path='/' exact component={Home} />
            <PublicRoute authed={this.props.loggedUser?true:false} path="/login" component={Home} />
            <PublicRoute authed={this.props.loggedUser?true:false} path="/register" component={Home} />
            <PrivateRoute authed={this.props.loggedUser?true:false} path="/dashboard" name="Dashboard" component={Full}/>
            <PrivateRoute authed={this.props.loggedUser?true:false} path="/ingestionwizzard" name="Ingestion" component={Full}/>
            <PrivateRoute authed={this.props.loggedUser?true:false} path="/ontologies" name="Ontologies" component={Full}/>
            <PrivateRoute authed={this.props.loggedUser?true:false} path="/dataset" name="Dataset" component={Full}/>
            <PrivateRoute authed={this.props.loggedUser?true:false} path="/dashboard/manager" name="Dash" component={Full}/>
            <PrivateRoute authed={this.props.loggedUser?true:false} path="/dashboard/list" name="Dash" component={Full}/>
            <PrivateRoute authed={this.props.loggedUser?true:false} path="/user_story" name="Storie" component={Full}/>
            <PrivateRoute authed={this.props.loggedUser?true:false} path="/profile" name="Profile" component={Full}/>
        </Switch>
        </HashRouter>
   
    );
  }
}

App.propTypes = {
  loggedUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { loggedUser } = state.userReducer['obj'] || { }
  return { loggedUser }
}

export default connect(mapStateToProps)(App)