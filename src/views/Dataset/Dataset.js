import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  loadDatasets,
  unloadDatasets,
  datasetDetail
} from '../../actions'
import AutocompleteDataset from '../../components/Autocomplete/AutocompleteDataset.js'

class Dataset extends Component {
  constructor(props) {
    super(props)
    this.handleLoadDatasetClick = this.handleLoadDatasetClick.bind(this)
    this.handleUnloadDatasetClick = this.handleUnloadDatasetClick.bind(this)
    this.handleLoadDatasetDetailClick = this.handleLoadDatasetDetailClick.bind(this)
  }

  searchDataset(query){
    const { dispatch, selectDataset } = this.props
    dispatch(loadDatasets(query))
  }    

  //Action creators don't dispatch anything to the store; 
  //instead they return action object that a 'central dispatch' uses (action.js) 
  handleLoadDatasetClick(e) {
    console.log('handleLoadDatasetClick');
    console.log('querystring: ' + this.refs.auto.state.value );
    var query = this.refs.auto.state.value;
    e.preventDefault()
    const { dispatch, selectDataset } = this.props
    dispatch(loadDatasets(query))
  }

  handleUnloadDatasetClick(e) {
    console.log('handleUnloadDatasetClick');
    e.preventDefault()
    const { dispatch, selectDataset } = this.props
    dispatch(unloadDatasets())
  }

  handleLoadDatasetDetailClick(name, e){
    console.log('handleLoadDatasetDetailClick ' + name);
    e.preventDefault()
    const { dispatch, selectDataset } = this.props
    dispatch(datasetDetail(name))
  }

  renderDataset(){
    console.log('renderDataset');
    this.searchDataset(this.props.match.params.query);
  }

  renderDatasetList(datasets, ope){
    console.log('ope: ' + ope)
    if (ope == 'RECEIVE_DATASETS')
      return datasets.map(dataset => {
          return(
          <div className="list-group" key={dataset.name}>
            <a href="#" className="list-group-item list-group-item-action flex-column align-items-start" onClick={this.handleLoadDatasetDetailClick.bind(this, dataset.name)}>
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{dataset.resources[0].name}</h5>
                <small>{dataset.approval_status}</small>
              </div>
              <p className="mb-1">{dataset.resources[0].description}</p>
              <small><strong>Pubblicato da: </strong>{dataset.organization.title}</small><br/>
              <small><strong>Data di ultima modifica: </strong>{dataset.organization.created}</small>
            </a>
            <br/>
          </div>
            
          );
      });
  }

  renderDatasetSearchResult(datasets, ope){
    console.log('ope: ' + ope)
    if (ope == 'RECEIVE_DATASETS')
    if (datasets && datasets.length >0)
      return( 
          <div>
            <h3>Sono stati trovati 10 dataset</h3>
            {this.renderDatasetList(datasets, ope)}
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
              </ul>
            </nav>
          </div>
        )
    }

    renderDatasetDetail(dataset, ope){
    console.log('ope: ' + ope)
    if(ope == 'RECEIVE_DATASET_DETAIL'){
      if(dataset)
        return(
          <div className="card">
            <div className="card-header">
              Dettaglio
            </div>
            <div className="card-block">
              <h4 className="card-title">{dataset.resources[0].name}</h4>
              <p className="card-text">{dataset.resources[0].description}</p>
              <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group mr-2" role="group" aria-label="First group">
                  <button type="button" className="btn btn-info">JSON</button>
                </div>
                <div className="btn-group mr-2" role="group" aria-label="Second group">
                  <button type="button" className="btn btn-info">CSV</button>
                </div>
                <div className="btn-group" role="group" aria-label="Third group">
                  <button type="button" className="btn btn-info">ZIP</button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  }

  render() {
    const { datasets, dataset, ope } = this.props
    return (
          <div className="u-textCenter u-padding-r-all u-textCenter">
            {this.renderDatasetSearchResult(datasets, ope)}
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
  const { isFetching, lastUpdated, dataset,  items: datasets, ope } = state.datasetReducer['obj'] || { isFetching: true, items: [], ope:'' }
  return {datasets, dataset, isFetching, lastUpdated, ope}
}

export default connect(mapStateToProps)(Dataset)