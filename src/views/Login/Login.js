import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAuthToken, loginAction, addUserOrganization, loadDatasets, getApplicationCookie, receiveLogin } from './../../actions.js'
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
import { setCookie } from '../../utility'
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'

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
      loginMessage: null,
      uploading: false
    }
  }



  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, selectDataset } = this.props
    this.setState({uploading: true})
    dispatch(getAuthToken(this.email.value, this.pw.value))
      .then(json => {
            localStorage.setItem('token', json);
            dispatch(getApplicationCookie('superset'))
            .then(json => {
              if (json) {
              setCookie(json)
              dispatch(getApplicationCookie('metabase'))
                .then(json => {
                  if (json) {
                    setCookie(json)
                    dispatch(getApplicationCookie('jupyter'))
                      .then(json => {
                        if (json) {
                          setCookie(json)
                          dispatch(getApplicationCookie('grafana'))
                            .then(json => {
                              if (json) {
                                setCookie(json)
                                dispatch(loginAction())
                                  .then(json => {
                                    localStorage.setItem('user', json.uid);
                                    setCookie(JSON.parse('[{"name":"dataportal","value":"'+ json.givenname +'","path":"/"}]'))
                                    dispatch(receiveLogin(json))
                                    this.props.history.push('/home')
                                  })
                              }
                            })
                        }
                      })
                  }
                })
              }
            })
          }).catch((error) => {
              this.setState({
                loginMessage: 'Nome utente o password non corretto.',
                uploading: false
              })
            })
  }

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
              <ModalClose onClick={this.hideModal} />
              <ModalTitle>Recupero password</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <p>Se hai dimenticato la password contattaci al seguente indirizzo email: alessandro@teamdigitale.governo.it</p>
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
                  
                  <OverlayLoader
                    color={'#06c'}
                    loader="ScaleLoader"
                    text="Caricamento in corso..."
                    active={this.state.uploading}
                    backgroundColor={'grey'}

                  >
                    <h1>Login</h1>
                    <p className="text-muted">Accedi alla tua area personale</p>
                    {this.state.loginMessage &&
                      <div className="alert alert-danger" role="alert">
                        {this.state.loginMessage}
                      </div>
                    }
                  
                    
                      <div className="input-group mb-1" style={{position: 'initial'}}>
                        <span className="input-group-addon">
                          <i className="icon-user"></i>
                        </span>
                        <input className="form-control" ref={(email) => this.email = email} placeholder="Email" 
                          style={{position: 'initial', zIndex: 'initial'}}/>
                      </div>
                    
                    
                    <div className="input-group mb-2" style={{ position: 'initial' }}>
                        <span className="input-group-addon">
                          <i className="icon-lock"></i>
                        </span>
                      <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw}
                        style={{ position: 'initial', zIndex: 'initial' }}/>
                      </div>
                    
                   
                      <div className="row">
                      <div className="col-6" style={{ position: 'initial' }}>
                        <button type="button" className="btn btn-primary px-2" onClick={this.handleSubmit.bind(this)}>Login</button>
                        </div>
                      <div className="col-6 text-right" style={{ position: 'initial' }}><button type="button" className="btn btn-link px-0" onClick={this.openModal} >Password dimenticata?</button>
                        </div>
                      </div>
                  </OverlayLoader>
                    
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