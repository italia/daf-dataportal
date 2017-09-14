import React, { Component } from 'react'
import { connect } from 'react-redux'
import { activateUser } from './../../actions.js'
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
            registerError: null,
            successMsg: null 
        }
        var query = this.props.location.search;
        var params= getParams(query);
        this.token=params['t'];
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    componentDidMount() {
        window.addEventListener('load', this.handleSubmit);
     }

    handleSubmit(){
        console.log('attivo utente token: ' + this.token);
        const { dispatch } = this.props
         dispatch(activateUser(this.token))
        .then(() => {
          this.setState(setSuccessMsg('Attivazione avvenuta con successo.'))
        })
        .catch((error) => {
          this.setState(setErrorMsg('Errore durante l\' attivazione.'))
        })
        console.log('attivazione effettuata');
  }

  render() {
    const { messaggio, error } = this.props
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">

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
              <button type="button" className="btn btn-primary active mt-1" onClick={() => this.props.history.push('/login')} >Login</button>         
            
            
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