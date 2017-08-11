import React, { Component } from 'react'
import { Route, HashRouter, Redirect, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import { firebaseAuth } from '../../config/constants'
import { Provider } from 'react-redux';
import configureStore from '../../configureStore'
import Full from '../Full/'
import Home from '../Home/'

const history = createBrowserHistory();

const store = configureStore();

function PrivateRoute ({component: Component, authed, ...rest}) {
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
  console.log('authed: ' + authed);
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1 className="m-20">Loading</h1> : (
    <Provider store={store}>
        <HashRouter history={history}>
        <Switch>
            <PublicRoute authed={this.state.authed} path='/' exact component={Home} />
            <PublicRoute authed={this.state.authed} path="/login" component={Home} />
            <PublicRoute authed={this.state.authed} path="/register" component={Home} />
            <PrivateRoute authed={this.state.authed} path="/dashboard" name="Dashboard" component={Full}/>
            <PrivateRoute authed={this.state.authed} path="/ingestionwizzard" name="Ingestion" component={Full}/>
            <PrivateRoute authed={this.state.authed} path="/ontologies" name="Ontologies" component={Full}/>
            <PrivateRoute authed={this.state.authed} path="/dataset" name="Dataset" component={Full}/>
            <PrivateRoute authed={this.state.authed} path="/dashboard_manager" name="Dash" component={Full}/>
            <PrivateRoute authed={this.state.authed} path="/user_story" name="Storie" component={Full}/>
            <PrivateRoute authed={this.state.authed} path="/profile" name="Profile" component={Full}/>
        </Switch>
        </HashRouter>
    </Provider>
    );
  }
}
