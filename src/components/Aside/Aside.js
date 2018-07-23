import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { datasetDetail } from '../../actions'


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

  pushTo(type, name){
    const { dispatch } = this.props
    switch(type){
      case 'dataset':
        this.props.history.push('/private/dataset/'+name)
        dispatch(datasetDetail(name,'', false))
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
            notifications.map((notification, index) =>{
              switch(notification.notificationtype){
                case 'kylo_feed':
                return(
                  <div className={notification.status===0?"list-group-item b-new-notif pointer":"list-group-item pointer"} key={index} onClick={this.pushTo.bind(this,'dataset', notification.info.name)}>
                    {notification.info && <p>Il dataset <b>{notification.info.title}</b> è stato creato correttamente</p>}
                    <p>{notification.timestamp}</p>
                  </div>
                )
                case 'kylo_feed_error':
                return(
                  <div className={notification.status===0?"list-group-item b-new-notif pointer bg-danger":"list-group-item pointer bg-danger"} key={index}>
                    {notification.info && <p>C'è stato un problema nella creazione del dataset <b>{notification.info.title}</b>: {notification.info.errors}</p>}
                    <p>{notification.timestamp}</p>
                  </div>
                )
              }
            }) : <div className="list-group-item border-0 m-0 text-center font-weight-bold text-muted">Non hai nessuna notifica</div>
            }
        </div>
        <div className="text-center">
            <b className="text-primary">Vedi tutte</b>
        </div>
      </aside>
    )
  }
}

Aside.propTypes = {
  notifications: PropTypes.array
}

function mapStateToProps(state) {
  const { notifications } = state.notificationsReducer || { }
  return { notifications }
}

export default connect(mapStateToProps)(Aside)
