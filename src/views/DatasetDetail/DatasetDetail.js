import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    loadDatasets,
    unloadDatasets,
    datasetDetail,
    getFileFromStorageManager
} from '../../actions'
import ReactJson from 'react-json-view'
import { transformName } from '../../utility'
import download from 'downloadjs'
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router-dom'

// Services
import UserStoryService from '../UserStory/components/services/UserStoryService';
import DatasetService from './services/DatasetService';

const userStoryService = new UserStoryService();
const datasetService = new DatasetService();

class DatasetDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datastories: [],
            datasets: [],
            showDivMetabase: false,
            showDivSuperset: false,
            showDivJupyter: false,
            hidden: true,
            showSources: true,
            showDatastories: true,
            showPreview: true
        }
        
        this.handleDownloadFile = this.handleDownloadFile.bind(this)
        this.searchDataset = this.searchDataset.bind(this)
    }

    componentDidMount(){
        const { dataset, dispatch, query } = this.props
        const path = window.location.hash
        let nome = path.substring(10)
        console.log(nome)

        if(!dataset){
            dispatch(datasetDetail(nome, query))
            .catch(error => {console.log('Errore durante il caricamento del dataset ' + nome); this.setState({hidden: false})})
        }
        let response = userStoryService.list();
        response.then((list) => {
            this.setState({
                datastories: list
            });
        });

        let responseDataset = datasetService.listCorrelati();
        responseDataset.then((list) => {
            this.setState({
                datasets: list
            });
        });

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

    handleDownloadFile(nomeFile, logical_uri, e) {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(getFileFromStorageManager(logical_uri))
            .then(json => download(JSON.stringify(json), nomeFile + '.json', 'application/json'))
            .catch(error => console.log('Errore durante il download del file ' + nomeFile))
    }

    searchDataset(query, category, group, organization, order) {
        const { dispatch } = this.props
        dispatch(loadDatasets(query, 0, '', category, group, organization, order))
        .then(() => this.props.history.push('/dataset'))
    }

    renderDatasetDetail(dataset, ope, json){
        const iframeStyle = {
            width: '100%',
            height: '250px',
            border: '0'
        }
        if ((ope === 'RECEIVE_DATASET_DETAIL' || ope === 'RECEIVE_FILE_STORAGEMANAGER') ) {
            if (dataset){
                return (
                    <div className="col-10">
                        <div className="">
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-8">
                                        <h1 className="card-text">{transformName(dataset.dcatapit.title) + " "}</h1>
                                    </div>
                                    <div className="col-4">
                                        <h4 className="float-right"><span className="badge badge-default"> {dataset.dcatapit.theme}</span></h4>
                                    </div>
                                    <div className="col-12">
                                        <p className="text-muted">{"Pubblicato da " + " "}<b className="mr-3">{dataset.dcatapit.publisher_name + " "}  </b>{"Organizzazione " + " "}<b className="mr-3">{dataset.dcatapit.owner_org + " "}    </b>{"Licenza " + " "}<b>{dataset.dcatapit.license_title} </b></p>
                                    </div>
                                    <div className="col-4">
                                        <h4>
                                            <StarRatingComponent
                                                name="Valuta" /* name of the radio input, it is required */
                                                number= '0' /* number of selected icon (`0` - none, `1` - first) */
                                                starColor='#333' /* color of selected icons, default `#ffb400` */
                                                emptyStarColor='#b0bec5' /* color of non-selected icons, default `#333` */
                                                editing={true} /* is component available for editing, default `true` */
                                            />
                                        </h4>
                                    </div>
                                    <div className="col-8"></div>
                                </div>
                                <div className="row">
                                    <div className="col-10 b-r-1">
                                        <p> dataset.dcatapit.notes {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. */}</p>
                                        <p className="card-text"><strong>Tags </strong>
                                            {dataset.dcatapit.tags.map(tag => {
                                                return <span className="badge badge-pill badge-primary" key={tag.name}> {tag.name}</span>
                                            }
                                            )}
                                        </p>
                                    </div>
                                    <div className="col-2">
                                        <p className="card-text"><strong>{"Aggiornato il: " + " "}</strong> {dataset.dcatapit.modified}</p>
                                        <div className="float-right">
                                            <button className="btn btn-link " title="Collabora"><i className="fa fa-lg fa-chain"/></button>
                                            <button className="btn btn-link " title="Segnala un problema"><i className="fa fa-lg fa-exclamation"/></button>
                                        </div>
                                    
                                    </div>
                                </div>
                                {/* <p className="card-text"><strong>Categorie:</strong> <span className="badge badge-pill badge-primary">{dataset.theme}</span></p> */}
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header" onClick={() => {this.setState(prevState=>({ showSources: !prevState.showSources}))}}>
                                Risorse e Link
                                <i className={"fa float-right fa-lg " + (this.state.showSources ? "fa-angle-right" : "fa-angle-down")}/>
                            </div>
                            <div hidden={this.state.showSources}>
                            {json ?
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="row ml-2 pt-3 pb-3 b-a-1">
                                                <div className="col-4">
                                                    <span className="badge badge-default">
                                                        <h2><i className="fa fa-lg fa-file-text pt-3" /></h2>
                                                        <h2>JSON</h2>
                                                    </span>
                                                </div>
                                                <div className="col-8">
                                                    <button type="button" className="btn btn-secondary btn-sm w-100" onClick={this.handleDownloadFile.bind(this, dataset.dcatapit.name, dataset.operational.logical_uri)} title="Download"><i className="fa fa-download fa-lg"></i> Download{/*dataset.dcatapit.name*/}</button>
                                                    <button type="button" className="btn btn-secondary btn-sm mt-2 w-100" onClick={() => { this.setState(prevState => ({ showPreview: !prevState.showPreview })) }} title="Preview"> <i className="fa fa-play-circle-o fa-lg"/> Preview </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6" hidden={this.state.showPreview}>
                                            <p><ReactJson src={json} theme="bright:inverted" collapsed="true" enableClipboard="false" displayDataTypes="false" /></p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            
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
                                                <a className="font-weight-bold font-xs btn-block text-muted" onClick={() => { this.setState(prevState => ({ showDivMetabase: !prevState.showDivMetabase, showDivSuperset: false, showDivJupyter: false  })) }}>Impostazioni<i className="fa fa-angle-right float-right font-lg"></i></a>
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
                                                <a className="font-weight-bold font-xs btn-block text-muted" onClick={() => { this.setState(prevState => ({ showDivSuperset: !prevState.showDivSuperset, showDivMetabase: false, showDivJupyter: false  })) }}>Impostazioni<i className="fa fa-angle-right float-right font-lg"></i></a>
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
                                                <a className="font-weight-bold font-xs btn-block text-muted" onClick={() => { this.setState(prevState => ({ showDivJupyter: !prevState.showDivJupyter, showDivMetabase: false, showDivSuperset: false  })) }}>Impostazioni<i className="fa fa-angle-right float-right font-lg"></i></a>
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
                                                        <p>Collegati a Jupyter e segui le istruzioni. Il path del file è <strong>{dataset.operational.physical_uri}</strong>.</p>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-2">
                                                            <strong> Pyspark </strong>
                                                        </div>
                                                        <div className="col-10">
                                                            <code>
                                                                path_dataset = "<strong>{dataset.operational.physical_uri}</strong>" <br />
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
                        <div className="card">
                            <div className="card-header" onClick={() => { this.setState(prevState => ({ showDatastories: !prevState.showDatastories })) }}>
                                Collegamenti
                                <i className={"fa float-right fa-lg " + (this.state.showDatastories ? "fa-angle-right" : "fa-angle-down")} />
                            </div>
                            <div hidden={this.state.showDatastories}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="card" style={{"border": "0px"}}>
                                        <div className="card-body">
                                            <h4 className="card-title">Dataset</h4>
                                            {this.state.datasets.slice(0,4).map((dataset, index) => {
                                                return (
                                                    <div className="row" key={index}>
                                                    <div className="col-12">
                                                        <div className="card text-center">
                                                            <div className="card-body">
                                                                <Link to={"/dataset/" + dataset.name}>
                                                                    <h6 className="card-title">{dataset.title}</h6>
                                                                </Link>
                                                                <h8 className="card-subtitle mb-2 text-muted" dangerouslySetInnerHTML={{ __html: dataset.notes }}></h8>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                )
                                                })
                                            }
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="card" style={{"border": "0px"}}>
                                        <div className="card-body">
                                            <h4 className="card-title">Data Stories</h4>
                                            {this.state.datastories.slice(0,4).map((story, index) => {
                                                let chartUrl = undefined
                                                if (story.graph1) {
                                                    chartUrl = story.graph1['props']['url']
                                                }
                                                return (
                                                    <div className="row" key={index}>
                                                        <div className="col-12" key={index}>
                                                            <div className="card text-center">
                                                                <div className="card-body">
                                                                    <Link to={"/user_story/list/" + story.id}>
                                                                        <h6 className="card-title">{story.title}</h6>
                                                                    </Link>
                                                                    <h8 className="card-subtitle mb-2 text-muted" dangerouslySetInnerHTML={{ __html: story.subtitle }}></h8>
                                                                {/*  {chartUrl && <iframe
                                                                        ref="iframe"
                                                                        frameBorder={'0'}
                                                                        style={iframeStyle}
                                                                        src={chartUrl}
                                                                    />
                                                                    } */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                                })
                                            }
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button type="button" className="btn btn-link float-right" onClick={this.searchDataset.bind(this, this.props.query, this.state.category_filter, this.state.group_filter, this.state.organization_filter, this.state.order_filter)} title="torna alla lista dei risultati di ricerca"><i className="fa fa-list fa-lg mt-2"></i> Torna alla lista dei risultati di ricerca</button>
                        </div>
                    </div>
                );
            }
        }
    }

    render() {
        const { dataset, ope, json } = this.props
        return (
            <div className="row">
                {this.renderDatasetDetail(dataset, ope, json)}
                {!dataset && 
                <div className="col-10" hidden={this.state.hidden}>
                    <div className="alert alert-danger col-" role="alert">
                        Il dataset cercato non esiste
                    </div>
                    <div>
                        <button type="button" className="btn btn-link float-right" onClick={this.searchDataset.bind(this, this.props.query, this.state.category_filter, this.state.group_filter, this.state.organization_filter, this.state.order_filter)} title="torna alla lista dei risultati di ricerca"><i className="fa fa-list fa-lg mt-2"></i> Torna alla lista dei risultati di ricerca</button>
                    </div>
                </div>}
            </div>
        )
    }
}

DatasetDetail.propTypes = {
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

export default connect(mapStateToProps)(DatasetDetail)