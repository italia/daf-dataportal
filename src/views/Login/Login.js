import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAuthToken, loginAction, isValidToken, logout, getApplicationCookie, receiveLogin } from './../../actions.js'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import { setCookie, setSupersetCookie } from '../../utility'
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'
import { serviceurl } from '../../config/serviceurl'


function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

function postUserToSw(username){
  if('serviceWorker' in navigator){
    const msg = {
      'type': 'register_user',
      'username': username
    }
    navigator.serviceWorker.controller.postMessage(msg);
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
      uploading: false,
      token: ''
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
                      setSupersetCookie(json)
                    }
                  })
                  dispatch(getApplicationCookie('metabase'))
                  .then(json => {
                    if (json) {
                      setCookie(json)
                    }
                  })
                  /* dispatch(getApplicationCookie('jupyter'))
                  .then(json => {
                    if (json) {
                      setCookie(json)
                    }
                  }) */
                  /* dispatch(getApplicationCookie('grafana'))
                  .then(json => {
                    if (json) {
                      setCookie(json)
                    }
                  }) */
                  dispatch(loginAction())
                  .then(response => {
                    if (response.ok) {
                      response.json().then(json => {
                        dispatch(receiveLogin(json))
                        /* dispatch(addUserOrganization(json.uid)) */
                        this.setState({
                            authed: true,
                            loading: false
                          })
                        //postUserToSw(json.uid)
                        this.props.history.push('/private/home')
                  })
                  } else {
                    console.log('Login Action Response: ' + response.statusText)
                    this.setState({
                      authed: false,
                      loading: false
                    })
                  }
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
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
            localStorage.setItem('token', json);
            token = json;
            this.setState({token: json})
            dispatch(getApplicationCookie('superset'))
            .then(json => {
              if (json) {
                document.forms['supset_open'].submit()
                setSupersetCookie(json)
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
                                .then(response => {
                                  if (response.ok) {
                                    response.json().then(json => {

                                    localStorage.setItem('user', json.uid);
                                    let dataportalCookie = json.givenname +'/'+token;
                                    setCookie(JSON.parse('[{"name":"dataportal","value":"'+ dataportalCookie +'","path":"/"}]'))
                                    dispatch(receiveLogin(json))
                                    if(window.location.href.indexOf('?')>-1){
                                      let array = window.location.href.split('?')
                                      //this.props.history.push(array[1])
                                      if(array[1].indexOf('login')>-1){
                                        this.props.history.push('/private/home')  
                                      }else{
                                        window.location.replace(array[1]);
                                      }
                                    }else{
                                      this.props.history.push('/private/home')
                                    }
                                  })
                                }else{
                                  console.log('Login Action Response: ' + response.statusText)
                                  this.setState({
                                    loginMessage: 'Errore durante il login. Si prega di riprovare più tardi.',
                                    uploading: false
                                  })
                                }
                              })
                              //}
                            //})
                       // }
                      //})
                  }
                })
              }
            })
          })
        }else{
          console.log('Get Autentication Token Response: ' + response.statusText)
          response.json().then(json => {
            console.log('Get Autentication Token json: ' + JSON.stringify(json))
          })
          this.setState({
            loginMessage: 'Errore durante il login. Si prega di riprovare più tardi.',
            uploading: false
          })
        }
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
        <div className="row">
          <div className="col-md-8 mx-auto">
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
                    <form onSubmit={this.handleSubmit.bind(this)}>  
                      <div className="input-group mb-1" style={{position: 'initial'}}>
                        <span className="input-group-text">
                          <i className="icon-user"></i>
                        </span>
                        <input className="form-control" ref={(email) => this.email = email} placeholder="Email" 
                          style={{position: 'initial', zIndex: 'initial'}}/>
                      </div>
                    
                                          
                      <div className="input-group mb-2" style={{ position: 'initial' }}>
                        <span className="input-group-text">
                          <i className="icon-lock"></i>
                        </span>
                        <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw}
                          style={{ position: 'initial', zIndex: 'initial' }}/>
                      </div>
                      
                   
                      <div className="row">
                        <div className="col-6" style={{ position: 'initial' }}>
                          <input type="submit" className="btn btn-primary px-2" onClick={this.handleSubmit.bind(this)} value="Login"/>
                        </div>
                        <div className="col-6 text-right" style={{ position: 'initial' }}>
                        <button type="button" className="btn btn-link text-primary px-0" onClick={() => this.props.history.push('/requestreset')}>Password dimenticata?</button>
                        </div>
                      </div>
                    </form>
                    
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
        <form id="supset_open" target="open_supset" action={serviceurl.urlApiOpen +'/managed/bi-open-login'} method="POST">
          <input name="Authorization" type="text" value={"Bearer "+this.state.token} readOnly hidden/>
        </form>
        <iframe name="open_supset" hidden/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { loggedUser } = state.userReducer['obj'] || {}
  return { loggedUser }
}

export default connect(mapStateToProps)(Login)