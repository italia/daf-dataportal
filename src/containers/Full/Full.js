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
import { setCookie, setSupersetCookie, isEditor, isAdmin, isSysAdmin } from '../../utility'
import { toastr } from 'react-redux-toastr'
import { loginAction, isValidToken, receiveLogin, getApplicationCookie, logout, fetchNotifications, fetchNewNotifications, search, getSupersetUrl, datasetDetail } from './../../actions.js'
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Home from '../../views/Home/Home';
import IngestionWizard from '../../views/IngestionWizard/';
import IngestionWizardNew from '../../views/IngestionWizard/IngestionWizardNew';
import Dataset from '../../views/Dataset/';
import DatasetList from '../../views/DataseList/';
import DatasetDetail from '../../views/DatasetDetail/DatasetDetail';
import UserStory from '../../views/UserStory/';
import Profile from '../../views/Profile/';
import Settings from '../../views/Settings/';
import DashboardManager from '../../views/DashboardManager/DashboardManager';
import Notifications from '../../views/Notifications/Notifications'
import Organizations from '../../views/Settings/Organizations';
import Users from '../../views/Settings/Users';
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
  console.log('rest: ' + rest)
  return (
    <Route {...rest}
      render={(props) => authed === true
        ? <Component {...props} {...rest}/>
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

function PrivateRouteAdmin({ component: Component, authed, loggedUser, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (authed === true && (isAdmin(loggedUser) || isSysAdmin(loggedUser)))
        ? <Component {...props} {...rest} />
        : <Redirect to={{ pathname: '/private/home', state: { from: props.location } }} />}
    />
  )
}

function PrivateRouteEditor({ component: Component, authed, loggedUser, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (authed === true && (isAdmin(loggedUser) || isEditor(loggedUser)))
        ? <Component {...props} {...rest}/>
        : <Redirect to={{ pathname: '/private/home', state: { from: props.location } }} />}
    />
  )
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} {...rest} />
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
        //dispatch(fetchNewNotifications(localStorage.getItem('user')))
    });
  }
}

function askPermission() {
  if(Notification&&Notification.permission === 'default' )
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
      isOpenWidget: false,
      pvtStory: '0',
      orgStory: '',
      pvtDash: '0',
      orgDash: '',
      widgetOrg: '',
      pvtWidget: '0',
      widgetTool: '0',
      widgetDataset: '',
      validationMSg: 'Campo obbligatorio',
      validationMSgOrg: 'Campo obbligatorio',
      errorMSgTable: false,
      authed: false,
      loading: true,
      iframe: '',
      datasets: []
    }

    this.openSearch = this.openSearch.bind(this)
    this.openModalStory = this.openModalStory.bind(this)
    this.hideModalStory = this.hideModalStory.bind(this)
    this.openModalWidget = this.openModalWidget.bind(this)
    this.hideModalWidget = this.hideModalWidget.bind(this)
    this.handleSaveStory = this.handleSaveStory.bind(this)
    this.openModalDash = this.openModalDash.bind(this)
    this.openModalWidget = this.openModalWidget.bind(this)
    this.hideModalDash = this.hideModalDash.bind(this)
    this.handleSaveDash = this.handleSaveDash.bind(this)
    this.handleSaveWidget = this.handleSaveWidget.bind(this)
    this.startPoll = this.startPoll.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props
    if (this.props.newNotifications !== nextProps.newNotifications) {
      clearTimeout(this.timeout);
      if (!nextProps.isNewFetching) {
          this.startPoll();
      }
    }
  }

/*   componentWillMount() {
    const { dispatch } = this.props
    if (localStorage.getItem('user'))
      //dispatch(fetchNewNotifications(localStorage.getItem('user')))
      //dispatch(fetchNotifications(localStorage.getItem('user'), 20))
  } */

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  startPoll() {
    const { dispatch } = this.props
    this.timeout = setTimeout(() => {
      if (localStorage.getItem('username') && localStorage.getItem('token') &&
        localStorage.getItem('username') !== 'null' && localStorage.getItem('token') !== 'null') {
        dispatch(isValidToken(localStorage.getItem('token')))
        .then(ok=>{
          if(!ok){
            this.setState({
              authed: false,
              loading: false
            })
            logout();
            /* this.props.history.push('/login') */
            window.location.reload()
          }else{
            dispatch(fetchNewNotifications(this.props.loggedUser.uid))
          }
        })
        .catch((error) => {
          console.error(error)
          this.setState({
            authed: false,
            loading: false
          })
          logout();
            window.location.reload()
            /* this.props.history.push('/login') */
        })
      }
    }, 30000);
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
      dispatch(fetchNewNotifications(localStorage.getItem('user')))
      dispatch(fetchNotifications(this.props.loggedUser.uid, 20))
      document.forms['supset_open'].submit()
    } else {
      if (localStorage.getItem('username') && localStorage.getItem('token') &&
        localStorage.getItem('username') !== 'null' && localStorage.getItem('token') !== 'null') {
        dispatch(isValidToken(localStorage.getItem('token')))
        .then(ok => {
          if (ok) {
                dispatch(getApplicationCookie('superset'))
                .then(json => {
                  if (json) {
                    setSupersetCookie(json)
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
                })*/ 
                dispatch(loginAction())
                .then(response => {
                  if (response.ok) {
                    response.json().then(json => {
                      dispatch(receiveLogin(json))
                      this.setState({
                          authed: true,
                          loading: false
                        })
                        askPermission(this.props.loggedUser.uid)
                        //dispatch(fetchNotifications(this.props.loggedUser.uid))
                        dispatch(fetchNewNotifications(localStorage.getItem('user')))
                        dispatch(fetchNotifications(this.props.loggedUser.uid, 20))
                        document.forms['supset_open'].submit()
                  })
                }else{
                  console.log('Login Action Response: ' + response.statusText)
                  this.setState({
                    authed: false,
                    loading: false
                  })
                  this.props.history.push('/login')
                }})
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
    this.setState({
        pvtStory: value
    });
    this.validateStory(e);
  }

  onPvtChangeWidget(e, value){
    this.setState({
        pvtWidget: value,
        widgetOrg: '',
        errorMSgTable:false
    });
    this.widgetOrg.value=''
    this.validateWidget(e);
  }

  onChangeWidgetTool(e, value){
    this.setState({
        widgetTool: value,
        errorMSgTable:false

    });
    this.validateWidget(e);
  }

  onOrganizationChangeStory(e, value){
    this.setState({
      orgStory: value
    });
    this.validateStory(e);
  }

  onOrganizationChangeWidget(e, value){
    const { dispatch } = this.props
    this.setState({
      errorMSgTable:false
    });
    var index = []
    if(this.state.pvtWidget==='1')
      index = ['catalog_test']
    else
      index = ['ext_opendata']
    let filter = {
        'text': "",
        'index': index,
        'org': [value],
        'theme':[],
        'date': "",
        'status': [],
        'order': "desc"
    }
    //let filter = {'text':'','index':index,'org':[org],'theme':[],'date':'','status':[],'order':'desc'}
    dispatch(search('', filter, false, filter))    
    .then(response => {
      this.setState({
        widgetOrg: value,
        widgetDataset: ''
      }
    )
    })
    .catch(error=>{console.log('Errore nel caricamento dei dataset: ' + error)})
    this.validateWidget(e);
  }

  onPvtChangeDash(e, value){
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

  onDatasetChangeWidget(e, value){
    this.setState({
      widgetDataset: value,
      errorMSgTable:false
    });
    this.validateWidget(e);
  }
  

  validateWidget = (e) => {
    e.preventDefault()
/*     if(!this.titleWidget.value){
      this.setState({
        validationMSg: 'Campo obbligatorio'
      });
    }else{
      this.setState({
        validationMSg: null
      });
    } */

     if(!this.widgetDataset || this.widgetDataset.value == ''){
      this.setState({
        validationMSgDataset: 'Campo obbligatorio'
      });
    }else{
      this.setState({
        validationMSgDataset: null
      });
    }

    if(!this.widgetOrg || this.widgetOrg.value == ''){
      this.setState({
        validationMSgOrgWidget: 'Campo obbligatorio'
      });
    }else{
      this.setState({
        validationMSgOrgWidget: null
      });
    }
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

  openModalWidget = () => {
    //this.titleWidget.value = ''
    this.pvtWidget.value = 0
    this.widgetTool.value = 0
    this.widgetOrg.value=''
    //this.widgetDataset.value=''

    this.setState({
      //titleWidget:'',
      pvtWidget:0,
      widgetTool:0,
      widgetOrg:'',
      validationMSgDataset: 'Campo obbligatorio',
      validationMSg: 'Campo obbligatorio',
      validationMSgOrgWidget: 'Campo obbligatorio',
      errorMSgTable:false,
      isOpenWidget: true
    });
  };
  
  hideModalWidget = () => {
    this.setState({
      isOpenWidget: false
    });
  };

  hideModalWidgetAndRedirect = () => {
    const { dispatch } = this.props
    this.setState({
      isOpenWidget: false
    });
    this.props.history.push('/private/dataset/'+this.state.widgetDataset)
    dispatch(datasetDetail(this.state.widgetDataset,'', false))
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

  handleSaveWidget = (e) => {
    this.setState({
      errorMSgTable:false
    });
    e.preventDefault()
    console.log('handleSaveWidget')
    const { dispatch } = this.props
    dispatch(getSupersetUrl(widgetDataset.value, widgetOrg.value, !pvtWidget))
    .then(json => {
      if(json.length>0){
        let tableId = json[0].id
        window.open(serviceurl.urlSuperset + '/superset/explore/table/' + tableId)
      } else {
        this.setState({
          errorMSgTable:true
        });
      }
    })
  }
  
  handleSaveDash = (e) => {
    e.preventDefault()

    if(this.titleDash.value){
      if(!this.orgDash || this.orgDash.value == ''){
        this.setState({
          validationMSgOrg: 'Campo obbligatorio'
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
    const { history, loggedUser, results } = this.props
/*     const divStyle = {
      'paddingLeft': '10px',
      'paddingRigth': '0px',
    }; */
    let mainDiv = 'bg-white'
    let home = ''
    let paddingTop = 'pt-3'

    if (window.location.hash.indexOf('/private/userstory/list')!==-1 || window.location.hash.indexOf('private/widget')!==-1 || window.location.hash.indexOf('private/vocabularies')!==-1 || window.location.hash.indexOf('private/ontologies')!==-1 || window.location.hash.indexOf('private/notifications')!==-1)
      mainDiv='bg-light'
    
    if (window.location.hash.indexOf('/private/userstory/list/')!==-1)
      mainDiv='bg-white'
      
    if (window.location.hash.indexOf('/private/home')!==-1 || window.location.hash.indexOf('/private/search')!==-1 || window.location.hash.indexOf('/private/dataset')!==-1)
      home = 'p-0'

    if (window.location.hash.indexOf('/private/home')!==-1)
      paddingTop = ''
    
    if (window.location.hash.indexOf('/private/dataset/')!==-1)
      paddingTop = ''

    if (this.props.authed)
      this.state.authed = true;  
    return (
    <div> 
      { this.state.loading && (<h1 className="text-center fixed-middle"><i className="fas fa-circle-notch fa-spin mr-2"/>Caricamento</h1>)} 
      {!this.state.loading && <div className="app aside-menu-show">
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
                  {loggedUser.organizations && loggedUser.organizations.length > 0 ?
                    <select className="form-control" ref={(pvtStory) => this.pvtStory = pvtStory} onChange= {(e) => this.onPvtChangeStory(e, e.target.value)} id="pvt" >
                      <option value="0" defaultValue key="0">No</option>
                      <option value="1" key='1'>Si</option>
                    </select>
                    :
                    <div>
                      <select className="form-control" ref={(pvtStory) => this.pvtStory = pvtStory} onChange= {(e) => this.onPvtChangeStory(e, e.target.value)} id="pvt" >
                      <option value="0" defaultValue key="0">No</option>
                      </select>
                      <span>Puoi creare soltanto storie pubbliche in quanto non hai nessuna organizzazione associata</span>
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
                  {loggedUser.organizations && loggedUser.organizations.length > 0 ?
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

        {/* Modal per creazione nuovo Widget */}

        {loggedUser && <Modal isOpen={this.state.isOpenWidget} onRequestHide={this.hideModalWidget}>
          <form>
            <ModalHeader>
              <ModalTitle>Crea un Widget</ModalTitle>
              <ModalClose onClick={this.hideModalWidget}/>
            </ModalHeader>
            <ModalBody>
            <div className="form-group">
{/*                 <div className="form-group row">
                  <label className="col-md-2 form-control-label">Titolo</label>
                  <div className="col-md-8">
                    <input type="text" className="form-control" ref={(titleWidget) => this.titleWidget = titleWidget} onChange={this.validateWidget.bind(this)} id="titleWidget" placeholder="Titolo"/>
                    {this.state.validationMSg && <span>{this.state.validationMSg}</span>}
                  </div>
                </div> */}
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Strumento</label>
                  <div className="col-md-8">
                    <select className="form-control" ref={(widgetTool) => this.widgetTool = widgetTool} onChange={(e) => this.onChangeWidgetTool(e, e.target.value)} id="widgetTool" >
                      <option value="0" defaultValue key="0">Superset</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Dataset Privato</label>
                  <div className="col-md-8">
                  {loggedUser.organizations && loggedUser.organizations.length > 0 ?
                    <select className="form-control" ref={(pvtWidget) => this.pvtWidget = pvtWidget} onChange={(e) => this.onPvtChangeWidget(e, e.target.value)} id="pvtWidget" >
                      <option value="0" defaultValue key="0">No</option>
                      <option value="1" key='1'>Si</option>
                    </select>
                    :
                    <div>
                      <select className="form-control" ref={(pvtWidget) => this.pvtWidget = pvtWidget} onChange={(e) => this.onPvtChangeWidget(e, e.target.value)} id="pvtWidget" >
                        <option value="0" defaultValue key="0">No</option>
                      </select>
                      <span>Puoi creare soltanto widget con dataset pubblici in quanto non hai nessuna organizzazione associata</span>
                    </div>
                  }
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Organizzazione</label>
                  <div className="col-md-8">
                    <select className="form-control" ref={(widgetOrg) => this.widgetOrg = widgetOrg} onChange={(e) => this.onOrganizationChangeWidget(e, e.target.value)} id="widgetOrg" >
                        <option value=""  key='widgetOrg' defaultValue></option>
                        {loggedUser.organizations && loggedUser.organizations.length > 0 && loggedUser.organizations.map(organization => {
                            return (<option value={organization} key={organization}>{organization}</option>)
                        })
                        }
                    </select>
                    {this.state.validationMSgOrgWidget && <span>{this.state.validationMSgOrgWidget}</span>}
                  </div>
                </div>
                {this.state.widgetOrg && this.state.widgetOrg!='' &&
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Dataset</label>
                  {results && results.length>4?
                    <div className="col-md-8">
                      <select className="form-control" ref={(widgetDataset) => this.widgetDataset = widgetDataset} onChange={(e) => this.onDatasetChangeWidget(e, e.target.value)} id="widgetDataset" >
                          <option value=""  key='widgetDataset' defaultValue></option>
                          {results.map(result => {
                              if(result.type=='catalog_test'){
                                var source = JSON.parse(result.source)
                                return (<option value={source.dcatapit.name} key={source.dcatapit.name}>{source.dcatapit.name}</option>)
                              }else if(result.type=='ext_opendata'){
                                var source = JSON.parse(result.source)
                                return (<option value={source.name} key={source.name}>{source.name}</option>)
                              }
                          })
                          }
                      </select>
                      {this.state.validationMSgDataset && <span>{this.state.validationMSgDataset}</span>}
                    </div>
                    :
                    <div className="col-md-8">
                      <span className="text-danger">Non è stato trovato nessun dataset per i criteri selezionati.</span>
                    </div>
                    }
                </div>
                }
                <div className="form-group row">
                    <label className="col-md-2 form-control-label"></label>
                    <div className="col-md-8">
                      {this.state.errorMSgTable && <span className="text-danger">Non è possibile creare un widget con il dataset selezionato. Clicca  <button type="button" className='btn btn-link px-0 btn-lg' onClick={this.hideModalWidgetAndRedirect}>qui</button> per verificare che sia stato caricato e condiviso all'interno dell'organizzazione selezionata.</span>}
                    </div>
                </div>
            </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className='btn btn-gray-200' onClick={this.hideModalWidget}>
                Chiudi
              </button>
              <button type="button" className="btn btn-primary px-2" disabled={!(this.state.widgetDataset && this.state.widgetDataset!='')} onClick={this.handleSaveWidget.bind(this)}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  Crea
              </button>
            </ModalFooter>
          </form>
        </Modal>}

        <Header history={history} openSearch={this.openSearch} openModalStory={this.openModalStory} openModalDash={this.openModalDash} openModalWidget={this.openModalWidget}/>
        <div className="app-body">
          {loggedUser && <Sidebar {...this.props} openModalStory={this.openModalStory} openModalDash={this.openModalDash} openModalWidget={this.openModalWidget}/>}
          <main className={"main mr-0 "+mainDiv}>
            {this.state.open && <SearchBar history={history} open={this.state.open}/>}
            <Breadcrumb />
            <div className={paddingTop+ " container-fluid "+home }>
              <Switch>
                <PrivateRoute authed={this.state.authed} path="/private/home" name="Home" exact component={Home}/>
                <PrivateRouteEditor authed={this.state.authed} loggedUser={loggedUser} path="/private/ingestionwizzard" name="Forms" component={IngestionWizard} history={history} />
                <PrivateRouteEditor authed={this.state.authed} loggedUser={loggedUser} path="/private/ingestionwizzardnew" name="Forms" component={IngestionWizardNew} history={history} />
                <PrivateRoute authed={this.state.authed} path="/private/ontologies/" name="Ontologies" exact component={Ontologies} />
                <PrivateRoute authed={this.state.authed} path="/private/ontologies/:filter" name="Ontology" component={Ontology} />
                <PrivateRoute authed={this.state.authed} path="/private/vocabularies" name="Vocabularies" exact component={Vocabularies} />
                <PrivateRoute authed={this.state.authed} path="/private/vocabularies/:filter" name="Vocabulary" component={Vocabulary} />
                <PrivateRoute authed={this.state.authed} path="/private/dashboard" name="Dashboard manager" component={DashboardManager} />
                <PrivateRoute authed={this.state.authed} path="/private/notifications" name="Notification Center" component={Notifications} />
                <PrivateRoute authed={this.state.authed} path="/private/userstory" name="User Story" component={UserStory} />
                <PrivateRoute authed={this.state.authed} path="/private/widget" name="Widget" component={Widgets} openModalWidget={this.openModalWidget} />
                {<PrivateRoute authed={this.state.authed} exact path="/private/dataset_old" name="Dataset" component={Dataset} />}
                {<PrivateRoute authed={this.state.authed} exact path="/private/dataset" name="Dataset" component={DatasetList} />}
                {<PrivateRoute authed={this.state.authed} exact path="/private/search" name="Search" component={DatasetList} />} 
                <PrivateRoute authed={this.state.authed} exact path="/private/dataset/:id" name="Dataset Detail" component={DatasetDetail} />
                <PrivateRoute authed={this.state.authed} path="/private/profile" name="Profile" component={Profile} />
                <PrivateRouteAdmin authed={this.state.authed} loggedUser={loggedUser} path="/private/settings" name="Settings" component={Settings} />
                <PrivateRouteAdmin authed={this.state.authed} loggedUser={loggedUser} path="/private/organizations" name="Organizations" component={Organizations} />
                <PrivateRouteAdmin authed={this.state.authed} loggedUser={loggedUser} path="/private/users" name="Users" component={Users} />
                <Redirect from="/private" to="/private/home"/>
              </Switch>
            </div>
          </main>
          <Aside history={history}/>
        </div>
        <Footer />
      </div>
      }
    <form id="supset_open" target="open_supset" action={serviceurl.urlSupersetOpen +'/managed/bi-open-login'} method="POST">
      <input name="Authorization" type="text" value={"Bearer "+localStorage.getItem('token')} readOnly hidden/>
    </form>
    <iframe name="open_supset" hidden/>
    </div>
    )
  }
}

Full.propTypes = {
  loggedUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const loggedUser = state.userReducer['obj']?state.userReducer['obj'].loggedUser:{ }   
  const { notifications, isFetching, isNewFetching, newNotifications } = state.notificationsReducer['notifications'] || {}
  const { results } = state.searchReducer['search'] || { isFetching: false, results: [] }
  return { loggedUser, notifications, isFetching, newNotifications, isNewFetching, results }
}

export default connect(mapStateToProps)(Full);
