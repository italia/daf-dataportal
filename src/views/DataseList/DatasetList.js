import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { search } from '../../actions'
import { serviceurl } from '../../config/serviceurl'
import { boldMyWords, isPublic } from '../../utility'
import Select from 'react-select'
import { decodeTheme, decodeTipo, decodeVisibilita, truncateDatasetName } from '../../utility' 
import {themes, tipi, visibilita} from '../../utility' 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import WidgetCard from '../../components/Cards/WidgetCard';
import InfiniteScroll from '../../components/InfinityScroll'


/* const tipi = [{ 'name': 'Dataset'},{ 'name': 'Dashboard'},{ 'name': 'Storie'}]
const visibilita = [{ 'name': 'Open data'},{ 'name': 'Privato'},{ 'name': 'Organizzazione'}] */

var localization = require('moment/locale/it.js')
moment.locale('it', localization)

class DatasetList extends Component {
    constructor(props) {
        super(props)
        let defaultOrder = 'desc'
        if(window.location.hash.indexOf('search')!==-1)
          defaultOrder = 'score'
        
        this.state = {
            order_filter: defaultOrder,
            category_filter: props.history.location.state && props.history.location.state.category_filter,
            group_filter: props.history.location.state && props.history.location.state.group_filter,
            organization_filter: props.history.location.state && props.history.location.state.organization_filter,
            query: props.history.location.state && props.history.location.state.query,
            filter:{'da':'',
                    'a':'',
                    'order': defaultOrder,
                    'elements': []},
            selectedOrg: '',
            selectedCat: '',
            showDivTipo: false,
            showDivData: false,
            showDivCategoria: props.location.state?props.location.state.theme:false,
            showDivOrganizzazione: false,
            showDivVisibilita: false,
            showDivSearch: false,
            showDivDataset: [],
            startDate: undefined,
            endDate: undefined,
            items: 20,
            totalResults: 0
        }

        


        //this.load();
        this.searchAll = this.searchAll.bind(this)  
        this.search = this.search.bind(this)  
        this.addFilter = this.addFilter.bind(this)  
        this.removeFilter = this.removeFilter.bind(this)  
        //this.handleLoadDatasetDetailClick = this.handleLoadDatasetDetailClick.bind(this)
        this.handleToggleClickTipo = this.handleToggleClickTipo.bind(this)
        this.handleToggleClickData = this.handleToggleClickData.bind(this)
        this.handleToggleClickCategoria = this.handleToggleClickCategoria.bind(this)
        this.handleToggleClickOrganizzazione = this.handleToggleClickOrganizzazione.bind(this)
        this.handleToggleClickVisibilita = this.handleToggleClickVisibilita.bind(this)
        this.handleToggleClickSearch = this.handleToggleClickSearch.bind(this)
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleChangeOrdinamento = this.handleChangeOrdinamento.bind(this);
        this.addOrganization = this.addOrganization.bind(this)

/*         if(window.location.hash==='#/dataset'){
            this.searchAll('')
        } */
        
        this.handleToggleClickDataset = this.handleToggleClickDataset.bind(this);
    }
    
    //Filter Type: 0-tip, 1-cat, 2-vis, 3-org
    componentDidMount() {
        if(!this.props.isFetching && (!this.props.results || this.props.results.length === 0)){
            const queryString = require('query-string');
            const query = queryString.parse(this.props.location.search).q  
            this.searchAll(query)
        }
    }

    searchAll(query){
        const { dispatch, properties } = this.props
        var dataset = window.location.hash.indexOf('dataset')!==-1
        var org = []
        if(isPublic() && properties.domain!=='dataportal' && properties.domain!=='dataportal-private')
          org.push(properties.organization)
        let filter = {
            'text': query,
            'index': dataset?['catalog_test','ext_opendata']:[],
            'org': org,
            'theme':[],
            'date': "",
            'status': [],
            'order': this.state.order_filter
        }

        dispatch(search(query, filter, isPublic()))
        .catch((error) => {
        this.setState({
          isFetching: false
        })
      })
    }

    //Filter Type: 0-tip, 1-cat, 2-vis, 3-org
    search(order){
        const { dispatch, properties } = this.props
        
        const queryString = require('query-string');
        const query = queryString.parse(this.props.location.search).q

        var orderFilter = ''
        if(order)
            orderFilter = order
        else{
            orderFilter = this.state.filter.order
        }  
        
        var dataset = window.location.hash.indexOf('dataset')!==-1
        var org = []
        if(isPublic() && properties.domain!=='dataportal' && properties.domain!=='dataportal-private')
          org.push(properties.organization)

        let filter = {
            'text': dataset?'':query,
            'index': [],
            'org': org,
            'theme':[],
            'date': this.state.filter.da && this.state.filter.a ? this.state.filter.da.locale('it').format("YYYY-MM-DD")+ ' ' +this.state.filter.a.locale('it').format("YYYY-MM-DD") : '',
            'status': [],
            'order': orderFilter,
        }

        if(this.state.filter.elements && this.state.filter.elements.length>0){
            this.state.filter.elements.map((fi, index) => {
                switch(fi.type){
                    case 0:
                        filter.index.push(fi.value)
                        break;
                    case 1:
                        filter.theme.push(fi.value)
                        break;
                    case 2:
                        filter.status.push(fi.value)
                        break;
                    case 3:
                        filter.org.push(fi.value)
                        break;
                    
                }
            })
        }

        if(dataset){
            dispatch(search('', filter, isPublic()))
        }else{
            dispatch(search(query, filter, isPublic()))
            .catch((error) => {
                this.setState({
                    isFetching: false
                })
            })
        }
    }

    /* handleLoadDatasetDetailClick(name, e) {
        e.preventDefault()
        this.setState({
          edit: false
        })
        const { dispatch, query } = this.props
        const { order_filter, category_filter, organization_filter, group_filter } = this.state
        this.props.history.push({
          pathname: '/private/dataset/'+name,
          state: {'query': query,
                  'category_filter': category_filter,
                  'organization_filter': organization_filter,
                  'order_filter': order_filter,
                  'group_filter': group_filter
          }
        })
      } */

      handleToggleClickDataset(index){
        var array = this.state.showDivDataset
        var i = array.indexOf(index);
        if(i != -1) {
            array.splice(i, 1);
        }else{
            array.push(index)
        }
        this.setState({
            showDivDataset: array
        })
      }

      handleToggleClickTipo(){
        this.setState(prevState => ({
            showDivTipo: !prevState.showDivTipo,
            showDivData: false,
            showDivCategoria: false,
            showDivOrganizzazione: false,
            showDivVisibilita: false,
            showDivSearch: false
          }));
      }

      handleToggleClickData(){
        this.setState(prevState => ({
            showDivData: !prevState.showDivData,
            showDivTipo: false,
            showDivCategoria: false,
            showDivOrganizzazione: false,
            showDivVisibilita: false,
            showDivSearch: false
          }));
      }

      handleToggleClickCategoria(){
        this.setState(prevState => ({
            showDivCategoria: !prevState.showDivCategoria,
            showDivData: false,
            showDivTipo: false,
            showDivOrganizzazione: false,
            showDivVisibilita: false,
            showDivSearch: false
          }));
      }

      handleToggleClickOrganizzazione(){
        this.setState(prevState => ({
            showDivOrganizzazione: !prevState.showDivOrganizzazione,
            showDivData: false,
            showDivCategoria: false,
            showDivTipo: false,
            showDivVisibilita: false,
            showDivSearch: false
          }));
      }

      handleToggleClickVisibilita(){
        this.setState(prevState => ({
            showDivVisibilita: !prevState.showDivVisibilita,
            showDivData: false,
            showDivCategoria: false,
            showDivOrganizzazione: false,
            showDivTipo: false,
            showDivSearch: false
          }));
      }

      handleToggleClickSearch(){
        this.setState(prevState => ({
            showDivVisibilita: false,
            showDivData: false,
            showDivCategoria: false,
            showDivOrganizzazione: false,
            showDivTipo: false,
            showDivSearch: !prevState.showDivSearch
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
      
      handleChangeOrdinamento(e) {
        const { dispatch } = this.props
        const queryString = require('query-string');
        const query = queryString.parse(this.props.location.search).q  
        let newFilter = Object.assign({}, this.state.filter); 
        newFilter.order = e.target.value
        this.setState({
            order_filter: e.target.value,
            filter: newFilter
        });
        /* dispatch(search(query, newFilter)) */
        this.search(e.target.value);
      }
      
      componentWillReceiveProps(nextProps){
        const queryString = require('query-string');
        const query = queryString.parse(nextProps.location.search).q 
        this.setState({query: query,
            showDivTipo: false,
            showDivData: false,
            showDivCategoria: nextProps.location && nextProps.location.state && nextProps.location.state.theme?true:false,
            showDivOrganizzazione: false,
            showDivVisibilita: false,
            totalResults: 0
        })
        var newFilter = this.state.filter
        var elements = this.state.filter.elements
        if(nextProps.filter){
            if(nextProps.filter.index.length===0){
                elements = elements.filter(element => {
                    return element.type!==0
                })
            }
            if(nextProps.filter.org.length===0){
                elements = elements.filter(element => {
                    return element.type!==3
                })
            }
            if(nextProps.filter.status.length===0){
                elements = elements.filter(element => {
                    return element.type!==2
                })
            }
            if(nextProps.filter.theme.length===0){
                elements = elements.filter(element => {
                    return element.type!==1
                })
            }
            if(nextProps.filter.date===''){
                newFilter.da = ''
                newFilter.a=''
                this.setState({
                    startDate: undefined,
                    endDate: undefined
                })
            }

            if(nextProps.filter.order!==''){
              this.setState({
                  order_filter: nextProps.filter.order
              })
          }

            newFilter.elements = elements;

            this.setState({
                filter: newFilter
            })
        }
        if(nextProps.results){
          var total = 0
          Object.keys(JSON.parse(nextProps.results[nextProps.results.length-4].source)).map((tipo, index) =>{
            var tipi=JSON.parse(nextProps.results[nextProps.results.length-4].source)
            total += parseInt(tipi[tipo])
          })
          this.setState({
            totalResults: total
          })
        }
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

      isInArray(filter, element){
        var found = false;
        if(filter.elements){
            var array = filter.elements 
            for(var i = 0; i < array.length; i++) {
                if (array[i].type == element.type && array[i].value == element.value) {
                    found = true;
                    break;
                }
            }
        }
        return found
      }

      removeFilter(index) {
        let newFilter = Object.assign({}, this.state.filter); 
        newFilter.elements = this.state.filter.elements.filter((_, i) => i !== index)
        this.setState({ 
            filter: newFilter
        })
        if(newFilter.elements.length===0 && newFilter.a==='' && newFilter.da===''){
            this.searchAll(this.state.query)
        }
      }

      removeFilterDate() {
        let newFilter = Object.assign({}, this.state.filter);
        
        newFilter.a = ''
        newFilter.da = ''
        this.setState({
            endDate: undefined,
            startDate: undefined,
            filter: newFilter
        })
        if(newFilter.elements.length===0 && newFilter.a==='' && newFilter.da===''){
            this.searchAll(this.state.query)
        }

      }

      loadMore = () => {
        if (this.state.isLoading) { return }
        var totitems = this.state.items + 10;
        this.setState({ 
            items: totitems,
            visible: "hidden"
        });
    }

    handleScrollToBottom = () => this.loadMore()

    addOrganization(newValue){
      this.setState({
        selectedOrg: newValue
      })

      if(newValue){
        this.addFilter(3, newValue)
      }
    }

 
    render() {
        const { results, isFetching, properties } = this.props
        
        const queryString = require('query-string');
        var search = queryString.parse(this.props.location.search).q

        if(results && results.length>0){
          var categories = Object.keys(JSON.parse(results[results.length-1].source))
          var organizations = Object.keys(JSON.parse(results[results.length-2].source))
          var selectOrganizations = []
          if(organizations.length>10){
            organizations = organizations.slice(0,10)
            Object.keys(JSON.parse(results[results.length-2].source)).slice(11, Object.keys(JSON.parse(results[results.length-2].source)).length-1).map((org, index)=>{
              selectOrganizations.push({
                'value': org,
                'label': org
              })
            })            
          }
        }

        var orgFilter = false
        if(!isPublic() || (properties.domain==='dataportal' || properties.domain==='dataportal-private'))
          orgFilter = true

        return (
                    <div>
                        <div>
                            <nav className="dashboardHeader text-gray-600">
                              <div className="container">
                                {window.location.hash.indexOf('dataset')!==-1 && <div><i className="fa-pull-left fa fa-table fa-lg my-2 mr-3" style={{lineHeight: '1'}}></i><h2>Dataset trovati <i>{this.state.totalResults}</i></h2></div>}
                                {window.location.hash.indexOf('dataset')===-1 && <div><i className="fa-pull-left fa fa-search fa-lg my-2 mr-3" style={{lineHeight: '1'}}></i><h2>{search && 'Hai cercato ' }<i className="mr-1">{search?search:""}</i> trovati <i>{this.state.totalResults}</i> risultati</h2></div>}
                              </div>
                            </nav>
                            <nav className={"dashboardHeader b-t-1 b-b-1 "+(this.state.showDivSearch?"mb-0":"")}>
                                <div className="px-5 container" style={{height: '48px'}}>
                                  <div className="row h-100">
                                    <div className="mr-auto col-lg-4 col-md-7 h-100" >
                                        <div className="btn-group h-100" role="group" aria-label="Basic example">
                                            <button type="button" className={"b-t-0 b-b-0 btn "+ (this.state.showDivTipo ? "btn-secondary":"btn-outline-filters")} onClick={this.handleToggleClickTipo}>Tipo <i className={"fa " + (this.state.showDivTipo ? "fa-angle-up" : "fa-angle-down")}></i></button>
                                            <button type="button" className={"b-t-0 b-b-0 btn "+ (this.state.showDivData ? "btn-secondary":"btn-outline-filters")} onClick={this.handleToggleClickData}>Data <i className={"fa " + (this.state.showDivData ? "fa-angle-up" : "fa-angle-down")}></i></button>
                                            <button type="button" className={"b-t-0 b-b-0 btn "+ (this.state.showDivCategoria ? "btn-secondary":"btn-outline-filters")} onClick={this.handleToggleClickCategoria}>Categoria <i className={"fa " + (this.state.showDivCategoria ? "fa-angle-up" : "fa-angle-down")}></i></button>
                                            {orgFilter && <button type="button" className={"b-t-0 b-b-0 btn "+ (this.state.showDivOrganizzazione ? "btn-secondary":"btn-outline-filters")} onClick={this.handleToggleClickOrganizzazione}>Organizzazione <i className={"fa " + (this.state.showDivOrganizzazione ? "fa-angle-up" : "fa-angle-down")}></i></button>}
                                            {!isPublic() && <button type="button" className={"b-t-0 b-b-0 btn "+ (this.state.showDivVisibilita ? "btn-secondary":"btn-outline-filters")} onClick={this.handleToggleClickVisibilita}>Visibilità <i className={"fa " + (this.state.showDivVisibilita ? "fa-angle-up" : "fa-angle-down")}></i></button>}
                                            {/* <button type="button" className={"b-t-0 b-b-0 btn "+ (this.state.showDivSearch ? "btn-secondary":"btn-outline-filters")} onClick={this.handleToggleClickSearch}><i className="fa fa-search fa-lg"/></button> */}
                                        </div>
                                    </div>
                                    <div className="ml-auto col-lg-3 col-md-4 h-100" >
                                        <select className="form-control h-100 b-t-0 b-b-0" id="ordinamento" aria-required="true" onChange={this.handleChangeOrdinamento.bind(this)} value={this.state.order_filter}>
                                            <option value="desc">Data decrescente</option>
                                            <option value="asc">Data crescente</option>
                                            <option value="score">Per rilevanza</option>
                                        </select> 
                                    </div>
                                  </div>
                                </div>
                            </nav>
                            <nav className={"dashboardHeader "+(this.state.showDivSearch?"px-5 container bg-secondary":"container px-5")}>
                            {this.state.showDivTipo && results &&
                                Object.keys(JSON.parse(results[results.length-4].source)).map((tipo, index) =>{
                                    var tipi=JSON.parse(results[results.length-4].source)
                                    return(<button type="button" style={{height: '48px'}} disabled={this.isInArray(this.state.filter, {'type': 0, 'value': tipo})} onClick={this.addFilter.bind(this, 0, tipo)} key={index} className={!this.isInArray(this.state.filter, {'type': 0, 'value': tipo})?"my-2 mr-2 btn btn-outline-filters":"btn my-2 mr-2 btn-secondary"}>{decodeTipo(tipo)}<span className="ml-2 badge badge-pill badge-secondary">{tipi[tipo]}</span></button>)
                                })
                            }
                            {this.state.showDivData && 
                                <DateRangePicker
                                    startDatePlaceholderText={'Data di inizio'} //PropTypes.string,
                                    endDatePlaceholderText={'Data di fine'} //PropTypes.string,
                                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                                    onDatesChange={({ startDate, endDate }) => this.handleChangeDate(startDate, endDate)} // PropTypes.func.isRequired,
                                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                    isOutsideRange={() => false}
                                    minimumNights={ 0 }
                                    />
                            }
                            {this.state.showDivCategoria && results && results.length>0 &&
                                categories.map((theme, index) =>{
                                    var themes=JSON.parse(results[results.length-1].source)
                                    return(<button type="button" style={{height: '48px'}} disabled={this.isInArray(this.state.filter, {'type': 1, 'value': theme})} onClick={this.addFilter.bind(this, 1, theme)} key={index} className={!this.isInArray(this.state.filter, {'type': 1, 'value': theme})?"my-2 mr-2 btn btn-outline-filters":"btn my-2 mr-2 btn-secondary"}>{decodeTheme(theme)}<span className="ml-2 badge badge-pill badge-secondary">{themes[theme]}</span></button>)
                                }) 
                            }
                            {this.state.showDivOrganizzazione && results &&
                                organizations.map((org, index) =>{
                                    var orgs=JSON.parse(results[results.length-2].source)
                                    return(<button type="button" style={{height: '48px'}} disabled={this.isInArray(this.state.filter, {'type': 3, 'value': org})} onClick={this.addFilter.bind(this, 3, org)} key={index} className={!this.isInArray(this.state.filter, {'type': 3, 'value': org})?"my-2 mr-2 btn btn-outline-filters":"btn my-2 mr-2 btn-secondary"}>{org}<span className="ml-2 badge badge-pill badge-secondary">{orgs[org]}</span></button>)
                                })
                            }
                            {this.state.showDivOrganizzazione && selectOrganizations.length>0 &&
                            <div className="my-2 p-2 btn-outline-filters" style={{maxWidth: '230px'}}>
                              <Select
                                id="state-select"
                                onBlurResetsInput={false}
                                onSelectResetsInput={false}
                                options={selectOrganizations}
                                simpleValue
                                clearable={true}
                                name="selected-organization"
                                value={this.state.selectedOrg}
                                onChange={this.addOrganization}
                                rtl={false}
                                searchable={true}
                                style={{maxWidth: '230px'}}
                                />
                            </div>
                            }
                            {this.state.showDivVisibilita && results &&
                                Object.keys(JSON.parse(results[results.length-3].source)).map((vis, index) =>{
                                    var arrVis=JSON.parse(results[results.length-3].source)
                                    return(<button type="button" style={{height: '48px'}} disabled={this.isInArray(this.state.filter, {'type': 2, 'value': vis})} onClick={this.addFilter.bind(this, 2, vis)} key={index} className={!this.isInArray(this.state.filter, {'type': 2, 'value': vis})?"my-2 mr-2 btn btn-outline-filters":"btn my-2 mr-2 btn-secondary"}>{decodeVisibilita(vis)}<span className="ml-2 badge badge-pill badge-secondary">{arrVis[vis]}</span></button>)
                                })
                            }
                            {/* this.state.showDivSearch && 
                                <form className="py-2 w-100" onSubmit={this.search.bind(this, this.state.order_filter)}>
                                    <input className="search-input w-100" placeholder="Cosa vuoi cercare?" value={this.state.query} onChange={e => this.setState({query: e.target.value})}/>
                                </form> */
                            }
                            </nav>
                            { (this.state.filter.elements.length>0 || this.state.filter.da || this.state.filter.a) && 
                              <div className="bg-grigino">
                                <nav className="dashboardHeader container py-2 px-5">
                                {this.state.filter.elements.length>0 && this.state.filter.elements.map((fi, index) => {
                                    switch(fi.type){
                                        case 0: return(<span className="badge badge-pill badge-white my-2 mr-2 pl-3 py-2 filter-val" key={index}>{decodeTipo(fi.value)}<button type="button" className="p-0 ml-2 btn btn-link text-gray-600" onClick={this.removeFilter.bind(this, index)}><i className="ml-2 fa fa-times-circle"></i></button></span>);
                                        break;
                                        case 1: return(<span className="badge badge-pill badge-info my-2 mr-2 pl-3 py-2 filter-val" key={index}>{decodeTheme(fi.value)}<button type="button" className="p-0 ml-2 btn btn-link text-gray-600" onClick={this.removeFilter.bind(this, index)}><i className="ml-2 fa fa-times-circle"></i></button></span>);
                                        break;
                                        case 2: return(<span className="badge badge-pill badge-white my-2 mr-2 pl-3 py-2 filter-val" key={index}>{decodeVisibilita(fi.value)}<button type="button" className="p-0 ml-2 btn btn-link text-gray-600" onClick={this.removeFilter.bind(this, index)}><i className="ml-2 fa fa-times-circle"></i></button></span>);
                                        break;
                                        case 3: return(<span className="badge badge-pill badge-secondary my-2 mr-2 pl-3 py-2 filter-val" key={index}>{fi.value}<button type="button" className="p-0 ml-2 btn btn-link text-gray-600" onClick={this.removeFilter.bind(this, index)}><i className="ml-2 fa fa-times-circle"></i></button></span>);
                                        break;
                                    }
                                })
                                }
                                {this.state.filter.da && this.state.filter.a && <span className="badge badge-pill badge-white my-2 mr-2 pl-3 py-2 filter-val" key='da'>{this.state.filter.da.locale('it').format("DD/MM/YYYY")} - {this.state.filter.a.locale('it').format("DD/MM/YYYY")}<button type="button" className="btn btn-link p-0 ml-2 text-gray-600" onClick={this.removeFilterDate.bind(this)}><i className="ml-2 fa fa-times-circle"></i></button></span>}
                                {(this.state.filter.elements.length>0 || this.state.filter.da || this.state.filter.a) && <button type="button" onClick={this.search.bind(this, this.state.order_filter)} style={{height: '48px'}} className="ml-2 btn btn-accento px-4">Filtra</button>}
                                </nav>
                              </div>
                            }
                            {isFetching === true ? <h1 className="text-center p-5"><i className="fas fa-circle-notch fa-spin mr-2" />Caricamento</h1> : 
                             <div className="mb-3">
                                <div className="App" style={{overflowX: 'hidden'}}>
                                {results ? 
                                <InfiniteScroll onScrollToBottom={this.handleScrollToBottom} className="w-100">
                                {results.slice(0,this.state.items).map((result, index) => {
                                switch(result.type){
                                    case 'catalog_test': 
                                        let dataset = JSON.parse(result.source)
                                        let datasetMatch = dataset
                                        try {
                                            datasetMatch = JSON.parse(result.match)
                                        } catch (error) {
                                            
                                        }
                                         
                                        let fields = datasetMatch.dataschema&&datasetMatch.dataschema.avro&&datasetMatch.dataschema.avro.fields?datasetMatch.dataschema.avro.fields:dataset.dataschema.avro.fields
                                        return(
                                            <div className="container px-5" key={index}>
                                                <div className="card risultato mt-3 mb-0" >
                                                    <div className="card-body p-0 clearfix bg-light">
                                                        <i className="fa fa-table bg-dataset p-3 float-left h-100"></i>
                                                        <div className="row pl-3 pt-2 h-100" >
                                                            <div className="col-md-6 py-1 px-1" >
                                                                <Link to={isPublic()?'/dataset/' + dataset.dcatapit.name:'/private/dataset/' + dataset.dcatapit.name} className="title-res text-primary">
{/*                                                                <div title={dataset.dcatapit.title} dangerouslySetInnerHTML={{__html: datasetMatch['dcatapit.title']?truncateDatasetName(datasetMatch['dcatapit.title'],100):truncateDatasetName(dataset.dcatapit.title, 60)}}></div>
 */}                                                               <div title={dataset.dcatapit.title} className="text-truncate" dangerouslySetInnerHTML={{__html: datasetMatch['dcatapit.title']?datasetMatch['dcatapit.title']:dataset.dcatapit.title}}></div>
                                                                </Link>
                                                            </div>
                                                            <div className="col-md-2 py-1 px-4" >
                                                                <span className="badge badge-info my-1">{decodeTheme(dataset.dcatapit.theme)}</span>
                                                            </div>
                                                            <div className="col-md-2 py-1 px-3" >
                                                                <div title={dataset.dcatapit.owner_org} className="text-truncate" dangerouslySetInnerHTML={{__html: dataset.dcatapit.owner_org}}></div>
                                                            </div>
                                                            <div className="col-md-1 py-1 px-2">
                                                                {!dataset.dcatapit.privatex && <i className="fa fa-globe fa-lg text-icon float-right pt-1"/>}
                                                                {dataset.dcatapit.privatex && <i className="fa fa-users fa-lg text-icon float-right pt-1"/>}
                                                            </div>
                                                            <div className="col-md-1 py-1">
                                                                <button type="button" className="b-t-0 b-b-0 b-l-0 b-r-0 py-0 btn btn-outline-filters float-right" onClick={this.handleToggleClickDataset.bind(this, index)}>
                                                                    {this.state.showDivDataset && this.state.showDivDataset.length>0 && this.state.showDivDataset.indexOf(index)>-1?<i className="fa fa-angle-up"></i>:<i className="fa fa-angle-down"></i>}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {this.state.showDivDataset && this.state.showDivDataset.length>0 && this.state.showDivDataset.indexOf(index)>-1 && 
                                                <div className="card mb-3 mt-0">
                                                    <div className="card-body clearfix">
                                                        <div className="row pl-3 pt-2 h-100" >
                                                            <div className="col-md-2 py-1 px-1" >
                                                                <b>Titolo: </b>
                                                            </div>
                                                            <div className="col-md-8 py-1 px-1" >
                                                            <div dangerouslySetInnerHTML={{__html: datasetMatch['dcatapit.title']?datasetMatch['dcatapit.title']:dataset.dcatapit.title}}></div>
                                                            </div>
                                                        </div>
                                                        <div className="row pl-3 pt-2 h-100" >
                                                                <div className="col-md-2 py-1 px-1" >
                                                                    <b>Ultima modifica: </b>
                                                                </div>
                                                                <div className="col-md-8 py-1 px-1" >
                                                                    {dataset.dcatapit.modified}
                                                                </div>
                                                        </div>
                                                        <div className="row pl-3 pt-2 h-100" >
                                                            <div className="col-md-2 py-1 px-1" >
                                                                    <b>Descrizione: </b>
                                                                </div>
                                                                <div className="col-md-8 py-1 px-1" >
                                                                    <div dangerouslySetInnerHTML={{__html: datasetMatch['dcatapit.notes']?datasetMatch['dcatapit.notes']:dataset.dcatapit.notes}}></div>
                                                                </div>
                                                        </div>
                                                        <div className="row pl-3 pt-2 h-100" >
                                                            <div className="col-md-2 py-1 px-1" >
                                                                    <b>Campi del dataset: </b>
                                                            </div>
                                                            <div className="col-md-8 py-1 px-1" >
                                                                <p>
                                                                {fields.map((result, index) => {
                                                                    if(index===0)
                                                                        return(result.name)
                                                                    else 
                                                                        return(', ' + result.name)
                                                                }) 
                                                                }
                                                                </p>
                                                            </div>
                                                       </div>
                                                   </div>
                                               </div>
                                               }
                                           </div>
                                           );
                                           break;
                                            case 'ext_opendata': 
                                                let datasetOpen = {}; 
                                                let datasetOpenMatch = {}; 
                                                try {
                                                    datasetOpen = JSON.parse(result.source)
                                                    datasetOpenMatch = dataset
                                                    datasetOpenMatch = JSON.parse(result.match)
                                                    return(
                                                        <div className="container px-5" key={index}>
                                                        <div className="card risultato mt-3 mb-0" >
                                                            <div className="card-body p-0 clearfix bg-e7ecef">
                                                                <i className="fa fa-table bg-dataset p-3 float-left h-100"></i>
                                                                <i className="fa fa-external-link-square-alt b-r-dash b-l-ext bg-light float-left text-icon p-3 h-100"></i>                                                        
                                                                <div className="row pl-3 pt-2 h-100" >
                                                                    <div className="col-md-6 py-1 px-1" >
                                                                                <Link to={isPublic()?'/dataset/' + datasetOpen.name + '?type=open':'/private/dataset/' + datasetOpen.name + '?type=open'} className="title-res text-primary">
                                                                                    {/* <div title={datasetOpen.title} dangerouslySetInnerHTML={{__html: datasetOpenMatch['title']?truncateDatasetName(datasetOpenMatch['title'],100):truncateDatasetName(datasetOpen.title, 60)}}></div> */}
                                                                                    <div title={datasetOpen.title} className="text-truncate" dangerouslySetInnerHTML={{__html: datasetOpenMatch['title']?datasetOpenMatch['title']:datasetOpen.title}}></div>
                                                                                </Link>
                                                                            </div>
                                                                            <div className="col-md-2 py-1 px-1" >
                                                                                <span className="badge badge-info my-1">{decodeTheme(datasetOpen.theme)}</span>
                                                                            </div>
                                                                            <div className="col-md-2 py-1 px-1" >
                                                                                <div title={datasetOpen.organization.name} className="text-truncate" dangerouslySetInnerHTML={{__html: datasetOpen.organization.name}}></div>
                                                                            </div>
                                                                            <div className="col-md-1 py-1">
                                                                                 <i className="fa fa-globe fa-lg text-icon float-right pt-1"/>
                                                                            </div>
                                                                            <div className="col-md-1 py-1">
                                                                                <button type="button" className="b-t-0 b-b-0 b-l-0 b-r-0 py-0 btn btn-outline-filters float-right" onClick={this.handleToggleClickDataset.bind(this, index)}>
                                                                                    {this.state.showDivDataset && this.state.showDivDataset.length>0 && this.state.showDivDataset.indexOf(index)>-1?<i className="fa fa-angle-up"></i>:<i className="fa fa-angle-down"></i>}
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {this.state.showDivDataset && this.state.showDivDataset.length>0 && this.state.showDivDataset.indexOf(index)>-1 && 
                                                                <div className="card mb-3 mt-0">
                                                                    <div className="card-body clearfix">
                                                                        <div className="row px-3 pt-2 h-100" >
                                                                            <div className="col-md-2 py-1 px-1" >
                                                                                <b>Titolo: </b>
                                                                            </div>
                                                                            <div className="col-md-8 py-1 px-1" >
                                                                            <div dangerouslySetInnerHTML={{__html: datasetOpenMatch['title']?datasetOpenMatch['title']:datasetOpen.title}}></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row px-3 pt-2 h-100" >
                                                                                <div className="col-md-2 py-1 px-1" >
                                                                                    <b>Ultima modifica: </b>
                                                                                </div>
                                                                                <div className="col-md-8 py-1 px-1" >
                                                                                    {datasetOpen.modified}
                                                                                </div>
                                                                        </div>
                                                                        <div className="row px-3 pt-2 h-100" >
                                                                            <div className="col-md-2 py-1 px-1" >
                                                                                    <b>Descrizione: </b>
                                                                                </div>
                                                                                <div className="col-md-8 py-1 px-1" >
                                                                                    <div dangerouslySetInnerHTML={{__html: datasetOpenMatch['notes']?datasetOpenMatch['notes']:datasetOpen.notes}}></div>
                                                                                </div>
                                                                        </div>
                                                                       
                                                                    </div>
                                                                </div>
                                                                }
                                                            </div>
                                                            );


                                                } catch (error) {
                                                    
                                                }
                                                
                                                    break;
                                   case 'dashboards':
                                       let dashboard = JSON.parse(result.source)
                                       let dashboardMatch = dashboard
                                       try {
                                           dashboardMatch = JSON.parse(result.match)
                                       } catch (error) {
                                           
                                       }
                                       if ((dashboard.widgets && dashboard.widgets !== '{}') && (dashboard.layout && dashboard.layout !== '{}')) {
                                           const dashLayout = JSON.parse(dashboard.layout)
                                           var firstLayout = ''
                                           let righe = dashLayout.rows
                                           for (let i = 0; i < righe.length; i++) {
                                           let colonne = righe[i].columns;
                                            for (let j = 0; j < colonne.length; j++) {
                                                let wids = colonne[j].widgets
                                                wids.map((index) => {
                                                /*  if (!index.key.startsWith('TextWidget')) { */
                                                if (index.key.indexOf('TextWidget') == -1) {
                                                    firstLayout = index.key
                                                }
                                                })
                                                if (firstLayout != '')
                                                break
                                            }
                                            if (firstLayout != '')
                                                break
                                            }
                                            const dashWidgets = JSON.parse(dashboard.widgets)
                                            var imageA = undefined
                                            if (firstLayout != '') {
                                                var firstWidget = dashWidgets[firstLayout];
                                                imageA = firstWidget.image
                                            }
                                        } 

                                        return(
                                            <div className="container px-5" key={index}>
                                                <div className="card risultato mt-3 mb-0" >
                                                    <div className="card-body p-0 clearfix">
                                                        <i className="fa fa-columns bg-gray-900 p-3 float-left text-white h-100"></i>
                                                        <div className="row pl-3 pt-2 h-100" >
                                                            <div className="col-md-6 py-1 px-1" title={dashboard.title}>
                                                                <Link to={isPublic()?'/dashboard/list/' + dashboard.id:'/private/dashboard/list/' + dashboard.id} className="title-res text-primary">                                                                    
{/*                                                                     <div title={dashboard.title} dangerouslySetInnerHTML={{__html: dashboardMatch['title']?truncateDatasetName(dashboardMatch['title'],100):truncateDatasetName(dashboard.title, 60)}}></div>

 */}                                                                <div title={dashboard.title} className="text-truncate" dangerouslySetInnerHTML={{__html: dashboardMatch['title']?dashboardMatch['title']:dashboard.title}}></div>
                                                                        </Link>
                                                            </div>
                                                            <div className="col-md-2 py-1 px-1" ></div>
                                                            <div className="col-md-2 py-1 px-1" >
                                                                <div title={dashboard.org} className="text-truncate" dangerouslySetInnerHTML={{__html: dashboard.org}}></div>
                                                            </div>
                                                            <div className="col-md-1 py-1">
                                                                {dashboard.status===2 && <i className="fa fa-globe fa-lg text-icon float-right pt-1"/>}
                                                                {dashboard.status===1 && <i className="fa fa-users fa-lg text-icon float-right pt-1"/>}
                                                                {dashboard.status===0 && <i className="fas fa-lock fa-lg text-icon float-right pt-1"/>}
                                                            </div>
                                                            <div className="col-md-1 py-1">
                                                                <button type="button" className="b-t-0 b-b-0 b-l-0 b-r-0 py-0 btn btn-outline-filters float-right" onClick={this.handleToggleClickDataset.bind(this, index)}>
                                                                    {this.state.showDivDataset && this.state.showDivDataset.length>0 && this.state.showDivDataset.indexOf(index)>-1?<i className="fa fa-angle-up"></i>:<i className="fa fa-angle-down"></i>}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {this.state.showDivDataset && this.state.showDivDataset.length>0 && this.state.showDivDataset.indexOf(index)>-1 && 
                                                <div className="card mb-3 mt-0">
                                                     <div className="card-body clearfix">
                                                        <div className="row pl-3 pt-2 h-100" >
                                                             <div className="col-md-2 py-1 px-1" >
                                                                 <b>Titolo: </b>
                                                             </div>
                                                             <div className="col-md-8 py-1 px-1" >
                                                                 <div title={dashboard.title} dangerouslySetInnerHTML={{__html: dashboardMatch['title']?dashboardMatch['title']:dashboard.title}}></div>
                                                             </div>
                                                        </div>
                                                        <div className="row pl-3 pt-2 h-100" >
                                                             <div className="col-md-2 py-1 px-1" >
                                                                 <b>Ultima modifica: </b>
                                                             </div>
                                                             <div className="col-md-8 py-1 px-1" >
                                                                 {dashboard.timestamp}
                                                             </div>
                                                        </div>
                                                         <div className="row pl-3 pt-2 h-100" >
                                                             <div className="col-md-2 py-1 px-1" >
                                                                 <b>Sottotitolo: </b>
                                                             </div>
                                                             <div className="col-md-8 py-1 px-1" >
                                                                 <div title={dashboard.subtitle} dangerouslySetInnerHTML={{__html: dashboardMatch['subtitle']?dashboardMatch['subtitle']:dashboard.subtitle}}></div>
                                                             </div>
                                                         </div>
                                                         <div className="row pl-3 pt-2 h-100" >
                                                             <div className="col-md-2 py-1 px-1" >
                                                                 <b>Widget: </b>
                                                             </div>
                                                             <div className="col-md-8 py-1 px-1" >
                                                             {firstWidget &&
                                                             <WidgetCard
                                                                 iframe = {firstWidget}
                                                                 />}
                                                                {/* dashboardMatch['widgets']&&
                                                                <div dangerouslySetInnerHTML={{__html: dashboardMatch['widgets']}}></div>
                                                                 */}
                                                             </div>
                                                         </div>
                                                    </div>
                                                </div>
                                                }
                                            </div>
                                            )
                                            break;
                                    case 'stories': 
                                        let story = JSON.parse(result.source)
                                        let storyMatch = story
                                        try {
                                            storyMatch = JSON.parse(result.match)
                                        } catch (error) {
                                            
                                        }
                                        if ((story.widgets && story.widgets !== '{}') && (story.layout && story.layout !== '{}')) {
                                            const dashLayout = JSON.parse(story.layout)
                                            var firstLayout = ''

                                            let righe = dashLayout.rows
                                            for (let i = 0; i < righe.length; i++) {
                                            let colonne = righe[i].columns;
                                            for (let j = 0; j < colonne.length; j++) {
                                                let wids = colonne[j].widgets
                                                wids.map((index) => {
                                                /*  if (!index.key.startsWith('TextWidget')) { */
                                                if (index.key.indexOf('TextWidget') == -1) {
                                                    firstLayout = index.key
                                                }
                                                })
                                                if (firstLayout != '')
                                                break
                                            }
                                            if (firstLayout != '')
                                                break
                                            }
                                            const dashWidgets = JSON.parse(story.widgets)
                                            var imageA = undefined
                                            if (firstLayout != '') {
                                                var firstWidget = dashWidgets[firstLayout];
                                                imageA = firstWidget.image
                                            }
                                        }
                                        return(
                                            <div className="container px-5" key={index}>
                                                <div className="card risultato mt-3 mb-0">
                                                <div className="card-body p-0 clearfix">
                                                    <i className="fa fa-font bg-primary p-3 float-left h-100"></i>
                                                    <div className="row pl-3 pt-2 h-100" >
                                                        <div className="col-md-6 py-1 px-1" >
                                                            <Link to={isPublic()?'/userstory/list/' + story.id:'/private/userstory/list/' + story.id} className="title-res text-primary">                                                                    
{/*                                                                 <div title={story.title} dangerouslySetInnerHTML={{__html: storyMatch['title']?truncateDatasetName(storyMatch['title'],100):truncateDatasetName(story.title, 60)}}></div>
 */}                                                        <div title={story.title} className="text-truncate" dangerouslySetInnerHTML={{__html: storyMatch['title']?storyMatch['title']:story.title}}></div>    
                                                            </Link>
                                                        </div>
                                                        <div className="col-md-2 py-1 px-1" ></div>
                                                        <div className="col-md-2 py-1 px-1" >
                                                            <div title={story.org} className="text-truncate" dangerouslySetInnerHTML={{__html: story.org}}></div>
                                                        </div>
                                                        <div className="col-md-1 py-1">
                                                            {story.published===2 && <i className="fa fa-globe fa-lg text-icon float-right pt-1"/>}
                                                            {story.published===1 && <i className="fa fa-users fa-lg text-icon float-right pt-1"/>}
                                                            {story.published===0 && <i className="fas fa-lock fa-lg text-icon float-right pt-1"/>}
                                                        </div>
                                                        <div className="col-md-1 py-1">
                                                            <button type="button" className="b-t-0 b-b-0 b-l-0 b-r-0 py-0 btn btn-outline-filters float-right" onClick={this.handleToggleClickDataset.bind(this, index)}>
                                                                {this.state.showDivDataset && this.state.showDivDataset.length>0 && this.state.showDivDataset.indexOf(index)>-1?<i className="fa fa-angle-up"></i>:<i className="fa fa-angle-down"></i>}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                                {this.state.showDivDataset && this.state.showDivDataset.length>0 && this.state.showDivDataset.indexOf(index)>-1 && 
                                                    <div className="card mb-3 mt-0">
                                                        <div className="card-body clearfix">
                                                            <div className="row pl-3 pt-2 h-100" >
                                                                <div className="col-md-2 py-1 px-1" >
                                                                    <b>Titolo: </b>
                                                                </div>
                                                                <div className="col-md-8 py-1 px-1" >
                                                                    <div title={story.title} dangerouslySetInnerHTML={{__html: storyMatch['title']?storyMatch['title']:story.title}}></div>
                                                                </div>
                                                            </div>
                                                            <div className="row pl-3 pt-2 h-100" >
                                                                <div className="col-md-2 py-1 px-1" >
                                                                    <b>Ultima modifica: </b>
                                                                </div>
                                                                <div className="col-md-8 py-1 px-1" >
                                                                    {story.timestamp}
                                                                </div>
                                                            </div>
                                                            <div className="row pl-3 pt-2 h-100" >
                                                                <div className="col-md-2 py-1 px-1" >
                                                                    <b>Sottotitolo: </b>
                                                                </div>
                                                                <div className="col-md-8 py-1 px-1" >
                                                                    <div title={story.subtitle} dangerouslySetInnerHTML={{__html: storyMatch['subtitle']?storyMatch['subtitle']:story.subtitle}}></div>
                                                                </div>
                                                            </div>
                                                            <div className="row pl-3 pt-2 h-100" >
                                                                <div className="col-md-2 py-1 px-1" >
                                                                    <b>Widget: </b>
                                                                </div>
                                                                <div className="col-md-8 py-1 px-1" >
                                                                {firstWidget &&
                                                                <WidgetCard
                                                                    iframe = {firstWidget}
                                                                    />}
                                                                {/* storyMatch['text']&&
                                                                <div dangerouslySetInnerHTML={{__html: storyMatch['text']}}></div>
                                                                 */}
                                                                </div>
                                                            </div>
                                                    </div>
                                                </div>
                                                }
                                            </div>
                                            )
                                    break;         
                                    }
                                })
                            }
                            </InfiniteScroll>
                                :
                                <h3 className="container px-5 mt-3"><i>Non sono stati trovati risultati.</i></h3>
                            }
                        </div>
                        </div>
                        }
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
    const { isFetching, results, query, filter } = state.searchReducer['search'] || { isFetching: false, results: [] }
    const { properties } = state.propertiesReducer['prop'] || {}
    return { isFetching, results, query, filter, properties }
}

export default connect(mapStateToProps)(DatasetList)