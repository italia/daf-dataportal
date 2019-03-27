import React, { Component } from 'react'
import { connect } from 'react-redux'
import { resetPwd } from './../../actions.js'

function setErrorMsg(error) {
  return {
    messaggio: error,
    error: 1
  }
}

function setSuccessMsg(msg) {
  return {
    messaggio: msg,
    error: 0
  }
}

class RequestReset extends Component {
  constructor(props) {
      super(props);
      this.props = props;
      this.state = {
        email: ''
      }
      
  }
  
  handleSubmit = (e) => {
      e.preventDefault()

      const { dispatch } = this.props
      dispatch(resetPwd(this.state.email))

  }

  handleRedirect = (e) => {
    this.props.history.push('/login')
  }

  render() {
    const { msg, loading } = this.props
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mx-2">
              <div className="card-block p-2">
                <h1>Hai dimenticato la password?</h1>
                <p className="text-muted">Reset della password</p>
                {msg && msg.length>0 && 
                <div className="alert alert-info" role="alert">
                  {msg}
                </div>
                }
                {(!msg || msg.length===0) && <div className="input-group mb-1">
                  <span className="input-group-text"><i className="far fa-envelope"/></span>
                  <input type="text" className="form-control" value={this.state.email} onChange={(e)=>this.setState({email: e.target.value})} placeholder="Inserisci la tua mail registrata" />
                </div>}
{/*                 <div className="input-group mb-1">
                  <div className="g-recaptcha" data-sitekey="6LcUNjQUAAAAAG-jQyivW5xijDykXzslKqL2PMLr"></div>
                </div> */}
                <button type="button" className="btn btn-block btn-secondary" onClick={this.handleRedirect.bind(this)}>Torna al login</button>
                <button type="button" className="btn btn-block btn-primary" disabled={this.state.email.length===0} onClick={this.handleSubmit.bind(this)}>{loading?<i className="fa fa-spin fa-spinner fa-lg"/>:'Reset Password'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { msg, error, loading } = state.userReducer || {msg: undefined, error: undefined, loading: false}
  return { msg, error, loading }
}

export default connect(mapStateToProps)(RequestReset)