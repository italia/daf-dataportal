import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Profile extends Component {

  render() {
    const { loggedUser, organizations } = this.props
    return (
    <div className="form-group row">
        <div className="col-md-6">
            <div className="card">
                <div className="card-block">
                    <div className="form-group row">
                        <label htmlFor="example-text-input" className="col-2 col-form-label">Nome Utente</label>
                        <div className="col-10">
                            <input className="form-control" type="text" value={loggedUser?loggedUser.uid:''} id="example-text-input"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="example-search-input" className="col-2 col-form-label">Email</label>
                        <div className="col-10">
                            <input className="form-control" type="search" value={loggedUser?loggedUser.mail:''} id="example-search-input"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="example-search-input" className="col-2 col-form-label">Nome completo</label>
                        <div className="col-10">
                            <input className="form-control" type="search" value={loggedUser?loggedUser.sn:''} id="example-search-input"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Organizzazioni</label>
                        {organizations.map(organization => 
                            <input key={organization.name} type="email" className="form-control" id="exampleInputEmail1" value={organization.name}/>
                        )
                        }
                    </div>
                    <div className="col-md-9 offset-md-9">
                    <button type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false">
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
  loggedUser: PropTypes.object,
  organizations: PropTypes.array
}

function mapStateToProps(state) {
    const organizations = state.userReducer['org'].organizations || { };
    const loggedUser = state.userReducer['obj'].loggedUser || { } 
    return { loggedUser, organizations }
}

export default connect(mapStateToProps)(Profile)
