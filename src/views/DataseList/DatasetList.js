import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { search } from '../../actions'
import { serviceurl } from '../../config/serviceurl'
import { boldMyWords } from '../../utility'
import Select from 'react-select'
import { decodeTheme } from '../../utility' 
import themes from '../../utility' 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';


const tipi = [{ 'name': 'Dataset'},{ 'name': 'Dashboard'},{ 'name': 'Storie'}]
const visibilita = [{ 'name': 'Open data'},{ 'name': 'Privato'},{ 'name': 'Organizzazione'}]

class DatasetList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order_filter: props.history.location.state?props.history.location.state.order_filter:'metadata_modified%20desc',
            category_filter: props.history.location.state && props.history.location.state.category_filter,
            group_filter: props.history.location.state && props.history.location.state.group_filter,
            organization_filter: props.history.location.state && props.history.location.state.organization_filter,
            query: props.history.location.state && props.history.location.state.query,
            organizations:[],
            filter:{'da':'',
                    'a':'',
                    'elements': []},
            showDivTipo: false,
            showDivData: false,
            showDivCategoria: false,
            showDivOrganizzazione: false,
            showDivVisibilita: false,
            startDate: moment(),
            endData: moment()
        }

        this.load();
        this.searchAll = this.searchAll.bind(this)  
        this.search = this.search.bind(this)  
        this.addFilter = this.addFilter.bind(this)  
        this.removeFilter = this.removeFilter.bind(this)  
        this.handleLoadDatasetDetailClick = this.handleLoadDatasetDetailClick.bind(this)
        this.handleToggleClickTipo = this.handleToggleClickTipo.bind(this)
        this.handleToggleClickData = this.handleToggleClickData.bind(this)
        this.handleToggleClickCategoria = this.handleToggleClickCategoria.bind(this)
        this.handleToggleClickOrganizzazione = this.handleToggleClickOrganizzazione.bind(this)
        this.handleToggleClickVisibilita = this.handleToggleClickVisibilita.bind(this)
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    }

    load() {
        let response = this.organizations();
        response.then((list) => {
          this.setState({
            organizations: list
          })
        })
      }

      async organizations() {
        var url = serviceurl.apiURLCatalog + '/ckan/organizations'
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        return response.json()
      }
    componentDidMount() {
        const queryString = require('query-string');
        const query = queryString.parse(this.props.location.search).q  
       // this.searchAll(query)
    }

    searchAll(query){
        const { dispatch } = this.props
        dispatch(search(query, undefined))
    }

    search(){
        const { dispatch } = this.props
        const queryString = require('query-string');
        const query = queryString.parse(this.props.location.search).q  
        dispatch(search(query, this.state.filter))
    }

    handleLoadDatasetDetailClick(name, e) {
        e.preventDefault()
        this.setState({
          edit: false
        })
        const { dispatch, query } = this.props
        const { order_filter, category_filter, organization_filter, group_filter } = this.state
        this.props.history.push({
          pathname: '/dataset/'+name,
          state: {'query': query,
                  'category_filter': category_filter,
                  'organization_filter': organization_filter,
                  'order_filter': order_filter,
                  'group_filter': group_filter
          }
        })
      }

      handleToggleClickTipo(){
        this.setState(prevState => ({
            showDivTipo: !prevState.showDivTipo,
            showDivData: false,
            showDivCategoria: false,
            showDivOrganizzazione: false,
            showDivVisibilita: false
          }));
      }

      handleToggleClickData(){
        this.setState(prevState => ({
            showDivData: !prevState.showDivData,
            showDivTipo: false,
            showDivCategoria: false,
            showDivOrganizzazione: false,
            showDivVisibilita: false
          }));
      }

      handleToggleClickCategoria(){
        this.setState(prevState => ({
            showDivCategoria: !prevState.showDivCategoria,
            showDivData: false,
            showDivTipo: false,
            showDivOrganizzazione: false,
            showDivVisibilita: false
          }));
      }

      handleToggleClickOrganizzazione(){
        this.setState(prevState => ({
            showDivOrganizzazione: !prevState.showDivOrganizzazione,
            showDivData: false,
            showDivCategoria: false,
            showDivTipo: false,
            showDivVisibilita: false
          }));
      }

      handleToggleClickVisibilita(){
        this.setState(prevState => ({
            showDivVisibilita: !prevState.showDivVisibilita,
            showDivData: false,
            showDivCategoria: false,
            showDivOrganizzazione: false,
            showDivTipo: false
          }));
      }

      handleChangeStartDate(date) {
        let newFilter = Object.assign({}, this.state.filter); 
        newFilter.da = date
        this.setState({
          startDate: date,
          filter: newFilter
        });
      }
      
      handleChangeEndDate(date) {
        let newFilter = Object.assign({}, this.state.filter); 
        newFilter.a = date
        this.setState({
          startDate: date,
          filter: newFilter
        });
      }
      
      componentWillReceiveProps(nextProps){
        const queryString = require('query-string');
        const query = queryString.parse(nextProps.location.search).q 
        this.setState({query: query})
      }

      //Filter Type: 0-tip, 1-cat, 2-vis, 3-org
      addFilter(type, value){
        let newElement = {'type': type, 'value': value}
        if(!this.isInArray(this.state.filter.elements, newElement)){
            let newFilter = Object.assign({}, this.state.filter);    
            newFilter.elements = this.state.filter.elements.concat(newElement)                      
            this.setState({ 
                filter: newFilter
            })
        }
      }

      isInArray(array, element){
        var found = false;
        for(var i = 0; i < array.length; i++) {
            if (array[i].type == element.type && array[i].value == element.value) {
                found = true;
                break;
            }
        }
        return found
      }

      removeFilter(index) {
        let newFilter = Object.assign({}, this.state.filter); 
        newFilter.elements = this.state.filter.elements.filter((_, i) => i !== 0)
        this.setState({ 
            filter: newFilter
        })
      }

      removeFilterDate(value) {
        let newFilter = Object.assign({}, this.state.filter);
        if(value==='a') 
            newFilter.a = ''
        if(value==='da') 
            newFilter.da = ''
        this.setState({ 
            filter: newFilter
        })
      }
 
    render() {
        const { results, isFetching } = this.props
        return (
            
            <div className="container body">
                <div className="main_container">
                    <div className="top_nav">
                        <div className="nav_menu">
                            <nav className="dashboardHeader">
                                <h2><i className="fa fa-search"></i>Hai cercato {this.state.query}</h2>
                            </nav>
                            <nav className="dashboardHeader">
                                <div className="row" >
                                    <div className="col-md-10" >
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="btn btn-light" onClick={this.handleToggleClickTipo}>Tipo<i className={"fa fa-lg " + (this.state.showDivTipo ? "fa-angle-up" : "fa-angle-down")}></i></button>
                                            <button type="button" className="btn btn-light" onClick={this.handleToggleClickData}>Data<i className={"fa fa-lg " + (this.state.showDivData ? "fa-angle-up" : "fa-angle-down")}></i></button>
                                            <button type="button" className="btn btn-light" onClick={this.handleToggleClickCategoria}>Categoria<i className={"fa fa-lg " + (this.state.showDivCategoria ? "fa-angle-up" : "fa-angle-down")}></i></button>
                                            <button type="button" className="btn btn-light" onClick={this.handleToggleClickOrganizzazione}>Organizzazione<i className={"fa fa-lg " + (this.state.showDivOrganizzazione ? "fa-angle-up" : "fa-angle-down")}></i></button>
                                            <button type="button" className="btn btn-light" onClick={this.handleToggleClickVisibilita}>Visibilità<i className={"fa fa-lg " + (this.state.showDivVisibilita ? "fa-angle-up" : "fa-angle-down")}></i></button>
                                        </div>
                                    </div>
                                    <div className="col-md-2" >
                                        <select className="form-control" id="ordinamento" aria-required="true" onChange={this.handleChange} value={this.state.order_filter}>
                                            <option value="metadata_modified%20desc">Data crescente</option>
                                            <option value="metadata_modified%20asc">Data decrescente</option>
                                            <option value="relevance%20asc">Per rilevanza</option>
                                        </select> 
                                    </div>
                                </div>
                            </nav>
                            <nav className="dashboardHeader">
                            {this.state.showDivTipo && tipi.map((tipo, index) => {
                                return(<button type="button" onClick={this.addFilter.bind(this, 0, tipo.name)} key={index} className={!this.isInArray(this.state.filter, {'type': 0, 'value': tipo.name})?"btn btn-light":"btn btn-secondary"}>{tipo.name}<span className="badge badge-pill badge-secondary">1</span></button>)
                                }
                            )}
                            {this.state.showDivCategoria && themes.map((theme, index) => {
                                return(<button type="button" onClick={this.addFilter.bind(this, 1, theme.name)} key={index} className={!this.isInArray(this.state.filter, {'type': 1, 'value': theme.name})?"btn btn-light":"btn btn-secondary"}>{theme.name}<span className="badge badge-pill badge-secondary">1</span></button>)
                                }
                            )}
                            {this.state.showDivVisibilita && visibilita.map((vis, index) => {
                                return(<button type="button" onClick={this.addFilter.bind(this, 2, vis.name)} key={index} className={!this.isInArray(this.state.filter, {'type': 2, 'value': vis.name})?"btn btn-light":"btn btn-secondary"}>{vis.name}<span className="badge badge-pill badge-secondary">1</span></button>)
                                }
                            )}
                            {this.state.showDivData && 
                                 <div className="row" >
                                    <div className="col-md-3" >
                                        <div>Dal:
                                        <DatePicker
                                            selected={this.state.startDate}
                                            onChange={this.handleChangeStartDate}
                                            locale='it-it'
                                            dateFormat='DD/MM/YYYY'
                                        />
                                        </div>
                                    </div>
                                    <div className="col-md-9" >
                                        <div>Al:
                                        <DatePicker
                                            selected={this.state.endData}
                                            onChange={this.handleChangeEndDate}
                                            locale='it-it'
                                            dateFormat='DD/MM/YYYY'
                                        />
                                        </div>
                                    </div>
                                </div>
                            }
                            {this.state.showDivOrganizzazione && 
                                <div className="row">
                                    {/* <div className="col-4">
                                        <Select
                                        id="state-select"
                                        onBlurResetsInput={false}
                                        onSelectResetsInput={false}
                                        options={this.state.organization}
                                        simpleValue
                                        clearable={true}
                                        name="selected-user"
                                        //value={this.state.user}
                                        //onChange={this.updateValue}
                                        rtl={false}
                                        searchable={true}
                                        />
                                    </div> */}
                                    <div className="col-12">
                                            {this.state.organizations.length>0 && this.state.organizations.map((org, index) => {
                                                    return(<button type="button" onClick={this.addFilter.bind(this, 3, org)} key={index} className={!this.isInArray(this.state.filter, {'type': 3, 'value': org})?"btn btn-light":"btn btn-secondary"}>{org}<span className="badge badge-pill badge-secondary">1</span></button>)
                                                }
                                            )}
                                    </div>
                                </div>
                            }
                            </nav>
                            <nav className="dashboardHeader">
                                {this.state.filter.elements.length>0 && this.state.filter.elements.map((fi, index) => {
                                    switch(fi.type){
                                        case 0: return(<span className="badge badge-pill badge-secondary" key={index}>{fi.value}<button type="button" className="btn btn-link text-gray-600" onClick={this.removeFilter.bind(this, index)}><i className="fa fa-times-circle"></i></button></span>);
                                        break;
                                        case 1: return(<span className="badge badge-pill badge-primary" key={index}>{fi.value}<button type="button" className="btn btn-link text-gray-600" onClick={this.removeFilter.bind(this, index)}><i className="fa fa-times-circle"></i></button></span>);
                                        break;
                                        case 2: return(<span className="badge badge-pill badge-light" key={index}>{fi.value}<button type="button" className="btn btn-link text-gray-600" onClick={this.removeFilter.bind(this, index)}><i className="fa fa-times-circle"></i></button></span>);
                                        break;
                                        case 3: return(<span className="badge badge-pill badge-dark" key={index}>{fi.value}<button type="button" className="btn btn-link text-gray-600" onClick={this.removeFilter.bind(this, index)}><i className="fa fa-times-circle"></i></button></span>);
                                        break;
                                    }
                                })
                                }
                                {this.state.filter.da && <span className="badge badge-pill badge-dark" key='da'>Dal: {this.state.filter.da.locale('it').format('LLLL')}<button type="button" className="btn btn-link text-gray-600" onClick={this.removeFilterDate.bind(this, 'da')}><i className="fa fa-times-circle"></i></button></span>}
                                {this.state.filter.a &&<span className="badge badge-pill badge-dark" key='a'>Al: {this.state.filter.a.locale('it').format('LLLL')}<button type="button" className="btn btn-link text-gray-600" onClick={this.removeFilterDate.bind(this, 'a')}><i className="fa fa-times-circle"></i></button></span>}             
                                {(this.state.filter.elements.length>0 || this.state.filter.da || this.state.filter.a) && <button type="button" onClick={this.search.bind(this)} className="btn btn-primary">Filtra</button>}
                            </nav>
                            {isFetching === true ? <h1 className="text-center fixed-middle"><i className="fa fa-circle-o-notch fa-spin mr-2" />Loading</h1> : 
                            <div>
                                {results.map((result, index) => {
                                switch(result.type){
                                    case 0: return(
                                                    <div className="card" key={index}>
                                                        <div className="card-body">
                                                            <div className="row" >
                                                                <div className="col-md-1" >
                                                                    <i className="fa fa-table fa-lg"></i>
                                                                </div>
                                                                <div className="col-md-7" >
                                                                    {result.dcatapit.title}
                                                                </div>
                                                                <div className="col-md-2" >
                                                                    <span className="badge badge-accento my-1">{decodeTheme(result.operational.theme)}</span>
                                                                </div>
                                                                <div className="col-md-2" >
                                                                    {result.operational.group_own}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            );
                                            break;
                                    case 1: return(
                                                <div className="card" key={index}>
                                                    <div className="card-body">
                                                        <div className="row" >
                                                            <div className="col-md-1" >
                                                                <i className="fa fa-columns fa-lg"></i>
                                                            </div>
                                                            <div className="col-md-9" >
                                                                {result.title}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            break;
                                    case 2: return(
                                            <div className="card" key={index}>
                                                <div className="card-body">
                                                    <div className="row" >
                                                        <div className="col-md-1" >
                                                            <i className="fa fa-font fa-lg"></i>
                                                        </div>
                                                        <div className="col-md-9" >
                                                            {result.title}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                    break;         
                                    }
                                })
                            }
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

DatasetList.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    results: PropTypes.array
}

function mapStateToProps(state) {
    const { isFetching, results, query } = state.searchReducer['search'] || { isFetching: false, results: [] }
    return { isFetching, results, query }
}

export default connect(mapStateToProps)(DatasetList)