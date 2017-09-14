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
              <tr key={dataset.name}>
                  <td>{dataset.title}</td>
                  <td>{dataset.notes}</td>
                  <td>{dataset.organization.name}</td>
                  <td>{dataset.organization.state}</td>
                  <td><a href="#" className="list-group-item list-group-item-action flex-column transparent-frame" onClick={this.handleLoadDatasetDetailClick.bind(this, dataset.name)}><i className="icon-book-open icons font-2xl d-block m-t-2"></i></a></td>
              </tr>
          );
      });
  }

  renderDatasetSearchResult(datasets, ope){
    console.log('ope: ' + ope)
    if (ope == 'RECEIVE_DATASETS')
    if (datasets && datasets.length >0)
      return( 
          <div>
            <div className="row">
            <div className="col-lg-12">
              <div className="card">
                  <div className="card-header">
                      <i className="fa fa-align-justify"></i> Sono stati trovati {datasets.length} dataset
                  </div>
                  <div className="card-block">
                      <table className="table table-bordered table-striped table-condensed">
                          <thead>
                              <tr>
                                  <th>Nome</th>
                                  <th>Descrizione</th>
                                  <th>Organizzazione</th>
                                  <th>Stato</th>
                                  <th>Dettaglio</th>
                              </tr>
                          </thead>
                          <tbody>
                            {this.renderDatasetList(datasets, ope)}
                            </tbody>
                      </table>
                      <nav>
                          <ul className="pagination">
                              <li className="page-item"><a className="page-link" href="#">Prev</a></li>
                              <li className="page-item active">
                                  <a className="page-link" href="#">1</a>
                              </li>
                              <li className="page-item"><a className="page-link" href="#">2</a></li>
                              <li className="page-item"><a className="page-link" href="#">3</a></li>
                              <li className="page-item"><a className="page-link" href="#">4</a></li>
                              <li className="page-item"><a className="page-link" href="#">Next</a></li>
                          </ul>
                      </nav>
                  </div>
              </div>
          </div>
      </div>
    </div>
        )
    }

    renderDatasetDetail(dataset, ope){
    console.log('ope: ' + ope)
    if(ope == 'RECEIVE_DATASET_DETAIL'){
      if(dataset)
        return(
          <div className="row">
            <div className="col-8">
              <div className="card">
                <div className="card-header">
                  Descrizione
                </div>
                <div className="card-block">
                  <h4 className="card-title">{dataset.name}</h4>
                  <p className="card-text">{dataset.notes}</p>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  Risorse
                </div>
                <div className="card-block">
                  <div className="row">
                    <div className="col-2">
                    <i className="fa fa-download fa-lg m-t-2"> JSON</i>
                    </div>
                    <div className="col-10">
                      <p><strong>Metadata JSON:</strong> Questa risorsa contiene i metadati relativi ai JSON del dataset come da...</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2">
                      <i className="fa fa-download fa-lg m-t-2"> CSV</i>
                    </div>
                    <div className="col-10">
                    <p><strong>Metadata CSV:</strong> Questa risorsa contiene i metadati relativi ai CSV del dataset come da...</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2">
                    <i className="fa fa-download fa-lg m-t-2"> ZIP</i>
                    </div>
                    <div className="col-10">
                      <p><strong>Metadata ZIP:</strong> Questa risorsa contiene i metadati relativi ai ZIP del dataset come da...</p>
                    </div>
                  </div>
                  </div>
              </div>
            </div>
            <div className="col-4">
            <div className="card">
                <div className="card-header">
                  Informazioni
                </div>
                <div className="card-block">
                  <p className="card-text"><strong>Licenza:</strong> Creative Commons Attribution 4.0 International (CC-BY 4.0)</p>
                  <p className="card-text"><strong>Temi del dataset:</strong> Imprese</p>
                  <p className="card-text"><strong>Parole chiave del dataset:</strong> assicurazioni autoautomobile autoveicoli circolazione mobilità moto motorizzazione motoveicoli parco circolante revisioni veicoli vettura</p>
                  <p className="card-text"><strong>Data di rilascio:</strong> 2017-03-07</p>
                  <p className="card-text"><strong>Identificativo del dataset:</strong> 60a57c60-758c-4bd9-8d87-c286b797c289</p>
                  <p className="card-text"><strong>Data di ultima modifica:</strong> Lunedì 17 Luglio 2017</p>
                  <p className="card-text"><strong>Lingua del dataset:</strong> Italian</p>
                </div>
              </div>
              <div className="card">
              <div className="card-header">
                  Rifrimenti
                </div>
                <div className="card-block">
                  <p className="card-text"><strong>Email Contatto:</strong>  mail@mail.it</p>
                  <p className="card-text"><strong>Home page: :</strong> http://dati.mit.gov.it/catalog/dataset</p>
                  <p className="card-text"><strong>URL AP:</strong> http://dati.mit.gov.it/catalog/api/3/a...</p>
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