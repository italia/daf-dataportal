import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import { toastr } from 'react-redux-toastr'
import { search, querySearch, getQueryResult, getDatasetCatalog } from '../../actions'
import { rulesConverter } from '../../utility'
import ReactTable from "react-table"
import Select from 'react-select'
import QueryBuilder from 'react-querybuilder';



class QueryBuild extends Component {
  constructor(props){
    super(props)

    this.state = {
      selected: [],
      groupedBy: '',
      modalOpen: false,
      conditions: {},
      query: {
        "select": [],
        // "where": [],
        "groupBy": [],
        // "having": [],
        // "limit": 25
      },
      joinOnFrom: '',
      joinOnTo: '',
      isQuery: false,
      privateWdg: '',
      selectedDataset: '',
      selectedOrg: '',
      organizations: [],
      fields: [],
      join: [],
      modalType: '',
      datasetFrom: undefined,
      datasetJoin: undefined
    }
    this.onChangeOrg = this.onChangeOrg.bind(this)
    this.onChangePvt = this.onChangePvt.bind(this)
    this.getDatasetDetail = this.getDatasetDetail.bind(this)
    this.select = this.select.bind(this)
    this.launchQuery = this.launchQuery.bind(this)
    this.renderOrgsSelect = this.renderOrgsSelect.bind(this)
    this.renderTable = this.renderTable.bind(this)
    this.renderSelectFields = this.renderSelectFields.bind(this)
    this.renderConditions = this.renderConditions.bind(this)
    this.renderONCondition = this.renderONCondition.bind(this)
    this.removeDatasetJoin = this.removeDatasetJoin.bind(this)
  }

  onChangePvt(pvt){
    const { dispatch } = this.props
    if(pvt==='0'){
      var status = ['2']
      let filter = {
        'text': "",
        'index': ['catalog_test'],
        'org': [],
        'theme':[],
        'date': "",
        'status': status,
        'order': "desc"
      }

      dispatch(querySearch(filter))
      .then(json => {
        var orgs = json.filter(res =>{
          return(res.type==='organization')
        })

        this.setState({
          privateWdg: pvt,
          organizations: Object.keys(JSON.parse(orgs[0].source))
        })
      })
    }else{
      this.setState({
        privateWdg: pvt
      })
    }
  }

  onChangeOrg(org){
    const { dispatch } = this.props
    const { privateWdg } = this.state

    this.setState({
      selectedOrg: org
    })

    var status = []
    if(privateWdg==='1')
      status = ['0','1']
    else
      status = ['2']

    let filter = {
      'text': "",
      'index': ['catalog_test'],
      'org': [org],
      'theme':[],
      'date': "",
      'status': status,
      'order': "desc"
    }

    dispatch(search('', filter, false, filter))

  }

  getDatasetDetail(selectedDataset){
    const { dispatch } = this.props
    const { modalType } = this.state

    this.setState({
      isQuery: false
    })

    dispatch(getDatasetCatalog(selectedDataset, false))
    .then(json=> {
      if(modalType==='JOIN'){
        this.setState({
          datasetJoin: json,
          isQuery: true
        })
      }else if(modalType==='FROM'){
        this.setState({
          datasetFrom: json,
          isQuery: true
        })
      }
    })
  }

  select(field){
    const { query } = this.state
    query.select = []
    field.map(campo => {
      query.select.push({"name": campo.value})
    })
    
    this.setState({
      selected: field
    })
  }

  launchQuery(){
    const { dispatch, onSubmit } = this.props
    const { query, conditions, datasetFrom, datasetJoin, joinOnFrom, joinOnTo } = this.state
    
    for(var k in query){
      if(query[k] === null || query[k].length===0){
        delete query[k]
      }
    }

    var where = rulesConverter(conditions.combinator, conditions.rules)
    if(Object.keys(where).length>0){
      query.where = where
    }

    var join = []
    var tmpjoin = { "inner": {}}
    if(datasetJoin){
      tmpjoin.inner.uri = datasetJoin.operational.logical_uri
      if(joinOnFrom === '' || joinOnTo === '' ){
        toastr.error('Impossibile eseguire la query', 'Specificare le condizioni di Join prima di riprovare')
      }else if(!query.select){
        toastr.error('Impossibile eseguire la query', 'Specificare i campi da selezionare prima di riprovare')
      }else{
        tmpjoin.inner.on = { "eq":{ "left": joinOnTo.value, "right": joinOnFrom.value}}
        join.push(tmpjoin)
        query.join = join

        console.log(query)
        dispatch(getQueryResult(datasetFrom.operational.logical_uri, query))
        if(onSubmit)
          onSubmit(query)
      }
    }else{
      console.log(query)

      dispatch(getQueryResult(datasetFrom.operational.logical_uri, query))
      if(onSubmit)
          onSubmit(query)
    }
  }

  renderTable(){
    const { queryResult } = this.props

    if(queryResult.length>0){
      var columns=[{
        Header: "Tabella risultante",
        columns: []
      }]
      Object.keys(queryResult[0]).map(elem=>{
        columns[0].columns.push({
          Header: elem,
          accessor: elem
        })
      })

      return <ReactTable 
              data={queryResult}
              columns={columns}
              defaultPageSize={25}
              className="-striped -highlight"
              />
    }
  }

  renderSelectFields(){
    const { datasetFrom, datasetJoin } = this.state
    
    var fields = []

    if(datasetJoin){
      datasetFrom && datasetFrom.dataschema.flatSchema.map(field => {
        fields.push({"value": "T1."+field.name, "label": datasetFrom.dcatapit.title+" - "+field.name})
      }) 
      datasetJoin.dataschema.flatSchema.map(field => {
        fields.push({"value": "JT1."+field.name, "label": datasetJoin.dcatapit.title+" - "+field.name})
      })
    }else{
      datasetFrom && datasetFrom.dataschema.flatSchema.map(field => {
        fields.push({"value": field.name, "label": field.name})
      }) 
    } 

    return <Select
      value={this.state.selected}
      onChange={this.select}
      options={fields}
      multi={true}
      className="form-control"
      disabled={!this.state.isQuery}
    />
  }



  renderConditions(){
    const { datasetFrom, datasetJoin } = this.state
        
    var fields = []

    if(datasetJoin){
      fields = []
      datasetFrom && datasetFrom.dataschema.flatSchema.map(field => {
        fields.push({"name": "T1."+field.name, "label": datasetFrom.dcatapit.title+" - "+field.name})
      }) 
      datasetJoin.dataschema.flatSchema.map(field => {
        fields.push({"name": "JT1."+field.name, "label": datasetJoin.dcatapit.title+" - "+field.name})
      }) 
    }else{
      datasetFrom && datasetFrom.dataschema.flatSchema.map(field => {
        fields.push({"name": field.name, "label": field.name})
      }) 
    } 

    var controlClassnames = {
      //queryBuilder:"form-group", // Root <div> element
  
      ruleGroup:"form-group col-md-12", // <div> containing the RuleGroup
      combinators:"form-control col-md-1", // <select> control for combinators
      addRule:"btn btn-primary mr-1 mt-1", // <button> to add a Rule
      addGroup:"btn btn-primary ml-1 mt-1", // <button> to add a RuleGroup
      removeGroup:"btn btn-primary mx-1", // <button> to remove a RuleGroup
  
      rule:"form-group row col-md-12", // <div> containing the Rule
      fields:"form-control col-md-2", // <select> control for fields
      operators:"form-control col-md-1", // <select> control for operators
      value:"form-control col-md-5", // <input> for the field value
      removeRule:"btn btn-primary mx-1" // <button> to remove a Rule
    }
    var operators = [    
        {name: '=', label: '='},
        {name: '!=', label: '!='},
        {name: '<', label: '<'},
        {name: '>', label: '>'},
        {name: '<=', label: '<='},
        {name: '>=', label: '>='},
    ]

    var combinators = [
      {name: 'and', label: 'AND'},
      {name: 'or', label: 'OR'},
      {name: 'not', label: 'NOT'},
  ]

    var translations = {
        fields: {
            title: "Campi",
        },
        operators: {
            title: "Operatori",
        },
        value: {
            title: "Valore",
        },
        removeRule: {
            label: "x",
            title: "Rimuovi condizione",
        },
        removeGroup: {
            label: "x",
            title: "Rimuovi gruppo di condizioni",
        },
        addRule: {
            label: "Nuova condizione",
            title: "Aggiungi condizione",
        },
        addGroup: {
            label: "Nuovo gruppo di condizioni",
            title: "Aggiungi gruppo di condizioni",
        },
        combinators: {
            title: "Operatore Logico",
        }
      }

    return(
      <QueryBuilder 
        controlClassnames={controlClassnames} 
        fields={fields} 
        operators={operators}
        translations={translations}
        combinators={combinators}
        onQueryChange={(query)=>{ 
                        console.log(query);
                        this.setState({conditions:query})
                      }}
      />
    )
  }

  renderONCondition(){
    const { datasetFrom, datasetJoin } = this.state
    
    var fromFields = []
    var toFields = []

    datasetFrom.dataschema.flatSchema.map(field => {
      fromFields.push({"value": "T1."+field.name, "label": datasetFrom.dcatapit.title+" - "+field.name})
    })

    datasetJoin.dataschema.flatSchema.map(field => {
      toFields.push({"value": "JT1."+field.name, "label": datasetJoin.dcatapit.title+" - "+field.name})
    })
    

    return(
      <div className="col-12 mt-2">
        <div className="form-group row">
          <Select
            value={this.state.joinOnFrom}
            onChange={(newValue) => this.setState({joinOnFrom:newValue})}
            options={fromFields}
            className="col-5 mx-auto"
          />
          <div className="align-self-center">
            =
          </div>
          <Select
            value={this.state.joinOnTo}
            onChange={(newValue) => this.setState({joinOnTo:newValue})}
            options={toFields}
            className="col-5 mx-auto"
          />
        </div>
      </div>)
  }

  removeDatasetJoin(){
    this.setState({
      modalType:'',
      isQuery: false,
      datasetJoin: undefined
    })

    this.setState({
      isQuery:true
    })
  }

  renderOrgsSelect(){
    return(
      <select className="form-control" value={this.state.selectedOrg} onChange={(e)=>{this.onChangeOrg(e.target.value)}} disabled={this.state.privateWdg==='' || this.state.organizations.length===0}>
        <option value=""></option>
        { this.state.organizations.length > 0 && this.state.organizations.map(org=>
          <option value={org} key={org}>{org}</option>
        )}
      </select>)
  }

  render(){
    const { loggedUser, isFetching, results, queryLoading, queryResult, className, hideTable } = this.props
    const { privateWdg, organizations, isQuery, modalOpen } = this.state

    var classes = className?className:"container"

    return(
      <div className={classes}>
        <Modal isOpen={modalOpen}>
          <ModalHeader>
            <ModalTitle>
              {this.state.modalType==='JOIN' && "Seleziona un dataset da mettere in JOIN"}
              {this.state.modalType==='FROM' && "Seleziona il dataset da cui iniziare la query"}
            </ModalTitle>
            <ModalClose onClick={()=>this.setState({modalOpen:false,modalType:'',privateWdg:'',selectedDataset:'',selectedOrg:''})}/>
          </ModalHeader>
          <ModalBody>
          <div className="form-group row">
            <label className="col-md-4 form-control-label">Privato</label>
            {loggedUser.organizations && loggedUser.organizations.length > 0 ?
              <div className="col-md-8">
                <select className="form-control" value={this.state.privateWdg} onChange={(e)=>{this.onChangePvt(e.target.value)}}>
                  <option value={''}></option>
                  <option value={'1'}>Sì</option>
                  <option value={'0'}>No</option>
                </select>
              </div>
              :
              <div className="col-md-8">
                <input className="form-control" disabled={true} defaultValue={"No"}/>
                <span>Puoi creare soltanto widget pubbliche in quanto non hai nessuna organizzazione associata</span>
              </div>
            }
          </div>
          <div className="form-group row">
            <label className="col-md-4 form-control-label">Organizzazione</label>
            <div className="col-md-8">
            {(privateWdg==='1'||privateWdg==='')  && <select className="form-control" value={this.state.selectedOrg} onChange={(e)=>{this.onChangeOrg(e.target.value)}} disabled={privateWdg===''}>
                <option value={''}></option>                  
                {loggedUser.organizations && loggedUser.organizations.length > 0 && loggedUser.organizations.map(organization => {
                  return (<option value={organization} key={organization}>{organization}</option>)
                  })
                }
              </select>}
              {privateWdg==='0' && this.renderOrgsSelect(results,isFetching)
                }
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-4 form-control-label">Nome Dataset</label>
            <div className="col-md-8">
              <select className="form-control" value={this.state.selectedDataset} disabled={(this.state.selectedOrg==='') || isFetching } onChange={(e)=>{this.setState({selectedDataset: e.target.value}); this.getDatasetDetail(e.target.value)}}>
                <option value=""  key='widgetDataset' defaultValue></option>
                {this.state.selectedOrg!=='' && results && results.length>4 && results.map(result => {
                  if(result.type=='catalog_test'){
                    var source = JSON.parse(result.source)
                    return (<option value={source.dcatapit.name} key={source.dcatapit.name}>{source.dcatapit.name}</option>)
                  }else if(result.type=='ext_opendata'){
                    var source = JSON.parse(result.source)
                    return (<option value={source.name} key={source.name}>{source.name}</option>)
                  }
                })
                }
              </select>
            </div>
          </div>
          </ModalBody>
          <ModalFooter>
              <button type="button" className="btn btn-primary px-2" onClick={()=>this.setState({modalOpen:false,modalType:'',privateWdg:'',selectedDataset:'',selectedOrg:''})}>
                Continua
              </button>
            </ModalFooter>
        </Modal>
        {isQuery&&<div className="card">
          <div className="card-body">
            <div className="card-title mb-3">
              <h3>Select</h3>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  {this.renderSelectFields()}
                </div>
              </div>
            </div>
          </div>
        </div>}
        <div className="card">
          <div className="card-body">
            <div className="card-title mb-3">
              <h3>From</h3>
            </div>
            <div className="row">
              {this.state.datasetFrom && 
              <div className="col-12">
                {this.state.datasetFrom.dcatapit.title}
              </div>
              }
              <div className="ml-auto">
                <button className="btn btn-link text-primary float-right" title={this.state.datasetFrom?"Modifica il dataset da cui selezionare":"Aggiungi un dataset da cui selezionare"} 
                  onClick={(e)=>{e.preventDefault(); this.setState({modalOpen:true,modalType:'FROM',privateWdg:'',selectedDataset:'',selectedOrg:''})}}>
                  {this.state.datasetFrom?<i className="far fa-edit fa-lg"/>:<i className="fas fa-plus-circle fa-lg"/>}
                </button>
              </div>
            </div>
          </div>
        </div>
        {isQuery&&<div className="card">
          <div className="card-body">
            <div className="card-title">
              <h3>Join</h3>
            </div>
            <div className="row">
              {this.state.datasetJoin && 
              <div className="col-12">
                {this.state.datasetJoin.dcatapit.title}
              </div>
              }
              {this.state.datasetJoin && <div className="col-12 text-center mt-2">
                ON
              </div>}
              {this.state.datasetJoin && this.renderONCondition()}
              <div className="ml-auto">
                {this.state.datasetJoin && <button className="btn btn-link text-danger" title="Rimuovi il dataset da cui fare la join"
                  onClick={this.removeDatasetJoin}>
                  <i className="fas fa-times-circle fa-lg"/>
                </button>}
                <button className="btn btn-link text-primary float-right" title={this.state.datasetJoin?"Modifica il dataset da cui fare la join":"Aggiungi un dataset con cui fare la join" }
                  onClick={(e)=>{e.preventDefault();this.setState({modalOpen:true,modalType:'JOIN',privateWdg:'',selectedDataset:'',selectedOrg:''})}}>
                  {this.state.datasetJoin?<i className="far fa-edit fa-lg"/>:<i className="fas fa-plus-circle fa-lg"/>}
                </button>
              </div>
            </div>
          </div>
        </div>}
        {isQuery && <div className="card">
          <div className="card-body">
            <div className="card-title">
              <h3>Where</h3>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  {this.renderConditions()}
                </div>
              </div>
            </div>
            <button className="btn btn-primary float-right" title="Lancia la Query" onClick={this.launchQuery}>Lancia Query</button>
          </div>
        </div>}
        {(isQuery && !hideTable) && <div className="card">
          <div className="card-body">
            <div className="card-title">
              <h3>Risultato</h3>
            </div>
            <div className="row">
              <div className="col-md-12">
              {
                queryLoading? <h1 className="text-center"><i className="fas fa-circle-notch fa-spin mr-2"/>Caricamento</h1> :(
                queryResult.length <= 0 ? <p>Nessun dato disponibile</p> : this.renderTable())
              }
              </div>
            </div>
          </div>
        </div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const loggedUser = state.userReducer['obj']?state.userReducer['obj'].loggedUser:{ }
  const { isFetching, results } = state.searchReducer['search'] || { isFetching: false, results: [] }
  const { queryLoading, queryResult } = state.queryReducer['query'] || { queryLoading: false, queryResult: [] }
  return { isFetching, loggedUser, results, queryLoading, queryResult }
}

export default connect(mapStateToProps)(QueryBuild)