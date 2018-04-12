import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    loadDatasets,
    unloadDatasets,
    datasetDetail,
    getFileFromStorageManager,
    getSupersetUrl,
    checkMetabase
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
import WidgetCard from '../../components/Cards/WidgetCard';
import { decodeTheme } from '../../utility'
import Widgets from '../Widgets/Widgets' 
import { toastr } from 'react-redux-toastr'

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
            showTools: false,
            showWidget: false,
            downloadState: 3, // 1-Success, 2-Error, 3-loading
            supersetState: 3,
            previewState: 3,
            supersetLink: undefined,
            loading: true,
            jsonPreview: undefined,
            category_filter: props.history.location.state?props.history.location.state.category_filter:undefined, 
            group_filter: props.history.location.state?props.history.location.state.group_filter:undefined,  
            organization_filter: props.history.location.state?props.history.location.state.organization_filter:undefined, 
            order_filter: props.history.location.state?props.history.location.state.order_filter:undefined,
            hasPreview: false,
            hasSuperset: false,
            hasMetabase: false,
            dafIndex: 0 

        }
        
        this.handlePreview = this.handlePreview.bind(this)
        this.handleDownloadFile = this.handleDownloadFile.bind(this)
        this.handleTools = this.handleTools.bind(this)
        this.searchDataset = this.searchDataset.bind(this)
    }

    componentDidMount(){
        const { dataset, dispatch, query } = this.props
        const path = window.location.hash
        let nome = path.substring(10)
        console.log(nome)
        dispatch(datasetDetail(nome, query))
        .catch(error => {console.log('Errore durante il caricamento del dataset ' + nome); this.setState({hidden: false})})
        console.log(dataset)
    }

    componentWillReceiveProps(nextProps){
        const { dispatch } = this.props
        if(nextProps.dataset || nextProps.feed){    
            const isExtOpendata = (nextProps.dataset.operational.ext_opendata && nextProps.dataset.operational.ext_opendata != {}) ? true : false
            
            if(isExtOpendata){
                dispatch(getFileFromStorageManager(nextProps.dataset.operational.logical_uri))
                .then(json => {this.setState({hasPreview: true, dafIndex: this.state.dafIndex+3})})
                .catch(error => {this.setState({hasPreview: false})})
            } else {
                if(nextProps.feed.has_job && (nextProps.feed.job_status==='COMPLETED' || nextProps.feed.job_status==='STARTED')){
                    this.setState({hasPreview: true, dafIndex: this.state.dafIndex+3})
                } else{
                    this.setState({hasPreview: false})
                }
            }
            
            dispatch(getSupersetUrl(nextProps.dataset.dcatapit.name, nextProps.dataset.dcatapit.owner_org, isExtOpendata))
            .then(json => {this.setState({hasSuperset: json.length>0?true:false, dafIndex: json.length>0?this.state.dafIndex+1:this.state.dafIndex})})
            .catch(error => {this.setState({hasSuperset: false})})

            dispatch(checkMetabase(nextProps.dataset.dcatapit.name))
            .then(json => {this.setState({hasMetabase: json.is_on_metabase, dafIndex: json.is_on_metabase?this.state.dafIndex+1:this.state.dafIndex})})
            .catch(error => {this.setState({hasMetabase: false})})
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
            /* showDett:false,
            showPreview: false,
            showAPI: false,
            showTools: false,
            showWidget: false, */
            downloadState: 4,
            /* showDownload: true */ 
        })
        dispatch(getFileFromStorageManager(logical_uri))
            .then(json => {
                download(JSON.stringify(json), nomeFile + '.json', 'application/json')
                this.setState({downloadState: 1})
                toastr.success('Completato', 'Download effettuato con successo')
            })
            .catch(error => {
                this.setState({downloadState: 2})
                toastr.error('Errore', 'Ci sono stati dei problemi durante il download del file, contatta l\'assistenza.')
            })  
    }

    handlePreview(nomeFile, logical_uri, e) {
        e.preventDefault()
        const { dispatch } = this.props
        this.setState({
            showPreview: true,
            showAPI:false, 
            showTools:false, 
            showWidget:false, 
            showDownload:false, 
            showDett:false,
            previewState: 3
        })
        dispatch(getFileFromStorageManager(logical_uri))
            .then(json => {this.setState({previewState: 1, jsonPreview: json})})
            .catch(error => {this.setState({previewState: 2})})  
    }


    handleTools(nomeFile, org, e) {
        e.preventDefault()
        const { dispatch, dataset } = this.props
        this.setState({
            showTools: true, 
            showAPI: false, 
            showPreview:false, 
            showWidget:false, 
            showDownload:false, 
            showDett:false,
            supersetState: 3,
            supersetLink: undefined
        })
        const isExtOpendata = (dataset.operational.ext_opendata 
            && dataset.operational.ext_opendata != {}) ? true : false
        dispatch(getSupersetUrl(nomeFile, org, isExtOpendata))
            .then(json => {this.setState({ supersetLink: json, supersetState: 1})})
            .catch(error => {this.setState({ supersetState: 2 })})  
    }

    searchDataset(query, category_filter, group_filter, organization_filter, order_filter) {
        const { dispatch } = this.props
        dispatch(loadDatasets(query, 0, '', category_filter, group_filter, organization_filter, order_filter))
        .then(() =>  this.props.history.push({
            pathname: '/dataset',
            state: {'query': query,
                    'category_filter': category_filter,
                    'organization_filter': organization_filter,
                    'order_filter': order_filter,
                    'group_filter': group_filter
            }
          }))
    }

    render() {
        const { dataset, ope, feed, iframes, isFetching, query } = this.props
        return isFetching === true ? <h1 className="text-center fixed-middle"><i className="fas fa-circle-notch fa-spin mr-2"/>Caricamento</h1> : (<div>
                    {(ope === 'RECEIVE_DATASET_DETAIL' || ope === 'RECEIVE_FILE_STORAGEMANAGER') && (dataset) &&
                    <div>
                    <div className='top-dataset'>
                        <i className="fa fa-table fa-lg icon-dataset pr-3 float-left text-primary"></i>
                        <h2 className="title-dataset px-4 text-primary">{dataset.dcatapit.title}</h2>
                        <ul className="nav nav-tabs w-100 buttons-nav px-search">
                                <li className="nav-item">
                                    <a className={!this.state.showDett ? 'nav-link button-data-nav' : 'nav-link active button-data-nav'} onClick={() => { this.setState({showDett:true, showPreview: false, showAPI:false, showTools:false, showWidget:false, showDownload:false})}}><i className="text-icon fa fa-info-circle pr-2"/>Dettaglio</a>
                                </li>
                                <li className="nav-item h-100">
                                    <a className={!this.state.showPreview ? 'nav-link button-data-nav' : 'nav-link active button-data-nav'} onClick={this.handlePreview.bind(this, dataset.dcatapit.name, dataset.operational.logical_uri)}><i className="text-icon fa fa-eye pr-2"/> Anteprima</a>
                                </li>
                                <li className="nav-item h-100">
                                    <a className={!this.state.showAPI ? 'nav-link button-data-nav' : 'nav-link active button-data-nav'} onClick={() => { this.setState({showAPI: true, showPreview:false, showTools:false, showWidget:false, showDownload:false, showDett:false, copied:false ,value: serviceurl.apiURLDataset + '/dataset/' + encodeURIComponent(dataset.operational.logical_uri)})}}><i className="text-icon fa fa-plug pr-2"/>API</a>
                                </li>
                                <li className="nav-item h-100">
                                    <a className={!this.state.showTools ? 'nav-link button-data-nav' : 'nav-link active button-data-nav'} onClick={this.handleTools.bind(this, dataset.dcatapit.name, dataset.dcatapit.owner_org)}><i className="text-icon fa fa-wrench pr-2"/>Strumenti</a>
                                </li>
                                <li className="nav-item h-100">
                                    <a className={!this.state.showWidget ?  'nav-link button-data-nav' : 'nav-link active button-data-nav'} onClick={() => { this.setState({showWidget: true, showTools: false, showAPI: false, showPreview:false, showDownload:false, showDett:false })}}><i className="text-icon fa fa-chart-bar pr-2"/>Widget</a>
                                </li>
                        </ul>
                        <button className="btn btn-accento buttons-nav" style={{right: '20%', height: '48px'}} onClick={this.handleDownloadFile.bind(this, dataset.dcatapit.name, dataset.operational.logical_uri)}>Download {this.state.downloadState===4 ? <i className="ml-4 fa fa-spinner fa-spin"/>: <i className="ml-4 fa fa-download"/>}</button>

                    </div>
                    <div className="row">
                    <div hidden={this.state.showWidget} className="col-7">
                        <div className="card-block px-search">
                        <div className="row px-3">
                            <div hidden={!this.state.showDett} className="col-12">
                                <p className="desc-dataset"> {dataset.dcatapit.notes} </p>
                            </div>
                            <div hidden={!this.state.showDett} className="col-4">
                                { (dataset.operational.ext_opendata && 
                                    dataset.operational.ext_opendata.url) &&
                                <a className="w-25" href={dataset.operational.ext_opendata.url}>
                                    <p className="card-text"><strong>APRI CKAN</strong> </p>
                                </a>
                                }
                            </div>
                            <div hidden={!this.state.showDett} className="col-12 card-text">
                                <div className="row">
                                    <div className="col-12 py-4">
                                            <table className="table table-bordered table-responsive d-inline-table">
                                                <tbody className="w-100">
                                                    <tr>
                                                        <th className="bg-white" style={{width:"192px"}}><strong>Slug: </strong></th> 
                                                        <td className="bg-grigino">{dataset.dcatapit.name}
                                                            <CopyToClipboard text={dataset.dcatapit.name}>
                                                                <i className="text-gray-600 font-lg float-right fa fa-copy pointer" style={{lineHeight: '1.5'}}/>
                                                            </CopyToClipboard>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-12">
                                            <p className="text-muted mb-4"><b>Informazioni di caricamento </b></p>
                                        </div>
                                        <div className="col-12">
                                            {dataset.operational.input_src.sftp &&
                                            <table className="table table-bordered table-responsive d-inline-table">
                                                <tbody className="w-100">
                                                    <tr>
                                                        <th className="bg-white"  style={{width:"192px"}}><strong>Tipo: </strong></th> <td className="bg-grigino">SFTP</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="bg-white" style={{width:"192px"}}><strong>Indirizzo: </strong></th><td className="bg-grigino"><i>Comunicato</i></td>
                                                    </tr>
                                                    <tr>
                                                        <th className="bg-white" style={{width:"192px"}}><strong>Porta: </strong></th><td className="bg-grigino">22</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="bg-white" style={{width:"192px"}}><strong>Utente: </strong></th><td className="bg-grigino">{dataset.operational.input_src.sftp[0].username}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="bg-white" style={{width:"192px"}}><strong>Password: </strong></th><td className="bg-grigino">XXXXXXXXXX</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="bg-white" style={{width:"192px"}}><strong>Percorso: </strong></th>
                                                        <td className="bg-grigino">{dataset.operational.input_src.sftp[0].url}
                                                            <CopyToClipboard text={dataset.operational.input_src.sftp[0].url}>
                                                                <i className="text-gray-600 font-lg float-right fa fa-copy pointer" style={{lineHeight: '1.5'}}/>
                                                            </CopyToClipboard>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            }
                                            {dataset.operational.input_src.srv_pull &&
                                            <table className="table table-bordered table-striped table-responsive d-inline-table">
                                                <tbody className="w-100">
                                                    <tr>
                                                        <th className="bg-white" style={{width:"192px"}}><strong>Tipo: </strong></th><td className="bg-grigino">Web Services</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="bg-white" style={{width:"192px"}}><strong>Indirizzo: </strong></th>
                                                        <td className="bg-grigino" title={dataset.operational.input_src.srv_pull[0].url}>{dataset.operational.input_src.srv_pull[0].url.substring(0,45)+'...'}
                                                            <CopyToClipboard text={dataset.operational.input_src.srv_pull[0].url}>
                                                                <i className="text-gray-600 font-lg float-right fa fa-copy pointer" style={{lineHeight: '1.5'}}/>
                                                            </CopyToClipboard>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="bg-white" style={{width:"192px"}}><strong>Utente: </strong></th><td className="bg-grigino">XXXXXXXXXX</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="bg-white" style={{width:"192px"}}><strong>Password: </strong></th><td className="bg-grigino">XXXXXXXXXX</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            }
                                        </div>
                                </div>
                                <br/><br/>
                            </div> 
                            <div hidden={!this.state.showDownload} className="col-12 card-text">
                                            {this.state.downloadState===1 && <div className="alert alert-success">File scaricato con successo</div>}
                                            {this.state.downloadState===2 && <div className="alert alert-danger">Ci sono stati dei problemi durante il download del file, contatta l'assistenza.</div>}
                                            {this.state.downloadState===3 && <div><i className="fa fa-spinner fa-spin fa-lg pr-1"/> Download in corso..</div>}
                                        </div> 
                            
                                        
                                        <div hidden={!this.state.showPreview} className="col-12 card-text">
                                            {this.state.previewState===1 && <div>{this.state.jsonPreview?<ReactJson src={this.state.jsonPreview} theme="bright:inverted" collapsed="true" enableClipboard="false" displayDataTypes="false" />:<p>Anteprima non disponibile.</p>}</div>}
                                            {this.state.previewState===2 && <div className="alert alert-danger">Ci sono stati dei problemi durante il caricamento della risorsa, contatta l'assistenza.</div>}
                                            {this.state.previewState===3 && <div><i className="fa fa-spinner fa-spin fa-lg pr-1"/> Caricamento in corso..</div>}
                                        </div> 
                                        
                                        
                                        
                                        
                                        <div hidden={!this.state.showAPI} className="col-12 card-text">
                                            <div className="row">
                                                <div className="col-12">
                                                    <label>API Endpoint</label><br/>
                                                    <input className='w-75' value={this.state.value} onChange={({target: {value}}) => this.setState({value, copied: false})} disabled='true' />
                                                    <CopyToClipboard text={this.state.value}
                                                        onCopy={() => this.setState({copied: true})}>
                                                        <button><i className="fa fa-clone"></i></button>
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
                                        <div hidden={!this.state.showTools} className="col-12 card-text">
                                            <div className="col-12">
                                                <div className="row text-muted">
                                                    <i className="text-icon fa fa-database fa-lg mr-3 mt-1" style={{ lineHeight: '1' }} /><h4 className="mb-3"><b>Superset</b></h4>
                                                </div>
                                            </div>
                                            {this.state.supersetState===1 && 
                                            <div>
                                                {this.state.supersetLink.length>0?
                                                    <div>
                                                        {this.state.supersetLink.map((link, index) => {
                                                                return(
                                                                    <div>
                                                                        <p>Accedi alla tabella <strong><a href={link.url} target='_blank'>{link.name}</a></strong> su Superset.</p>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                :
                                                    <p>La tabella associata non è presente su Superset oppure non si hanno i permessi di accesso.</p>
                                                }
                                            </div>
                                            }
                                            {this.state.supersetState===2 && <div className="alert alert-danger">Ci sono stati dei problemi durante l'accesso a Superset, contatta l'assistenza.</div>}
                                            {this.state.supersetState===3 && <div><i className="fa fa-spinner fa-spin fa-lg pr-1"/> Caricamento in corso..</div>}
                                            <div className="col-12">
                                                <div className="row text-muted">
                                                    <i className="text-icon fa fa-chart-pie fa-lg mr-3 mt-1" style={{ lineHeight: '1' }} /><h4 className="mb-3"><b>Metabase</b></h4>
                                                </div>
                                            </div>
                                            {this.state.hasMetabase && 
                                            <div>
                                                <p>Collegati a <a href={serviceurl.urlMetabase} target='_blank'>Metabase</a> e cerca il dataset per creare nuovi widget.</p>
                                            </div>
                                            }
                                            {!this.state.hasMetabase && <p>Il dataset non è ancora stato associato a Metabase</p>}
                                            <div className="col-12">
                                                <div className="row text-muted">
                                                    <i className="text-icon fa fa-sticky-note fa-lg mr-3 mt-1" style={{ lineHeight: '1' }} /><h4 className="mb-3"><b>Jupyter</b></h4>
                                                </div>
                                                <div className="row">
                                                    <p>Leggi attentamente le <a href="http://daf-docs.readthedocs.io/en/latest/manutente/datascience/jupyter.html" target='_blank'>istruzioni </a> e collegati a <a href={serviceurl.urlJupiter} target='_blank'>Jupyter</a>.  </p>
                                                    <p>Dopo aver attivato la sessione seguendo le istruzioni potrai analizzare il file al percorso:</p>
                                                    <p><strong>{dataset.operational.physical_uri}</strong>.</p>
                                                    <p>Usa i seguenti comandi per caricare il file nel notebook:</p>
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
                                                            .load(path_dataset) <br />
                                                            ) <br />
                                                            df.printSchema <br />
                                                        </code>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-2">
                                                        <strong> Spark Sql</strong>
                                                    </div>
                                                    <div className="col-10">
                                                        <code>
                                                            df.createOrReplaceTempView("{dataset.dcatapit.title}") <br />
                                                            %%spark -c sql <br />
                                                            select * from  {dataset.dcatapit.title} limit 10 <br />
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
                                            </div>
                                        </div> 
                        </div>
                        </div>
                    </div>
                    <div hidden={!this.state.showDett} className="col-5 px-0">
                        <div className="card-block">
                                <div className="border-left pl-3 row">
                                    <div className="col-12">
                                        <p className='status'>Stato</p>
                                    </div>
                                    {(!dataset.operational.ext_opendata || dataset.operational.ext_opendata === {}) &&
                                        <div className="col-6 mb-3">
                                            {feed.has_job && feed.job_status==='COMPLETED' &&
                                            <div className="progress" style={{height: '30px'}}>
                                                <div className="progress-bar bg-success w-100 h-100 text-dark" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Attivo</div>
                                            </div>
                                            }
                                            {feed.has_job && feed.job_status==='STARTED' &&
                                            <div className="progress" style={{height: '30px'}}>
                                                <div className="progress-bar bg-warning w-75 h-100 text-dark" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">In attesa di verifica</div>
                                            </div>
                                            }
                                            {feed.has_job && (feed.job_status==='FAILED' || feed.job_status==='ABANDONED') &&
                                            <div className="progress" style={{height: '30px'}}>
                                                <div className="progress-bar bg-danger w-50 h-100" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">Caricamento non riuscito</div>
                                            </div>
                                            }
                                            {!feed.has_job &&
                                            <div className="progress" style={{height: '30px'}}>
                                                <div className="progress-bar bg-gray-600 w-50 h-100" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">In attesa di caricamento</div>
                                            </div>
                                            }
                                        </div>
                                    }
                                    {(dataset.operational.ext_opendata && dataset.operational.ext_opendata != {}) &&
                                        <div className="col-6 mb-3">
                                        {!this.state.hasPreview &&
                                            <div className="progress" style={{height: '30px'}}>
                                                <div className="progress-bar bg-danger w-50 h-100" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">Caricamento non riuscito</div>
                                            </div>
                                        }
                                        {this.state.hasPreview &&
                                            <div className="progress" style={{height: '30px'}}>
                                                <div className="progress-bar bg-success w-100 h-100 text-dark" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Attivo</div>
                                            </div>
                                        }
                                        </div>
                                    }

                                    <div className="col-12 my-3">
                                        <i className="fa fa-calendar text-icon float-left pr-3" style={{lineHeight: 'inherit'}}/><p className="text-muted pb-1 mb-2">{" Creato " + dataset.dcatapit.modified}</p>
                                        <i className="fa fa-balance-scale text-icon float-left pr-3" style={{lineHeight: 'inherit'}}/><p className="text-muted pb-1 mb-2">{dataset.dcatapit.license_title}</p>
                                    </div>

                                    <div className="col-12 my-3">
                                        <p className="text-muted pb-1 mb-2"><b className="pr-2">Autore </b> <b className="text-primary">{ dataset.operational.group_own}</b></p>
                                        <p className="text-muted pb-1 mb-2"><b className="pr-2">Organizzazione </b>  <b className="text-primary">{dataset.dcatapit.owner_org}</b></p>
                                    </div>
                                    
                                    <div className="col-12 my-3">
                                    <p className="text-muted pb-1 mb-2"><b className="pr-2">Tema </b> <span className="badge badge-info"> {decodeTheme(dataset.dcatapit.theme)}</span></p>
                                    </div>

                                    <div className="col-4 mt-3 pr-0">
                                        <p className='status'>DAF Index</p>
                                    </div>
                                    <div className="col-3 mt-3">
                                        <span className="badge badge-pill badge-success text-dark">{this.state.dafIndex}</span> <span className="ml-1 text-muted"> su 5</span>
                                    </div>

                                    <div className="col-6">
                                        <table className="table table-bordered table-responsive d-inline-table">
                                            <tbody className="w-100">
                                                <tr>
                                                    <td className="bg-white"><i className="fa fa-download text-icon ml-1 mr-3"/>Download</td> <td className={this.state.hasPreview?"bg-success text-center text-dark": "bg-warning text-center text-dark"} style={{width:'46px'}}><i className={"fa " + (this.state.hasPreview?"fa-check":"fa-times") + " fa-lg"}/></td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-white"><i className="fa fa-plug text-icon ml-1 mr-3"/>API</td> <td className={this.state.hasPreview?"bg-success text-center text-dark": "bg-warning text-center text-dark"}><i className={"fa " + (this.state.hasPreview?"fa-check":"fa-times") + " fa-lg"}/></td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-white"><i className="fa fa-sticky-note text-icon ml-1 mr-3"/>Jupyter</td> <td className={this.state.hasPreview?"bg-success text-center text-dark": "bg-warning text-center text-dark"}><i className={"fa " + (this.state.hasPreview?"fa-check":"fa-times") + " fa-lg"}/></td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-white"><i className="fa fa-database text-icon ml-1 mr-3"/>Superset</td> <td className={this.state.hasSuperset?"bg-success text-center text-dark": "bg-warning text-center text-dark"}><i className={"fa " + (this.state.hasSuperset?"fa-check":"fa-times") + " fa-lg"}/></td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-white"><i className="fa fa-chart-pie text-icon ml-1 mr-3"/>Metabase</td> <td className={this.state.hasMetabase?"bg-success text-center text-dark": "bg-warning text-center text-dark"}><i className={"fa " + (this.state.hasMetabase?"fa-check":"fa-times") + " fa-lg"}/></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div hidden={!this.state.showDett} className="col-12 bg-light">
                                <div className="card-block">
                                <div className="container body w-100">
                                    <div className="row mx-auto text-muted">
                                        <i className="fa fa-chart-bar fa-lg m-4" style={{ lineHeight: '1' }} /><h2 className="mt-3 mb-4">Widget</h2>
                                    </div>
                                        {iframes&&iframes.length>0?
                                        <div className="row mx-auto m-0">
                                            {iframes.map((iframe, key) => {
                                            if (key > 2) return;
                                            return (
                                                <WidgetCard
                                                    iframe = {iframe}
                                                    key = {key}
                                                    />)
                                                })
                                            }
                                            <div className="w-100 text-center">
                                                <button className="btn btn-link" onClick={() => { this.setState({showWidget: true, showTools: false, showAPI: false, showPreview:false, showDownload:false, showDett:false })}}>
                                                    <h4 className="text-primary"><u>Vedi tutti</u></h4>
                                                </button>
                                            </div>
                                        </div>
                                        :
                                        <div className="row mx-auto m-0">
                                            <i className="px-auto mx-auto">Non sono stati creati Widget con questo dataset, se vuoi essere il primo a crearli clicca qui</i>
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div hidden={!this.state.showWidget} className="col-12 card-text pt-4 bg-light">
                                <Widgets widgets={iframes} loading={false}/>
                            </div>
                            <div className="col-12">
                                <div>
                                    <button type="button" className="btn btn-link float-right" onClick={this.searchDataset.bind(this, query, this.state.category_filter, this.state.group_filter, this.state.organization_filter, this.state.order_filter)} title="torna alla lista dei risultati di ricerca"><i className="fa fa-list fa-lg mt-2"></i> Torna alla lista dei risultati di ricerca</button>
                                </div>
                            </div>
                    </div>
                    </div>
                    }
                        {!dataset && 
                        <div className="row">
                        <div className="col-10" hidden={this.state.hidden}>
                            <div className="alert alert-danger col-" role="alert">
                                Il dataset cercato non esiste
                            </div>
                            <div>
                                <button type="button" className="btn btn-link float-right" onClick={this.searchDataset.bind(this, query, this.state.category_filter, this.state.group_filter, this.state.organization_filter, this.state.order_filter)} title="torna alla lista dei risultati di ricerca"><i className="fa fa-list fa-lg mt-2"></i> Torna alla lista dei risultati di ricerca</button>
                            </div>
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
    feed: PropTypes.object,
    iframes: PropTypes.array
}

function mapStateToProps(state) {
    const { isFetching, lastUpdated, dataset, items: datasets, query, ope, feed, iframes  } = state.datasetReducer['obj'] || { isFetching: true, items: [], ope: '' }
    return { datasets, dataset, isFetching, lastUpdated, query, ope, feed, iframes }
}

export default connect(mapStateToProps)(DatasetDetail)