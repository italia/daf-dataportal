import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getDatasetACL,
  setDatasetACL,
  deleteDatasetACL,
  groupsInfo,
  datasetDetail
} from '../../actions.js'
import { isPublic } from '../../utility'
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

function ableToEdit(user, dataset){
  var able = false
  if(user.uid === dataset.operational.group_own){
    able = true
  }/* else if((user.roles.indexOf('daf_adm_'+dataset.dcatapit.owner_org)!==-1) || (user.roles.indexOf('daf_edt_'+dataset.dcatapit.owner_org)!==-1)){
    able = true
  } */
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
      deleting: false,
      isLoading: true
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
          message: json.message,
          isLoading: false
        })
      }else if(json.code===undefined){
        var acls = []
        json.map((permission)=>{
          acls.push(permission.groupName)
        })
        dispatch(groupsInfo(acls))
        .then(json=>{
          this.setState({
            acl: json,
            isLoading: false
          })
        })
      }
    })
  }

  toggle(){
    const { loggedUser, dataset } = this.props
    this.setState({
      aggiungi: !this.state.aggiungi,
      loading: true
    })
    let allOrgs = []
    let tmp = {}
    if(loggedUser.roles.indexOf("daf_adm_"+dataset.dcatapit.owner_org)>-1){
      const response = organizationService.organizations()
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
    }else{
      tmp = {
        'value': dataset.dcatapit.owner_org,
        'label': dataset.dcatapit.owner_org
      }

      allOrgs.push(tmp)

      this.setState({
        loading: false,
        orgs: allOrgs
      })
    }
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
      selectedWg: '',
      workgroups: [],
      orgs: []
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
        saving:false,
        isLoading: true
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
            message: risp.message,
            isLoading: false
          })
        }else if(risp.code===undefined){
          var acls = []

          risp.map((permission)=>{
            acls.push(permission.groupName)
          })
          dispatch(groupsInfo(acls))
          .then(json=>{
            this.setState({
              acl: json,
              aggiungi: false,
              isLoading: false,
              selectedOrg: '',
              selectedWg: '',
              message: ''
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
        deleting:false,
        isLoading: true
      })
      if(json.code!==undefined){
        toastr.error("Errore", json.message)
        console.error(json.message)
      }
      if(json.fields && json.fields==="ok"){
        toastr.success("Completato", "Permesso rimosso con successo")
        console.log(json.message)
      }
      if(groupname==='open_data_group'){
        dispatch(datasetDetail(dataset.dcatapit.name, '', isPublic()))
      }else{
        dispatch(getDatasetACL(dataset.dcatapit.name))
        .then(risp => {
          if(risp.code!==undefined){
            this.setState({
              message: risp.message,
              isLoading: false
            })
          }else if(risp.code===undefined){
            var acls = []
            if(risp.length>0){
              risp.map((permission)=>{
                acls.push(permission.groupName)
              })
              dispatch(groupsInfo(acls))
              .then(json=>{
                this.setState({
                  acl: json,
                  aggiungi: false,
                  isLoading: false,
                  selectedOrg: '',
                  selectedWg: '',
                  message: ''
                })
              })
            }else{
              this.setState({
                message: "Nessun permesso disponibile",
                acl: risp,
                aggiungi: false,
                isLoading: false,
                selectedOrg: '',
                selectedWg: '',
              })
            }
          }
        })
      }
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
          {ableToEdit( loggedUser, dataset) && <div className="col ml-auto mb-4">
              <button className="float-right btn btn-primary" onClick={this.toggle}><i className="fa fa-plus fa-lg"/></button>
          </div>}
        </div>
        {this.state.isLoading?<h1 className="text-center fixed-middle"><i className="fas fa-circle-notch fa-spin mr-2"/>Caricamento</h1> :<div className="col-12">
          {this.state.message}
          {acl.length>0 &&
          <table className="table table-striped">
            <thead>
                <tr>
                  <th scope="col">Gruppo</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Appartenente a</th>
                  {ableToEdit(loggedUser, dataset) && <th scope="col"> </th>}
                </tr>
            </thead>
            <tbody>
              {acl.map((permission,index) => {
                return(
                  <tr key={index}>
                    <td>{permission.groupCn}</td>
                    <td>{permission.dafGroupType==="Organization"?"Organizzazione":permission.dafGroupType}</td>
                    <td>{permission.parentGroup}</td>
                    {ableToEdit(loggedUser, dataset) && <td><button className="float-right text-primary btn btn-link" onClick={this.deleteACL.bind(this, permission.groupCn)}><i className={this.state.deleting?"fa fa-spinner fa-spin fa-lg":"fas fa-times fa-lg"}/></button></td>}
                  </tr>
                )
              })
              }
            </tbody>
          </table>}
        </div>}
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