import React, { Component } from 'react'
import { connect } from 'react-redux'

class EditTTL extends Component {
  render() {
    return (
        <div>
           test
        </div>
    )
  }
}

function mapStateToProps(state) {
    const loggedUser = state.userReducer['obj'].loggedUser || { }
    const properties = state.propertiesReducer ? state.propertiesReducer['prop'] || {} : {} 
    return { loggedUser, properties }
}

export default connect(mapStateToProps)(EditTTL)