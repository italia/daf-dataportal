import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Profile extends Component {

  render() {
    const { loggedUser } = this.props
    return (
    <div className="form-group row">
        <div className="col-md-6">
            <div className="card">
                <img className="card-img-top" src={'img/avatars/7.jpg'} alt="Card image cap"/>
                <div className="card-block">
                    <div className="form-group row">
                        <label htmlFor="example-text-input" className="col-2 col-form-label">Nome</label>
                        <div className="col-10">
                            <input className="form-control" type="text" value="" id="example-text-input"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="example-search-input" className="col-2 col-form-label">Cognome</label>
                        <div className="col-10">
                            <input className="form-control" type="search" value="" id="example-search-input"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="example-search-input" className="col-2 col-form-label">Email</label>
                        <div className="col-10">
                            <input className="form-control" type="search" value={loggedUser?loggedUser.email:''} id="example-search-input"/>
                        </div>
                    </div>
                    <div className="col-md-9 offset-md-9">
                    <button type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false" autocomplete="off">
                        Modifica
                    </button>
                    </div>
                </div>
            </div>
        </div>
     </div>
    )
  }
}

Profile.propTypes = {
  loggedUser: PropTypes.object
}

function mapStateToProps(state) {
  const { loggedUser } = state.userReducer['obj'] || { }
  return { loggedUser }
}

export default connect(mapStateToProps)(Profile)
