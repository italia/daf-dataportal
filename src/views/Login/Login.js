import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAuthToken, loginAction, addUserOrganization, loadDatasets, setApplicationCookie, receiveLogin } from './../../actions.js'
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



  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch, selectDataset } = this.props
    dispatch(getAuthToken(this.email.value, this.pw.value))
      .then(json => {
        localStorage.setItem('token', json);
        dispatch(setApplicationCookie('superset'))
          .then(json => {
            if (json) { //&& json.result) {
              document.cookie = json.result + "; path=/; domain=" + serviceurl.domain;
              dispatch(setApplicationCookie('metabase'))
                .then(json => {
                  if (json ) { //&& json.result) {
                    document.cookie = json.result + "; path=/; domain=" + serviceurl.domain;
                   // dispatch(setApplicationCookie('jupyter'))
                   // .then(json => {
                      if (json){ //&& json.result) {
                        document.cookie = json.result + "; path=/hub/; domain=" + serviceurl.domain;
                        dispatch(loginAction())
                        .then(json => {
                          dispatch(receiveLogin(json))
                          dispatch(addUserOrganization(json.uid))
                          this.props.history.push('/home')
                        })
                      }
                   // })
                  }
                })
            }
          })
      })
      .catch((error) => {
        this.setState(setErrorMsg('Invalid email/password.'))
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
                    <input className="form-control" ref={(email) => this.email = email} placeholder="Email" />
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