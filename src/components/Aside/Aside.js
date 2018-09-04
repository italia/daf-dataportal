import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { datasetDetail } from '../../actions'
import { Link } from 'react-router-dom'


class Aside extends Component {

  constructor(props){
    super(props)
    this.state = {
      notifications: []
    }

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.notifications){
      this.setState({
        notifications: nextProps.notifications
      })
    }
  }

  pushTo(type, linkTo){
    const { dispatch } = this.props
    switch(type){
      case 'dataset':
        this.props.history.push('/private/dataset/'+linkTo)
        dispatch(datasetDetail(linkTo,'', false))
        break;
      case 'generic':
        this.props.history.push(linkTo)
        break;
    }
  }

  render() {
    const { notifications } = this.state
    console.log(notifications)
    return (
      <aside className="aside-menu">
        <div className="tab-content list-group list-group-accent">
          <div className="list-group-item list-group-item-secondary border-0 m-0 text-center font-weight-bold text-muted text-uppercase small">Notifiche</div>
          {
            notifications.length>0 ?
            notifications.slice(0,21).map((notification, index) =>{
              switch(notification.notificationtype){
                case 'kylo_feed':
                return(
                  <div className={notification.status===1?"list-group-item b-new-notif pointer":"list-group-item pointer"} key={index} onClick={this.pushTo.bind(this,'dataset', notification.info.name)}>
                    {notification.info && <p><i className="fas fa-check-circle text-success mr-2"/>Il dataset <b>{notification.info.title}</b> è stato creato correttamente</p>}
                    <p>{notification.timestamp}</p>
                  </div>
                )
                case 'kylo_feed_error':
                return(
                  <div className={notification.status===1?"list-group-item b-new-notif pointer":"list-group-item pointer"} key={index}>
                    {notification.info && <p><i className="fas fa-exclamation-circle text-danger mr-2"/>C'è stato un problema nella creazione del dataset <b>{notification.info.title}</b>: {notification.info.errors}</p>}
                    <p>{notification.timestamp}</p>
                  </div>
                )
                case 'generic':
                return(
                  <div className={notification.status===1?"list-group-item b-new-notif pointer":"list-group-item pointer"} key={index} onClick={this.pushTo.bind(this,'generic', notification.info.link)}>
                    {notification.info && <p><i className="fas fa-info-circle text-info mr-2"/>{notification.info.description}</p>}
                    <p>{notification.timestamp}</p>
                  </div>
                )
              }
            }) : <div className="list-group-item border-0 m-0 text-center font-weight-bold text-muted">Non hai nessuna notifica</div>
            }
        </div>
        <div className="text-center my-2">
            <Link to="/private/notifications">
              <b className="text-primary">Vedi tutte</b>
            </Link>
        </div>
      </aside>
    )
  }
}

Aside.propTypes = {
  notifications: PropTypes.array
}

function mapStateToProps(state) {
  const { notifications } = state.notificationsReducer['notifications'] || { }
  return { notifications }
}

export default connect(mapStateToProps)(Aside)
