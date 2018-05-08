import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changePwd } from './../../actions.js'
import PropTypes from 'prop-types'
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'
import { toastr } from 'react-redux-toastr'

  function setErrorMsg(messaggio) {
    return {
      msg: messaggio,
      error: 1,
      uploading: false
    }
  }
  
  function setErrorMsg2(messaggio) {
    return {
      msg2: messaggio,
      error: 1,
      uploading: false
    }
  }

  function setSuccessMsg(messaggio) {
    return {
      msg: messaggio,
      error: 0,
      uploading: false,
      showLink: false
    }
  }

  function getParams(query) {
    if (!query) {
      return { };
    }
  
    return (/^[?#]/.test(query) ? query.slice(1) : query)
      .split('&')
      .reduce((params, param) => {
        let [ key, value ] = param.split('=');
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
        return params;
      }, { });
  };

class ConfirmReset extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            msg: null,
            msg2: null,
            error: 0,
            uploading: false,
            showLink: true 
        }
        var query = this.props.location.search;
        var params= getParams(query);
        this.token=params['t'];
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this)
        this.validateEqual = this.validateEqual.bind(this)
    }
  
    componentDidMount() {
        //window.addEventListener('load', this.handleSubmit);
        /* this.handleSubmit(); */
     }

    handleSubmit(){
        console.log('Cambio password utente token: ' + this.token);
        const { dispatch } = this.props
        this.setState({uploading: true})
        //var reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$")
        var reg1 = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$")
        var reg2 = new RegExp("^[a-zA-Z0-9%@#   &,;:_'\/\<\(\[\{\\\^\-\=\$\!\|\]\}\)\\u200C\\u200B\?\*\+\.\>]*$")
      
        
        if (reg1.test(this.password.value)){
          if (reg2.test(this.password.value)){
            if(this.password.value === this.password2.value){
              dispatch(changePwd(this.token, this.password.value, this.password2.value))
              .then((response)=> {
                  if(response.ok){
                    this.setState(setSuccessMsg('Cambio password avvenuto con successo.'))
                    toastr.success('Complimenti', 'Cambio password avvenuto con successo.', { timeOut: 9000,})
                    this.props.history.push('/login')
                  }else{
                    response.json().then(json => {
                      if(json.code===1){
                        toastr.danger('Errore', json.message, {timeOut:0})
                        /* this.setState(setErrorMsg(json.message)) */
                      }else{
                        /* this.setState(setErrorMsg('Errore durante il salvataggio.')) */
                        toastr.danger('Errore', 'Errore durante il salvataggio.', {timeOut: 0 })
                      }
                    });
                  }
              }).catch((error) => {
                /* this.setState(setErrorMsg('Errore durante il salvataggio.')) */
                toastr.danger('Errore', 'Errore durante il salvataggio.')
              })
            }else{
              this.setState(setErrorMsg('Le password inserite non corrispondono'))
            }
          }else{
            this.setState(setErrorMsg('La password inserita non rispetta i criteri. La password inserita contiene caratteri non consentiti.'))
          }
        }else{
          this.setState(setErrorMsg('La password inserita non rispetta i criteri. La password deve avere almeno 8 caratteri, una maiuscola ed un numero.'))
        }
    }

    validate(){
      if(this.password.value){
        //var reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$")
        var reg1 = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$")
        var reg2 = new RegExp("^[a-zA-Z0-9%@#   &,;:_'\/\<\(\[\{\\\^\-\=\$\!\|\]\}\)\\u200C\\u200B\?\*\+\.\>]*$")

        if(reg1.test(this.password.value)){
          this.setState({
            msg: null,
          })
        }else{
          this.setState(setErrorMsg('La password inserita non rispetta i criteri. La password deve avere almeno 8 caratteri, una maiuscola ed un numero.'))
        }
        if(reg2.test(this.password.value)){
          this.setState({
            msg: null,
          })
        }else{
          this.setState(setErrorMsg('La password inserita non rispetta i criteri. La password inserita contiene caratteri non consentiti.'))
        }
      }else{
        this.setState({
          msg: null,
        })
      }
      this.validateEqual();
    }

    validateEqual(){
      if(this.password.value && this.password2.value){
        if(this.password.value===this.password2.value){
          this.setState({
            msg2: null,
          })
        }else{
          this.setState(setErrorMsg2('Le password inserite non corrispondono'))
        }
      }else{
        this.setState({ msg2: null,})
      }
    }

  render() {
    const { msg, msg2, error } = this.state
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mx-2">
              <div className="card-block p-2">
                <h1>Cambio Password</h1>
                <p className="text-muted">Inserisci la nuova Password</p>
                {msg && error === 1 &&
                  <div className="alert alert-danger" role="alert">
                    {msg}
                  </div>
                }
                {msg2 && error === 1 &&
                  <div className="alert alert-danger" role="alert">
                    {msg2}
                  </div>
                }
                {msg && error === 0 &&
                  <div className="alert alert-success" role="alert">
                    {msg}
                  </div>
                }
                <div className="input-group mb-1">
                  <span className="input-group-text">
                    <i className="icon-lock"></i></span>
                  <input type="password" className="form-control" ref={(password) => this.password = password} onChange={this.validate} placeholder="Password" />
                </div>
                <div className="input-group mb-2">
                  <span className="input-group-text">
                    <i className="icon-lock"></i></span>
                  <input type="password" className="form-control" ref={(password2) => this.password2 = password2} onChange={this.validateEqual} placeholder="Ripeti password" />
                </div>
                {/* <div className="input-group mb-1">
                  <div className="g-recaptcha" data-sitekey="6LcUNjQUAAAAAG-jQyivW5xijDykXzslKqL2PMLr"></div>
                </div> */}
                <button type="button" className="btn btn-block btn-primary" onClick={this.handleSubmit.bind(this)}>{this.state.uploading ? <i className="fa fa-spinner fa-spin fa-lg"/>:'Cambia Password'}</button>
                <button hidden={this.state.showLink} type="button" className="btn btn-block btn-secondary" onClick={() => this.props.history.push('/login')}>Vai al login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ConfirmReset.propTypes = {
  messaggio: PropTypes.string,
  error: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return { messaggio: state.userReducer.msg,
           error: state.userReducer.error }
}

export default connect(mapStateToProps)(ConfirmReset)