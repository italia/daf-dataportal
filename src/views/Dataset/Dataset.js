import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  loadDatasets,
  unloadDatasets,
  datasetDetail
} from '../../actions'
import OrderFilter from '../../components/Dataset/OrderFilter'
import CategoryFilter from '../../components/Dataset/CategoryFilter'
import GroupFilter from '../../components/Dataset/GroupFilter'
import OrganizationFilter from '../../components/Dataset/OrganizationFilter'
import InfiniteScroll from '../../components/InfinityScroll'
import { transformName } from '../../utility'
import MetadataEditor from "../../components/Dataset/MetadataEditor";
import { serviceurl } from '../../config/serviceurl'

class Dataset extends Component {
  constructor(props) {
    super(props)
    /* this.setState({ isLoading: false }) */
    this.state = {
      items: 10,
      visibility: 'visible',
      order_filter: 'metadata_modified%20desc',
      category_filter: props.history.location.state && props.history.location.state.category,
      group_filter: props.history.location.state && props.history.location.state.group,
      organization_filter: props.history.location.state && props.history.location.state.organization,
      showDivCategory: false,
      showDivGroup: false,
      showDivOrganization: false,
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

  searchDataset(category, group, organization, order) {
    const { dispatch, query } = this.props
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
    const { dispatch } = this.props
    dispatch(datasetDetail(name))
    this.props.history.push('?detail='+name)
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

    this.searchDataset(category, group, organization, order);
  }

renderDatasetList(length, datasets, ope, isLoading){
  const { visibility, items } = this.state;
  let visible = length<=items ? 'hidden':visibility;
  if (ope === 'RECEIVE_DATASETS')
    return <InfiniteScroll onScrollToBottom={this.handleScrollToBottom}>
      {datasets.map(dataset => {
        return (<div className="card" key={dataset.name}>
              <div className="card-body mt-2 b-b-1">
                <a href className="card-link" onClick={this.handleLoadDatasetDetailClick.bind(this, dataset.name)}>
                  <h5 className="card-text col-12">{transformName(dataset.name)}</h5>
                </a>
              <div className="d-inline-flex mt-2 b-t-1 col-12">
                <div className="col-8 b-r-1">
                  <p className="card-text mt-2">{dataset.notes}</p>
                  <p className="card-subtitle mb-2 text-muted">Organizzazione: {dataset.organization.name}</p>
                  <p className="card-subtitle mb-2 text-muted">Stato: {dataset.organization.state}</p>
                </div>
                <div className="col-4">
                  <p className="card-subtitle mb-2 mt-2"><strong>{"Aggiornato il" + " "}</strong> {dataset.modified}</p>
                  <p className="card-subtitle mb-2"><strong>{"Pubblicato da" + " "}</strong> {dataset.publisher_name}</p>
                </div>
                  {/* <a href className="card-link" onClick={this.handleLoadDatasetDetailClick.bind(this, dataset.name)}>Dettaglio Dataset</a> */}
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
        <div className="App">
          <div className="App-header b-a-1">
            {length > 999 ?
              <div><h6 className="modal-title pull-left">Sono stati trovati più di 1000 datasets, ti consigliamo di affinare la ricerca</h6><h6 className="modal-title pull-right">Dataset mostrati {datasets.length}</h6></div>
            :
              <div><h6 className="modal-title pull-left">Sono stati trovati {length} datasets</h6><h6 className="modal-title pull-right">Dataset mostrati {datasets.length}</h6></div>
            }
          </div>
          {this.renderDatasetList(length, datasets, ope, isLoading)}
        </div>
      )
    }else
      return(
        <div className="App">
          <div className="App-header">
            <div><h6 className="modal-title pull-left">Sono stati trovati {length} datasets</h6><h6 className="modal-title pull-right">Prova con un'altra ricerca</h6></div>
          </div>
        </div>
      )
}

renderDatasetDetail(dataset, ope){
  if (ope === 'RECEIVE_DATASET_DETAIL' && this.state.edit===false) {
    if (dataset)
      return (
          <div className="col-12">
          
            <div className="card">
{/*               <div className="card-header">
                Descrizione
                </div> */}
              <div className="card-block">
                <div className="col-12">
                  <h2 className="card-text">{transformName(dataset.name)+" "}<span className="badge badge-primary">{dataset.theme}</span></h2>
                </div>
              <div className="d-inline-flex b-t-1 mt-2 pt-1">
                  <div className="col-8 b-r-1">
                    <h6 className="card-text">{dataset.notes}</h6>
                    <p className="card-text"><strong>Licenza:</strong> Creative Commons Attribution 4.0 International (CC-BY 4.0)</p>
                  </div>
                  <div className="col-4">
                    <p className="card-text"><strong>{"Aggiornato il"+" "}</strong> {dataset.modified}</p>
                    <p className="card-text"><strong>{"Pubblicato da" + " "}</strong> {dataset.publisher_name}</p>
                  </div>
                </div>
              <button type="button" className="btn btn-default float-right" onClick={this.onClick.bind(this, dataset.name)}><i className="fa fa-edit"></i></button>
                {/* <p className="card-text"><strong>Categorie:</strong> <span className="badge badge-pill badge-primary">{dataset.theme}</span></p> */}
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                Risorse
                </div>
              <div className="card-block">
                <div className="row">
                  <div className="col-4">
                    <i className="fa fa-pie-chart fa-lg m-t-2"> Grafici</i>
                  </div>
                  <div className="col-8">
                    <p>Collegati a Metabase e cerca la tabella corrispondente a <strong>{dataset.name}</strong></p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <i className="fa fa-gears fa-lg m-t-2"> Business Intelligence</i>
                  </div>
                  <div className="col-8">
                    <p>Collegati a Superset e cerca la tabella corrispondente a <strong>{dataset.name}</strong>, se non la trovi segui le <a href="https://daf-docs.readthedocs.io/en/latest/manutente/datascience/superset.html" target="_blank">istruzioni</a> per crearla.</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <i className="fa fa-university fa-lg m-t-2"> Data Science</i>
                  </div>
                  <div className="col-8">
                    <p>Collegati a Jupyter e segui le istruzioni. Il path del file è <strong>/daf/opendata/{dataset.name}</strong>.</p>
                       
                    <strong> Pyspark </strong>
                    <code>
                    path_dataset = "/daf/opendata/<strong>{dataset.name}</strong>" <br/>
                    df = (spark.read.format("parquet") <br/>
                          .option("inferSchema", "true") <br/>
                          .option("header", "true") <br/>
                          .option("sep", "|")     <br/>
                          .load(path_dataset) <br/>
)
                    </code><br/>
                    <strong> Hive table </strong>
                    <code>
                    from pyspark.sql import HiveContext <br/>
                    hive_context = HiveContext(sc) <br/>
                    hive_context.sql("use opendata") <br/>
                    incidenti = hive_context.table('<strong>{dataset.name}</strong>') <br/>
                    incidenti
                      </code><br/>              
                      <strong> Spark Sql </strong>
                      <code>
                      spark.sql("SELECT * FROM opendata.<strong>{dataset.name}</strong>").show()
                      </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
      );
  }
}

renderFilter(ope){
  if (ope === 'RECEIVE_DATASETS')
      return(  
      <div className="col-md-4" style={{paddingTop: '20px'}}>
      <form className="form-group">
        <fieldset className="Form-fieldset">
          <h5><label htmlFor="ordinamento">Ordina risultato</label></h5>
          <div className="Form-field">
              <OrderFilter order_filter={this.state.order_filter} onSearchOrder={this.onSearch}/>
          </div>
        </fieldset>
      </form>
      
        
      <h5 onClick={this.handleToggleClickCat}>Filtra categorie</h5>  
      {this.state.showDivCategory &&
      <div className="u-sizeFull" id="subnav">
        <CategoryFilter category_filter={this.state.category_filter} onSearch={this.onSearch}/>
      </div> 
      }
      <h5 onClick={this.handleToggleClickGroup}>Filtra formati</h5>
      {this.state.showDivGroup &&
      <div className="u-sizeFull" id="subnav">
        <GroupFilter group_filter={this.state.group_filter} onSearch={this.onSearch}/>
      </div>
      }
      
      <h5 onClick={this.handleToggleClickOrganization}>Filtra organizzazioni</h5>
      
      {this.state.showDivOrganization &&
      <div className="u-sizeFull" id="subnav">
        <OrganizationFilter organizations={this.state.organizations} organization_filter={this.state.organization_filter}  onSearch={this.onSearch}/>
      </div>
      }
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
  const { datasets, dataset, ope } = this.props
  const { isLoading, items, edit } = this.state;
  if(datasets)
    var subdatasets = datasets.slice(0, items)
  return (
    <div className="row u-textCenter u-padding-r-all u-textCenter">
      <div className="col-md-8">
      {this.renderDatasetSearchResult(datasets?datasets.length:0, subdatasets, ope, isLoading)}
      </div>
      {this.renderDatasetDetail(dataset, ope)}
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
  ope: PropTypes.string
}

function mapStateToProps(state) {
  const { isFetching, lastUpdated, dataset, items: datasets, query, ope } = state.datasetReducer['obj'] || { isFetching: true, items: [], ope: '' }
  return { datasets, dataset, isFetching, lastUpdated, query, ope }
}

export default connect(mapStateToProps)(Dataset)