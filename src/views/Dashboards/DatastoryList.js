import React, { Component } from 'react';
import { connect } from 'react-redux'

class DatastoryList extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return(
      <div className="container">
        
      </div>
    )
  }
}

function mapStateToProps(state) {
  const loggedUser = state.userReducer['obj']?state.userReducer['obj'].loggedUser:{ }
  return { loggedUser }
}

export default connect(mapStateToProps)(DatastoryList)
