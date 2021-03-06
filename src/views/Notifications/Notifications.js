import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  fetchNotifications
} from '../../actions.js'
import { Link } from 'react-router-dom'
import {
  convertNotificationTime
} from '../../utility.js'

function checkDate(timestamp) {
  var date = new Date();

  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear()

  if(timestamp){
    var stampfrom = timestamp.substring(0,10)
    var datefrom = stampfrom.split('-')
    var yearFrom = parseInt(datefrom[0])
    var monthFrom = parseInt(datefrom[1])
    var dayFrom = parseInt(datefrom[2])


    if(year - yearFrom > 0){
      return "Più di un anno fa"
    }else if(month - monthFrom > 0){
      return("Più di un mese fa")
    }else if( day - dayFrom === 0){
      return "Oggi"
    }else if( day - dayFrom > 0 && day - dayFrom < 8){
      return (day - dayFrom===1? "1 giorno fa": (day - dayFrom + " giorni fa"))
    }else if( day - dayFrom > 7){
      return "Più di una settimana fa"
    }
  }else{
    return "Tempo indefinito"
  }
}

class Notifications extends Component{
  constructor(props){
    super(props)
    this.state = {
      notifications: [],
      checkedOk: true,
      checkedErr: true,
      checkedGeneric: true,
      checkedSystem : true
    }

    this.toggleOk = this.toggleOk.bind(this)
    this.toggleErr = this.toggleErr.bind(this)
    this.toggleGeneric = this.toggleGeneric.bind(this)
    this.toggleSystem = this.toggleSystem.bind(this)
    
  }

/*   componentWillReceiveProps(nextProps){
    if(nextProps.notifications){
      this.setState({
        notifications: nextProps.notifications
      })
    }
  } */
  
  componentDidMount(){
    const { dispatch } = this.props
    if(localStorage.getItem('user')){
      dispatch(fetchNotifications(localStorage.getItem('user'), 100))
      .then((json)=>{
        this.setState({
          notifications: json.notifications
        })
      })
    }
  }

  toggleOk(){
    this.setState({
      checkedOk: !this.state.checkedOk,
    })
  }

  toggleErr(){
    this.setState({
      checkedErr: !this.state.checkedErr
    })
  }

  toggleGeneric(){
    this.setState({
      checkedGeneric: !this.state.checkedGeneric
    })
  }

  toggleSystem(){
    this.setState({
      checkedSystem: !this.state.checkedSystem
    })
  }

  render(){
    const { notifications, checkedErr, checkedOk, checkedGeneric, checkedSystem } = this.state
    return(
      <div className="container body">
        <div className="main_container">
          <div className="top_nav">
            <div className="nav_menu">
              <nav className="dashboardHeader">
                <h2>Notifiche</h2>
              </nav>
            </div>
          </div>
        </div>
        <i className="fas fa-check-circle text-success mr-2 fa-lg"/>
        <label className="switch switch-3d switch-success mr-3 mb-4">
          <input type="checkbox" className="switch-input" checked={checkedOk} onClick={this.toggleOk}/>
          <span className="switch-label"></span>
          <span className="switch-handle"></span>
        </label>
        <i className="fas fa-exclamation-circle text-danger mr-2 fa-lg"/>
        <label className="switch switch-3d switch-danger mr-3 mb-4">
          <input type="checkbox" className="switch-input" checked={checkedErr} onClick={this.toggleErr}/>
          <span className="switch-label"></span>
          <span className="switch-handle"></span>
        </label>
        <i className="fas fa-info-circle text-info mr-2 fa-lg"/>
        <label className="switch switch-3d switch-info mr-3 mb-4">
          <input type="checkbox" className="switch-input" checked={checkedGeneric} onClick={this.toggleGeneric}/>
          <span className="switch-label"></span>
          <span className="switch-handle"></span>
        </label>
        <i className="fas fa-info-circle text-warning mr-2 fa-lg"/>
        <label className="switch switch-3d switch-warning mr-3 mb-4">
          <input type="checkbox" className="switch-input" checked={checkedSystem} onClick={this.toggleSystem}/>
          <span className="switch-label"></span>
          <span className="switch-handle"></span>
        </label>
        
        <div className="list-group mb-5">
          { notifications && notifications.length > 0 &&
          notifications.map(function(notification, index){
            switch(notification.notificationtype){
              case 'success':
                if(checkedOk)
                  return (
                  <Link to={'/private/dataset/'+notification.info.name} className="list-group-item list-group-item-action flex-column align-items-start" key={index}>
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1"><i className="fas fa-check-circle text-success mr-2"/>Creazione avvenuta con successo</h5>
                      <small>{checkDate(notification.createDate)}</small>
                    </div>
                    <p className="mb-1">Il dataset <b>{notification.info.title}</b> è stato creato correttamente</p>
                    <small>{convertNotificationTime(notification.createDate)}</small>
                  </Link>)
                break
              // case 'kylo_feed_error':
              //   if(checkedErr)
              //     return(
              //       <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" key={index}>
              //         <div className="d-flex w-100 justify-content-between">
              //           <h5 className="mb-1"><i className="fas fa-exclamation-circle text-danger mr-2"/>Creazione andata in errore</h5>
              //           <small>{checkDate(notification.createDate)}</small>
              //         </div>
              //         <p className="mb-1">C'è stato un problema nella creazione del dataset <b>{notification.info.title}</b>: {notification.info.errors}</p>
              //         <small>{convertNotificationTime(notification.createDate)}</small>
              //       </a>
              //     )
              //   break
              case 'error':
                if(checkedErr)
                  return(
                    <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" key={index}>
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1"><i className="fas fa-exclamation-circle text-danger mr-2"/>{notification.info.title}</h5>
                        <small>{checkDate(notification.createDate)}</small>
                      </div>
                      <p className="mb-1">{notification.info.description} </p>
                      <small>{convertNotificationTime(notification.createDate)}</small>
                    </a>
                  )
                break
              case 'info':
                if(checkedGeneric)
                  return (
                  <Link to={(notification.info.link!==null?notification.info.link:"/")} className="list-group-item list-group-item-action flex-column align-items-start" key={index}>
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1"><i className="fas fa-info-circle text-info mr-2"/>{notification.info.title}</h5>
                      <small>{checkDate(notification.createDate)}</small>
                    </div>
                    <p className="mb-1">{notification.info.description}</p>
                    <small>{convertNotificationTime(notification.createDate)}</small>
                  </Link>)
                break
              case 'system':
                if(checkedSystem)
                  return (
                  <div className="list-group-item list-group-item-action flex-column align-items-start" key={index}>
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1"><i className="fas fa-info-circle text-warning mr-2"/>{notification.info.title}</h5>
                      <small>{checkDate(notification.createDate)}</small>
                    </div>
                    <p className="mb-1">{notification.info.description}</p>
                    <small>{convertNotificationTime(notification.createDate)}</small>
                  </div>)
                break 
            }
          })
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { notifications } = state.notificationsReducer['notifications'] || { }
  return { notifications }
}

export default connect(mapStateToProps)(Notifications)