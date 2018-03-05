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
import {serviceurl} from "../../config/serviceurl";
// Services
import UserStoryService from '../UserStory/components/services/UserStoryService';
import DatasetService from './services/DatasetService';
import { transformWidgetName } from '../../utility'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import IframeWidget from './widgets/IframeWidget';

const userStoryService = new UserStoryService();
const datasetService = new DatasetService();
const Timestamp = require('react-timestamp');

class DatasetDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            copied: false,
            datastories: [],
            datasets: [],
            showDivMetabase: false,
            showDivSuperset: false,
            showDivJupyter: false,
            hidden: true,
            showSources: true,
            showDatastories: true,
            showDett: true,
            showDownload: false,
            showPreview: false,
            showAPI: false,
            showSuperset: false,
            showJupyter: false,
            downloadState: 3, // 1-Success, 2-Error, 3-loading
            loading: true
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
        this.setState({
            showDett:false,
            showPreview: false,
            showAPI: false,
            showSuperset: false,
            showJupyter: false,
            downloadState: 3,
            showDownload: true 
        })
        dispatch(getFileFromStorageManager(logical_uri))
            .then(json => {
                            download(JSON.stringify(json), nomeFile + '.json', 'application/json')
                            this.setState({downloadState: 1})  
                        })
            .catch(error => {this.setState({downloadState: 2})})  
    }

    searchDataset(query, category, group, organization, order) {
        const { dispatch } = this.props
        dispatch(loadDatasets(query, 0, '', category, group, organization, order))
        .then(() => this.props.history.push('/dataset'))
    }

    renderDatasetDetail(dataset, ope, json, feed, iframes){
        const iframeStyle = {
            width: '100%',
            height: '250px',
            border: '0'
        }
        if ((ope === 'RECEIVE_DATASET_DETAIL' || ope === 'RECEIVE_FILE_STORAGEMANAGER') ) {
            if (dataset){
                return (
                    <div>
                    <div className="col-9">
                        <div className="">
                            <div className="card-block">
                            <div className="row">
                                    <div className="col-8">
                                        <h1 className="card-text">{transformName(dataset.dcatapit.title) + " "}</h1>
                                    </div>
                                    <div className="col-4">
                                        <h4 className="float-right"><span className="badge badge-secondary"> {dataset.dcatapit.theme}</span></h4>
                                    </div>
                                    <div className="col-12">
                                        <p className="text-muted">{"Pubblicato da " + " "}<b className="mr-3">{dataset.dcatapit.publisher_name + " "}  </b>{"Organizzazione " + " "}<b className="mr-3">{dataset.dcatapit.owner_org + " "}    </b>{"Licenza " + " "}<b>{dataset.dcatapit.license_title} </b></p>
                                    </div>
                                    <div className="col-4">
                                        <h4>
                                            <StarRatingComponent
                                                name="Valuta" 
                                                value={3}
                                                starColor='#333' 
                                                emptyStarColor='#b0bec5' 
                                                editing={true} 
                                                
                                            />
                                        </h4>
                                    </div>
                                    <div className="col-8"><p className="card-text float-right"><strong>{"Creato il: " + " "}</strong> {dataset.dcatapit.modified}</p></div>
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                        <p> {dataset.dcatapit.notes} </p>
                                        <p className="card-text"><strong>Tags </strong>
                                            {dataset.dcatapit.tags.map(tag => {
                                                return <span className="badge badge-pill badge-primary" key={tag.name}> {tag.name}</span>
                                            }
                                            )}
                                        </p>
                                    </div>
                                    <div className="col-2"></div>
                                </div>
                            </div>
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className={!this.state.showDett ? 'btn btn-default' : 'btn btn-primary'} onClick={() => { this.setState({showDett:true, showPreview: false, showAPI:false, showSuperset:false, showJupyter:false, showDownload:false})}}>Dettaglio</button>
                                            <button type="button" className={!this.state.showDownload ? 'btn btn-default' : 'btn btn-primary'} onClick={this.handleDownloadFile.bind(this, dataset.dcatapit.name, dataset.operational.logical_uri)}>Download</button>
                                            <button type="button" className={!this.state.showPreview ? 'btn btn-default' : 'btn btn-primary'} onClick={() => { this.setState({showPreview: true, showAPI:false, showSuperset:false, showJupyter:false, showDownload:false, showDett:false})}}>Preview</button>
                                            <button type="button" className={!this.state.showAPI ? 'btn btn-default' : 'btn btn-primary'} onClick={() => { this.setState({showAPI: true, showPreview:false, showSuperset:false, showJupyter:false, showDownload:false, showDett:false, copied:false ,value: serviceurl.apiURLDataset + '/dataset/' + encodeURIComponent(dataset.operational.logical_uri)})}}>API</button>
                                            <button type="button" className={!this.state.showSuperset ? 'btn btn-default' : 'btn btn-primary'} onClick={() => { this.setState({showSuperset: true, showAPI: false, showPreview:false, showJupyter:false, showDownload:false, showDett:false})}}>Superset</button>
                                            <button type="button" className={!this.state.showJupyter ? 'btn btn-default' : 'btn btn-primary'} onClick={() => { this.setState({showJupyter: true, showSuperset: false, showAPI: false, showPreview:false, showDownload:false, showDett:false })}}>Jupyter</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-12">
                                            <div hidden={!this.state.showDett} className="card-text">
                                                <div className="row">
                                                        <div className="col-3">
                                                            <p><strong>Informazioni sul caricamento </strong></p>
                                                        </div>
                                                        <div className="col-9">
                                                            {dataset.operational.input_src.sftp?
                                                            <div>
                                                                <p><strong>Tipo: </strong>SFTP</p>
                                                                <p><strong>Indirizzo: </strong>Comunicato</p>
                                                                <p><strong>Porta: </strong>22</p>
                                                                <p><strong>Utente: </strong>{dataset.operational.input_src.sftp[0].username}</p>
                                                                <p><strong>Password: </strong>XXXXXXXXXX</p>
                                                                <p><strong>Percorso: </strong>{dataset.operational.input_src.sftp[0].url}</p>
                                                            </div>
                                                            :
                                                            <div>
                                                                <p>{dataset.operational.input_src.srv_pull[0]}</p>
                                                            </div>
                                                            }
                                                        </div>
                                                </div>
                                                <br/><br/>
                                                <div className="row">
                                                        <div className="col-3">
                                                            <p><strong>Informazioni sul feed</strong></p>
                                                        </div>
                                                        <div className="col-9">
                                                            {feed.state?
                                                            <div>
                                                                <p><strong>Stato: </strong>{feed.state}</p>
                                                                <p><strong>Attivo: </strong>{feed.active?<span className="badge badge-pill badge-success">SI</span>:<span className="badge badge-pill badge-danger">NO</span>}</p>
                                                                <p><strong>Ultimo aggiornamento: </strong><Timestamp time={feed.updatedate/1000} /></p>
                                                            </div>
                                                            :
                                                            <div>
                                                                <p>Non ci sono informazioni disponibili sul feed. Sei pregato di contattare l'assistenza.</p>
                                                            </div>
                                                            }
                                                        </div>
                                                </div>
                                            </div> 
                                            <div hidden={!this.state.showDownload} className="card-text">
                                                {this.state.downloadState===1 && <div className="alert alert-success">File scaricato con successo</div>}
                                                {this.state.downloadState===2 && <div className="alert alert-danger">Ci sono stati dei problemi durante il download del file, contatta l'assistenza.</div>}
                                                {this.state.downloadState===3 && <div><i className="fa fa-spinner fa-spin fa-lg pr-1"/> Download in corso..</div>}
                                            </div> 
                                                        <div hidden={!this.state.showPreview}>{json?<ReactJson src={json} theme="bright:inverted" collapsed="true" enableClipboard="false" displayDataTypes="false" />:<p>Anteprima non disponibile.</p>}</div>
                                            <div hidden={!this.state.showAPI} className="card-text">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <label>API Endpoint</label><br/>
                                                        <input className='w-75' value={this.state.value} onChange={({target: {value}}) => this.setState({value, copied: false})} disabled='true' />
                                                        <CopyToClipboard text={this.state.value}
                                                            onCopy={() => this.setState({copied: true})}>
                                                            <button><i className="fa fa-clipboard"></i></button>
                                                        </CopyToClipboard>
                                                        {this.state.copied ? <span className="badge badge-pill badge-success"> Copiato</span> : null}
                                                    </div>
                                                </div>
                                                <br/><br/><br/>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <p>Ti ricordiamo che per poter effettuare la chiamata alla REST API occorre fornire i seguenti parametri di Basic Authentication:</p>
                                                        <div>
                                                            <p><strong>Utente: </strong>{localStorage.getItem('user')}</p>
                                                            <p><strong>Password: </strong>XXXXXXXXXX</p>      
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                            <div hidden={!this.state.showSuperset} className="card-text">Apri Superset <strong><a href={serviceurl.urlSuperset} target='_blank'>qui</a></strong>.</div> 
                                            <div hidden={!this.state.showJupyter} className="card-text">
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
                                                    <br /><br />
                                                    <div className="row">
                                                        <div className="col-md-2">
                                                            <p>Apri Jupyter <strong><a href={serviceurl.urlJupiter} target='_blank'>qui</a></strong>.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                                <div className="card-block">
                                    <div className="row">
                                            {iframes&&iframes.length>0?iframes.map((iframe, key) => {
                                                if (key > 2) return;
                                                return <div className=".col-md-auto px-3" key={key}>
                                                    <div className="card text-center">
                                                        <div className="card-body">  
                                                            <a className="list-group-item">
                                                                <h6 className="list-group-item-heading" id={"title-preview-" + key}>
                                                                {" [" + transformWidgetName(iframe.table) + "] " + iframe.title}
                                                                </h6>
                                                                <div className="preview-widget">
                                                                <div style={{ width: '100%' }}>
                                                                    {
                                                                        React.createElement(IframeWidget, { url: iframe.iframe_url, class: "no-click"})
                                                                    }
                                                                </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>})
                                            :
                                                <i>Non sono stati creati IFrames con questo dataset, se vuoi essere il primo a crearli clicca qui</i>
                                            }
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div>
                                    <button type="button" className="btn btn-link float-right" onClick={this.searchDataset.bind(this, this.props.query, this.state.category_filter, this.state.group_filter, this.state.organization_filter, this.state.order_filter)} title="torna alla lista dei risultati di ricerca"><i className="fa fa-list fa-lg mt-2"></i> Torna alla lista dei risultati di ricerca</button>
                                </div>
                            </div>
                    </div>)}
        }
    }
    render() {
        const { dataset, ope, json, feed, iframes, isFetching } = this.props
        return isFetching === true ? <h1 className="text-center fixed-middle"><i className="fa fa-circle-o-notch fa-spin mr-2"/>Loading</h1> : (<div>
                    <div className="row">
                        {this.renderDatasetDetail(dataset, ope, json, feed, iframes)}
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
    json: PropTypes.array,
    feed: PropTypes.object,
    iframes: PropTypes.array
}

function mapStateToProps(state) {
    const { isFetching, lastUpdated, dataset, items: datasets, query, ope, json, feed, iframes } = state.datasetReducer['obj'] || { isFetching: true, items: [], ope: '' }
    return { datasets, dataset, isFetching, lastUpdated, query, ope, json, feed, iframes }
}

export default connect(mapStateToProps)(DatasetDetail)