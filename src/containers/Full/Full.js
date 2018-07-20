import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import { toastr } from 'react-redux-toastr'
import { loginAction, isValidToken, receiveLogin, getApplicationCookie, logout, fetchNotifications } from './../../actions.js'
import { setCookie } from '../../utility'
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Home from '../../views/Home/Home';
import IngestionWizard from '../../views/IngestionWizard/';
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

import { serviceurl } from '../../config/serviceurl'

// semantic's containers imports
import Vocabularies from '../../semantics/containers/Vocabularies.js'
import Vocabulary from '../../semantics/containers/Vocabulary.js'
import Ontologies from '../../semantics/containers/Ontologies.js'
import Ontology from '../../semantics/containers/Ontology.js'

const publicVapidKey = 'BI28-LsMRvryKklb9uk84wCwzfyiCYtb8cTrIgkXtP3EYlnwq7jPzOyhda1OdyCd1jqvrJZU06xHSWSxV1eZ_0o';

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

function PrivateRouteAdmin({ component: Component, authed, role, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (authed === true && role==='daf_admins')
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/private/home', state: { from: props.location } }} />}
    />
  )
}

function PrivateRouteEditor({ component: Component, authed, role, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (authed === true && (role === 'daf_editors' || role === 'daf_admins'))
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/private/home', state: { from: props.location } }} />}
    />
  )
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/home' />}
    />
  )
}

function listenMessage(dispatch){
  if('serviceWorker' in navigator){
    // Handler for messages coming from the service worker
    navigator.serviceWorker.addEventListener('message', function(event){
      console.log(event.data);
        /* event.ports[0].postMessage("Client 1 Says 'Hello back!'"); */
        toastr.info(event.data.title, event.data.body)
        dispatch(fetchNotifications(localStorage.getItem('user')))
    });
  }
}

function askPermission() {
  if(Notification.permission === 'default' )
    return new Promise(function(resolve, reject) {
      const permissionResult = Notification.requestPermission(function(result) {
        resolve(result);
      });

      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    })
    .then(function(permissionResult) {
      if (permissionResult !== 'granted') {
        throw new Error('We weren\'t granted permission.');
      }else if (permissionResult==='granted'){
        subscribeUserToPush()
      }
    });
}

async function subscribeUserToPush() {
  const registration = await navigator.serviceWorker.register('sw.js',  {scope: '/'})
  
  const subscribeOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  };

  const subscription = await registration.pushManager.subscribe(subscribeOptions);
  console.log('Received PushSubscription: ', JSON.stringify(subscription));
  await fetch(serviceurl.apiURLDatiGov + '/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })
  .then(function(result){
    console.log(result)
  })
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function postUserToSw(username){
  if('serviceWorker' in navigator){
    const msg = {
      'type': 'register_user',
      'username': username
    }
    navigator.serviceWorker.controller.postMessage(msg);
  }
}

class Full extends Component {

  constructor(props){
    super(props)
    this.state = {
      open: false,
      isOpenStory: false,
      isOpenDash: false,
      pvtStory: '0',
      orgStory: 'default_org',
      pvtDash: '0',
      orgDash: 'default_org',
      validationMSg: 'Campo obbligatorio',
      validationMSgOrg: 'Campo obbligatorio',
      authed: false,
      loading: true,
    }

    this.openSearch = this.openSearch.bind(this)
    this.openModalStory = this.openModalStory.bind(this)
    this.hideModalStory = this.hideModalStory.bind(this)
    this.handleSaveStory = this.handleSaveStory.bind(this)
    this.openModalDash = this.openModalDash.bind(this)
    this.hideModalDash = this.hideModalDash.bind(this)
    this.handleSaveDash = this.handleSaveDash.bind(this)
  }

  componentDidMount() {
    
    const { dispatch } = this.props
    listenMessage(dispatch)
    if (this.props.loggedUser && this.props.loggedUser.mail) {
      this.setState({
        authed: true,
        loading: false
      })
      askPermission(this.props.loggedUser.uid)
      dispatch(fetchNotifications(this.props.loggedUser.uid))
    } else {
      if (localStorage.getItem('username') && localStorage.getItem('token') &&
        localStorage.getItem('username') !== 'null' && localStorage.getItem('token') !== 'null') {
        dispatch(isValidToken(localStorage.getItem('token')))
        .then(ok => {
          if (ok) {
                dispatch(getApplicationCookie('superset'))
                .then(json => {
                  if (json) {
                    setCookie(json)
                  }
                })
                dispatch(getApplicationCookie('metabase'))
                .then(json => {
                  if (json) {
                    setCookie(json)
                  }
                })
                /*dispatch(getApplicationCookie('jupyter'))
                .then(json => {
                  if (json) {
                    setCookie(json)
                  }
                })*/
                /* dispatch(getApplicationCookie('grafana'))
                .then(json => {
                  if (json) {
                    setCookie(json)
                  }
                }) */
                dispatch(loginAction())
                  .then(json => {
                      dispatch(receiveLogin(json))
                      /* dispatch(addUserOrganization(json.uid)) */
                      this.setState({
                          authed: true,
                          loading: false
                        })
                        askPermission(this.props.loggedUser.uid)
                        dispatch(fetchNotifications(this.props.loggedUser.uid))
                })
              } else {
                this.setState({
                  authed: false,
                  loading: false
                })
                logout();
                this.props.history.push('/login')
              }
            })
            .catch((error) => {
              this.setState({
                authed: false,
                loading: false
              })
              logout();
              this.props.history.push('/login')
            })
          } else {
            this.setState({
              authed: false,
              loading: false
            })
            logout();
            this.props.history.push('/login')
          }
        }
      }

  openSearch(){
    this.setState({
      open: !this.state.open
    })
  }

  onPvtChangeStory(e, value){
    if(this.pvtStory.value == 0){
      this.setState({
        orgStory: 'default_org'
      });
    }
    this.setState({
        pvtStory: value
    });
    this.validateStory(e);
  }

  onOrganizationChangeStory(e, value){
    this.setState({
      orgStory: value
    });
    this.validateStory(e);
  }

  onPvtChangeDash(e, value){
    if(this.pvtDash.value == 0){
      this.setState({
        orgDash: 'default_org'
      });
    }
    this.setState({
        pvtDash: value
    });
    this.validateDash(e);
  }

  onOrganizationChangeDash(e, value){
    this.setState({
      orgDash: value
    });
    this.validateDash(e);
  }

  validateStory = (e) => {
    e.preventDefault()
    if(!this.titleStory.value){
      this.setState({
        validationMSg: 'Campo obbligatorio'
      });
    }else{
      this.setState({
        validationMSg: null
      });
    }

     if(!this.orgStory || this.orgStory.value == ''){
      this.setState({
        validationMSgOrg: 'Campo obbligatorio'
      });
    }else{
      this.setState({
        validationMSgOrg: null
      });
    }
  }

  validateDash = (e) => {
    e.preventDefault()
    if(!this.titleDash.value){
      this.setState({
        validationMSg: 'Campo obbligatorio'
      });
    }else{
      this.setState({
        validationMSg: null
      });
    }

    if(!this.orgDash || this.orgDash.value == ''){
      this.setState({
        validationMSgOrg: 'Campo obbligatorio'
      });
    }else{
      this.setState({
        validationMSgOrg: null
      });
    }
  }
  
  openModalStory = () => {
    this.setState({
      isOpenStory: true
    });

    this.titleStory.value = ''
    this.pvtStory.value = 0
    this.orgStory.value = ''
    this.setState({
      validationMSgOrg: 'Campo obbligatorio',
      validationMSg: 'Campo obbligatorio'
    });
  };
  
  hideModalStory = () => {
    this.setState({
      isOpenStory: false
    });
  };

  openModalDash = () => {
    this.setState({
      isOpenDash: true
    });

    this.titleDash.value = ''
    this.pvtDash.value = 0
    this.orgDash.value = ''
    this.setState({
      validationMSgOrg: 'Campo obbligatorio',
      validationMSg: 'Campo obbligatorio'
    });
  };
  
  hideModalDash = () => {
    this.setState({
      isOpenDash: false
    });
  };

  /**
  * Save Story
  */
  handleSaveStory = (e) => {
    e.preventDefault()
    if(this.titleStory.value){
      if(!this.orgStory || this.orgStory.value == ''){
        this.setState({
          validationMSgOrg: 'Campo obbligatorio'
        });
      }else if(this.orgStory.value=='default_org' && this.pvtStory.value == 1){
        this.setState({
          validationMSgOrg: 'Non è possibile creare una storia privata con l\'organizzazione selezionata'
        });
      }else{
        let layout = { rows: [] };
        let widgets = {};
        //save data
        let request = {
          title: this.titleStory.value,
          pvt: this.state.pvtStory,
          org: this.state.orgStory,
          layout: JSON.stringify(layout),
          widgets: JSON.stringify(widgets),
          published: 0
        };
/*         userStoryService.save(request).then((data)=> {
            this.props.history.push('/userstory/list/'+ data.message + '/edit');
        }); */
        this.props.history.push({
          'pathname':'/private/userstory/create',
          'story': request,
          'modified':true
        })
        console.log(request)
        this.hideModalStory();
      }
    }else{
      this.setState({
          validationMSg: 'Campo obbligatorio'
        });
    }

  }

  handleSaveDash = (e) => {
    e.preventDefault()

    if(this.titleDash.value){
      if(!this.orgDash || this.orgDash.value == ''){
        this.setState({
          validationMSgOrg: 'Campo obbligatorio'
        });
      }else if(this.orgDash.value=='default_org' && this.pvtDash.value == 1){
        this.setState({
          validationMSgOrg: 'Non è possibile creare una storia privata con l\'organizzazione selezionata'
        });
      }else{
        //prepara data
        let layout = { rows: [] };
        let widgets = {};
        let request = {
          title : this.titleDash.value,
          pvt: this.state.pvtDash,
          org: this.state.orgDash,
          subtitle : this.subtitleDash.value,
          layout : JSON.stringify(layout),
          widgets : JSON.stringify(widgets),
          status: 0
        };
        
        this.props.history.push({
          pathname: '/private/dashboard/create',
          state: { 'dash': request, 'modified':true }})
        
        this.hideModalDash();
/*         //save data
        dashboardService.save(request).then((data)=> {
            this.props.history.push('/dashboard/list/'+ data.message + '/edit');
        }) */
      }
    } else {
      this.setState({
        validationMSg: 'Campo obbligatorio'
      });
    }
  }

  render() {
    const { history, loggedUser } = this.props
/*     const divStyle = {
      'paddingLeft': '10px',
      'paddingRigth': '0px',
    }; */
    let mainDiv = 'bg-white'
    let home = ''
    let paddingTop = 'pt-3'

    if (window.location.hash.indexOf('/private/userstory/list')!==-1 || window.location.hash.indexOf('private/widget')!==-1)
      mainDiv='bg-light'
    
    if (window.location.hash.indexOf('/private/userstory/list/')!==-1)
      mainDiv='bg-white'
      
    if (window.location.hash.indexOf('/private/home')!==-1 || window.location.hash.indexOf('/private/search')!==-1 || window.location.hash.indexOf('/private/dataset')!==-1)
      home = 'p-0'

    if (window.location.hash.indexOf('/private/home')!==-1)
      paddingTop = ''
    
    if (window.location.hash.indexOf('/private/dataset/')!==-1)
      paddingTop = ''

    var role = ''
    if(this.props.loggedUser)
      role = this.props.loggedUser.role
    if (this.props.authed)
      this.state.authed = true;  
    return this.state.loading === true ? <h1 className="text-center fixed-middle"><i className="fas fa-circle-notch fa-spin mr-2"/>Caricamento</h1> :(
      <div className="app aside-menu-show">
      {/* Modal per creazione nuova Storia */}
      {loggedUser && <Modal isOpen={this.state.isOpenStory} onRequestHide={this.hideModalStory}>
          <form>
            <ModalHeader>
              <ModalTitle>Crea una Storia</ModalTitle>
              <ModalClose onClick={this.hideModalStory}/>
            </ModalHeader>
            <ModalBody>
            <div className="form-group">
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Titolo</label>
                  <div className="col-md-8">
                    <input type="text" className="form-control" ref={(titleStory) => this.titleStory = titleStory} onChange={this.validateStory.bind(this)} id="title" placeholder="Titolo"/>
                    {this.state.validationMSg && <span>{this.state.validationMSg}</span>}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Privata</label>
                  <div className="col-md-8">
                  {loggedUser.organizations && loggedUser.organizations.length > 1 ?
                    <select className="form-control" ref={(pvtStory) => this.pvtStory = pvtStory} onChange= {(e) => this.onPvtChangeStory(e, e.target.value)} id="pvt" >
                      <option value="0" defaultValue key="0">No</option>
                      <option value="1" key='1'>Si</option>
                    </select>
                    :
                    <div>
                      <select className="form-control" ref={(pvtStory) => this.pvtStory = pvtStory} onChange= {(e) => this.onPvtChangeStory(e, e.target.value)} id="pvt" >
                      <option value="0" defaultValue key="0">No</option>
                      </select>
                      <span>Puoi creare soltanto dashboards pubbliche in quanto non hai nessuna organizzazione associata</span>
                    </div>
                  }
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Organizzazione</label>
                  <div className="col-md-8">
                    <select className="form-control" ref={(orgStory) => this.orgStory = orgStory} onChange= {(e) => this.onOrganizationChangeStory(e, e.target.value)} id="org" >
                        <option value=""  key='organization' defaultValue></option>
                        {loggedUser.organizations && loggedUser.organizations.length > 0 && loggedUser.organizations.map(organization => {
                              return(
                                <option value={organization} key={organization}>{organization}</option>)
                          }
                        )}
                    </select>
                    {this.state.validationMSgOrg && <span>{this.state.validationMSgOrg}</span>}
                  </div>
                </div>
            </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className='btn btn-gray-200' onClick={this.hideModalStory}>
                Close
              </button>
              <button type="button" className="btn btn-primary px-2" onClick={this.handleSaveStory.bind(this)}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  Crea
              </button>
            </ModalFooter>
          </form>
        </Modal>}

        {/* Modal per creazione nuova Dash */}

        {loggedUser && <Modal isOpen={this.state.isOpenDash} onRequestHide={this.hideModalDash}>
          <form>
            <ModalHeader>
              <ModalTitle>Crea una Dashboard</ModalTitle>
              <ModalClose onClick={this.hideModalDash}/>
            </ModalHeader>
            <ModalBody>
            <div className="form-group">
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Titolo</label>
                  <div className="col-md-8">
                    <input type="text" className="form-control" ref={(titleDash) => this.titleDash = titleDash} onChange={this.validateDash.bind(this)} id="title" placeholder="Titolo"/>
                    {this.state.validationMSg && <span>{this.state.validationMSg}</span>}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Sottotitolo</label>
                  <div className="col-md-8">
                    <input type="text" className="form-control" ref={(subtitleDash) => this.subtitleDash = subtitleDash} id="subtitle" placeholder="Sottotitolo"/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Privata</label>
                  <div className="col-md-8">
                  {loggedUser.organizations && loggedUser.organizations.length > 1 ?
                    <select className="form-control" ref={(pvtDash) => this.pvtDash = pvtDash} onChange={(e) => this.onPvtChangeDash(e, e.target.value)} id="pvt" >
                      <option value="0" defaultValue key="0">No</option>
                      <option value="1" key='1'>Si</option>
                    </select>
                    :
                    <div>
                      <select className="form-control" ref={(pvtDash) => this.pvtDash = pvtDash} onChange={(e) => this.onPvtChangeDash(e, e.target.value)} id="pvt" >
                        <option value="0" defaultValue key="0">No</option>
                      </select>
                      <span>Puoi creare soltanto dashboards pubbliche in quanto non hai nessuna organizzazione associata</span>
                    </div>
                  }
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Organizzazione</label>
                  <div className="col-md-8">
                    <select className="form-control" ref={(orgDash) => this.orgDash = orgDash} onChange={(e) => this.onOrganizationChangeDash(e, e.target.value)} id="org" >
                        <option value=""  key='organization' defaultValue></option>
                        {loggedUser.organizations && loggedUser.organizations.length > 0 && loggedUser.organizations.map(organization => {
                            return (<option value={organization} key={organization}>{organization}</option>)
                        })
                        }
                    </select>
                    {this.state.validationMSgOrg && <span>{this.state.validationMSgOrg}</span>}
                  </div>
                </div>
            </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className='btn btn-gray-200' onClick={this.hideModalDash}>
                Chiudi
              </button>
              <button type="button" className="btn btn-primary px-2" onClick={this.handleSaveDash.bind(this)}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  Crea
              </button>
            </ModalFooter>
          </form>
        </Modal>}


        <Header history={history} openSearch={this.openSearch} openModalStory={this.openModalStory} openModalDash={this.openModalDash}/>
        <div className="app-body">
          {loggedUser && <Sidebar {...this.props} openModalStory={this.openModalStory} openModalDash={this.openModalDash}/>}
          <main className={"main "+mainDiv} >
            {this.state.open && <SearchBar history={history} open={this.state.open}/>}
            <Breadcrumb />
            <div className={paddingTop+ " container-fluid "+home }>
              <Switch>
                <PrivateRoute authed={this.state.authed} path="/private/home" name="Home" exact component={Home}/>
                <PrivateRouteEditor authed={this.state.authed} role={role} path="/private/ingestionwizzard" name="Forms" component={IngestionWizard} history={history} />
                <PrivateRoute authed={this.state.authed} path="/private/ontologies/" name="Ontologies" exact component={Ontologies} />
                <PrivateRoute authed={this.state.authed} path="/private/ontologies/:filter" name="Ontology" component={Ontology} />
                <PrivateRoute authed={this.state.authed} path="/private/vocabularies" name="Vocabularies" exact component={Vocabularies} />
                <PrivateRoute authed={this.state.authed} path="/private/vocabularies/:filter" name="Vocabulary" component={Vocabulary} />
                <PrivateRoute authed={this.state.authed} path="/private/dashboard" name="Dashboard manager" component={DashboardManager} />
                <PrivateRoute authed={this.state.authed} path="/private/userstory" name="User Story" component={UserStory} />
                <PrivateRoute authed={this.state.authed} path="/private/widget" name="Widget" component={Widgets} />
                {<PrivateRoute authed={this.state.authed} exact path="/private/dataset_old" name="Dataset" component={Dataset} />}
                {<PrivateRoute authed={this.state.authed} exact path="/private/dataset" name="Dataset" component={DatasetList} />}
                {<PrivateRoute authed={this.state.authed} exact path="/private/search" name="Search" component={DatasetList} />} 
                <PrivateRoute authed={this.state.authed} exact path="/private/dataset/:id" name="Dataset Detail" component={DatasetDetail} />
                <PrivateRoute authed={this.state.authed} path="/private/profile" name="Profile" component={Profile} />
                <PrivateRoute authed={this.state.authed} path="/private/settings" name="Settings" component={Settings} />
                <PrivateRouteEditor authed={this.state.authed} role={role} path="/private/organizations" name="Organizations" component={Organizations} />
                <PrivateRoute authed={this.state.authed} path="/private/users" name="Users" component={Users} />
                <PrivateRouteAdmin authed={this.state.authed} role={role} path="/private/crea" name="Crea" component={Crea} />
                <Redirect from="/private" to="/private/home"/>
              </Switch>
            </div>
          </main>
          <Aside history={history}/>
        </div>
        <Footer />
      </div>
    );
  }
}

Full.propTypes = {
  loggedUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { loggedUser, authed } = state.userReducer['obj'] || {}
  return { loggedUser, authed }
}

export default connect(mapStateToProps)(Full);
