import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListMessages from '../../components/Messages/ListMessages';
import AddMessage from '../../components/Messages/AddMessage';

class Messages extends Component {
  render() {
    return (
        <div>
            <AddMessage ></AddMessage>
            <ListMessages ></ListMessages>
        </div>
    )
  }
}

function mapStateToProps(state) {
    const loggedUser = state.userReducer['obj'].loggedUser || { }
    const properties = state.propertiesReducer ? state.propertiesReducer['prop'] || {} : {} 
    return { loggedUser, properties }
}

export default connect(mapStateToProps)(Messages)