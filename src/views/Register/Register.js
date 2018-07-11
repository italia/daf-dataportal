import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerUser } from './../../actions.js'
import PropTypes from 'prop-types'

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

class Register extends Component {
  constructor(props) {
      super(props);
      this.props = props;
      this.state = {
        messaggio: null,
        error: null
      }
      
  }
  
  handleSubmit = (e) => {
      e.preventDefault()
      const { dispatch, selectDataset } = this.props
      dispatch(registerUser(this.nome.value, this.cognome.value, this.username.value, this.email.value, this.password.value, this.password2.value))
  }

  handleRedirect = (e) => {
    this.props.history.push('/login')
  }

  render() {
    const { messaggio, error } = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="mx-auto col-md-6">
            <div className="card mx-2">
              <div className="card-block p-2">
                <h1>Registrati</h1>
                <p className="text-muted">Crea il tuo account</p>
                {error===1 && 
                <div className="alert alert-danger" role="alert">
                  {messaggio}
                </div>
                }
                {error===0 && 
                  <div className="alert alert-success" role="alert">
                    {messaggio}
                  </div>
                }   
                <div className="input-group mb-1">
                  <span className="input-group-text">
                    <i className="icon-user"></i></span>
                  <input type="text" className="form-control" ref={(username) => this.username = username} placeholder="Nome Utente" />
                </div>
                <div className="input-group mb-1">
                  <span className="input-group-text">
                    <i className="icon-user"></i></span>
                  <input type="text" className="form-control" ref={(nome) => this.nome = nome} placeholder="Nome" />
                </div>
                <div className="input-group mb-1">
                  <span className="input-group-text">
                    <i className="icon-user"></i></span>
                  <input type="text" className="form-control" ref={(cognome) => this.cognome = cognome} placeholder="Cognome" />
                </div>
                <div className="input-group mb-1">
                  <span className="input-group-text">@</span>
                  <input type="text" className="form-control" ref={(email) => this.email = email} placeholder="Email" />
                </div>
                <div className="input-group mb-1">
                  <span className="input-group-text">
                    <i className="icon-lock"></i></span>
                  <input type="password" className="form-control" ref={(password) => this.password = password} placeholder="Password" />
                </div>
                <div className="input-group mb-2">
                  <span className="input-group-text">
                    <i className="icon-lock"></i></span>
                  <input type="password" className="form-control" ref={(password2) => this.password2 = password2} placeholder="Ripeti password" />
                </div>
                <div className="input-group mb-1">
                  <div className="g-recaptcha" data-sitekey="6LcUNjQUAAAAAG-jQyivW5xijDykXzslKqL2PMLr"></div>
                </div>
                <button type="button" className="btn btn-block btn-secondary" onClick={this.handleRedirect.bind(this)}>Torna al login</button>
                <button type="button" className="btn btn-block btn-primary" onClick={this.handleSubmit.bind(this)}>Crea Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  messaggio: PropTypes.string,
  error: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return { messaggio: state.userReducer.msg,
           error: state.userReducer.error }
}

export default connect(mapStateToProps)(Register)