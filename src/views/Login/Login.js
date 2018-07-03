import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAuthToken, loginAction, isValidToken, logout, getApplicationCookie, receiveLogin } from './../../actions.js'
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
      authed: false,
      loading: true,
      isOpen: false,
      loginMessage: null,
      uploading: false
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
      if (this.props.loggedUser && this.props.loggedUser.mail) {
        this.setState({
          authed: true,
          loading: false
        })
        this.props.history.push('/private/home')
      } else {
        if (localStorage.getItem('username') && localStorage.getItem('token') &&
          localStorage.getItem('username') !== 'null' && localStorage.getItem('token') !== 'null') {
          dispatch(isValidToken(localStorage.getItem('token')))
          .then(ok => {
            if (ok) {
                  dispatch(getApplicationCookie('superset'))
                  .then(json => {
                    if (json) {
                      setCookie(json)
                    }
                  })
                  dispatch(getApplicationCookie('metabase'))
                  .then(json => {
                    if (json) {
                      setCookie(json)
                    }
                  })
                  dispatch(getApplicationCookie('jupyter'))
                  .then(json => {
                    if (json) {
                      setCookie(json)
                    }
                  })
                  /* dispatch(getApplicationCookie('grafana'))
                  .then(json => {
                    if (json) {
                      setCookie(json)
                    }
                  }) */
                  dispatch(loginAction())
                    .then(json => {
                        dispatch(receiveLogin(json))
                        /* dispatch(addUserOrganization(json.uid)) */
                        this.setState({
                            authed: true,
                            loading: false
                          })
                        this.props.history.push('/private/home')
                  })
                } else {
                  this.setState({
                    authed: false,
                    loading: false
                  })
                  logout();
                }
              })
              .catch((error) => {
                this.setState({
                  authed: false,
                  loading: false
                })
                logout();
              })
            } else {
              this.setState({
                authed: false,
                loading: false
              })
              logout();
            }
          }
      }



  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    this.setState({
      loginMessage:undefined,
      uploading: true
    })
    var token=''
    dispatch(getAuthToken(this.email.value, this.pw.value))
      .then(json => {
            localStorage.setItem('token', json);
            token = json;
            dispatch(getApplicationCookie('superset'))
            .then(json => {
              if (json) {
              setCookie(json)
              dispatch(getApplicationCookie('metabase'))
                .then(json => {
                  if (json) {
                    setCookie(json)
                    //dispatch(getApplicationCookie('jupyter'))
                    //  .then(json => {
                    //    if (json) {
                    //      setCookie(json)
                          // GRAFANA DISABLED
                          /* dispatch(getApplicationCookie('grafana'))
                            .then(json => {
                              if (json) {
                                setCookie(json) */
                                dispatch(loginAction())
                                  .then(json => {
                                    localStorage.setItem('user', json.uid);
                                    let dataportalCookie = json.givenname +'/'+token;
                                    setCookie(JSON.parse('[{"name":"dataportal","value":"'+ dataportalCookie +'","path":"/"}]'))
                                    dispatch(receiveLogin(json))
                                    this.props.history.push('/private/home')
                                  })
                              //}
                            //})
                       // }
                      //})
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
    return (this.state.loading? <h1 className="text-center fixed-middle"><i className="fas fa-circle-notch fa-spin mr-2"/>Caricamento</h1> :
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
              <div className="card-group mb-0">
                <div className="card p-2">
                  <div className="card-block">
                  
                  <OverlayLoader
                    color={'#fff'}
                    loader="ClipLoader"
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
                        <span className="input-group-text">
                          <i className="icon-user"></i>
                        </span>
                        <input className="form-control" ref={(email) => this.email = email} placeholder="Email" 
                          style={{position: 'initial', zIndex: 'initial'}}/>
                      </div>
                    
                      <form onSubmit={this.handleSubmit.bind(this)}>
                      <div className="input-group mb-2" style={{ position: 'initial' }}>
                        <span className="input-group-text">
                          <i className="icon-lock"></i>
                        </span>
                        <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw}
                          style={{ position: 'initial', zIndex: 'initial' }}/>
                      </div>
                      </form>
                   
                      <div className="row">
                        <div className="col-6" style={{ position: 'initial' }}>
                          <button type="button" className="btn btn-primary px-2" onClick={this.handleSubmit.bind(this)}>Login</button>
                        </div>
                        <div className="col-6 text-right" style={{ position: 'initial' }}>
                        <button type="button" className="btn btn-link px-0" onClick={() => this.props.history.push('/requestreset')}>Password dimenticata?</button>
                        </div>
                      </div>
                    
                  </OverlayLoader>
                    
              </div>
                </div>
              <div className="card bg-primary py-3 hidden-md-down">
                  <div className="card-block text-center"><div>
                    <h2>Iscriviti</h2>
                    <p>Per accedere all'area riservata del portale occorre registrarsi qui: </p>
                    <button type="button" className="btn btn-light active mt-1" onClick={() => this.props.history.push('/register')} >Registrati!</button>
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