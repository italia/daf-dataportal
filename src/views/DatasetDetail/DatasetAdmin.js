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

function isOpenData(acl){
  var openData = false
  for(var i=0; i<acl.length; i++){
    if(acl[i].groupCn === "open_data_group"){
      openData=true
      break
    }
  }
  return openData
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
    this.publish = this.publish.bind(this)
    
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
        selectedWg: ""
    });
    let response = organizationService.groupInfo(newValue)
    let allWg = []
    let tmp = {}
    response.then((json) => {
      if(json.member_group){
        json.member_group.map(user => {
          tmp = {
            'value': user,
            'label': user
          }
          allWg.push(tmp);
        })
      }
      this.setState({
        workgroups: allWg,
      })
    })
  }

  updateValueWg(newValue) {
    if(newValue!==this.state.selectedWg){
      this.setState({
        selectedWg: newValue,
      })
    }else{
      this.setState({
        selectedWg: "",
      })
    }
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

  pubblicaDataset(){
    const { dispatch, query, dataset } = this.props
    dispatch(setDatasetACL(dataset.dcatapit.name,'open_data_group'))
    .then(json => {
      if(json.code!==undefined){
        toastr.error("Errore", json.message)
        console.error(json.message)
      }
      if(json.fields && json.fields==="ok"){
        toastr.success("Completato", "Il dataset è un Open data!")
        console.log(json.message)
        dispatch(datasetDetail(dataset.dcatapit.name, query, isPublic()))
        .catch(error => { console.log('Errore durante il caricamento del dataset ' + dataset.dcatapit.name); console.error(error); this.setState({ hidden: false }) })
      }
    })
  }

  publish(){
    const toastrConfirmOptions = {
      okText: 'Pubblica',
      cancelText: 'Annulla',
      onOk: () => this.pubblicaDataset(),
      onCancel: () => console.log('CANCEL: clicked'),
      component: () => (
        <div className="rrt-message">
          Stai rendendo il dataset un <b>Open data</b>, sei sicuro di questa scelta?
        </div>
      )
    };
    toastr.confirm(null, toastrConfirmOptions)
  }
  
  render(){
    const { acl, aggiungi, orgs, workgroups } = this.state
    const {dataset, loggedUser } = this.props
    var result = ""
    if(this.state.selectedOrg!=="" && this.state.selectedOrg!==null){
      if(this.state.selectedWg!=="" && this.state.selectedWg!==null){
        result = <h5>Stai condividendo il dataset con gli utenti del workgroup <b>{this.state.selectedWg}</b> dell'organizzazione <b>{this.state.selectedOrg}</b></h5>
      }else{
        result = <h5>Stai condividendo il dataset con gli utenti dell'organizzazione <b>{this.state.selectedOrg}</b></h5>
      }
    }
    return(
      <div hidden={!this.props.showAdmin} className="col-12 card-text">
        <Modal
          contentLabel="Add a User"
          className="Modal__Bootstrap modal-dialog modal-60"
          isOpen={aggiungi}>
          <ModalHeader>
              <ModalTitle>Condivisione</ModalTitle>
              <ModalClose onClick={this.toggleClose} />
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12 mb-3">
                <h5>Scegli un'organizzazione o un suo workgroup a cui condividere il dataset.</h5>
              </div>
              <div className="col-3">
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
                className="my-3" 
              />
              </div>
              {(this.state.selectedOrg!=="" && this.state.selectedOrg!==null) &&
              <div className="col">
                <div> 
                Workgroup
                {/* <Select
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
                  className="my-3" 
                /> */}
                <ul className="my-3 list-group">
                  {workgroups && workgroups.length > 0 && workgroups.map((wg, index) => {
                      return(
                        <li className={"list-group-item "+(this.state.selectedWg===wg.value?"list-group-item-primary":"")} key={index} onClick={this.updateValueWg.bind(this, wg.value)}>{wg.value}
                          {this.state.selectedWg===wg.value && <i className="fas fa-check fa-lg fa-pull-right" style={{lineHeight: "1"}}/>}
                        </li>
                      )
                    })
                  }
                  {
                    workgroups.length === 0 && <p>Nessun Workgroup disponibile per l'organizazzione selezionata</p>
                  }
                </ul>
                </div>
              </div>
              }
            </div>
            <div className="text-muted text-center">{result}</div>
          </ModalBody>
          <ModalFooter>
              <button className='btn btn-primary' onClick={this.setACL} disabled={(this.state.selectedOrg == '' || this.state.saving)}>
              {this.state.saving?<i className="fa fa-spinner fa-spin fa-lg" />:"Aggiungi permesso"}
              </button>
              <button className='btn btn-secondary' onClick={this.toggleClose}>
                  Annulla
              </button>
          </ModalFooter>
        </Modal>
        {/* <div className="col-12 text-muted text-justify mb-4">
          {ableToEdit( loggedUser, dataset) && <h5>Questa è la pagina di amministrazione del tuo dataset, puoi scegliere con chi condividerlo o rendelo un Open data aperto a tutti</h5>}
          {!ableToEdit( loggedUser, dataset) && <h5>In questa pagina puoi vedere chi ha accesso al dataset, per condividerlo con altri utenti chiedi l'assistenza al suo proprietario</h5>}
        </div> */}
        <div className="row mb-4">
          <div className="col text-muted">
              <i className="text-icon fa-pull-left fas fa-users fa-lg mr-3 mt-1" style={{ lineHeight: '1' }} /><h4><b>Condivisione</b></h4>
          </div>
          {ableToEdit( loggedUser, dataset) && !isOpenData(acl) && !this.state.isLoading && <div className="col ml-auto">
            <div className="btn-group float-right">
              <button className="btn btn-accento" onClick={this.publish} title="Pubblica come Open Data" disabled={isOpenData(acl)}>Pubblica come Open Data</button>
              <button className="btn btn-primary" onClick={this.toggle} title="Scegli con chi condividere" disabled={isOpenData(acl)}><i className="fa fa-plus fa-lg"/></button>
            </div>
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
                if(permission.groupCn==="open_data_group")
                  return(
                    <tr key={index}>
                      <td>Gruppo Open Data</td>
                      <td> </td>
                      <td> </td>
                      {ableToEdit(loggedUser, dataset) && <td><button className="float-right text-primary btn btn-link" onClick={this.deleteACL.bind(this, permission.groupCn)}><i className={this.state.deleting?"fa fa-spinner fa-spin fa-lg":"fas fa-times fa-lg"}/></button></td>}
                    </tr>
                  )
                else
                  return(
                    <tr className={isOpenData(acl)?'text-icon bg-light':''} key={index}>
                      <td>{permission.groupCn}</td>
                      <td>{permission.dafGroupType==="Organization"?"Organizzazione":permission.dafGroupType}</td>
                      <td>{permission.parentGroup}</td>
                      {ableToEdit(loggedUser, dataset) && <td>{!isOpenData(acl) && <button className="float-right text-primary btn btn-link" onClick={this.deleteACL.bind(this, permission.groupCn)}><i className={this.state.deleting?"fa fa-spinner fa-spin fa-lg":"fas fa-times fa-lg"}/></button>}</td>}
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