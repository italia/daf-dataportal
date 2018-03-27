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
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';


const tipi = [{ 'name': 'Dataset'},{ 'name': 'Dashboard'},{ 'name': 'Storie'}]
const visibilita = [{ 'name': 'Open data'},{ 'name': 'Privato'},{ 'name': 'Organizzazione'}]

var localization = require('moment/locale/it.js')
moment.locale('it', localization)

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
            endDate: moment()
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
        this.searchAll(query)
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

      handleChangeDate(startDate, endDate){
        let newFilter = Object.assign({}, this.state.filter); 
        newFilter.da = startDate
        newFilter.a = endDate
        this.setState({
          startDate: startDate,
          endDate: endDate,
          filter: newFilter
        });
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
        if(value==='a') {
            newFilter.a = ''
            this.setState({
                endDate: moment()
            })
        }
        if(value==='da') {
            newFilter.da = ''
            this.setState({
                startDate: moment()
            })
        }
        this.setState({ 
            filter: newFilter
        })
      }
 
    render() {
        const { results, isFetching } = this.props
        return (
            
            <div className="body">
                <div className="main_container">
                    <div className="top_nav">
                        <div className="nav_menu">
                            <nav className="dashboardHeader row text-gray-600 mx-3">
                                <i className="fa fa-search fa-lg my-2 mr-3" style={{lineHeight: '1'}}></i><h2>Hai cercato <i>{this.state.query}</i></h2>
                            </nav>
                            <nav className="dashboardHeader px-5 b-t-1 b-b-1">
                                <div className="row" style={{height: '48px'}}>
                                    <div className="col-md-10 h-100" >
                                        <div className="btn-group h-100" role="group" aria-label="Basic example">
                                            <button type="button" className={"b-t-0 b-b-0 btn "+ (this.state.showDivTipo ? "btn-secondary":"btn-outline-filters")} onClick={this.handleToggleClickTipo}>Tipo <i className={"fa " + (this.state.showDivTipo ? "fa-angle-up" : "fa-angle-down")}></i></button>
                                            <button type="button" className={"b-t-0 b-b-0 btn "+ (this.state.showDivData ? "btn-secondary":"btn-outline-filters")} onClick={this.handleToggleClickData}>Data <i className={"fa " + (this.state.showDivData ? "fa-angle-up" : "fa-angle-down")}></i></button>
                                            <button type="button" className={"b-t-0 b-b-0 btn "+ (this.state.showDivCategoria ? "btn-secondary":"btn-outline-filters")} onClick={this.handleToggleClickCategoria}>Categoria <i className={"fa " + (this.state.showDivCategoria ? "fa-angle-up" : "fa-angle-down")}></i></button>
                                            <button type="button" className={"b-t-0 b-b-0 btn "+ (this.state.showDivOrganizzazione ? "btn-secondary":"btn-outline-filters")} onClick={this.handleToggleClickOrganizzazione}>Organizzazione <i className={"fa " + (this.state.showDivOrganizzazione ? "fa-angle-up" : "fa-angle-down")}></i></button>
                                            <button type="button" className={"b-t-0 b-b-0 btn "+ (this.state.showDivVisibilita ? "btn-secondary":"btn-outline-filters")} onClick={this.handleToggleClickVisibilita}>Visibilità <i className={"fa " + (this.state.showDivVisibilita ? "fa-angle-up" : "fa-angle-down")}></i></button>
                                        </div>
                                    </div>
                                    <div className="col-md-2 h-100" >
                                        <select className="form-control h-100 b-t-0 b-b-0" id="ordinamento" aria-required="true" onChange={this.handleChange} value={this.state.order_filter}>
                                            <option value="metadata_modified%20desc">Data crescente</option>
                                            <option value="metadata_modified%20asc">Data decrescente</option>
                                            <option value="relevance%20asc">Per rilevanza</option>
                                        </select> 
                                    </div>
                                </div>
                            </nav>
                            <nav className="dashboardHeader mx-5">
                            {this.state.showDivTipo && tipi.map((tipo, index) => {
                                return(<button type="button" style={{height: '48px'}} onClick={this.addFilter.bind(this, 0, tipo.name)} key={index} className={!this.isInArray(this.state.filter, {'type': 0, 'value': tipo.name})?"my-2 mr-2 btn btn-outline-filters":"btn my-2 mr-2 btn btn-secondary"}>{tipo.name}<span className="ml-2 badge badge-pill badge-secondary">1</span></button>)
                                }
                            )}
                            {this.state.showDivCategoria && themes.map((theme, index) => {
                                return(<button type="button" style={{height: '48px'}} onClick={this.addFilter.bind(this, 1, theme.name)} key={index} className={!this.isInArray(this.state.filter, {'type': 1, 'value': theme.name})?"my-2 mr-2 btn btn-outline-filters":"my-2 mr-2 btn btn-secondary"}>{theme.name}<span className="ml-2 badge badge-pill badge-secondary">1</span></button>)
                                }
                            )}
                            {this.state.showDivVisibilita && visibilita.map((vis, index) => {
                                return(<button type="button" style={{height: '48px'}} onClick={this.addFilter.bind(this, 2, vis.name)} key={index} className={!this.isInArray(this.state.filter, {'type': 2, 'value': vis.name})?"my-2 mr-2 btn btn-outline-filters":"my-2 mr-2 btn btn-secondary"}>{vis.name}<span className="ml-2 badge badge-pill badge-secondary">1</span></button>)
                                }
                            )}
                            {this.state.showDivData && 
                                 /* <div className="row" >
                                    <div className="col-md-3" >
                                        <div>Dal:
                                        <DatePicker
                                            selected={this.state.startDate}
                                            onChange={this.handleChangeStalected={this.state.startDate}
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
                                </div> */
                                <DateRangePicker
                                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                    onDatesChange={({ startDate, endDate }) => this.handleChangeDate(startDate, endDate)} // PropTypes.func.isRequired,
                                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                    />
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
                                                    return(<button type="button" onClick={this.addFilter.bind(this, 3, org)} style={{height: '48px'}} key={index} className={!this.isInArray(this.state.filter, {'type': 3, 'value': org})?"my-2 mr-2 btn btn-outline-filters":"my-2 mr-2 btn btn-secondary"}>{org}<span className="ml-2 badge badge-pill badge-secondary">1</span></button>)
                                                }
                                            )}
                                    </div>
                                </div>
                            }
                            </nav>
                            { (this.state.filter.elements.length>0 || this.state.filter.da || this.state.filter.a) && <nav className="dashboardHeader bg-grigino px-5 py-2">
                                {this.state.filter.elements.length>0 && this.state.filter.elements.map((fi, index) => {
                                    switch(fi.type){
                                        case 0: return(<span className="badge badge-pill badge-white my-2 mr-2 pl-3 py-2 filter-val" key={index}>{fi.value}<button type="button" className="p-0 ml-2 btn btn-link text-gray-600" onClick={this.removeFilter.bind(this, index)}><i className="ml-2 fa fa-times-circle"></i></button></span>);
                                        break;
                                        case 1: return(<span className="badge badge-pill badge-info my-2 mr-2 pl-3 py-2 filter-val" key={index}>{fi.value}<button type="button" className="p-0 ml-2 btn btn-link text-gray-600" onClick={this.removeFilter.bind(this, index)}><i className="ml-2 fa fa-times-circle"></i></button></span>);
                                        break;
                                        case 2: return(<span className="badge badge-pill badge-light my-2 mr-2 pl-3 py-2 filter-val" key={index}>{fi.value}<button type="button" className="p-0 ml-2 btn btn-link text-gray-600" onClick={this.removeFilter.bind(this, index)}><i className="ml-2 fa fa-times-circle"></i></button></span>);
                                        break;
                                        case 3: return(<span className="badge badge-pill badge-secondary my-2 mr-2 pl-3 py-2 filter-val" key={index}>{fi.value}<button type="button" className="p-0 ml-2 btn btn-link text-gray-600" onClick={this.removeFilter.bind(this, index)}><i className="ml-2 fa fa-times-circle"></i></button></span>);
                                        break;
                                    }
                                })
                                }
                                {this.state.filter.da && this.state.filter.a && <span className="badge badge-pill badge-white my-2 mr-2 pl-3 py-2 filter-val" key='da'>{this.state.filter.da.locale('it').format("DD-MM-YYYY")} - {this.state.filter.a.locale('it').format("DD-MM-YYYY")}<button type="button" className="btn btn-link p-0 ml-2 text-gray-600" onClick={this.removeFilterDate.bind(this, 'da')}><i className="ml-2 fa fa-times-circle"></i></button></span>}
                                {/*this.state.filter.a &&<span className="badge badge-pill badge-dark" key='a'>Al: {this.state.filter.a.locale('it').format("DD-MM-YYYY")}<button type="button" className="btn btn-link" onClick={this.removeFilterDate.bind(this, 'a')}><i className="fa fa-times-circle"></i></button></span>*/}             
                                {(this.state.filter.elements.length>0 || this.state.filter.da || this.state.filter.a) && <button type="button" onClick={this.search.bind(this)} style={{height: '48px'}} className="ml-2 btn btn-accento px-4">Filtra</button>}
                            </nav>
                            }
                            {isFetching === true ? ""/* <h1 className="text-center fixed-middle"><i className="fa fa-circle-o-notch fa-spin mr-2" />Loading</h1>  */: 
                             <div className="px-5">
                                {results.map((result, index) => {
                                switch(result.type){
                                    case 0: return(
                                            <div className="card risultato mb-3" key={index}>
                                                <div className="card-body p-0 clearfix">
                                                    <i className="fa fa-table bg-dataset p-3 mr-3 float-left"></i>
                                                    <div className="row py-2 h-100" >
                                                        <div className="col-md-7 py-1 px-1" >
                                                            {result.dcatapit.title}
                                                        </div>
                                                        <div className="col-md-2 py-1 px-1" >
                                                            <span className="badge badge-accento my-1">{decodeTheme(result.operational.theme)}</span>
                                                        </div>
                                                        <div className="col-md-2 py-1 px-1" >                                                                
                                                            {result.operational.group_own}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            );
                                            break;
                                    case 1: return(
                                            <div className="card risultato mb-3" key={index}>
                                                <div className="card-body p-0 clearfix">
                                                    <i className="fa fa-columns bg-gray-900 p-3 mr-3 float-left text-white"></i>
                                                    <div className="row py-2 h-100" >
                                                        <div className="col-md-9 py-1 px-1" >
                                                            {result.title}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                            break;
                                    case 2: return(
                                            <div className="card risultato mb-3" key={index}>
                                                <div className="card-body p-0 clearfix">
                                                    <i className="fa fa-font bg-primary p-3 mr-3 float-left"></i>
                                                    <div className="row py-2 h-100" >
                                                        <div className="col-md-9 py-1 px-1" >
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
                        {/* <div className="px-5">
                        <div className="card risultato mb-3">
                            <div className="card-body p-0 clearfix">
                                <i className="fa fa-table bg-dataset p-3 mr-3 float-left"></i>
                                <div className="row py-2 h-100" >
                                    <div className="col-md-7 py-1 px-1" >
                                        Elenco cinema torino
                                    </div>
                                    <div className="col-md-2 py-1 px-1" >
                                        <span className="badge badge-accento my-1">SOCIETA</span>
                                    </div>
                                    <div className="col-md-2 py-1 px-1" >
                                        default_org
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card risultato mb-3">
                            <div className="card-body p-0 clearfix">
                            <i className="fa fa-columns bg-gray-900 p-3 mr-3 float-left text-white"></i>
                                <div className="row py-2 h-100" >
                                    <div className="col-md-9 py-1 px-1" >
                                        Redditi italiani 2015
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card risultato mb-3">
                            <div className="card-body p-0 clearfix">
                            <i className="fa fa-font bg-primary p-3 mr-3 float-left"></i>
                                <div className="row py-2 h-100" >
                                    <div className="col-md-9 py-1 px-1" >
                                        Torino: stazioni Bike Sharing
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
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
    const { isFetching, results, query } = state.searchReducer['search'] || { isFetching: true, results: [] }
    return { isFetching, results, query }
}

export default connect(mapStateToProps)(DatasetList)