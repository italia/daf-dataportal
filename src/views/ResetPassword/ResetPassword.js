import React, { Component } from 'react'
import { connect } from 'react-redux'
import { resetPwd } from './../../actions.js'
import PropTypes from 'prop-types'

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

class RequestReset extends Component {
  constructor(props) {
      super(props);
      this.props = props;
      this.state = {
        messaggio: null,
        error: null
      }
      
  }
  
  handleSubmit = (e) => {
      e.preventDefault()
      this.setState({loading:true})
      const { dispatch, selectDataset } = this.props
      dispatch(resetPwd(this.email.value))
      .then(()=>{
        this.setState({loading: false})
      })
  }

  handleRedirect = (e) => {
    this.props.history.push('/login')
  }

  render() {
    const { messaggio, error } = this.props
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mx-2">
              <div className="card-block p-2">
                <h1>Hai dimenticato la password?</h1>
                <p className="text-muted">Reset della password</p>
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
                <div className="input-group mb-1">
                  <span className="input-group-text"><i className="fa fa-envelope-o"/></span>
                  <input type="text" className="form-control" ref={(email) => this.email = email} placeholder="Inserisci la tua mail registrata" />
                </div>
{/*                 <div className="input-group mb-1">
                  <div className="g-recaptcha" data-sitekey="6LcUNjQUAAAAAG-jQyivW5xijDykXzslKqL2PMLr"></div>
                </div> */}
                <button type="button" className="btn btn-block btn-secondary" onClick={this.handleRedirect.bind(this)}>Torna al login</button>
                <button type="button" className="btn btn-block btn-primary" onClick={this.handleSubmit.bind(this)}>{this.state.loading?<i className="fa fa-spin fa-spinner fa-lg"/>:'Reset Password'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

RequestReset.propTypes = {
  messaggio: PropTypes.string,
  error: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return { messaggio: state.userReducer.msg,
           error: state.userReducer.error }
}

export default connect(mapStateToProps)(RequestReset)