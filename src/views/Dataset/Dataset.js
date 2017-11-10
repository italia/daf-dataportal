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

class Dataset extends Component {
  constructor(props) {
    super(props)
    /* this.setState({ isLoading: false }) */
    this.state = {
      items: 10,
      visibility: 'visible',
      filters: true,
      order_filter: 'metadata_modified%20desc',
      category_filter: props.history.location.state && props.history.location.state.category,
      group_filter: props.history.location.state && props.history.location.state.group,
      organization_filter: props.history.location.state && props.history.location.state.organization,
      showDivCategory: false,
      showDivGroup: false,
      showDivOrganization: false,
    }

    this.handleUnloadDatasetClick = this.handleUnloadDatasetClick.bind(this)
    this.handleLoadDatasetDetailClick = this.handleLoadDatasetDetailClick.bind(this)
    this.handleToggleClickCat = this.handleToggleClickCat.bind(this)
    this.handleToggleClickGroup = this.handleToggleClickGroup.bind(this)
    this.handleToggleClickOrganization = this.handleToggleClickOrganization.bind(this);
    this.onSearch = this.onSearch.bind(this)    
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
      filters: false
    })
    const { dispatch } = this.props
    dispatch(datasetDetail(name))
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
        return (<div className="card text-center" key={dataset.name}>
              <div className="card-header"></div>
              <div className="card-body">
                <h4 className="card-title">{transformName(dataset.name)}</h4>
                <p className="card-text">{dataset.notes}</p>
                <h6 className="card-subtitle mb-2 text-muted">Organizzazione: {dataset.organization.name}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Stato: {dataset.organization.state}</h6>
                <a href="#" className="card-link" onClick={this.handleLoadDatasetDetailClick.bind(this, dataset.name)}>Dettaglio Dataset</a>
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
          <div className="App-header">
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
  if (ope === 'RECEIVE_DATASET_DETAIL') {
    if (dataset)
      return (
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                Descrizione
                </div>
              <div className="card-block">
                <h2 className="card-text">{transformName(dataset.name)}</h2>
                <h5 className="card-text">{dataset.notes}</h5>
                <p className="card-text"><strong>Licenza:</strong> Creative Commons Attribution 4.0 International (CC-BY 4.0)</p>
                <p className="card-text"><strong>Categorie:</strong> <span className="badge badge-pill badge-primary">{dataset.theme}</span></p>
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

renderFilter(){
  if(this.state.filters===true)
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
        <OrganizationFilter organization_filter={this.state.organization_filter}  onSearch={this.onSearch}/>
      </div>
      }
    </div>
    )
  else
    return null;
}

render() {
  const { datasets, dataset, ope } = this.props
  const { isLoading, items} = this.state;
  if(datasets)
    var subdatasets = datasets.slice(0, items)
  return (
    <div className="row u-textCenter u-padding-r-all u-textCenter">
      <div className="col-md-8">
      {this.renderDatasetSearchResult(datasets?datasets.length:0, subdatasets, ope, isLoading)}
      </div>
      {this.renderDatasetDetail(dataset, ope)}
      {this.renderFilter()}
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