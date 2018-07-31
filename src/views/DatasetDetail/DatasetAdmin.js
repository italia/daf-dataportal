import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getDatasetACL,
  setDatasetACL,
  deleteDatasetACL
} from '../../actions.js'
import { toastr } from 'react-redux-toastr'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter 
} from 'react-modal-bootstrap';
import Select from 'react-select'

import OrganizationService from '../Settings/services/OrganizationService.js'

const organizationService = new OrganizationService()

function ableToEdit(acl, user, dataset){
  var able = false
  if(user.uid === dataset.operational.group_own){
    able = true
  }else{
    for(var i=0; i<acl.length; i++){
      if(user.organizations.indexOf(acl[i].groupName)!==-1){
        able = true
        break
      }else{
        for(var j=0; j<user.workgroups.length; j++ ){
          if(user.workgroups[j].indexOf(acl[i].groupName)!==-1){
            able = true
            break
          }
        }
      }
    }
  }

  return able
}

class DatasetAdmin extends Component{
  constructor(props){
    super(props)
    this.state={
      message: '',
      acl: [],
      aggiungi: false,
      orgs : [],
      selectedOrg: '',
      workgroups: [],
      selectedWg: '',
      saving: false,
      deleting: false
    }

    this.toggle = this.toggle.bind(this)
    this.toggleClose = this.toggleClose.bind(this)
    this.updateValueOrg = this.updateValueOrg.bind(this)
    this.updateValueWg = this.updateValueWg.bind(this)
    this.setACL = this.setACL.bind(this)
    this.deleteACL = this.deleteACL.bind(this)
    
  }

  componentDidMount(){
    const { dispatch, dataset } = this.props
    dispatch(getDatasetACL(dataset.dcatapit.name))
    .then(json => {
      console.log(json)
      if(json.code!==undefined){
        this.setState({
          message: json.message
        })
      }else if(json.code===undefined){
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
      }
    })
  }

  toggle(){
    this.setState({
      aggiungi: !this.state.aggiungi,
      loading: true
    })
    const response = organizationService.organizations()
    let allOrgs = []
    let tmp = {}
    response.then(json => {
        json.elem.map(org=>{
          tmp = {
            'value': org,
            'label': org
          }
          allOrgs.push(tmp)
        })
        this.setState({
          loading: false,
          orgs: allOrgs
        })
    })
  }

  updateValueOrg(newValue) {
    this.setState({
        selectedOrg: newValue,
    });
    let response = organizationService.groupInfo(newValue)
    let allWg = []
    let tmp = {}
    response.then((json) => {
      json.member_group.map(user => {
          tmp = {
              'value': user,
              'label': user
          }
          allWg.push(tmp);
      })
      this.setState({
          workgroups: allWg,
      })
    })
  }

  updateValueWg(newValue) {
    this.setState({
        selectedWg: newValue,
    });
  }

  toggleClose(){
    this.setState({
      aggiungi: false,
      selectedOrg: '',
      selectedWg: ''
    })
  }

  setACL(){
    const { dataset, dispatch } = this.props
    const { selectedOrg, selectedWg } = this.state
    this.setState({
      saving: true
    })
    dispatch(setDatasetACL(dataset.dcatapit.name,(selectedWg!==''?selectedWg:selectedOrg)))
    .then(json=>{
      this.setState({
        saving:false
      })
      if(json.code!==undefined){
        toastr.error("Errore", json.message)
        console.error(json.message)
      }
      if(json.fields && json.fields==="ok"){
        toastr.success("Completato", "Permesso aggiunto con successo")
        console.log(json.message)
      }
      dispatch(getDatasetACL(dataset.dcatapit.name))
      .then(risp => {
        if(risp.code!==undefined){
          this.setState({
            message: risp.message
          })
        }else if(risp.code===undefined){
          var acls = []
          var acl = {"groupName": "", "groupType": "", "groupParent": ""}
          risp.map((permission)=>{
            let response = organizationService.groupInfo(permission.groupName)
            response.then(org =>{
              var tipo = ""
              var parent = ""
              if(org.memberof_group && org.memberof_group[0]===('daf_workgroups')){
                tipo = "Working group"
                parent = org.memberof_group[1]
              }else if(org.memberof_group && org.memberof_group[0]===('daf_organizations')){
                tipo = "Organizzazione"
              }
              acl.groupName = permission.groupName
              acl.groupType = tipo
              acl.groupParent = parent
  
              acls.push(acl)
              this.setState({
                acl: acls,
                aggiungi: false,
                selectedOrg: '',
                selectedWg: '',
                message: ''
              })
            })
          })
        }
      })
    })
  }

  deleteACL(groupname){
    const { dispatch, dataset } = this.props
    this.setState({
      deleting: true
    })
    dispatch(deleteDatasetACL(dataset.dcatapit.name, groupname))
    .then(json=>{
      this.setState({
        deleting:false
      })
      if(json.code!==undefined){
        toastr.error("Errore", json.message)
        console.error(json.message)
      }
      if(json.fields && json.fields==="ok"){
        toastr.success("Completato", "Permesso rimosso con successo")
        console.log(json.message)
      }
      dispatch(getDatasetACL(dataset.dcatapit.name))
      .then(risp => {
        if(risp.code!==undefined){
          this.setState({
            message: risp.message
          })
        }else if(risp.code===undefined){
          var acls = []
          var acl = {"groupName": "", "groupType": "", "groupParent": ""}
          if(risp.length>0){
            risp.map((permission)=>{
              let response = organizationService.groupInfo(permission.groupName)
              response.then(org =>{
                var tipo = ""
                var parent = ""
                if(org.memberof_group && org.memberof_group[0]===('daf_workgroups')){
                  tipo = "Working group"
                  parent = org.memberof_group[1]
                }else if(org.memberof_group && org.memberof_group[0]===('daf_organizations')){
                  tipo = "Organizzazione"
                }
                acl.groupName = permission.groupName
                acl.groupType = tipo
                acl.groupParent = parent
    
                acls.push(acl)
              })
            })
          }
          this.setState({
            acl: acls,
            message: "Nessun permesso disponibile"
          })
        }
      })
    })
  }
  
  render(){
    const { acl, aggiungi, orgs, workgroups } = this.state
    const {dataset, loggedUser } = this.props

    return(
      <div hidden={!this.props.showAdmin} className="col-12 card-text">
        <Modal
          contentLabel="Add a User"
          className="Modal__Bootstrap modal-dialog modal-60"
          isOpen={aggiungi}>
          <ModalHeader>
              <ModalTitle>Aggiungi permesso</ModalTitle>
              <ModalClose onClick={this.toggleClose} />
          </ModalHeader>
          <ModalBody>
            Organizazione
            <Select
              id="state-select"
              onBlurResetsInput={false}
              onSelectResetsInput={false}
              options={orgs}
              simpleValue
              clearable={true}
              name="selected-user"
              value={this.state.selectedOrg}
              onChange={this.updateValueOrg}
              rtl={false}
              searchable={true}
              className="mb-3" 
            />
            {this.state.selectedOrg!=="" &&
             <div> 
            Workgroup
            <Select
              id="state-select"
              onBlurResetsInput={false}
              onSelectResetsInput={false}
              options={workgroups}
              simpleValue
              clearable={true}
              name="selected-user"
              value={this.state.selectedWg}
              onChange={this.updateValueWg}
              rtl={false}
              searchable={true}
              className="mb-3" 
            />
            </div>
            }
          </ModalBody>
          <ModalFooter>
              <button className='btn btn-primary' onClick={this.setACL} disabled={(this.state.selectedOrg.length===0 || this.state.saving)}>
              {this.state.saving?<i className="fa fa-spinner fa-spin fa-lg" />:"Aggiungi permesso"}
              </button>
              <button className='btn btn-secondary' onClick={this.toggleClose}>
                  Annulla
              </button>
          </ModalFooter>
        </Modal>
        <div className="row mb-4">
          <div className="col text-muted">
              <i className="text-icon fa-pull-left fas fa-unlock fa-lg mr-3 mt-1" style={{ lineHeight: '1' }} /><h4 className="mb-3"><b>Permessi</b></h4>
          </div>
          {ableToEdit(acl, loggedUser, dataset) && <div className="col ml-auto mb-4">
              <button className="float-right btn btn-primary" onClick={this.toggle}><i className="fa fa-plus fa-lg"/></button>
          </div>}
        </div>
        <div className="col-12">
          {this.state.message}
          {acl.length>0 &&
          <table className="table table-striped">
            <thead>
                <tr>
                  <th scope="col">Gruppo</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Appartenente a</th>
                  {ableToEdit(acl, loggedUser, dataset) && <th scope="col"> </th>}
                </tr>
            </thead>
            <tbody>
              {acl.map((permission,index) => {
                return(
                  <tr key={index}>
                    <td>{permission.groupName}</td>
                    <td>{permission.groupType}</td>
                    <td>{permission.groupParent}</td>
                    {ableToEdit(acl, loggedUser, dataset) && <td><button className="float-right text-primary btn btn-link" onClick={this.deleteACL.bind(this, permission.groupName)}><i className={this.state.deleting?"fa fa-spinner fa-spin fa-lg":"fas fa-times fa-lg"}/></button></td>}
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
  const { loggedUser } = state.userReducer['obj'] || { }
  return { dataset, loggedUser }
}

export default connect(mapStateToProps)(DatasetAdmin)