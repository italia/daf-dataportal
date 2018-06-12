import React, { Component } from 'react'

class ShareButton extends Component{
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }

    this.onClick = this.onClick.bind(this)
  }
  
  onClick(){
    this.setState({
      active: !this.state.active
    })
  }

  render(){
    const { className } = this.props
    const { active } = this.state

    var attiva = active?'active':''

    return(
      <div className={"sharing " + className}>
        <div className={"i "+ attiva} onClick={this.onClick}></div>
        <div className="t" onClick={this.onClick}>Condividi</div>
        <ul className={attiva}>
          <li><a href={"https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href)} target="_blank"><i className="fab fa-facebook-f fa-lg"/></a></li>
          <li><a href={"https://twitter.com/home?status=" + encodeURIComponent(window.location.href)} target="_blank"><i className="fab fa-twitter fa-lg"/></a></li>
          <li><a href={"https://www.linkedin.com/shareArticle?mini=true&amp;url=" + encodeURIComponent(window.location.href)} target="_blank"><i className="fab fa-linkedin-in fa-lg"/></a></li>
          {/* <li><a href={"https://plus.google.com/share?url=" +(window.location.href)} target="_blank"><i className="fab fa-google-plus-g fa-lg"/></a></li> */}
        </ul>
      </div>
    )
  }
}

export default ShareButton;