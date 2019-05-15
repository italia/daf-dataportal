import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { serviceurl } from '../../../../config/serviceurl'

class IframeWidget extends Component {

  constructor(props){
      super(props);
      this.state = {
        loading: true,
        imageSrc: ''
      }
  }

  render () {
    const { loggedUser } = this.props

    const iframeStyle = {
      width: '100%',
      height: this.props.height,
      border: '0'
    }

    if(loggedUser && localStorage.getItem('token')){
      return (
        <iframe
          className={this.props.class}
          ref="iframe"
          frameBorder={'0'}
          style={iframeStyle}
          src={this.props.url}
        />
      )
    }else{
      return(
        <img style={iframeStyle} src={serviceurl.urlCacher +this.props.identifier+'.png'} alt={this.props.identifier}/>
      )
    }
  }

}
function mapStateToProps(state) {
  const loggedUser = state.userReducer['obj']?state.userReducer['obj'].loggedUser:{ }
  return { loggedUser }
}

export default connect(mapStateToProps)(IframeWidget)