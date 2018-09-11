import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ProfileService from "./services/ProfileService";
import {
  getSubscriptions,
  deleteSubscription,
  deleteAllSubscriptions
} from '../../actions.js'

import { serviceurl } from '../../config/serviceurl'
import { toastr } from 'react-redux-toastr'

const publicVapidKey = 'BI28-LsMRvryKklb9uk84wCwzfyiCYtb8cTrIgkXtP3EYlnwq7jPzOyhda1OdyCd1jqvrJZU06xHSWSxV1eZ_0o';

const profileService = new ProfileService()

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

function getDeviceType(endpoint){
  if(endpoint.indexOf('mozilla')!==-1)
    return "Mozilla Firefox"
  if(endpoint.indexOf('google')!==-1)
    return "Google Chrome"
}

class Profile extends Component {

/*     https://api.daf.teamdigitale.test/security-manager/v1/ipa/group/new_org
    member_group */
    constructor(props) {
        super(props);
    
        //init state
        this.state={
          workgroups: [],
          subscriptions: [] 
        };
        this.load(this.props.loggedUser);

        this.deleteSub = this.deleteSub.bind(this)
        this.deleteAllSub = this.deleteAllSub.bind(this)
        this.askPermission = this.askPermission.bind(this)
        this.subscribeUserToPush = this.subscribeUserToPush.bind(this)
    }

    load(loggedUser){
      loggedUser.organizations && loggedUser.organizations.map((org, index) => {
        let response = profileService.workgroups(org)
        response.then((json) => {
            let workgroups = ''
            json.member_group && json.member_group.length>0 && json.member_group.map((group, index) => {
                if(loggedUser.workgroups&&loggedUser.workgroups.indexOf(group)>-1)
                      workgroups = workgroups + ' ' + group
            }) 
            var newWorkgroups = this.state.workgroups.concat({'org':org, 'workgroups':workgroups})
            this.setState({
                workgroups: newWorkgroups
            });
        });
      })
    }

    componentDidMount(){
      const {loggedUser, dispatch } = this.props
      
      dispatch(getSubscriptions(loggedUser.uid))
      .then(json => {
        this.setState({
          subscriptions: json
        })
      })
    }


    askPermission() {
      const { dispatch, loggedUser } = this.props
      if(Notification&&(Notification.permission==='default'||Notification.permission!=='default'))
        return new Promise(function(resolve, reject) {
          const permissionResult = Notification.requestPermission((result) => {
            resolve(result);
          });
    
          if (permissionResult) {
            permissionResult.then(resolve, reject);
          }
        })
        .then((permissionResult) => {
          if (permissionResult !== 'granted') {
            toastr.error("Impossibile registrare dispositivo", "Le notifiche sono disabilitate dal browser, per attivarle ripristinale dalle impostazioni")
            throw new Error('We weren\'t granted permission.');
          }else if (permissionResult==='granted'){
            let response = this.subscribeUserToPush()
            response.then(json=>{
              console.log(json)
              dispatch(getSubscriptions(loggedUser.uid))
              .then(json =>{
                this.setState({
                  subscriptions: json
                })
              })
            })
          }
        });
    }

    async subscribeUserToPush() {
      const registration = await navigator.serviceWorker.register('sw.js',  {scope: '/'})
      
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      };
    
      const subscription = await registration.pushManager.subscribe(subscribeOptions);
      console.log('Received PushSubscription: ', JSON.stringify(subscription));
      const response = await fetch(serviceurl.apiURLDatiGov + '/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      return response.json()
    }

    subscribeCurrentDevice(){
      const { loggedUser } = this.props
      const toastrConfirmOptions = {
        okText: 'Ok',
        cancelText: 'Annulla',
        onOk: () => this.askPermission(),
        onCancel: () => console.log('CANCEL: clicked')
      };
      toastr.confirm("Vuoi sottoscrivere il browser corrente per ricevere le notifiche per l'utente "+ loggedUser.uid +" ?", toastrConfirmOptions);
    }

    deleteSub(subscription){
      const { dispatch, loggedUser } = this.props
      dispatch(deleteSubscription(subscription))
      .then(json =>{
        dispatch(getSubscriptions(loggedUser.uid))
        .then(json =>{
          this.setState({
            subscriptions: json
          })
        })
      })
    }

    deleteAllSub(){
      const { dispatch, loggedUser } = this.props
      dispatch(deleteAllSubscriptions(loggedUser.uid))
      .then(json =>{
        dispatch(getSubscriptions(loggedUser.uid))
        .then(json =>{
          this.setState({
            subscriptions: json
          })
        })
      })
    }


  render() {
    const { loggedUser } = this.props
    const { workgroups } = this.state

    return (
    <div className="container">
      <div className="card">
          <div className="card-block">
              <div className="form-group">
                <label htmlFor="example-text-input" className="col-form-label">Nome Utente</label>
                <input className="form-control" type="text" value={loggedUser?loggedUser.uid:''} id="example-text-input" />
              </div>
              <div className="form-group">
                <label htmlFor="example-search-input" className="col-form-label">Email</label>
                <input className="form-control" type="search" value={loggedUser?loggedUser.mail:''} id="example-search-input"/>
              </div>
              <div className="form-group">
                <label htmlFor="example-search-input" className="col-form-label">Nome completo</label>
                <input className="form-control" type="search" value={loggedUser?loggedUser.sn + ' ' + loggedUser.givenname:''} id="example-search-input"/>  
              </div>
              <div className="form-group">
                <label htmlFor="example-search-input" className="col-form-label">Amministratore</label>
                <input className="form-control" type="search" value={(loggedUser && loggedUser.roles && loggedUser.roles.indexOf('daf_sys_admin') > -1)?'Si':'No' } id="example-search-input"/>
              </div>
              <div className="form-group">
                <label htmlFor="example-search-input" className="col-form-label">Profilazione</label>
                <table className="table table-striped">
                  <thead>
                    <tr>
                    <th scope="col">Organizzazione</th>
                    <th scope="col">Ruolo</th>
                    <th scope="col">Workgroup</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loggedUser && loggedUser.organizations && loggedUser.organizations.map((org, index) => { 
                        var rolesArr = []
                        var workgroupsArr = []
                        return <tr key={index}>
                                    <td>{org}</td>
                                    {loggedUser && loggedUser.roles && loggedUser.roles.map((role, index2) => {
                                        if(role.endsWith(org)){
                                            rolesArr.indexOf(org) === -1
                                                rolesArr.push(role.replace('_' + org,''))
                                        }
                                    })
                                    }
                                    <td>{rolesArr.toString()}</td>
                                    {workgroups && workgroups.map((wg, index3) => {
                                        if(wg.org===org){
                                            workgroupsArr.indexOf(wg.workgroups) === -1
                                                workgroupsArr.push(wg.workgroups)
                                        }
                                    })
                                    }
                                    <td>{workgroupsArr.toString()}</td>
                            </tr>
                        }
                    )}
                  </tbody>
                </table>                  
              </div>
              <div className="form-group row">
                <label htmlFor="example-search-input" className="col-4 col-form-label mr-auto">Sottoscrizione Notifiche <button className="text-primary btn btn-link py-0" onClick={this.subscribeCurrentDevice.bind(this)}><i className="fas fa-plus"/></button></label>
                <button className="ml-auto col-2 text-primary btn btn-link" onClick={this.deleteAllSub}><b>Cancella tutte</b></button>
                <div className="col-12">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Dispositivo</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.subscriptions.length>0 && this.state.subscriptions.map((sub, index)=>{
                          return(
                            <tr key={index}>
                              <td scope="col">{getDeviceType(sub.endpoint)}</td>
                              <th scope="col"><button className="p-0 float-right text-primary btn btn-link" onClick={this.deleteSub.bind(this, sub)}><i className="fas fa-times"/></button></th>
                            </tr>
                          )
                        })
                      }
{/*                       <tr>
                        <td scope="col">Chrome</td>
                        <th scope="col"><button className="p-0 float-right text-primary btn btn-link"><i className="fas fa-times"/></button></th>
                      </tr> */}
                    </tbody>
                  </table>
                </div>                  
              </div>
          </div>
      </div>
     </div>
    )
  }
}

Profile.propTypes = {
  loggedUser: PropTypes.object,
  organizations: PropTypes.array
}

function mapStateToProps(state) {
    const loggedUser = state.userReducer['obj'].loggedUser || { } 
    return { loggedUser }
}

export default connect(mapStateToProps)(Profile)
