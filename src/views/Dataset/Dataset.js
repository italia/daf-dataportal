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
      order_filter: 'metadata_modified%20desc',
      category_filter: props.history.location.state && props.history.location.state.category,
      group_filter: props.history.location.state && props.history.location.state.group,
      organization_filter: props.history.location.state && props.history.location.state.organization,
      showDivCategory: false,
      showDivGroup: false,
      showDivOrganization: false,
      showDivMetabase: false,
      showDivSuperset: false,
      showDivJupyter: false,
      edit: false,
      organizations: []    
    }

    this.load();

    this.handleUnloadDatasetClick = this.handleUnloadDatasetClick.bind(this)
    this.handleLoadDatasetDetailClick = this.handleLoadDatasetDetailClick.bind(this)
    this.handleToggleClickCat = this.handleToggleClickCat.bind(this)
    this.handleToggleClickGroup = this.handleToggleClickGroup.bind(this)
    this.handleToggleClickOrganization = this.handleToggleClickOrganization.bind(this);
    this.handleToggleClickMetabase = this.handleToggleClickMetabase.bind(this);
    this.handleToggleClickSuperset = this.handleToggleClickSuperset.bind(this);
    this.handleToggleClickJupyter = this.handleToggleClickJupyter.bind(this);
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

  handleDownloadFile(nomeFile, logical_uri, e){
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(getFileFromStorageManager(logical_uri))
    .then(json => download(JSON.stringify(json), nomeFile + '.json', 'application/json'))
    .catch(error => console.log('Errore durante il download del file ' + nomeFile))
  }

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
    .catch(error => console.log('Errore durante il caricamento del dataset ' + name))
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

  handleToggleClickMetabase() {
    this.setState(prevState => ({
      showDivMetabase: !prevState.showDivMetabase,
      showDivSuperset: false,
      showDivJupyter: false
    }));
  }

  handleToggleClickSuperset() {
    this.setState(prevState => ({
      showDivSuperset: !prevState.showDivSuperset,
      showDivMetabase: false,
      showDivJupyter: false
    }));
  }

  handleToggleClickJupyter() {
    this.setState(prevState => ({
      showDivJupyter: !prevState.showDivJupyter,
      showDivMetabase: false,
      showDivSuperset: false
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
                <div className="col-12">
                    <a href className="card-link" onClick={this.handleLoadDatasetDetailClick.bind(this, dataset.name)}>
                      <h3 className="card-text col-12">{transformName(dataset.name)}</h3>
                    </a>
                </div>
                <div className="d-inline-flex mt-2 b-t-1 col-12">
                  <div className="col-8 b-r-1">
                    <p className="card-text mt-2 text-muted">{dataset.notes}</p>
                    <p className="card-subtitle mb-2"><strong>Stato: </strong>{dataset.organization.state}</p>
                  </div>
                  <div className="col-4">
                    <p className="card-subtitle mb-2 mt-2"><strong>Organizzazione: </strong>{dataset.organization.name}</p>
                    <p className="card-subtitle mb-2"><strong>Tags: </strong> 
                    {dataset.tags.map(tag => {
                      return <span className="badge badge-pill badge-primary" key={tag.name}> {tag.name}</span>
                      }
                    )}
                    </p>
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
        <div className="App">
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
                  <div className="callout callout-info">
                    <small className="text-muted">Dataset Totali</small><br/>
                    <strong className="h4">14994</strong>
                  </div>
                </div>
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

renderDatasetDetail(dataset, ope, json){
  if ((ope === 'RECEIVE_DATASET_DETAIL' || ope === 'RECEIVE_FILE_STORAGEMANAGER') && this.state.edit===false) {
    if (dataset)
      return (
        <div className="col-10">
          <div className="card">
            <div className="card-block">
            <div className="row">
              <div className="col-12">
                <h2 className="card-text">{transformName(dataset.dcatapit.title) + " "}</h2>
              </div>
            </div>
            <div className="row mt-4">
                <div className="col-8 b-r-1">
                  <p className="card-text text-muted">{dataset.dcatapit.notes}</p>
                  <p className="card-text"><strong>Licenza: </strong>{dataset.dcatapit.license_title}</p>
                  <p className="card-text"><strong>{"Categoria: " + " "}</strong>
                    <span className="badge badge-default"> {dataset.dcatapit.theme}</span>
                  </p>
                </div>
                <div className="col-3">
                  <p className="card-text"><strong>{"Aggiornato il: " + " "}</strong> {dataset.dcatapit.modified}</p>
                  <p className="card-text"><strong>{"Pubblicato da: " + " "}</strong> {dataset.dcatapit.publisher_name}</p>
                  <p className="card-text"><strong>Tags: </strong> 
                    {dataset.dcatapit.tags.map(tag => {
                      return <span className="badge badge-pill badge-primary" key={tag.name}> {tag.name}</span>
                      }
                    )}
                  </p>
                </div>
              </div>
              {/* <p className="card-text"><strong>Categorie:</strong> <span className="badge badge-pill badge-primary">{dataset.theme}</span></p> */}
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              Risorse
                </div>
            {json?
            <div className="card-block">
              <div className="row">
                <div className="col-4">
                  <strong><p>Download File: </p></strong>
                </div>
                <div className="col-8">
                <p>{dataset.dcatapit.name} <a onClick={this.handleDownloadFile.bind(this, dataset.dcatapit.name, dataset.operational.logical_uri)}><i className="fa fa-download"></i></a></p>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <strong><p>Preview: </p></strong>
                </div>
                <div className="col-8">
                  <p><ReactJson src={json} theme="bright:inverted" collapsed="true" enableClipboard="false" displayDataTypes="false"/></p>
                </div>
              </div>
            </div>
            :
            <div className="card-block">
             <div className="row">
                <div className="col-8">
                  <p><i>Non ci sono risorse disponibili per questo Dataset.</i></p>
                </div>
              </div>
            </div>
            }
          </div>
          <div className="card">
            <div className="card-header">
              Collegamenti
            </div>
            <div className="card-block">
              <div className="row">
                <div className="col-4 col-lg-4">
                  <div className="card">
                    <div className="card-block p-1 clearfix">
                      <i className="fa fa-pie-chart bg-primary p-1 font-2xl mr-1 float-left"></i>
                      <div className="h5 text-primary mb-0 mt-h">Grafici</div>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Metabase</div>
                    </div>
                    <div className="card-footer p-x-1 py-h">
                      <a className="font-weight-bold font-xs btn-block text-muted" onClick={this.handleToggleClickMetabase}>Impostazioni<i className="fa fa-angle-right float-right font-lg"></i></a>
                    </div>
                  </div>
                </div>
                <div className="col-4 col-lg-4">
                  <div className="card">
                    <div className="card-block p-1 clearfix">
                      <i className="fa fa-gears bg-primary p-1 font-2xl mr-1 float-left"></i>
                      <div className="h5 text-primary mb-0 mt-h">Business Intelligence</div>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Superset</div>
                    </div>
                    <div className="card-footer p-x-1 py-h">
                      <a className="font-weight-bold font-xs btn-block text-muted" onClick={this.handleToggleClickSuperset}>Impostazioni<i className="fa fa-angle-right float-right font-lg"></i></a>
                    </div>
                  </div>
                </div>
                <div className="col-4 col-lg-4">
                  <div className="card">
                    <div className="card-block p-1 clearfix">
                      <i className="fa fa-university bg-primary p-1 font-2xl mr-1 float-left"></i>
                      <div className="h5 text-primary mb-0 mt-h">Data Science</div>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Jupyter</div>
                    </div>
                    <div className="card-footer p-x-1 py-h">
                      <a className="font-weight-bold font-xs btn-block text-muted" onClick={this.handleToggleClickJupyter}>Impostazioni<i className="fa fa-angle-right float-right font-lg"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.showDivMetabase &&
              <div className="row">
                <div className="col">
                    <div className="card card-block">
                    <p>Collegati a Metabase e cerca la tabella corrispondente a <strong>{dataset.dcatapit.title}</strong></p>
                    </div>
                </div>
              </div>
              }
              {this.state.showDivSuperset &&
              <div className="row">
                <div className="col">
                    <div className="card card-block">
                    <p>Collegati a Superset e cerca la tabella corrispondente a <strong>{dataset.dcatapit.title}</strong>, se non la trovi segui le <a href="https://daf-docs.readthedocs.io/en/latest/manutente/datascience/superset.html" target="_blank">istruzioni</a> per crearla.</p>
                    </div>
                </div>
              </div>
              }
              {this.state.showDivJupyter &&
              <div className="row">
                <div className="col">
                    <div className="card card-block">
                    <div className="col-12">
                        <div className="row">
                          <p>Collegati a Jupyter e segui le istruzioni. Il path del file è <strong>/daf/opendata/{dataset.dcatapit.title}</strong>.</p>
                        </div>
                        <div className="row">
                          <div className="col-2">
                            <strong> Pyspark </strong>
                          </div>
                          <div className="col-10">
                            <code>
                              path_dataset = "/daf/opendata/<strong>{dataset.dcatapit.title}</strong>" <br />
                              df = (spark.read.format("parquet") <br />
                              .option("inferSchema", "true") <br />
                              .option("header", "true") <br />
                              .option("sep", "|")     <br />
                              .load(path_dataset) <br />
                              ) <br />
                              </code>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-2">
                            <strong> Hive table </strong>
                          </div>
                          <div className="col-10">
                            <code>
                              from pyspark.sql import HiveContext <br />
                              hive_context = HiveContext(sc) <br />
                              hive_context.sql("use opendata") <br />
                              incidenti = hive_context.table('<strong>{dataset.dcatapit.title}</strong>') <br />
                              incidenti <br />
                              </code>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-2">
                            <strong> Spark Sql </strong>
                          </div>
                          <div className="col-10">
                            <code>
                              spark.sql("SELECT * FROM opendata.<strong>{dataset.dcatapit.title}</strong>").show()
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              }
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
      
      <ul className="list-group">  
        <li className="list-group-item-lev1" onClick={this.handleToggleClickCat}>
          <h3 className="filter-title">Filtra categorie<i className="fa fa-angle-right float-right font-lg"></i></h3>
        </li>  
        {this.state.showDivCategory &&
        <div className="u-sizeFull" id="subnav">
          <CategoryFilter category_filter={this.state.category_filter} onSearch={this.onSearch}/>
        </div> 
        }
        <li className="list-group-item-lev1" onClick={this.handleToggleClickGroup}>
          <h3 className="filter-title">Filtra formati<i className="fa fa-angle-right float-right font-lg"></i></h3>
        </li>
        {this.state.showDivGroup &&
        <div className="u-sizeFull" id="subnav">
          <GroupFilter group_filter={this.state.group_filter} onSearch={this.onSearch}/>
        </div>
        }
        <li className="list-group-item-lev1" onClick={this.handleToggleClickOrganization}>
          <h3 className="filter-title">Filtra organizzazioni<i className="fa fa-angle-right float-right font-lg"></i></h3>
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
  const { datasets, dataset, ope, json } = this.props
  const { isLoading, items, edit } = this.state;
  if(datasets)
    var subdatasets = datasets.slice(0, items)
  return (
    <div className="row u-textCenter u-padding-r-all u-textCenter">
      <div className="col-md-8">
      {this.renderDatasetSearchResult(datasets?datasets.length:0, subdatasets, ope, isLoading)}
      </div>
      {this.renderDatasetDetail(dataset, ope, json)}
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