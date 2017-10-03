import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Profile extends Component {

  render() {
    const { loggedUser, organizations } = this.props
    return (
    <div className="form-group row">
        <div className="col-md-9">
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
                    <div className="form-group row">
                        <label htmlFor="example-search-input" className="col-2 col-form-label">Organizzazioni</label>
                        <div className="col-10">
                            <select className="form-control" id="organizations" size="5" multiple>
                                {organizations && organizations.length > 0 && organizations.map(organization => 
                                    <option value={organization.name} key={organization.name}>{organization.name}</option>
                                )
                                }
                            </select>
                        </div>
                        
                       
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
    const organizations = state.userReducer['org'] ? state.userReducer['org'].organizations || { } : { };
    const loggedUser = state.userReducer['obj'].loggedUser || { } 
    return { loggedUser, organizations }
}

export default connect(mapStateToProps)(Profile)
