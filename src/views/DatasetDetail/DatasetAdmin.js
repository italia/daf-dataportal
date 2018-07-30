import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getDatasetACL
} from '../../actions.js'

import OrganizationService from '../Settings/services/OrganizationService.js'

const organizationService = new OrganizationService()


class DatasetAdmin extends Component{
  constructor(props){
    super(props)
    this.state={
      message: '',
      acl: []
    }
  }

  componentDidMount(){
    const { dispatch, dataset } = this.props
    dispatch(getDatasetACL(dataset.dcatapit.name))
    .then(json => {
      console.log(json)
      if(json.code === 1){
        this.setState({
          message: json.message
        })
      }else if(!json.code){
        var acls = []
        var acl = {"groupName": "", "groupType": "", "groupParent": ""}
        json.map((permission)=>{
          let response = organizationService.groupInfo(permission.groupName)
          response.then(json =>{
            var tipo = ""
            var parent = ""
            if(json.memberof_group && json.memberof_group[0]===('daf_workgroups')){
              tipo = "Working group"
              parent = json.memberof_group[1]
            }else if(json.memberof_group && json.memberof_group[0]===('daf_organizations')){
              tipo = "Organizzazione"
            }
            acl.groupName = permission.groupName
            acl.groupType = tipo
            acl.groupParent = parent

            acls.push(acl)
            this.setState({
              acl: acls
            })
          })
        })
/*         this.setState({
          acl:json
        }) */
      }
    })
  }

  render(){
    const { acl } = this.state
    return(
      <div hidden={!this.props.showAdmin} className="col-12 card-text">
        <div className="col-12">
          <div className="row text-muted">
              <i className="text-icon fas fa-unlock fa-lg mr-3 mt-1" style={{ lineHeight: '1' }} /><h4 className="mb-3"><b>Permessi</b></h4>
          </div>
        </div>
        <div className="col-12">
          {this.state.message}
          {acl.length>0 &&
          <table className="table table-striped">
            <thead>
                <tr>
                  <th scope="col">Gruppo</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Organizzazione</th>
                </tr>
            </thead>
            <tbody>
              {acl.map((permission,index) => {
                return(
                  <tr key={index}>
                    <td>{permission.groupName}</td>
                    <td>{permission.groupType}</td>
                    <td>{permission.groupParent}</td>
                  </tr>
                )
              })
              }
            </tbody>
          </table>}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { dataset } = state.datasetReducer['obj'] || { isFetching: true, items: [], ope: '' }
  return { dataset }
}

export default connect(mapStateToProps)(DatasetAdmin)