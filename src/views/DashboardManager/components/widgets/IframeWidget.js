import React, { Component } from 'react'
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

    let iframe = ReactDOM.findDOMNode(this.refs.iframe)
    iframe.addEventListener('load', this.props.onLoad);

    let url = '';

    if (identifier){
      url = serviceurl.apiURLDatiGov + '/plot/' + identifier + '/330x280';
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
      <img src={"data:image/jpg;base64," + this.state.imageSrc} alt={this.props.identifier}/>
    }
  }

}

export default IframeWidget