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
        error: null,
        nome: '',
        cognome: '',
        username: '',
        email: '',
        password: '',
        password2: '',
      }
      
  }
  
  handleSubmit = (e) => {
      e.preventDefault()
      const { dispatch } = this.props
      const { nome, cognome, username, email, password, password2 } = this.state
      dispatch(registerUser(nome, cognome, username, email, password, password2))
  }

  handleRedirect = (e) => {
    this.props.history.push('/login')
  }

  render() {
    const { messaggio, error } = this.props
    const { nome, cognome, username, email, password, password2 } = this.state
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
                  <input type="text" className="form-control" value={username} onChange={(e) => {this.setState({username: e.target.value.toLowerCase().trim()})}} placeholder="Nome Utente" />
                </div>
                <div className="input-group mb-1">
                  <span className="input-group-text">
                    <i className="icon-user"></i></span>
                  <input type="text" className="form-control" value={nome} onChange={(e) => {this.setState({nome: e.target.value})}} placeholder="Nome" />
                </div>
                <div className="input-group mb-1">
                  <span className="input-group-text">
                    <i className="icon-user"></i></span>
                  <input type="text" className="form-control" value={cognome} onChange={(e) => {this.setState({cognome: e.target.value})}} placeholder="Cognome" />
                </div>
                <div className="input-group mb-1">
                  <span className="input-group-text">@</span>
                  <input type="text" className="form-control" value={email} onChange={(e) => {this.setState({email: e.target.value.toLowerCase().trim()})}} placeholder="Email" />
                </div>
                <div className="input-group mb-1">
                  <span className="input-group-text">
                    <i className="icon-lock"></i></span>
                  <input type="password" className="form-control" value={password} onChange={(e) => {this.setState({password: e.target.value.trim()})}} placeholder="Password" />
                </div>
                <div className="input-group mb-2">
                  <span className="input-group-text">
                    <i className="icon-lock"></i></span>
                  <input type="password" className="form-control" value={password2} onChange={(e) => {this.setState({password2: e.target.value.trim()})}} placeholder="Ripeti password" />
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