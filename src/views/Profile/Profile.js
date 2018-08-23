import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ProfileService from "./services/ProfileService";

const profileService = new ProfileService()

class Profile extends Component {

/*     https://api.daf.teamdigitale.test/security-manager/v1/ipa/group/new_org
    member_group */
    constructor(props) {
        super(props);
    
        //init state
        this.state={
          workgroups: [] 
        };
        this.load(this.props.loggedUser);
    }

    load(loggedUser){
        loggedUser.organizations && loggedUser.organizations.map((org, index) => {
        let response = profileService.workgroups(org)
        response.then((json) => {
            let workgroups = ''
            json.member_group && json.member_group.length>0 && json.member_group.map((group, index) => {
                if(loggedUser.workgroups&&loggedUser.workgroups.indexOf(group)>-1)
                     workgroups = workgroups + ' ' + group
            }) 
            var newWorkgroups = this.state.workgroups.concat({'org':org, 'workgroups':workgroups})
            this.setState({
                workgroups: newWorkgroups
            });
        });
        }
        )
    }

  render() {
    const { loggedUser } = this.props
    const { workgroups } = this.state

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
                            <input className="form-control" type="search" value={loggedUser?loggedUser.sn + ' ' + loggedUser.givenname:''} id="example-search-input"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="example-search-input" className="col-2 col-form-label">Amministratore</label>
                        <div className="col-10">
                            <label htmlFor="example-search-input" className="col-2 col-form-label">{(loggedUser && loggedUser.roles && loggedUser.roles.indexOf('daf_sys_admin') > -1)?'Si':'No' }</label>
{/*                             <input className="form-control" type="search" value={(loggedUser && loggedUser.roles && loggedUser.roles.indexOf('daf_sys_admin') > -1)?'Si':'No' } id="example-search-input" />
 */}                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="example-search-input" className="col-2 col-form-label">Profilazione</label>
                        <div className="col-10">
{/*                             <select className="form-control" id="organizations" size="5" multiple>
                                {loggedUser.organizations && loggedUser.organizations.length > 0 && loggedUser.organizations.map(organization => 
                                    <option value={organization} key={organization}>{organization}</option>
                                )
                                }
                            </select> */}
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Organizzazione</th>
                                    <th scope="col">Ruolo</th>
                                    <th scope="col">Workgroup</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loggedUser && loggedUser.organizations && loggedUser.organizations.map((org, index) => { 
                                        var rolesArr = []
                                        var workgroupsArr = []
                                        return <tr key={index}>
                                                    <td>{org}</td>
                                                    {loggedUser && loggedUser.roles && loggedUser.roles.map((role, index2) => {
                                                        if(role.endsWith(org)){
                                                            rolesArr.indexOf(org) === -1
                                                                rolesArr.push(role.replace('_' + org,''))
                                                        }
                                                    })
                                                    }
                                                    <td>{rolesArr.toString()}</td>
                                                    {workgroups && workgroups.map((wg, index3) => {
                                                        if(wg.org===org){
                                                            workgroupsArr.indexOf(wg.workgroups) === -1
                                                                workgroupsArr.push(wg.workgroups)
                                                        }
                                                    })
                                                    }
                                                    <td>{workgroupsArr.toString()}</td>
                                            </tr>
                                        }
                                    )}
                                </tbody>
                                </table>


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
    const loggedUser = state.userReducer['obj'].loggedUser || { } 
    return { loggedUser }
}

export default connect(mapStateToProps)(Profile)
