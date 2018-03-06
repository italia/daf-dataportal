import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  loadDatasets,
  unloadDatasets,
  datasetDetail,
  getFileFromStorageManager
} from '../../actions'
import OrderFilter from '../../components/Dataset/OrderFilter'
import CategoryFilter from '../../components/Dataset/CategoryFilter'
import GroupFilter from '../../components/Dataset/GroupFilter'
import OrganizationFilter from '../../components/Dataset/OrganizationFilter'
import InfiniteScroll from '../../components/InfinityScroll'
import { transformName } from '../../utility'
import MetadataEditor from "../../components/Dataset/MetadataEditor";
import { serviceurl } from '../../config/serviceurl'
import download from 'downloadjs'
import ReactJson from 'react-json-view'

class Dataset extends Component {
  constructor(props) {
    super(props)
    /* this.setState({ isLoading: false }) */
    this.state = {
      items: 10,
      visibility: 'visible',
      order_filter: props.history.location.state?props.history.location.state.order_filter:'metadata_modified%20desc',
      
      category_filter: props.history.location.state && props.history.location.state.category_filter,
      group_filter: props.history.location.state && props.history.location.state.group_filter,
      organization_filter: props.history.location.state && props.history.location.state.organization_filter,
      
      showDivCategory: props.history.location.state && props.history.location.state.category_filter?true:false,
      showDivGroup: props.history.location.state && props.history.location.state.group_filter?true:false,
      showDivOrganization: props.history.location.state && props.history.location.state.organization_filter?true:false,
      
      edit: false,
      organizations: []    
    }

    this.load();

    this.handleUnloadDatasetClick = this.handleUnloadDatasetClick.bind(this)
    this.handleLoadDatasetDetailClick = this.handleLoadDatasetDetailClick.bind(this)
    this.handleToggleClickCat = this.handleToggleClickCat.bind(this)
    this.handleToggleClickGroup = this.handleToggleClickGroup.bind(this)
    this.handleToggleClickOrganization = this.handleToggleClickOrganization.bind(this);
    this.onSearch = this.onSearch.bind(this) 
    this.onClick = this.onClick.bind(this)   
  }

  componentDidMount(){
    const { query, datasets } = this.props
    const { order_filter, category_filter, organization_filter, group_filter } = this.state
    if(datasets != [] && query===undefined){
      this.searchDataset(query, category_filter, group_filter, organization_filter, order_filter)
    }
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

  onClick(name, e){
    e.preventDefault()
    this.setState({
      edit: true
    })
    const { dispatch } = this.props
    dispatch(datasetDetail(name))
    this.props.history.push('?edit='+name)
  }

  loadMore = () => {
    if (this.state.isLoading) { return }
    var totitems = this.state.items + 10;
    this.setState({ items: totitems,
    visibility: "hidden" });
  }

  handleScrollToBottom = () => this.loadMore()
  handleLoadMoreClick = () => this.loadMore()

  searchDataset(query, category, group, organization, order) {
    const { dispatch } = this.props
    dispatch(loadDatasets(query, 0, '', category, group, organization, order))
  }

  handleUnloadDatasetClick(e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(unloadDatasets())
  }

  handleLoadDatasetDetailClick(name, e) {
    e.preventDefault()
    this.setState({
      edit: false
    })
    const { dispatch, query } = this.props
    const { order_filter, category_filter, organization_filter, group_filter } = this.state
/*     dispatch(datasetDetail(name, query, category_filter, group_filter, organization_filter, order_filter))
    .catch(error => console.log('Errore durante il caricamento del dataset ' + name))
    .then(()=>this.props.history.push('/dataset/'+name)) */
    //this.props.history.push('/dataset/'+name)
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

  renderDataset() {
    this.searchDataset(this.props.match.params.query);
  }

  handleToggleClickCat() {
    this.setState(prevState => ({
      showDivCategory: !prevState.showDivCategory
    }));
  }

  handleToggleClickGroup() {
    this.setState(prevState => ({
      showDivGroup: !prevState.showDivGroup
    }));
  }

  handleToggleClickOrganization() {
    this.setState(prevState => ({
      showDivOrganization: !prevState.showDivOrganization
    }));
  }

  onSearch(category, group, organization, order) {
    const { query } = this.props
    if (order){
      this.setState({
        order_filter: order
      })
    }else
      order = this.state.order_filter;

    if (category){
      this.setState({
        category_filter: category
      });
    }else
      category = this.state.category_filter;
    
    if (group){
      this.setState({
        group_filter: group
      });
    }else
      group = this.state.group_filter

    if (organization){
      this.setState({
        organization_filter: organization
      });
    }else
      organization = this.state.organization_filter

    this.searchDataset(query, category, group, organization, order);
  }

renderDatasetList(length, datasets, ope, isLoading){
  const { visibility, items } = this.state;
  let visible = length<=items ? 'hidden':visibility;
  if (ope === 'RECEIVE_DATASETS')
    return <InfiniteScroll onScrollToBottom={this.handleScrollToBottom}>
      {datasets.map(dataset => {
        return (
            <div className="dataset-summary" key={dataset.name}>
              <div className="card-body mt-2">
                <div className="row">
                  <div className="col-9">
                    <a href onClick={this.handleLoadDatasetDetailClick.bind(this, dataset.name)} style={{color: 'black'}}>
                      <h3 className="card-text">{transformName(dataset.name)}</h3>
                    </a>
                  </div>
                  <p className="card-subtitle col-3 mt-2">
                    {dataset.tags.map(tag => {
                      return <span className="badge badge-pill badge-primary float-right" key={tag.name}> {tag.name}</span>
                    }
                    )}
                  </p>
                </div>
                <div className="mt-2 row">
                  <div className="col-9">
                    <p className="mb-0 text-muted">{dataset.organization.name}</p>
                    <p className="text-left">{dataset.notes}</p>
                    {/* <p className="text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.  
                    </p>*/}

                  </div>
                  <div className="col-3">
                    <span className="badge badge-secondary float-right m-1" key="CSV"> CSV</span>
                  <span className="badge badge-secondary float-right m-1" key="JSON"> JSON</span>
                  </div>
                </div>
              </div>
            </div>
        );
      }
      )}
      <button
        className="List-load-more-button"
        onClick={this.handleLoadMoreClick}
        disabled={isLoading} style={{visibility: visible }}>
        {isLoading ? 'Loading...' : 'Load more'}
      </button>
    </InfiniteScroll>
}

renderDatasetSearchResult(length, datasets, ope, isLoading){
  if (ope === 'RECEIVE_DATASETS')
    if (datasets && datasets.length > 0){
      return ( 
        <div className="App" style={{"paddingLeft": "10px"}}>
          <div className="App-header-thin">
            {length > 999 ?
              <div><h6 className="modal-title pull-left">Sono stati trovati più di 1000 datasets, ti consigliamo di affinare la ricerca</h6><h6 className="modal-title pull-right">Dataset mostrati {datasets.length}</h6></div>
            :
/*               <div>
                <h6 className="modal-title pull-left">Sono stati trovati {length} datasets</h6>
                <h6 className="modal-title pull-right">Dataset mostrati {datasets.length}</h6>
              </div> */

              <div className="row">
                <div className="col-sm-4">
                  <div className="callout callout-warning">
                    <small className="text-muted">Dataset Trovati</small><br/>
                    <strong className="h4">{length}</strong>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="callout callout-danger">
                    <small className="text-muted">Dataset mostrati</small><br/>
                    <strong className="h4">{datasets.length}</strong>
                  </div>
                </div>
                <div className="col-sm-4">
                    <strong>Ordina i risultati</strong>
                    <OrderFilter order_filter={this.state.order_filter} onSearchOrder={this.onSearch} />
                </div>
              </div>

            }
          </div>
          {this.renderDatasetList(length, datasets, ope, isLoading)}
        </div>
      )
    }else
      return(
        <div className="App">
          <div className="App-header-thin">
            <div><h6 className="modal-title pull-left">Sono stati trovati {length} datasets</h6><h6 className="modal-title pull-right">Prova con un'altra ricerca</h6></div>
          </div>
        </div>
      )
}

renderFilter(ope){
  console.log(this.state.showDivCategory ? "fa-angle-down" : "fa-angle-right")
  if (ope === 'RECEIVE_DATASETS')
      return(  
      <div className="col-md-4" style={{paddingTop: '20px'}}>
      
      <ul className="list-group">  
        <li className="list-group-item-lev1" onClick={this.handleToggleClickCat}>
          <h3 className="filter-title">Filtra categorie<i className={"fa float-right fa-lg " + (this.state.showDivCategory ? "fa-angle-down" : "fa-angle-right")}></i></h3>
        </li>  
        {this.state.showDivCategory &&
        <div className="u-sizeFull" id="subnav">
          <CategoryFilter category_filter={this.state.category_filter} onSearch={this.onSearch}/>
        </div> 
        }
        <li className="list-group-item-lev1" onClick={this.handleToggleClickGroup}>
          <h3 className="filter-title">Filtra formati<i className={"fa float-right fa-lg " + (this.state.showDivGroup ? "fa-angle-down" : "fa-angle-right")}></i></h3>
        </li>
        {this.state.showDivGroup &&
        <div className="u-sizeFull" id="subnav">
          <GroupFilter group_filter={this.state.group_filter} onSearch={this.onSearch}/>
        </div>
        }
        <li className="list-group-item-lev1" onClick={this.handleToggleClickOrganization}>
          <h3 className="filter-title">Filtra organizzazioni<i className={"fa float-right fa-lg " + (this.state.showDivOrganization ? "fa-angle-down" : "fa-angle-right")}></i></h3>
        </li>
        {this.state.showDivOrganization &&
        <div className="u-sizeFull" id="subnav">
          <OrganizationFilter organizations={this.state.organizations} organization_filter={this.state.organization_filter}  onSearch={this.onSearch}/>
        </div>
        }
      </ul>
    </div>
    )
  else
    return null;
}

editDataset(ope){
  if (ope != 'RECEIVE_DATASETS')
  return(
    <div className="col-12">
      {/* <button onClick={(e) => {e.preventDefault();this.setState({edit:false})}}>Chiudi</button> */}
      <MetadataEditor/>
    </div>
  )
}

render() {
  const { datasets, dataset, ope, json, isFetching } = this.props
  const { isLoading, items, edit } = this.state;
  if(datasets)
    var subdatasets = datasets.slice(0, items)
  return isFetching === true ? <h1 className="text-center fixed-middle"><i className="fa fa-circle-o-notch fa-spin mr-2"/>Loading</h1> : (
      <div className="row u-textCenter u-padding-r-all u-textCenter">
      <div className="col-md-8">
      {this.renderDatasetSearchResult(datasets?datasets.length:0, subdatasets, ope, isLoading)}
      </div>
      {this.renderFilter(ope)}
      {edit && this.editDataset(ope)}
    </div>
  )
}
}

Dataset.propTypes = {
  selectDataset: PropTypes.string,
  query: PropTypes.string,
  datasets: PropTypes.array,
  dataset: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  ope: PropTypes.string,
  json: PropTypes.array
}

function mapStateToProps(state) {
  const { isFetching, lastUpdated, dataset, items: datasets, query, ope, json } = state.datasetReducer['obj'] || { isFetching: true, items: [], ope: '' }
  return { datasets, dataset, isFetching, lastUpdated, query, ope, json }
}

export default connect(mapStateToProps)(Dataset)