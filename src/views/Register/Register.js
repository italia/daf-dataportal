import React, { Component } from 'react'

function setErrorMsg(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends Component {
  state = { registerError: null }
  handleSubmit = (e) => {
    e.preventDefault()
    // auth(this.email.value, this.pw.value)
    //   .catch(e => this.setState(setErrorMsg(e)))
  }
  render() {
    return (
      /*
      <div className="container">
        <div className="row">
          <div className="col align-self-center">
          <h1>Register</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
            </div>
            {
              this.state.registerError &&
              <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error:</span>
                &nbsp;{this.state.registerError}
              </div>
            }
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
    */

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mx-2">
              <div className="card-block p-2">
                <h1>Registrati</h1>
                <p className="text-muted">Crea il tuo account</p>
                <div className="input-group mb-1">
                  <span className="input-group-addon">
                    <i className="icon-user"></i></span>
                  <input type="text" className="form-control" placeholder="Nome Utente" />
                </div><div className="input-group mb-1"><span className="input-group-addon">@</span>
                  <input type="text" className="form-control" placeholder="Email" /></div>
                <div className="input-group mb-1">
                  <span className="input-group-addon">
                    <i className="icon-lock"></i></span>
                  <input type="password" className="form-control" placeholder="Password" /></div>
                <div className="input-group mb-2">
                  <span className="input-group-addon">
                    <i className="icon-lock"></i></span>
                  <input type="password" className="form-control" placeholder="Ripeti password" /></div>
                <button type="button" className="btn btn-block btn-success">Crea Account</button>
              </div>
              <div className="card-footer p-2">
                <div className="row"><div className="col-6">
                  <button className="btn btn-block btn-facebook" type="button">
                    <span>Facebook</span></button></div>
                  <div className="col-6">
                    <button className="btn btn-block btn-twitter" type="button">
                      <span>Twitter</span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
