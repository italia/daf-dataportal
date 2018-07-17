import React, { Component } from 'react'
import { connect } from 'react-redux'
import { activateUser } from './../../actions.js'
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
  
  function setSuccessMsg(messaggio) {
    return {
      msg: messaggio,
      error: 0,
      uploading: false
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

class ConfirmRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            msg: null,
            error: 0,
            uploading: true 
        }
        var query = this.props.location.search;
        var params= getParams(query);
        this.token=params['t'];
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    componentDidMount() {
        //window.addEventListener('load', this.handleSubmit);
        this.handleSubmit();
     }

    handleSubmit(){
        console.log('attivo utente token: ' + this.token);
        const { dispatch } = this.props
         dispatch(activateUser(this.token))
         .then((response)=> {
            if(response.ok){
              this.setState(setSuccessMsg('Attivazione avvenuta con successo.')) 
              toastr.success('Complimenti', 'Attivazione avvenuta con successo')
              this.props.history.push('/login')
            }else{
              response.json().then(json => {
                if(json.code===1){
                  this.setState(setErrorMsg(json.message))
                  toastr.error('Errore', json.message, { timeOut: 0 })
                }else{
                  this.setState(setErrorMsg('Errore durante l\' attivazione.'))
                  toastr.error('Errore', 'Errore durante l\' attivazione.', { timeOut: 0 })
                }
              });
            }
         }).catch((error) => {
          this.setState(setErrorMsg('Errore durante l\' attivazione.'))
        })
  }

  render() {
    const { messaggio, error } = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="mx-auto col-md-6">
          <OverlayLoader 
              color={'#fff'}
              loader="ClipLoader"
              text="Conferma registrazione in corso..." 
              active={this.state.uploading} 
              backgroundColor={'grey'}
              >
              <div>
                <h1>Conferma Registrazione</h1>
                <p className="text-muted">Se la tua registrazione è andata a buon fine entra subito nel <a href="/#/login">DAF</a>.</p>    
                <p className="text-muted">Segnalaci eventuali problemi su slack sul canale{" "}
                  <a href="https://developersitalia.slack.com/archives/C760XQX9Q" target="_blank">#daf</a> 
                </p>
              </div>
            </OverlayLoader>
          </div>
        </div>
      </div>
    )
  }
}

ConfirmRegistration.propTypes = {
  messaggio: PropTypes.string,
  error: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return { messaggio: state.userReducer.msg,
           error: state.userReducer.error }
}

export default connect(mapStateToProps)(ConfirmRegistration)