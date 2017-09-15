import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerUser } from './../../actions.js'
import PropTypes from 'prop-types'

function setErrorMsg(error) {
  return {
    registerError: error.message,
    successMsg: null
  }
}

function setSuccessMsg(msg) {
  return {
    successMsg: msg.message,
    registerError: null
  }
}

class Register extends Component {
  state = { 
    registerError: null,
    successMsg: null 
  }
  
    handleSubmit = (e) => {
      e.preventDefault()
      const { dispatch, selectDataset } = this.props
      if(this.password.value===this.password2.value){
      dispatch(registerUser(this.nome.value, this.cognome.value, this.username.value, this.email.value, this.password.value))
        .then(() => {
          this.setState(setSuccessMsg('Registrazione avvenuta con successo.'))
        })
        .catch((error) => {
          this.setState(setErrorMsg('Errore durante la registrazione.'))
        })
      console.log('registrazione effettuata');
    }else{
      this.setState(setErrorMsg('Password e ripeti password non coincidono'))
    }
  }

  render() {
    const { messaggio, error } = this.props
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
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
                  <span className="input-group-addon">
                    <i className="icon-user"></i></span>
                  <input type="text" className="form-control" ref={(username) => this.username = username} placeholder="Nome Utente" />
                </div>
                <div className="input-group mb-1">
                  <span className="input-group-addon">
                    <i className="icon-user"></i></span>
                  <input type="text" className="form-control" ref={(nome) => this.nome = nome} placeholder="Nome" />
                </div>
                <div className="input-group mb-1">
                  <span className="input-group-addon">
                    <i className="icon-user"></i></span>
                  <input type="text" className="form-control" ref={(cognome) => this.cognome = cognome} placeholder="Cognome" />
                </div>
                <div className="input-group mb-1">
                  <span className="input-group-addon">@</span>
                  <input type="text" className="form-control" ref={(email) => this.email = email} placeholder="Email" />
                </div>
                <div className="input-group mb-1">
                  <span className="input-group-addon">
                    <i className="icon-lock"></i></span>
                  <input type="password" className="form-control" ref={(password) => this.password = password} placeholder="Password" />
                </div>
                <div className="input-group mb-2">
                  <span className="input-group-addon">
                    <i className="icon-lock"></i></span>
                  <input type="password" className="form-control" ref={(password2) => this.password2 = password2} placeholder="Ripeti password" />
                </div>
                <button type="button" className="btn btn-block btn-success" onClick={this.handleSubmit.bind(this)}>Crea Account</button>
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