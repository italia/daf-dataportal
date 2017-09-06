import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginAction, addUserOrganization } from './../../actions.js'
import PropTypes from 'prop-types'

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

class Login extends Component {
  state = { loginMessage: null }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, selectDataset } = this.props
    dispatch(loginAction(this.email.value, this.pw.value))
      .then(dispatch(addUserOrganization(this.email.value, this.pw.value)))
      .then(() => {
        debugger
        this.props.history.push('/dashboard')
      })
      .catch((error) => {
        this.setState(setErrorMsg('Invalid username/password.'))
      })
    console.log('login effettuato');
  }

  /*resetPassword = () => {
    resetPassword(this.email.value)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
      .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
  }*/

  render() {
    return (
      /*
      <div className="container">
        <div className="row">
          <div className="col align-self-center">
            <h1> Login </h1>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
                </div>
                {
                  this.state.loginMessage &&
                  <div className="alert alert-danger" role="alert">
                    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    <span className="sr-only">Error:</span>
                    &nbsp;{this.state.loginMessage} <a href="#" onClick={this.resetPassword} className="alert-link">Forgot Password?</a>
                  </div>
                }
                <button type="submit" onClick={this.handleSubmit.bind(this)} className="btn btn-primary">Login</button>
              </form>
              <br/>
              <br/>
              <br/>
              <p>Se non hai le credenziali <a href='/#/register'>Registrati qui.</a></p>
          </div>
        </div>
      </div>
      */
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card-group mb-0">
              <div className="card p-2">
                <div className="card-block">
                  <h1>Login</h1>
                  <p className="text-muted">Accedi alla tua area personale</p>
                  <div className="input-group mb-1">
                    <span className="input-group-addon">
                      <i className="icon-user"></i>
                    </span>
                    <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
                  </div><div className="input-group mb-2">
                    <span className="input-group-addon">
                      <i className="icon-lock"></i>
                    </span>
                    <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
                  </div><div className="row">
                    <div className="col-6">
                      <button type="button" className="btn btn-primary px-2" onClick={this.handleSubmit.bind(this)}>Login</button>
                    </div><div className="col-6 text-right"><button type="button" className="btn btn-link px-0">Password dimenticata?</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-inverse card-primary py-3 hidden-md-down">
                <div className="card-block text-center"><div>
                  <h2>Iscriviti</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <button type="button" className="btn btn-primary active mt-1" onClick={() => this.props.history.push('/register')} >Registrati!</button>
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

Login.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { loggedUser } = state.userReducer['obj'] || {}
  return { loggedUser }
}

export default connect(mapStateToProps)(Login)