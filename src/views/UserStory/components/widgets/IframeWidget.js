import React, { Component, PropTypes } from 'react'
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

  componentDidMount() {
    const { identifier } = this.props

    if(localStorage.getItem('token')){
      let iframe = ReactDOM.findDOMNode(this.refs.iframe)
      iframe.addEventListener('load', this.props.onLoad);
    }else{
      let url = '';

      if (identifier){
        url = serviceurl.apiURLDatiGov + '/plot/' + identifier + '/1200x950';
        const response = fetch(url, {
          method: 'GET'
        }).then(response => {
          if (response.ok) {
            response.text().then(text => {
              this.setState({
                loading: false,
                imageSrc: text.replace(/"/g, '')
              })
            });
          } else {
            this.setState({
              loading: false,
              imageSrc: undefined
            })
          }
        })
      }
    }
  }

  render () {
    const iframeStyle = {
      width: '100%',
      height: '500px',
      border: '0'
    }
    if(localStorage.getItem('token')){
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
      return (
        <img className="h-100 w-100" src={"https://s3-eu-west-1.amazonaws.com/dafimgs/"+this.props.identifier+".png"} alt={this.props.identifier}/>
      )
    }
  }

}

export default IframeWidget