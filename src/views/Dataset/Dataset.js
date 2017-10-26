import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  loadDatasets,
  unloadDatasets,
  datasetDetail
} from '../../actions'
import InfiniteScroll from '../../components/InfinityScroll';

class Dataset extends Component {
  constructor(props) {
    super(props)
    this.setState({ isLoading: false })
    this.handleUnloadDatasetClick = this.handleUnloadDatasetClick.bind(this)
    this.handleLoadDatasetDetailClick = this.handleLoadDatasetDetailClick.bind(this)
  }

  state = {
    items: 10
  }

  loadMore = () => {
    if (this.state.isLoading) { return }
    var totitems = this.state.items + 10;
    this.setState({ items: totitems });
  }

  handleScrollToBottom = () => this.loadMore()
  handleLoadMoreClick = () => this.loadMore()

  searchDataset(query) {
    const { dispatch } = this.props
    dispatch(loadDatasets(query))
  }

  handleUnloadDatasetClick(e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(unloadDatasets())
  }

  handleLoadDatasetDetailClick(name, e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(datasetDetail(name))
  }

  renderDataset() {
    this.searchDataset(this.props.match.params.query);
  }

renderDatasetList(datasets, ope, isLoading){
  if (ope === 'RECEIVE_DATASETS')
    return <InfiniteScroll onScrollToBottom={this.handleScrollToBottom}>
      {datasets.map(dataset => {
        var title = dataset.title;
        if (title.length > 50)
          title = title.substring(0, 50).concat('...')
        return (<div className="card text-center" key={dataset.name}>
              <div className="card-header"></div>
              <div className="card-body">
                <h4 className="card-title">{title}</h4>
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
        disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Load more'}
      </button>
    </InfiniteScroll>
}

renderDatasetSearchResult(length, datasets, ope, isLoading){
  if (ope === 'RECEIVE_DATASETS')
    if (datasets && datasets.length > 0)
    return ( <div className="col-md-8">
                <div className="App">
                <div className="App-header">
                    {length > 999 ?
                      <div><h6 className="modal-title pull-left">Sono stati trovati più di 1000 datasets, ti consigliamo di affinare la ricerca</h6><h6 className="modal-title pull-right">Dataset mostrati {datasets.length}</h6></div>
                    :
                      <div><h6 className="modal-title pull-left">Sono stati trovati {length} datasets</h6><h6 className="modal-title pull-right">Dataset mostrati {datasets.length}</h6></div>
                    }
                      </div>
                      {this.renderDatasetList(datasets, ope, isLoading)}
                  
              </div>
            </div>
    )
}

renderDatasetDetail(dataset, ope){
  if (ope === 'RECEIVE_DATASET_DETAIL') {
    if (dataset)
      return (
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                Descrizione
                </div>
              <div className="card-block">
                <h2 className="card-title">{dataset.name}</h2>
                <h4 className="card-text">{dataset.notes}</h4>
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
        </div>
      );
  }
}

render() {
  const { datasets, dataset, ope } = this.props
  const { isLoading, items } = this.state;
  if(datasets)
    var subdatasets = datasets.slice(0, items)
  return (
    <div className="u-textCenter u-padding-r-all u-textCenter">
      {this.renderDatasetSearchResult(datasets?datasets.length:0, subdatasets, ope, isLoading)}
      {this.renderDatasetDetail(dataset, ope)}
    </div>
  )
}
}

Dataset.propTypes = {
  selectDataset: PropTypes.string,
  datasets: PropTypes.array,
  dataset: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  ope: PropTypes.string
}

function mapStateToProps(state) {
  const { isFetching, lastUpdated, dataset, items: datasets, ope } = state.datasetReducer['obj'] || { isFetching: true, items: [], ope: '' }
  return { datasets, dataset, isFetching, lastUpdated, ope }
}

export default connect(mapStateToProps)(Dataset)