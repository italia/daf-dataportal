import React, { Component } from 'react'
import { connect } from 'react-redux'
import { activateUser } from './../../actions.js'
import PropTypes from 'prop-types'
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'

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
            }else{
              response.json().then(json => {
                if(json.code===1){
                  this.setState(setErrorMsg(json.message))
                }else{
                  this.setState(setErrorMsg('Errore durante l\' attivazione.'))
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
        <div className="row justify-content-center">
          <div className="col-md-6">
          <OverlayLoader 
              color={'#06c'} 
              loader="ScaleLoader" 
              text="Conferma registrazione in corso..." 
              active={this.state.uploading} 
              backgroundColor={'grey'}
              >
              {this.state.error===1? 
              <div>
                <div className="alert alert-danger" role="alert">
                  {this.state.msg}
                </div>
                <button type="button" className="btn btn-primary active mt-1" onClick={() => this.props.history.push('/login')} >Indietro</button>
              </div>
              : 
              <div>
                <div className="alert alert-success" role="alert">
                  {this.state.msg}
                </div>
                <button type="button" className="btn btn-primary active mt-1" onClick={() => this.props.history.push('/login')} >Login</button>     
              </div>
              }       
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