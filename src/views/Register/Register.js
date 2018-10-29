import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerUser } from './../../actions.js'
import Recaptcha  from 'react-recaptcha'
import { Tooltip } from 'reactstrap';


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
        verified: false,
        tooltipPassword: false,
        tooltipUsername: false
      }
      
      this.verifyCallback = this.verifyCallback.bind(this)
      this.toggleUsername = this.toggleUsername.bind(this)
      this.togglePassword = this.togglePassword.bind(this)

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

  toggleUsername() {
    this.setState({
      tooltipUsername: !this.state.tooltipUsername
    });
  }

  togglePassword() {
    this.setState({
      tooltipPassword: !this.state.tooltipPassword
    });
  }

  verifyCallback(response){
    console.log(response)
    this.setState({
      verified: true
    })
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
                <h2>Crea il tuo account</h2>
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
                <div className="row">
                  <div className="form-group col-md-6 col-12 mr-auto">
                    <label>Nome</label>
                    <input type="text" className="form-control" id="nome" value={nome} onChange={(e) => {this.setState({nome: e.target.value})}} placeholder="Nome"/>
                  </div>
                  <div className="form-group col-md-6 col-12 ml-auto">
                    <label>Cognome</label>
                    <input type="text" className="form-control" id="cognome" value={cognome} onChange={(e) => {this.setState({cognome: e.target.value})}} placeholder="Cognome"/>
                  </div>   
                </div>
                <div className="row">
                  <div className="form-group col-12 mr-auto">
                    <label>Username <i className="ml-2 fa text-primary fa-info-circle pointer" id="Username"/>
                      <Tooltip className="ml-3" placement="top" isOpen={this.state.tooltipUsername} autohide={true} target="Username" toggle={this.toggleUsername}>
                        Sono accettati solo lettere minuscole, numeri e il carattere speciale "_", non sono ammessi gli spazi
                      </Tooltip>
                    </label>
                    <input type="text" className="form-control" value={username} onChange={(e) => {this.setState({username: e.target.value.toLowerCase().trim()})}} placeholder="Nome Utente"/>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 mr-auto">
                    <label>Email</label>
                    <input type="text" className="form-control" id="email" value={email} onChange={(e) => {this.setState({email: e.target.value.toLowerCase().trim()})}} placeholder="Email"/>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6 col-12 mr-auto">
                    <label>Password <i className="ml-2 fa text-primary fa-info-circle pointer" id="Password"/>
                      <Tooltip className="ml-3" placement="top" isOpen={this.state.tooltipPassword} autohide={true} target="Password" toggle={this.togglePassword}>
                        {'La password inserita deve avere almeno 8 caratteri, una maiuscola ed un numero. I caratteri speciali consentiti sono: "%@#,;:_\'/<([{ ^=$!|}.>-"'}
                      </Tooltip></label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => {this.setState({password: e.target.value.trim()})}} placeholder="Password"/>
                  </div>
                  <div className="form-group col-md-6 col-12 ml-auto">
                    <label>Ripeti password</label>
                    <input type="password" className="form-control" id="password2" value={password2} onChange={(e) => {this.setState({password2: e.target.value.trim()})}} placeholder="Ripeti password"/>
                  </div>   
                </div>
                {/* <div className="input-group mb-1">
                  <div className="g-recaptcha" data-sitekey="6LcUNjQUAAAAAG-jQyivW5xijDykXzslKqL2PMLr"></div>
                </div> */}
                <Recaptcha
                  className="mb-3"
                  sitekey="6LcUNjQUAAAAAG-jQyivW5xijDykXzslKqL2PMLr"
                  verifyCallback={this.verifyCallback}
                  type='image'
                />
                <div className="row px-3">
                  <button type="button" className="col-4 mr-auto btn btn-link text-primary font-weight-bold" onClick={this.handleRedirect.bind(this)}>Torna al login</button>
                  <button type="button" className="col-md-4 col-6 ml-auto btn btn-primary" disabled={!this.state.verified} onClick={this.handleSubmit.bind(this)}>Crea Account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { messaggio: state.userReducer.msg,
           error: state.userReducer.error }
}

export default connect(mapStateToProps)(Register)