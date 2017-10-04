import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthToken, loginAction, addUserOrganization, loadDatasets, setApplicationCookie } from './../../actions.js'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import { serviceurl } from '../../config/serviceurl.js'


function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

class Login extends Component {
  constructor(props) {
      super(props);
      this.props = props;
      this.state = {
        isOpen: false,
        loginMessage: null
      }
  }

  async setCookie(token, nomeApp) {
    var url = serviceurl.apiURLSSOManager + '/secured/retriveCookie/' + nomeApp;
    const response = await fetch( url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    return response.json();
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, selectDataset } = this.props
    dispatch(setAuthToken(this.email.value, this.pw.value))
      .then(json => { localStorage.setItem('token', json); 
                      dispatch(setApplicationCookie('superset'))
                      .then(json => { if(json.result){
                                      let cookie = json.result.split('=');
                                      console.log('2 - Setto il seguente cookie: '+ cookie[1] + ' per superset');
                                      document.cookie = "session=" + cookie[1] + "; path=/; domain=.default.svc.cluster.local";
                                      //document.cookie = "session=" + cookie[1];
                                      console.log('3 - Cookie settato')
                                      this.props.history.push('/dashboard')
                                      console.log('4 - redirect effettuato')
                                      dispatch(loginAction())
                                      dispatch(addUserOrganization())
                                      this.props.history.push('/dashboard')
                                    }
                    })
              }) 
      .catch((error) => {
        this.setState(setErrorMsg('Invalid username/password.'))
      })
  }

  /*
  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, selectDataset } = this.props
    dispatch(setAuthToken(this.email.value, this.pw.value))
      .then(json => {localStorage.setItem('token', json); 
                      //dispatch(loginAction(this.email.value, json))
                      //dispatch(addUserOrganization(this.email.value, json))
                      console.log('1 - Setto i cookie')
                      this.setCookie(json, 'superset').then((json)=> {
                        if(json.result){
                          let cookie = json.result.split('=');
                          console.log('2 - Setto il seguente cookie: '+ cookie[1] + ' per superset');
                          document.cookie = "sessio=" + cookie[1] + "; path=/; domain=.default.svc.cluster.local";
                          console.log('3 - Cookie settato')
                          this.props.history.push('/dashboard')
                          console.log('4 - redirect effettuato')
                        }
                      })
                      //dispatch(setApplicationCookie(json, 'superset', 'session'))
                      //dispatch(setApplicationCookie(json, 'metabase', 'metabase.SESSION_ID'))
                    })
      .catch((error) => {
        this.setState(setErrorMsg('Invalid username/password.'))
      })
    console.log('login effettuato');
  }*/


  /*
   .then(json => {
                if(json.result){
                  let cookie = json.result.split('=');
                  console.log('Setto il seguente cookie: '+ cookie[1]);
                  document.cookie = nomeCookie + "=" + cookie[1] + "; path=/; domain=.default.svc.cluster.local";
                }
        })
  */
  
  openModal = () => {
    this.setState({
      isOpen: true
    });
  };
  
  hideModal = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    return (
        <div className="container">
        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
          <form>
            <ModalHeader>
              <ModalClose onClick={this.hideModal}/>
              <ModalTitle>Recupero password</ModalTitle>
            </ModalHeader>
            <ModalBody>
            <div className="form-group">
              <p>Se hai dimenticato la password contattaci al seguente indirizzo email: email@email.com</p>
            </div>

            </ModalBody>
            <ModalFooter>
              <button className='btn btn-default' onClick={this.hideModal}>
                Chiudi
              </button>
            </ModalFooter>
          </form>
        </Modal>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card-group mb-0">
                <div className="card p-2">
                  <div className="card-block">
                    <h1>Login</h1>
                    <p className="text-muted">Accedi alla tua area personale</p>
                    {this.state.loginMessage && 
                      <div className="alert alert-danger" role="alert">
                        {this.state.loginMessage}
                      </div>
                      }
                    <div className="input-group mb-1">
                      <span className="input-group-addon">
                        <i className="icon-user"></i>
                      </span>
                      <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
                    </div>
                    <div className="input-group mb-2">
                      <span className="input-group-addon">
                        <i className="icon-lock"></i>
                      </span>
                      <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
                    </div><div className="row">
                      <div className="col-6">
                        <button type="button" className="btn btn-primary px-2" onClick={this.handleSubmit.bind(this)}>Login</button>
                      </div><div className="col-6 text-right"><button type="button" className="btn btn-link px-0" onClick={this.openModal}>Password dimenticata?</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card-inverse card-primary py-3 hidden-md-down">
                  <div className="card-block text-center"><div>
                    <h2>Iscriviti</h2>
                    <p>Per accedere all'area riservata del portale occorre registrarsi qui: </p>
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