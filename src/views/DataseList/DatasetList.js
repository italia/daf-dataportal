import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { search } from '../../actions'
import { isPublic } from '../../utility'
import Select from 'react-select'
import { decodeTheme, decodeTipo, decodeVisibilita } from '../../utility' 
import moment from 'moment';
require('react-dates/initialize');
require('react-dates/lib/css/_datepicker.css');
import { DateRangePicker } from 'react-dates';
import WidgetCard from '../../components/Cards/WidgetCard';
import InfiniteScroll from '../../components/InfinityScroll'

var localization = require('moment/locale/it.js')
moment.locale('it', localization)

class DatasetList extends Component {
    constructor(props) {
        super(props)
        let defaultOrder = 'desc'
        if(window.location.hash.indexOf('search')!==-1)
          defaultOrder = 'score'

        var order =  props.filterInt&&props.filterInt.order?props.filterInt.order:defaultOrder 
        var filter = props.filterInt?props.filterInt:{'da':'',
                                                        'a':'',
                                                        'order': defaultOrder,
                                                        'elements': []}
        var totalResults = 0
        if(props.results && props.results.length>0){
            Object.keys(JSON.parse(props.results[props.results.length-4].source)).map((tipo, index) =>{
                var tipi=JSON.parse(props.results[props.results.length-4].source)
                totalResults += parseInt(tipi[tipo])
            })            
        }

        var ownerCheck = false
        if(props.filter && props.loggedUser){
            ownerCheck = props.filter.owner===props.loggedUser.uid
        }
        var sharedCheck = false
        if(props.filter && props.filter.sharedCheck && props.filter.sharedCheck!==null){
          sharedCheck = props.filter.sharedCheck
        }
        this.state = {
            order_filter: order,
            /* category_filter: props.history.location.state && props.history.location.state.category_filter,
            group_filter: props.history.location.state && props.history.location.state.group_filter,
            organization_filter: props.history.location.state && props.history.location.state.organization_filter, */
            query: props.history.location.state && props.history.location.state.query,
            filter:filter,
            selectedOrg: '',
            selectedCat: '',
            showDivTipo: false,
            showDivData: false,
            showDivCategoria: props.location.state?props.location.state.theme:false,
            showDivOrganizzazione: false,
            showDivVisibilita: false,
            showDivSearch: false,
            mieiContenutichecked: ownerCheck,
            sharedWithMeChecked: sharedCheck,
            showDivDataset: [],
            startDate: undefined,
            endDate: undefined,
            items: 20,
            totalResults: totalResults,
            ckanChecked: isPublic()
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
        this.handleScrollToBottom = this.handleScrollToBottom.bind(this)
        this.addOrganization = this.addOrganization.bind(this)
        this.toggleMiei = this.toggleMiei.bind(this)
        this.toggleShared = this.toggleShared.bind(this)
        this.toggleCkan = this.toggleCkan.bind(this)

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
        window.addEventListener('scroll', this.handleScrollToBottom, false);
    }

    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScrollToBottom, false);
    }

    searchAll(query){
        const { dispatch, properties, loggedUser } = this.props
        var dataset = window.location.hash.indexOf('dataset')!==-1
        var org = []
        var index = []
        var indexDef = []
        if(isPublic() && properties.domain!=='dataportal' && properties.domain!=='dataportal-private')
          org.push(properties.organization)

        if(this.state.ckanChecked===true){
          index = ['catalog_test','ext_opendata']
          indexDef = ['catalog_test','ext_opendata', 'datastory']
        }else{
          index = ['catalog_test']
          indexDef = ['catalog_test', 'datastory']
        }

        let filter = {
            'text': query,
            'index': dataset?index:indexDef,
            'org': org,
            'theme':[],
            'date': "",
            'status': [],
            'order': this.state.order_filter,
            'owner': this.state.mieiContenutichecked?loggedUser.uid:'',
            'sharedWithMe': this.state.sharedWithMeChecked,
        }

        dispatch(search(query, filter, isPublic(), this.state.filter))
        .catch((error) => {
        this.setState({
          mieiContenutichecked: false,
          sharedWithMeChecked: false,
          isFetching: false
        })
      })
    }

    //Filter Type: 0-tip, 1-cat, 2-vis, 3-org
    search(order, owner, lastFilter, sharedWithMe, ckanChecked){
        const { dispatch, properties } = this.props
        
        const queryString = require('query-string');
        const query = queryString.parse(this.props.location.search).q

        var orderFilter = ''
        if(order)
            orderFilter = order
        else{
            orderFilter = this.state.filter.order
        }
        
        var filterInt = this.state.filter
        filterInt.order = orderFilter

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
            'owner': owner,
            'sharedWithMe': sharedWithMe
        }

        if(!lastFilter){
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
        }

          
        if(dataset){
            if(filter.index.length===0){
              if(ckanChecked===false){
                filter.index = ['catalog_test']
              }else if(ckanChecked===true){
                filter.index = ['catalog_test', 'ext_opendata']
              }
            }
            dispatch(search('', filter, isPublic(), filterInt))
        }else{
          if(filter.index.indexOf('catalog_test')>-1 && ckanChecked===true){
            filter.index.push('ext_opendata')
          }else if(filter.index.length===0 && ckanChecked===false){
            filter.index = ['catalog_test', 'datastory']
          }
          dispatch(search(query, filter, isPublic(), filterInt))
          .catch((error) => {
              this.setState({
                  isFetching: false
              })
          })
        }
    }

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
        const { dispatch, loggedUser } = this.props
        const { mieiContenutichecked, sharedWithMeChecked } = this.state
        const queryString = require('query-string');
        const query = queryString.parse(this.props.location.search).q  
        let newFilter = Object.assign({}, this.state.filter); 
        newFilter.order = e.target.value
        this.setState({
            order_filter: e.target.value,
            filter: newFilter
        });
        /* dispatch(search(query, newFilter)) */
        this.search(e.target.value, (mieiContenutichecked?loggedUser.uid:''), false, sharedWithMeChecked, this.state.ckanChecked);
      }

      toggleMiei(){
        const { loggedUser } = this.props
        this.setState({
          mieiContenutichecked: true,
          sharedWithMeChecked: false
        })

        this.search(this.state.order_filter, loggedUser.uid, false, false, this.state.ckanChecked)
      }

      toggleShared(){
        this.setState({
          sharedWithMeChecked: true,
          mieiContenutichecked: false
        })

        this.search(this.state.order_filter, '', false, true, this.state.ckanChecked)
      }
      
      toggleCkan(){
        this.setState({
          ckanChecked: !this.state.ckanChecked
        })

        this.search(this.state.order_filter, '', false, false, !this.state.ckanChecked)
      }

      UNSAFE_componentWillReceiveProps(nextProps){
        const queryString = require('query-string');
        const query = queryString.parse(nextProps.location.search).q 

        if(nextProps.results!==this.props.results){
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
        const { loggedUser } = this.props
        const { mieiContenutichecked } = this.state
        let newFilter = Object.assign({}, this.state.filter); 
        newFilter.elements = this.state.filter.elements.filter((_, i) => i !== index)
        this.setState({ 
            filter: newFilter
        })
        if(newFilter.elements.length===0 && newFilter.a==='' && newFilter.da===''){
            this.search(this.state.order_filter, (mieiContenutichecked?loggedUser.uid:''), true, this.state.sharedWithMeChecked, this.state.ckanChecked)
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

    handleScrollToBottom = () => {
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) && this.props.results.length) {
            this.loadMore()
        }
    }

    addOrganization(newValue){
      this.setState({
        selectedOrg: newValue
      })

      if(newValue){
        this.addFilter(3, newValue)
      }
    }

 
    render() {
        const { results, isFetching, properties, loggedUser, filter } = this.props
        
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
                            <nav className="text-gray-600">
                              <div className="container mb-3">
                                <div className="row">
                                  {window.location.hash.indexOf('dataset')!==-1 && <div className="col"><i className="fa-pull-left fa fa-table fa-lg my-2 mr-3" style={{lineHeight: '1'}}></i><h2>Dataset trovati <i>{this.state.totalResults}</i></h2></div>}
                                  {window.location.hash.indexOf('dataset')===-1 && <div className="col"><i className="fa-pull-left fa fa-search fa-lg my-2 mr-3" style={{lineHeight: '1'}}></i><h2>{search && 'Hai cercato ' }<i className="mr-1">{search?search:""}</i> trovati <i>{this.state.totalResults}</i> risultati</h2></div>}
                                  {!isPublic() && <div className="pt-2"><b className="h5 font-weight-bold">Ckan data</b> <button className="btn btn-link mr-2 py-0 px-1" title="Abilita la ricerca a tutti i dataset open data del catalogo ckan nazionale"><i className="fas fa-info-circle fa-lg"/></button>
                                  <label className="switch switch-3d switch-primary mr-3">
                                    <input type="checkbox" className="switch-input" checked={this.state.ckanChecked} onChange={this.toggleCkan} onClick={this.toggleCkan}/>
                                    <span className="switch-label" title="Abilita la ricerca a tutti i dataset open data del catalogo ckan nazionale"></span>
                                    <span className="switch-handle" title="Abilita la ricerca a tutti i dataset open data del catalogo ckan nazionale"></span>
                                  </label></div>}
                                  {/* !isPublic() && <div className="py-2"><b className="h5 font-weight-bold mr-2">I miei contenuti</b>
                                  <label className="switch switch-3d switch-primary mr-3">
                                    <input type="checkbox" className="switch-input" checked={this.state.mieiContenutichecked} onClick={this.toggleMiei}/>
                                    <span className="switch-label" title="Visualizza solo i miei contenuti"></span>
                                    <span className="switch-handle" title="Visualizza solo i miei contenuti"></span>
                                  </label></div> */}
                                  {!isPublic() && <div id="tab" className="btn-group btn-group-toggle" data-toggle="buttons">
                                    <label className={"btn btn-outline-filters "+((!this.state.mieiContenutichecked&&!this.state.sharedWithMeChecked)?"active":"")}>
                                      <input type="radio" name="all" id="option1" onClick={()=>{this.setState({ sharedWithMeChecked: false, mieiContenutichecked: false}); this.search(this.state.order_filter, '', false, false, this.state.ckanChecked)}}/> Tutti i contenuti 
                                    </label>
                                    <label className={"btn btn-outline-filters "+((!this.state.mieiContenutichecked&&this.state.sharedWithMeChecked)?"active":"")}>
                                      <input type="radio" name="shared" id="option2" onClick={this.toggleShared}/> Condivisi con me
                                    </label>
                                    <label className={"btn btn-outline-filters "+((this.state.mieiContenutichecked&&!this.state.sharedWithMeChecked)?"active":"")}>
                                      <input type="radio" name="mine" id="option3" onClick={this.toggleMiei}/> I miei contenuti
                                    </label>
                                  </div>}
                                </div>  
                              </div>
                              <div className="container mb-3">
                                {/* <i className="fas fa-user text-primary mr-2 fa-lg"/> */}
                              </div>
                            </nav>
                            <nav className={"dashboardHeader b-t-1 b-b-1 "+(this.state.showDivSearch?"mb-0":"")}>
                                <div className="px-5 container" style={{}}>
                                  <div className="row">
                                    <div className="mr-auto" >
                                        <ul className="nav">
                                            {window.location.hash.indexOf('dataset')<=-1 &&<li className="nav-item"><button type="button" className={"b-t-0 b-b-0 btn p-3 "+ (this.state.showDivTipo ? "btn-secondary":"btn-outline-filters")} onClick={this.handleToggleClickTipo}>Tipo <i className={"fa " + (this.state.showDivTipo ? "fa-angle-up" : "fa-angle-down")}></i></button></li>}
                                            <li className="nav-item"><button type="button" className={"b-t-0 b-b-0 btn p-3 "+ (this.state.showDivData ? "btn-secondary":"btn-outline-filters")} onClick={this.handleToggleClickData}>Data <i className={"fa " + (this.state.showDivData ? "fa-angle-up" : "fa-angle-down")}></i></button></li>
                                            <li className="nav-item"><button type="button" className={"b-t-0 b-b-0 btn p-3 "+ (this.state.showDivCategoria ? "btn-secondary":"btn-outline-filters")} onClick={this.handleToggleClickCategoria}>Categoria <i className={"fa " + (this.state.showDivCategoria ? "fa-angle-up" : "fa-angle-down")}></i></button></li>
                                            {orgFilter && <li className="nav-item"><button type="button" className={"b-t-0 b-b-0 btn p-3 "+ (this.state.showDivOrganizzazione ? "btn-secondary":"btn-outline-filters")} onClick={this.handleToggleClickOrganizzazione}>Organizzazione <i className={"fa " + (this.state.showDivOrganizzazione ? "fa-angle-up" : "fa-angle-down")}></i></button></li>}
                                            {!isPublic() && <li className="nav-item"><button type="button" className={"b-t-0 b-b-0 btn p-3 "+ (this.state.showDivVisibilita ? "btn-secondary":"btn-outline-filters")} onClick={this.handleToggleClickVisibilita}>Visibilità <i className={"fa " + (this.state.showDivVisibilita ? "fa-angle-up" : "fa-angle-down")}></i></button></li>}
                                            {/* <button type="button" className={"b-t-0 b-b-0 btn "+ (this.state.showDivSearch ? "btn-secondary":"btn-outline-filters")} onClick={this.handleToggleClickSearch}><i className="fa fa-search fa-lg"/></button> */}
                                        </ul>
                                    </div>
                                    <div className="ml-auto pl-3" >
                                        <select className="form-control h-100 b-t-0 b-b-0" id="ordinamento" aria-required="true" onChange={this.handleChangeOrdinamento.bind(this)} value={this.state.order_filter}>
                                            <option value="score">Per rilevanza</option>
                                            <option value="asc">Data crescente</option>
                                            <option value="desc">Data decrescente</option>
                                            <option value="a-z">Alfabetico crescente (A - Z)</option>
                                            <option value="z-a">Alfabetico decrescente (Z - A)</option>
                                        </select>
                                    </div>
                                  </div>
                                </div>
                            </nav>
                            <nav className={"dashboardHeader "+(this.state.showDivSearch?"px-5 container bg-secondary":"container px-5")}>
                            {this.state.showDivTipo && results &&
                                Object.keys(JSON.parse(results[results.length-4].source)).map((tipo, index) =>{
                                    var tipi=JSON.parse(results[results.length-4].source)
                                    if(tipi.ext_opendata){
                                      var countCatalog = parseInt(tipi['catalog_test'])
                                      tipi['catalog_test'] = countCatalog +parseInt(tipi['ext_opendata'])
                                    }

                                    if(tipo!=='ext_opendata')
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
                                    noBorder
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
                                isRtl={false}
                                isSearchable={true}
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
                                {(this.state.filter.elements.length>0 || this.state.filter.da || this.state.filter.a) && <button type="button" onClick={this.search.bind(this, this.state.order_filter, (this.state.mieiContenutichecked?loggedUser.uid:''), false, this.state.sharedWithMeChecked, this.state.ckanChecked)} style={{height: '48px'}} className="ml-2 btn btn-accento px-4">Filtra</button>}
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
                                          // console.error(error)
                                        }

                                        let fields = datasetMatch.dataschema&&datasetMatch.dataschema.avro&&datasetMatch.dataschema.avro.fields?datasetMatch.dataschema.avro.fields:dataset.dataschema.avro.fields
                                        return(
                                            <div className="container px-5" key={index}>
                                                <div className="card risultato-1 mt-3 mb-0" >
                                                    <div className="card-body p-0 clearfix bg-light">
                                                        <div className="p-3 float-left bg-dataset">
                                                            <i className="fa fa-table"></i>
                                                        </div>
                                                        <div className="row pl-3 pt-3 h-100" >
                                                            <div className="col-md-6 px-1" >
                                                                <Link to={isPublic()?'/dataset/' + dataset.dcatapit.name:'/private/dataset/' + dataset.dcatapit.name} className="title-res text-primary">
{/*                                                                <div title={dataset.dcatapit.title} dangerouslySetInnerHTML={{__html: datasetMatch['dcatapit.title']?truncateDatasetName(datasetMatch['dcatapit.title'],100):truncateDatasetName(dataset.dcatapit.title, 60)}}></div>
 */}                                                               <div title={dataset.dcatapit.title} className="text-truncate" dangerouslySetInnerHTML={{__html: datasetMatch['dcatapit.title']?datasetMatch['dcatapit.title']:dataset.dcatapit.title}}></div>
                                                                </Link>
                                                            </div>
                                                            <div className="col-md-2 px-4" >
                                                                <span className="badge badge-info my-1">{decodeTheme(dataset.dcatapit.theme)}</span>
                                                            </div>
                                                            <div className="col-md-2 px-3" >
                                                                <div title={dataset.dcatapit.owner_org} className="text-truncate" dangerouslySetInnerHTML={{__html: dataset.dcatapit.owner_org}}></div>
                                                            </div>
                                                            <div className="col-sm-2 pl-4">
                                                                <div className="row">
                                                                    <div className="ml-auto pr-3">
                                                                        {!dataset.dcatapit.privatex && <i className="fa fa-globe fa-lg text-icon pt-1"/>}
                                                                        {dataset.dcatapit.privatex && <i className="fa fa-users fa-lg text-icon pt-1"/>}
                                                                        <button type="button" className="b-t-0 b-b-0 b-l-0 b-r-0 btn btn-outline-filters pt-0 pl-4" onClick={this.handleToggleClickDataset.bind(this, index)}>
                                                                            {this.state.showDivDataset && this.state.showDivDataset.length>0 && this.state.showDivDataset.indexOf(index)>-1?<div><i className="fa fa-angle-up"></i></div>:<div><i className="fa fa-angle-down"></i></div>}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {this.state.showDivDataset && this.state.showDivDataset.length>0 && this.state.showDivDataset.indexOf(index)>-1 && 
                                                <div className="card mb-3 mt-0">
                                                    <div className="card-body clearfix">
                                                        <div className="row pl-3 pt-2" >
                                                            <div className="col-md-2 py-1 px-1" >
                                                                <b>Titolo: </b>
                                                            </div>
                                                            <div className="col-md-8 py-1 px-1" >
                                                            <div dangerouslySetInnerHTML={{__html: datasetMatch['dcatapit.title']?datasetMatch['dcatapit.title']:dataset.dcatapit.title}}></div>
                                                            </div>
                                                        </div>
                                                        <div className="row pl-3 pt-2" >
                                                                <div className="col-md-2 py-1 px-1" >
                                                                    <b>Ultima modifica: </b>
                                                                </div>
                                                                <div className="col-md-8 py-1 px-1" >
                                                                    {dataset.dcatapit.modified}
                                                                </div>
                                                        </div>
                                                        <div className="row pl-3 pt-2" >
                                                            <div className="col-md-2 py-1 px-1" >
                                                                    <b>Descrizione: </b>
                                                                </div>
                                                                <div className="col-md-8 py-1 px-1" >
                                                                    <div dangerouslySetInnerHTML={{__html: datasetMatch['dcatapit.notes']?datasetMatch['dcatapit.notes']:dataset.dcatapit.notes}}></div>
                                                                </div>
                                                        </div>
                                                        <div className="row pl-3 pt-2" >
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
                                                    datasetOpenMatch = datasetOpen
                                                    datasetOpenMatch = JSON.parse(result.match)
                                                    return(
                                                        <div className="container px-5" key={index}>
                                                        <div className="card risultato-1 mt-3 mb-0" >
                                                            <div className="card-body p-0 clearfix bg-e7ecef">
                                                                <div className="p-3 float-left bg-dataset">
                                                                    <i className="fa fa-table"></i>
                                                                </div>
                                                                <div className="b-r-dash b-l-ext bg-light float-left text-icon p-3 h-100">
                                                                    <i className="fa fa-external-link-square-alt"></i>
                                                                </div>
                                                                <div className="row pl-3 pt-3 h-100" >
                                                                    <div className="col-md-6 px-1" >
                                                                                <Link to={isPublic()?'/dataset/' + datasetOpen.name + '?type=open':'/private/dataset/' + datasetOpen.name + '?type=open'} className="title-res text-primary">
                                                                                    {/* <div title={datasetOpen.title} dangerouslySetInnerHTML={{__html: datasetOpenMatch['title']?truncateDatasetName(datasetOpenMatch['title'],100):truncateDatasetName(datasetOpen.title, 60)}}></div> */}
                                                                                    <div title={datasetOpen.title} className="text-truncate" dangerouslySetInnerHTML={{__html: datasetOpenMatch['title']?datasetOpenMatch['title']:datasetOpen.title}}></div>
                                                                                </Link>
                                                                            </div>
                                                                            <div className="col-md-2 px-1" >
                                                                                <span className="badge badge-info my-1">{decodeTheme(datasetOpen.theme)}</span>
                                                                            </div>
                                                                            <div className="col-md-2 px-1" >
                                                                                <div title={datasetOpen.organization.name} className="text-truncate" dangerouslySetInnerHTML={{__html: datasetOpen.organization.name}}></div>
                                                                            </div>
                                                                            <div className="col-sm-2 pl-4">
                                                                                <div className="row">
                                                                                    <div className="ml-auto pr-3">
                                                                                        <i className="fa fa-globe fa-lg text-icon pt-1"/>
                                                                                        <button type="button" className="b-t-0 b-b-0 b-l-0 b-r-0 btn btn-outline-filters pt-0 pl-4" onClick={this.handleToggleClickDataset.bind(this, index)}>
                                                                                            {this.state.showDivDataset && this.state.showDivDataset.length>0 && this.state.showDivDataset.indexOf(index)>-1?<div><i className="fa fa-angle-up"></i></div>:<div><i className="fa fa-angle-down"></i></div>}
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {this.state.showDivDataset && this.state.showDivDataset.length>0 && this.state.showDivDataset.indexOf(index)>-1 && 
                                                                <div className="card mb-3 mt-0">
                                                                    <div className="card-body clearfix">
                                                                        <div className="row px-3 pt-2" >
                                                                            <div className="col-md-2 py-1 px-1" >
                                                                                <b>Titolo: </b>
                                                                            </div>
                                                                            <div className="col-md-8 py-1 px-1" >
                                                                            <div dangerouslySetInnerHTML={{__html: datasetOpenMatch['title']?datasetOpenMatch['title']:datasetOpen.title}}></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row px-3 pt-2" >
                                                                                <div className="col-md-2 py-1 px-1" >
                                                                                    <b>Ultima modifica: </b>
                                                                                </div>
                                                                                <div className="col-md-8 py-1 px-1" >
                                                                                    {datasetOpen.modified}
                                                                                </div>
                                                                        </div>
                                                                        <div className="row px-3 pt-2" >
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
                                                    // console.error(error)
                                                }
                                                
                                                    break;
                                   
                                    case 'datastory': 
                                        let story = JSON.parse(result.source)
                                        let storyMatch = story
                                        try {
                                            storyMatch = JSON.parse(result.match)
                                        } catch (error) {
                                          // console.error(error)
                                        }
                                        if ((story.widgets) && (story.layout && story.layout !== '{}')) {
                                            const dashwidgets = story.widgets.filter(wid=>{
                                              return wid.identifier.toLowerCase().indexOf('textwidget')<0
                                            })
                          
                                            var firstLayout = dashwidgets.length>0?dashwidgets[0]:''
                          
                                            var time = 0
                                            for (let k = 0; k < story.widgets.length; k++){
                                              if(story.widgets[k].identifier.toLowerCase().indexOf('textwidget')!==-1){
                                                var text = story.widgets[k].text
                                                var array = text?text.split(' '):[]
                                                
                                                time = time + (array.length/275)
                                              }
                                              else
                                                time = time + 1 
                                            }
                                          }
                                        return(
                                            <div className="container px-5" key={index}>
                                                <div className="card risultato-1 mt-3 mb-0">
                                                <div className="card-body p-0 clearfix">
                                                    <div className="bg-primary p-3 float-left h-100">
                                                        <i className="fa fa-font"></i>
                                                    </div>
                                                    <div className="row pl-3 pt-3 h-100" >
                                                        <div className="col-md-6 py-1 px-1" >
                                                            <Link to={isPublic()?'/datastory/list/' + story.id:'/private/datastory/list/' + story.id} className="title-res text-primary">                                                                    
{/*                                                                 <div title={story.title} dangerouslySetInnerHTML={{__html: storyMatch['title']?truncateDatasetName(storyMatch['title'],100):truncateDatasetName(story.title, 60)}}></div>
 */}                                                        <div title={story.title} className="text-truncate" dangerouslySetInnerHTML={{__html: storyMatch['title']?storyMatch['title']:story.title}}></div>    
                                                            </Link>
                                                        </div>
                                                        <div className="col-md-2 px-1" ></div>
                                                        <div className="col-md-2 px-1" >
                                                            <div title={story.org} className="text-truncate" dangerouslySetInnerHTML={{__html: story.org}}></div>
                                                        </div>
                                                        <div className="col-sm-2 pl-4">
                                                            <div className="row">
                                                                <div className="ml-auto pr-3">
                                                                    {story.status===2 && <i className="fa fa-globe fa-lg text-icon pt-1"/>}
                                                                    {story.status===1 && <i className="fa fa-users fa-lg text-icon pt-1"/>}
                                                                    {story.status===0 && <i className="fas fa-lock fa-lg text-icon pt-1"/>}
                                                                    <button type="button" className="b-t-0 b-b-0 b-l-0 b-r-0 py-0 btn btn-outline-filters pt-0 pl-4" onClick={this.handleToggleClickDataset.bind(this, index)}>
                                                                        {this.state.showDivDataset && this.state.showDivDataset.length>0 && this.state.showDivDataset.indexOf(index)>-1?<div><i className="fa fa-angle-up"></i></div>:<div><i className="fa fa-angle-down"></i></div>}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                                {this.state.showDivDataset && this.state.showDivDataset.length>0 && this.state.showDivDataset.indexOf(index)>-1 && 
                                                    <div className="card mb-3 mt-0">
                                                        <div className="card-body clearfix">
                                                            <div className="row pl-3 pt-2" >
                                                                <div className="col-md-2 py-1 px-1" >
                                                                    <b>Titolo: </b>
                                                                </div>
                                                                <div className="col-md-8 py-1 px-1" >
                                                                    <div title={story.title} dangerouslySetInnerHTML={{__html: storyMatch['title']?storyMatch['title']:story.title}}></div>
                                                                </div>
                                                            </div>
                                                            <div className="row pl-3 pt-2" >
                                                                <div className="col-md-2 py-1 px-1" >
                                                                    <b>Ultima modifica: </b>
                                                                </div>
                                                                <div className="col-md-8 py-1 px-1" >
                                                                    {story.timestamp}
                                                                </div>
                                                            </div>
                                                            <div className="row pl-3 pt-2" >
                                                                <div className="col-md-2 py-1 px-1" >
                                                                    <b>Sottotitolo: </b>
                                                                </div>
                                                                <div className="col-md-8 py-1 px-1" >
                                                                    <div title={story.subtitle} dangerouslySetInnerHTML={{__html: storyMatch['subtitle']?storyMatch['subtitle']:story.subtitle}}></div>
                                                                </div>
                                                            </div>
                                                            <div className="row pl-3 pt-2" >
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

function mapStateToProps(state) {
    const { loggedUser } = state.userReducer['obj'] || { }
    const { isFetching, results, query, filter, filterInt } = state.searchReducer['search'] || { isFetching: false, results: [] }
    const { properties } = state.propertiesReducer['prop'] || {}
    return { isFetching, results, query, filter, filterInt, properties, loggedUser }
}

export default connect(mapStateToProps)(DatasetList)