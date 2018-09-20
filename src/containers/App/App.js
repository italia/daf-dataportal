import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, HashRouter, Redirect, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import Full from '../Full/'
import Home from '../Home/'
import PropTypes from 'prop-types'
import { fetchProperties } from './../../actions.js'
import ReduxToastr from 'react-redux-toastr'
import Public from '../Public/';


const history = createBrowserHistory();

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      loading: true,
    }
}

  componentDidMount() {
    const { dispatch } = this.props
    var host = window.location.host
    var domain = ''
    if(host==='localhost'){
      domain = 'dataportal'
    }else{
      var split = host.split('.')
      domain = split[0]
      if(split[0]==='localhost'){
        domain = 'dataportal'
      }
    }
    dispatch(fetchProperties(domain))
    .then(json => {
      var html = document.getElementsByTagName('html')[0];
      if(json){
        switch(json.properties.theme){
          case "1":
            html.style.setProperty("--primary", "#0066CC");
            html.style.setProperty("--lightblue", "#1A75D1");
            this.setState({
              loading: false
            })
            break;
          case "2":
            html.style.setProperty("--primary", "#4975A6");
            html.style.setProperty("--lightblue", "#5B83AF");
            this.setState({
              loading: false
            })
            break;
          case "3":
            html.style.setProperty("--primary", "#7f0019")
            html.style.setProperty("--lightblue", "#8e001c")
            html.style.setProperty("--accento", "#b5bec6" )
            this.setState({
              loading: false
            })
            break;
          default:
            html.style.setProperty("--primary", "#0066CC");
            html.style.setProperty("--lightblue", "#1A75D1");
            this.setState({
              loading: false
            })
            break;
        }
      }else{
        html.style.setProperty("--primary", "#0066CC");
        html.style.setProperty("--lightblue", "#1A75D1");
        this.setState({
          loading: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1 className="text-center fixed-middle"><i className="fas fa-circle-notch fa-spin mr-2" />Caricamento</h1> : (
      <div>
        <HashRouter history={history}>
          <Switch>
            <Route path='/' exact component={Public} />
            <Route path='/home' exact component={Public} />
            <Route path='/missione' exact component={Public} />
            <Route path='/lineeguida' exact component={Public} />
            <Route path='/partecipa' exact component={Public} />
            <Route path='/data-applications' exact component={Public} />
            <Route path='/faqs' exact component={Public} />
            <Route path='/userstory/list' exact component={Public} />
            <Route path='/userstory/list/:id' exact component={Public} />
            <Route path='/team' exact component={Public} />
            <Route path='/notizie' exact component={Public} />
            <Route path='/notizie/:id' exact component={Public} />
            <Route path='/storie' exact component={Public} />
            <Route path='/team' exact component={Public} />
            <Route path='/search' exact component={Public} />
            <Route path='/dataset/list' exact component={Public} />
            <Route path='/dataset/:id' exact component={Public} />
            <Route path='/private' exact component={Home} />
            <Route path="/login" component={Home} />
            <Route path="/register" component={Home} />
            <Route path="/confirmregistration" component={Home} />
            <Route path="/requestreset" component={Home} />
            <Route path="/resetpwd" component={Home} />
            <Route path="/private/home" name="Home" component={Full} />
            <Route path="/private/prova" name="Home" component={Full} />
            <Route path="/private/dashboard" name="Dashboard" component={Full} />
            <Route path="/private/notifications" name="Notification Center" component={Full} />
            <Route path="/private/widget" name="Widget" component={Full} />
            <Route path="/private/ingestionwizzard" name="Ingestion" component={Full} />
            <Route path="/private/ingestionwizzardnew" name="Ingestion" component={Full} />
            <Route path="/private/ontologies" name="Ontologies" exact component={Full} />
            <Route path="/private/ontologies/:filter" name="Ontology" component={Full} />
            <Route path="/private/vocabularies" name="Vocabularies" exact component={Full} />
            <Route path="/private/vocabularies/:filter" name="Vocabulary" component={Full} />
            <Route path="/private/validator" name="Validator" exact component={Full} />
            <Route exact path="/private/dataset" name="Dataset" component={Full} />
            <Route exact path="/private/dataset_old" name="Dataset" component={Full} />
            {<Route exact path="/private/search" name="Search" component={Full} />}
            <Route exact path="/private/dataset/:id" name="Dataset Detail" component={Full} />
            <Route path="/private/dashboard/manager" name="Dash" component={Full} />
            <Route path="/private/dashboard/list" name="Dash" component={Full} />
            <Route path="/private/userstory" name="Storie" component={Full} />
            <Route path="/private/profile" name="Profile" component={Full} />
            <Route path="/private/crea" name="Crea" component={Full} />
            <Route path="/private/settings" name="Settings" component={Full} />
            <Route path="/private/organizations" name="Organizations" component={Full} />
            <Route path="/private/users" name="Users" component={Full} />
          </Switch>
        </HashRouter>
        <ReduxToastr
          timeOut={6000}
          newestOnTop={true}
          preventDuplicates
          position="bottom-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar/>
      </div>

    );
  }
}

App.propTypes = {
  loggedUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { loggedUser, authed } = state.userReducer['obj'] || {}
  return { loggedUser, authed }
}

export default connect(mapStateToProps)(App)
