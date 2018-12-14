import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    loadDatasets,
    datasetDetail,
    getFileFromStorageManager,
    getSupersetUrl,
    checkMetabase,
    datasetMetadata,
    getOpendataResources,
    checkFileOnHdfs,
    uploadHdfsFile,
    groupsInfo,
    getTableId
} from '../../actions'
import ReactTable from "react-table"
import "react-table/react-table.css";
import ReactJson from 'react-json-view'
import download from 'downloadjs'
import { serviceurl } from "../../config/serviceurl";
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';
import Dropzone from 'react-dropzone'
// Services
import { CopyToClipboard } from 'react-copy-to-clipboard';
import WidgetCard from '../../components/Cards/WidgetCard';
import { decodeTheme, isPublic, decodeCkan, isSysAdmin, getTimestamp } from '../../utility'
import Widgets from '../Widgets/Widgets'
import { toastr } from 'react-redux-toastr'
import ShareButton from '../../components/ShareButton/ShareButton';
import DatasetAdmin from './DatasetAdmin';
import { Table } from 'reactstrap';
import DatasetService from './services/DatasetService'

const datasetService = new DatasetService()

function checkIsLink(val) {
    if (val.indexOf('http') !== -1 && val.indexOf('{') === -1)
        return <a className="text-primary" href={val} target='_blank'>{val}</a>

    return val
}

function ableToEdit(user, dataset){
  var able = false
  if(user.uid === dataset.operational.group_own || user.uid === dataset.dcatapit.author){
    able = true
  }
  
  return able
}

class DatasetDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            value: '',
            copied: false,
            datastories: [],
            datasets: [],
            metadata: undefined,
            showDivMetabase: false,
            showDivSuperset: false,
            showDivJupyter: false,
            hidden: true,
            showSources: true,
            showDatastories: true,
            showDett: true,
            showMeta: true,
            showRes: false,
            showDownload: false,
            showPreview: false,
            showAPI: false,
            showTools: false,
            showWidget: false,
            showAdmin: false,
            downloadState: 3, // 1-Success, 2-Error, 3-loading
            supersetState: 3,
            previewState: 3,
            supersetLink: undefined,
            loading: true,
            jsonPreview: undefined,
            jsonOpendataResources: undefined,
            category_filter: props.history.location.state ? props.history.location.state.category_filter : undefined,
            group_filter: props.history.location.state ? props.history.location.state.group_filter : undefined,
            organization_filter: props.history.location.state ? props.history.location.state.organization_filter : undefined,
            order_filter: props.history.location.state ? props.history.location.state.order_filter : undefined,
            hasPreview: false,
            hasSuperset: false,
            hasMetabase: false,
            dafIndex: 0,
            uploadFile: false,
            file: '',
            fileName: '',
            uploading: false,

        }

        this.handlePreview = this.handlePreview.bind(this)
        this.handleDownloadFile = this.handleDownloadFile.bind(this)
        this.handleTools = this.handleTools.bind(this)
        this.handleResources = this.handleResources.bind(this)
        this.searchDataset = this.searchDataset.bind(this)
        this.toggleUploadFile = this.toggleUploadFile.bind(this)
        this.fileToBase64 = this.fileToBase64.bind(this)
    }

    componentDidMount() {
        const { query } = this.props
        const path = this.props.location.pathname
        if (path.indexOf('/') != -1) {
            var arr = path.split('/')
            var nome = arr[arr.length - 1]
            console.log(nome)
            this.setState({ name: nome })
            this.load(nome, query, false)
        }
    }

    load(nome, query, isDaf) {
        const { dispatch } = this.props
        if (!isDaf) {
            if (this.props.location.search == '?type=open') {
                dispatch(datasetMetadata(nome))
                    .catch(error => { console.log('Errore durante il caricamento dei metadati del dataset ' + nome); this.setState({ hidden: false }) })
            } else {
                dispatch(datasetDetail(nome, query, isPublic()))
                    .catch(error => { console.log('Errore durante il caricamento del dataset ' + nome); this.setState({ hidden: false }) })
            }
        } else {
            dispatch(datasetDetail(nome, query, isPublic()))
                .catch(error => { console.log('Errore durante il caricamento del dataset ' + nome); this.setState({ hidden: false }) })
        }
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch } = this.props
        if ((nextProps.dataset) && (this.props.dataset !== nextProps.dataset)) {
            const isExtOpendata = (nextProps.dataset.operational.ext_opendata && nextProps.dataset.operational.ext_opendata != {}) ? true : false
            var dafIndex = 0

            dispatch(checkFileOnHdfs(nextProps.dataset.operational.physical_uri))
                .then(json => { 
                  if(json.ok) {
                    dafIndex = dafIndex + 3; 
                    this.setState({ hasPreview: true, dafIndex: dafIndex, loading: false })
                  } 
                })
                .catch(error => { this.setState({ hasPreview: false, loading: false }) })

            dispatch(getSupersetUrl(nextProps.dataset.dcatapit.name, nextProps.dataset.dcatapit.owner_org, isExtOpendata))
                .then(json => {
                    dafIndex = json.length > 0 ? dafIndex + 1 : dafIndex
                    this.setState({ hasSuperset: json.length > 0 ? true : false, dafIndex: dafIndex })
                })
                .catch(error => { this.setState({ hasSuperset: false }) })

            dispatch(checkMetabase(nextProps.dataset.dcatapit.name))
                .then(json => {
                    dafIndex = json.is_on_metabase ? dafIndex + 1 : dafIndex
                    this.setState({ hasMetabase: json.is_on_metabase, dafIndex: dafIndex })
                })
                .catch(error => { this.setState({ hasMetabase: false }) })
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
        const { dispatch, dataset } = this.props
        this.setState({
            /* showDett:false,
            showPreview: false,
            showAPI: false,
            showTools: false,
            showWidget: false, */
            downloadState: 4,
            /* showDownload: true */
        })
        var input_src = 'json'
        if(dataset.operational.input_src){
          for(var key in dataset.operational.input_src){
            if (dataset.operational.input_src[key]!==null){
              if(!dataset.operational.input_src[key][0].param && dataset.operational.input_src[key][0].param===''){
                input_src = "json"
              }
              else if(key==="sftp"){
                input_src = dataset.operational.input_src[key][0].param.split('=')[1]
              }
              else{
                input_src = dataset.operational.input_src[key][0].param
              }
            }
          }
        }
        dispatch(getFileFromStorageManager(logical_uri, null, input_src, isPublic()))
            .then(response => {
                if(input_src==="csv"){
                  const result = response.text()
                  result.then(json =>{
                    download(json, nomeFile + '.'+input_src, (input_src==='csv'?'text/csv':'application/json'))
                    this.setState({ downloadState: 1 })
                    toastr.success('Completato', 'Download effettuato con successo')
                  })
                }else{
                  const result = response.json()
                  result.then(json => {
                    download(JSON.stringify(json), nomeFile + '.json', 'application/json')
                    this.setState({ downloadState: 1 })
                    toastr.success('Completato', 'Download effettuato con successo')
                  })
                }
                
            })
            .catch(error => {
                this.setState({ downloadState: 2 })
                toastr.error('Errore', 'Ci sono stati dei problemi durante il download del file, contatta l\'assistenza.')
            })
    }

    handleDownloadResource(url) {
        setTimeout(() => {
            const response = {
                file: url,
            };
            window.open(response.file);
        }, 100);

    }

    handleDafRedirect(nome) {
        const { query } = this.props
        console.log(nome)
        this.setState({ name: nome })
        this.load(nome, query, true)
        this.props.history.push('/private/dataset/' + nome)
    }

    handlePreview(nomeFile, logical_uri, e) {
        e.preventDefault()
        const { dispatch } = this.props
        this.setState({
            showPreview: true,
            showAPI: false,
            showTools: false,
            showWidget: false,
            showAdmin: false,
            showDownload: false,
            showDett: false,
            previewState: 3
        })
        dispatch(getFileFromStorageManager(logical_uri, 20, 'json', isPublic()))
            .then(response => { 
              const result = response.json()
              result.then(json => {
                this.setState({ previewState: 1, jsonPreview: json }) 
              })
            })
            .catch(error => { console.error(error); this.setState({ previewState: 2 }) })
    }


    handleResources(nomeFile, e) {
        e.preventDefault()
        const { dispatch } = this.props
        this.setState({
            showMeta: false,
            showRes: true

        })
        dispatch(getOpendataResources(this.state.name))
            .then(json => { this.setState({ jsonOpendataResources: json }) })
            .catch(error => { console.log('errore durante il reperimento delle risorse del dataset') })
    }

    handleTools(nomeFile, org, e) {
        e.preventDefault()
        const { dispatch, dataset, loggedUser } = this.props
        this.setState({
            showTools: true,
            showAPI: false,
            showPreview: false,
            showWidget: false,
            showAdmin: false,
            showDownload: false,
            showDett: false,
            supersetState: 3,
            supersetLink: undefined
        })
        //dataset.operational.acl ARRAY
        //loggedUser.organizations - loggedUser.workgroups
        var acl = dataset.operational.acl
        var orgsI = []
        var orgsT = []
        
        if(acl && acl!==undefined && acl!=null){
          for(var i = 0; i<acl.length; i++){
            if(loggedUser.organizations.indexOf(acl[i].groupName)>-1){
              orgsI.push(acl[i].groupName)
              orgsT.push({"name":acl[i].groupName})
            } else if(loggedUser.workgroups.indexOf(acl[i].groupName)>-1){
              orgsI.push(acl[i].groupName)
              orgsT.push({"name":acl[i].groupName})
            }
          }
        }

        const isExtOpendata = (dataset.operational.ext_opendata
            && dataset.operational.ext_opendata != {}) ? true : false
        dispatch(getSupersetUrl(nomeFile, org, isExtOpendata))
            .then(json => {
              var supersetLinks = json
              if(orgsI.length>0){
                dispatch(groupsInfo(orgsI))
                .then(json=>{
                  var orgsInfo = json
                  dispatch(getTableId(dataset.dcatapit.owner_org+"_o_"+dataset.dcatapit.name, orgsT))
                  .then(json=>{
                    for(var k in orgsInfo){
                      for(var i in json){
                        for(var j in supersetLinks){
                          if(json[i].id===supersetLinks[j].id && json[i].org===orgsInfo[k].groupCn){
                            supersetLinks[j].groupInfo = orgsInfo[k]
                          }
                        }
                      }  
                    }
                    this.setState({ supersetLink: supersetLinks, supersetState: 1 })
                  })
                })
              }else{
                this.setState({ supersetLink: supersetLinks, supersetState: 1 })
              }
            })
            .catch(error => { this.setState({ supersetState: 2 }) })
    }

    searchDataset(query, category_filter, group_filter, organization_filter, order_filter) {
        const { dispatch } = this.props
        dispatch(loadDatasets(query, 0, '', category_filter, group_filter, organization_filter, order_filter))
            .then(() => this.props.history.push({
                pathname: '/dataset',
                state: {
                    'query': query,
                    'category_filter': category_filter,
                    'organization_filter': organization_filter,
                    'order_filter': order_filter,
                    'group_filter': group_filter
                }
            }))
    }

    truncate(title, n) {
        var result = title
        if (title && title.length > n + 5) {
            result = title.substring(0, n) + '...'
        }
        return result
    }


    getNameInDaf(resId, jsonOpendataResources) {
        var name = undefined
        if (jsonOpendataResources && jsonOpendataResources.length > 0) {
            console.log('il json ha restituito un valore')
            for (var i = 0; i < jsonOpendataResources.length; i++) {
                var res = jsonOpendataResources[i]
                if (res.operational.ext_opendata.resourceId === resId) {
                    name = res.dcatapit.name
                }
            }
        }
        return name
    }

    toggleUploadFile() {
        this.setState({
            uploadFile: !this.state.uploadFile,
            file: '',
            fileName: ''
        })
    }

    fileToBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            this.setState({
                file: reader.result
            })
        }
        console.log(reader)
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    uploadFile() {
        const { dispatch, dataset } = this.props
        const { file, fileName } = this.state
        var nome = fileName.split(".")
        var nomeFile = nome[0] + '_' + getTimestamp() + '.' + nome[1]
        var url = dataset.operational.input_src.srv_push[0].url + nomeFile + '?op=CREATE'
        /* https://api.daf.teamdigitale.test/hdfs/proxy/uploads/luca_test/AGRI/produzione_agricola/agency_infer_hdfs_prova2/file.csv?op=CREATE */
        //var url = serviceurl.apiURLhdfs + '/uploads/'+localStorage.getItem('username')+'/'+dataset.operational.theme+'/'+dataset.operational.subtheme+'/'+datase.dcatapit.name+'/'+this.state.fileName+'?op=CREATE'
        this.setState({
            uploading: true
        })
        /* console.log(file) */
        dispatch(uploadHdfsFile(url, file))
            .then(response => {
                if (response.ok) {
                    toastr.success('Complimenti', 'Upload eseguito con successo')
                    this.toggleUploadFile()
                } else {
                    response.json().then(json => {
                        toastr.error('Errore', "C'è stato un problema nell'upload del file")
                        console.error(json)
                    })
                }
                this.setState({
                    uploading: false
                })
            })
    }

    renderPreview(dataset, jsonPreview){
      if(jsonPreview){
        if(dataset.operational.input_src.sftp && dataset.operational.file_type){
          if(dataset.operational.file_type==="csv" || dataset.operational.input_src.sftp[0].param.indexOf('csv')>-1){
            var columns=[{
              Header: dataset.dcatapit.name,
              columns: []
            }]
            Object.keys(jsonPreview[0]).map(elem=>{
              columns[0].columns.push({
                Header: elem,
                accessor: elem
              })
            })
            // console.log(columns)
            return(
              <ReactTable 
                data={jsonPreview}
                columns={columns}
                defaultPageSize={10}
                className="-striped -highlight"
                />
            )
          }else{
            return <ReactJson src={this.state.jsonPreview} theme="bright:inverted" collapsed="true" enableClipboard="false" displayDataTypes="false" />
          }
        }else{
          return <ReactJson src={this.state.jsonPreview} theme="bright:inverted" collapsed="true" enableClipboard="false" displayDataTypes="false" />
        }
      }else{
        return <p>Anteprima non disponibile.</p>
      }
    }

    render() {
        const { dataset, metadata, ope, feed, iframes, isFetching, dispatch, isAdditionalFetching, loggedUser } = this.props
        const { loading } = this.state
        var metadataThemes = undefined
        if (metadata) {
            try {
                metadataThemes = JSON.parse(metadata.theme)
            } catch (error) {

            }
        }

        return (loading && isFetching) ? <h1 className="text-center p-5"><i className="fas fa-circle-notch fa-spin mr-2" />Caricamento</h1> : (<div>
            {((ope === 'RECEIVE_DATASET_DETAIL' || ope === 'RECEIVE_FILE_STORAGEMANAGER') || ope === 'RECEIVE_DATASET_ADDITIONAL_DETAIL') && (dataset) &&
                <div>
                    <Modal isOpen={this.state.uploadFile} onRequestHide={this.toggleUploadFile}>
                        <ModalHeader>
                            <ModalTitle>Carica il file</ModalTitle>
                            <ModalClose onClick={this.toggleUploadFile} />
                        </ModalHeader>
                        <ModalBody>
                            {this.state.file === '' && <Dropzone
                                name="hdfs_file"
                                className="dropzone w-100 position-relative"
                                multiple={false}
                                maxSize={102400000}
                                onDrop={(filesToUpload, e) => {
                                    filesToUpload.forEach(file => {
                                      console.log(file)
                                      const reader = new FileReader();
                                      reader.readAsText(file);
                                      reader.onload = () => {
                                          const fileAsBinaryString = reader.result;
                                          this.setState({
                                              file: fileAsBinaryString
                                          })
                                      };
                                      this.setState({
                                        fileName: file.name
                                      })
                                    })
                                  }}
                                  onDropRejected={()=>{
                                    toastr.error("Errore", "Il file selezionato è troppo grande, seleziona un file di massimo 100MB")
                                  }}
                                >
                                <div style={{ position: 'absolute', top: '35%', bottom: '35%', left: '0', right: '0' }}>
                                    <div className="text-center">
                                        <h5 className="font-weight-bold">Trascina il tuo file qui, oppure clicca per selezionare il file da caricare.</h5>
                                        <h5 className="font-weight-bold">Dimensione massima 100MB</h5>
                                    </div>
                                </div>
                            </Dropzone>}
                            {this.state.file !== '' &&
                                <h5>File <b>{this.state.fileName}</b> pronto per il caricamento</h5>
                            }
                        </ModalBody>
                        <ModalFooter>
                            <button type="button" className='btn btn-gray-200' onClick={this.toggleUploadFile}>
                                Annulla
                      </button>
                            <button type="button" className="btn btn-primary px-2" onClick={this.uploadFile.bind(this)} disabled={this.state.fileName === ''}>
                                {this.state.uploading ? <i className="fas fa-circle-notch fa-spin" /> : 'Carica'}
                            </button>
                        </ModalFooter>
                    </Modal>
                    <div className='top-dataset-1'>
                        <div className="container pt-4">
                            <div className="row">
                                <div className="col-md-8">
                                  <h2 className="dashboardHeader title-dataset text-primary" title={dataset.dcatapit.title}><i className="fa fa-table fa-xs text-primary mr-3" />{this.truncate(dataset.dcatapit.title, 75)}</h2>
                                </div>
                                <div className="ml-auto col-md-2">
                                  <button className="btn btn-accento nav-link button-data-nav" disabled={isPublic()?false:!this.state.hasPreview} onClick={this.handleDownloadFile.bind(this, dataset.dcatapit.name, dataset.operational.logical_uri)}>Download {this.state.downloadState === 4 ? <i className="ml-4 fa fa-spinner fa-spin" /> : <i className="ml-4 fa fa-download" />}</button>
                                </div>
                                {isPublic() &&<div className="col-md-2">
                                   <ShareButton background="bg-white" />
                                </div>}
                            </div>
                            <ul className="nav b-b-0 nav-tabs w-100 pl-4" style={{ display: "inline-flex" }}>
                                <li className="nav-item">
                                    <a className={!this.state.showDett ? 'nav-link button-data-nav' : 'nav-link active button-data-nav'} onClick={() => { this.setState({ showDett: true, showAdmin: false, showPreview: false, showAPI: false, showTools: false, showWidget: false, showDownload: false }) }}><i className="text-icon fa fa-info-circle pr-2" />Dettaglio</a>
                                </li>
                                {(this.state.hasPreview || isPublic()) && <li className="nav-item h-100">
                                    <a className={!this.state.showPreview ? 'nav-link button-data-nav' : 'nav-link active button-data-nav'} onClick={this.handlePreview.bind(this, dataset.dcatapit.name, dataset.operational.logical_uri)}><i className="text-icon fa fa-eye pr-2" /> Anteprima</a>
                                </li>}
                                {(this.state.hasPreview || isPublic()) && <li className="nav-item h-100">
                                    <a className={!this.state.showAPI ? 'nav-link button-data-nav' : 'nav-link active button-data-nav'} onClick={() => { this.setState({ showAPI: true, showAdmin: false, showPreview: false, showTools: false, showWidget: false, showDownload: false, showDett: false, copied: false, value: serviceurl.apiURLDataset + '/dataset/' + encodeURIComponent(dataset.operational.logical_uri) }) }}><i className="text-icon fa fa-plug pr-2" />API</a>
                                </li>}
                                {this.state.hasPreview && !isPublic() && <li className="nav-item h-100">
                                    <a className={!this.state.showTools ? 'nav-link button-data-nav' : 'nav-link active button-data-nav'} onClick={this.handleTools.bind(this, dataset.dcatapit.name, dataset.dcatapit.owner_org)}><i className="text-icon fa fa-wrench pr-2" />Strumenti</a>
                                </li>}
                                {(this.state.hasPreview || isPublic()) && <li className="nav-item h-100">
                                    <a className={!this.state.showWidget ? 'nav-link button-data-nav' : 'nav-link active button-data-nav'} onClick={() => { this.setState({ showWidget: true, showAdmin: false, showTools: false, showAPI: false, showPreview: false, showDownload: false, showDett: false }) }}><i className="text-icon fa fa-chart-bar pr-2" />Widget</a>
                                </li>}
                                {!isPublic() && (this.state.hasPreview || ableToEdit(loggedUser, dataset)) && <li className="nav-item h-100">
                                    <a className={!this.state.showAdmin ? 'nav-link button-data-nav' : 'nav-link active button-data-nav'} onClick={() => { this.setState({ showAdmin: true, showWidget: false, showTools: false, showAPI: false, showPreview: false, showDownload: false, showDett: false }) }}><i className="text-icon fas fa-cogs pr-2" />Amministrazione</a>
                                </li>}
                            </ul>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div hidden={!this.state.showPreview} className="col-12 pt-5">
                              {this.state.previewState === 1 && <div>{this.renderPreview(dataset, this.state.jsonPreview)}</div>}
                              {this.state.previewState === 2 && <div className="alert alert-danger">Ci sono stati dei problemi durante il caricamento della risorsa, contatta l'assistenza.</div>}
                              {this.state.previewState === 3 && <div><i className="fa fa-spinner fa-spin fa-lg pr-1" /> Caricamento in corso..</div>}
                            </div>
                            <div hidden={this.state.showWidget} className="col-md-7 pt-5">
                                <div>
                                    <div className="row px-3">
                                        <div hidden={!this.state.showDett} className="col-12">
                                            <p className="desc-dataset" dangerouslySetInnerHTML={{ __html: dataset.dcatapit.notes }} />
                                        </div>
                                        <div hidden={!this.state.showDett} className="col-2 mx-auto">
                                            {(dataset.operational.ext_opendata &&
                                                dataset.operational.ext_opendata.url) &&
                                                <a className="btn btn-accento px-3 py-2 text-dark" href={serviceurl.urlCkan + dataset.operational.ext_opendata.name} target='_blank'>
                                                    APRI CKAN
                                            </a>
                                            }
                                            {!dataset.operational.ext_opendata && !dataset.dcatapit.privatex &&
                                              <a className="btn btn-accento px-3 py-2 text-dark" href={serviceurl.urlCkan + dataset.dcatapit.name} target='_blank'>
                                                    APRI CKAN
                                            </a>
                                            }
                                        </div>
                                        <div hidden={!this.state.showDett} className="col-12 card-text">
                                            <div className="row">
                                                <div className="col-12 py-4">
                                                    <table className="table table-responsive-1">
                                                        <tbody className="w-100">
                                                            <tr>
                                                                <th className="bg-white" style={{ width: "192px" }}><strong>Slug: </strong></th>
                                                                <td className="bg-grigino" title={dataset.dcatapit.name}>{this.truncate(dataset.dcatapit.name, 30)}
                                                                    <CopyToClipboard text={dataset.dcatapit.name}>
                                                                        <i className="text-gray-600 font-lg float-right fa fa-copy pointer" style={{ lineHeight: '1.5' }} />
                                                                    </CopyToClipboard>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {!isPublic() && <div className="col-12">
                                                    <p className="text-muted mb-4"><b>Informazioni di caricamento </b></p>
                                                </div>}
                                                <div className="col-12">
                                                    {!isPublic() && dataset.operational.input_src.sftp &&
                                                        <table className="table table-responsive-1">
                                                            <tbody className="w-100">
                                                                <tr>
                                                                    <th className="bg-white" style={{ width: "192px" }}><strong>Tipo: </strong></th> <td className="bg-grigino">SFTP</td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="bg-white" style={{ width: "192px" }}><strong>Indirizzo: </strong></th><td className="bg-grigino"><i>Comunicato</i></td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="bg-white" style={{ width: "192px" }}><strong>Porta: </strong></th><td className="bg-grigino">22</td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="bg-white" style={{ width: "192px" }}><strong>Utente: </strong></th><td className="bg-grigino">{dataset.operational.input_src.sftp[0].username}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="bg-white" style={{ width: "192px" }}><strong>Password: </strong></th><td className="bg-grigino">XXXXXXXXXX</td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="bg-white" style={{ width: "192px" }}><strong>Percorso: </strong></th>
                                                                    <td className="bg-grigino" title={dataset.operational.input_src.sftp[0].url}>{this.truncate(dataset.operational.input_src.sftp[0].url, 30)}
                                                                        <CopyToClipboard text={dataset.operational.input_src.sftp[0].url}>
                                                                            <i className="text-gray-600 font-lg float-right fa fa-copy pointer" style={{ lineHeight: '1.5' }} />
                                                                        </CopyToClipboard>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    }
                                                    {!isPublic() && dataset.operational.input_src.srv_pull &&
                                                        <table className="table table-striped table-responsive-1">
                                                            <tbody className="w-100">
                                                                <tr>
                                                                    <th className="bg-white" style={{ width: "192px" }}><strong>Tipo: </strong></th><td className="bg-grigino">Web Services</td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="bg-white" style={{ width: "192px" }}><strong>Indirizzo: </strong></th>
                                                                    <td className="bg-grigino" title={dataset.operational.input_src.srv_pull[0].url}>{this.truncate(dataset.operational.input_src.srv_pull[0].url, 30)}
                                                                        <CopyToClipboard text={dataset.operational.input_src.srv_pull[0].url}>
                                                                            <i className="text-gray-600 font-lg float-right fa fa-copy pointer" style={{ lineHeight: '1.5' }} />
                                                                        </CopyToClipboard>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="bg-white" style={{ width: "192px" }}><strong>Utente: </strong></th><td className="bg-grigino">XXXXXXXXXX</td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="bg-white" style={{ width: "192px" }}><strong>Password: </strong></th><td className="bg-grigino">XXXXXXXXXX</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    }
                                                    {!isPublic() && dataset.operational.input_src.srv_push &&
                                                        <div>
                                                            <table className="table table-striped table-responsive-1">
                                                                <tbody className="w-100">
                                                                    <tr>
                                                                        <th className="bg-white" style={{ width: "192px" }}><strong>Tipo: </strong></th><td className="bg-grigino">Web HDFS</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="bg-white" style={{ width: "192px" }}><strong>Metodo: </strong></th><td className="bg-grigino">PUT</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="bg-white" style={{ width: "192px" }}><strong>API di Upload: </strong></th>
                                                                        <td className="bg-grigino" title={dataset.operational.input_src.srv_push[0].url+'<NOME_FILE>.'+dataset.operational.file_type +'?op=CREATE'}>{this.truncate(dataset.operational.input_src.srv_push[0].url, 60)}
                                                                            <CopyToClipboard text={dataset.operational.input_src.srv_push[0].url+'<NOME_FILE>.'+dataset.operational.file_type +'?op=CREATE'}>
                                                                                <i className="text-gray-600 font-lg float-right fa fa-copy pointer" style={{ lineHeight: '1.5' }} />
                                                                            </CopyToClipboard>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="bg-white" style={{ width: "192px" }}><strong>Utente: </strong></th><td className="bg-grigino">{dataset.operational.input_src.srv_push[0].username}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            {(this.props.loggedUser.uid === dataset.operational.input_src.srv_push[0].username) &&
                                                                <div className="text-center mt-5">
                                                                    <p className="desc-dataset">Vuoi caricare direttamente il file?</p> <button className="btn btn-primary" onClick={this.toggleUploadFile.bind(this)}>Carica</button>
                                                                </div>}
                                                        </div>
                                                    }
                                                    {!this.state.hasPreview && !isPublic() &&
                                                      <p className="desc-dataset text-dark font-weight-bold mt-5">Non hai ancora effettuato un caricamento per questo dataset. Carica i dati con il metodo sopra indicato per sbloccare tutte le funzionalità offerte.</p>
                                                    }
                                                </div>
                                            </div>
                                            <br /><br />
                                        </div>
                                        <div hidden={!this.state.showDownload} className="col-12 card-text">
                                            {this.state.downloadState === 1 && <div className="alert alert-success">File scaricato con successo</div>}
                                            {this.state.downloadState === 2 && <div className="alert alert-danger">Ci sono stati dei problemi durante il download del file, contatta l'assistenza.</div>}
                                            {this.state.downloadState === 3 && <div><i className="fa fa-spinner fa-spin fa-lg pr-1" /> Download in corso..</div>}
                                        </div>
                                        <div hidden={!this.state.showAPI} className="col-12 card-text">
                                            <div className="row desc-dataset text-dark">
                                                <div className="col-12">
                                                    <p>E' possibile accedere ai dati di questo Dataset utilizzando il seguente API Endpoint</p><br />
                                                    <input className='w-75' value={this.state.value} onChange={({ target: { value } }) => this.setState({ value, copied: false })} disabled='true' />
                                                    <CopyToClipboard text={this.state.value}
                                                        onCopy={() => this.setState({ copied: true })}>
                                                        <button><i className="fa fa-clone"></i></button>
                                                    </CopyToClipboard>
                                                    {this.state.copied ? <span className="badge badge-pill badge-success"> Copiato</span> : null}
                                                </div>
                                            </div>
                                            <br /><br /><br />
                                            <div className="desc-dataset text-dark row">
                                                {!isPublic()&&<div className="col-12">
                                                  <p>Ti ricordiamo che per poter effettuare la chiamata alla REST API occorre fornire i seguenti parametri di Basic Authentication:</p>
                                                  <div>
                                                      <p><strong>Utente: </strong>{localStorage.getItem('username')}</p>
                                                      <p><strong>Password: </strong>XXXXXXXXXX</p>
                                                  </div>
                                                  <p>Per conoscere le modalità di utilizzo delle REST API puoi consultare la documentazione dettagliata <b><a className="text-primary" href="http://daf-dataportal.readthedocs.io/it/latest/dataportal-privato/api.html" title="Guida all'uso delle API">QUI</a></b></p>
                                                </div>}
                                                {isPublic()&&<div className="col-12">
                                                  <p>Ti ricordiamo che per poter effettuare la chiamata alla REST API è necessario essere registrati al portale DAF</p>
                                                  <p><Link className="text-primary" to={'/register'}>Clicca Qui</Link> per registrarti</p>
                                                </div>}
                                            </div>
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
                              {this.state.supersetState === 1 &&
                                  <div>
                                      {this.state.supersetLink.length > 0 ?
                                          <div>
                                            <div className="desc-dataset text-dark">
                                              <p>Puoi creare un widget su questo dataset in Superset per le seguenti organizzazioni o gruppi: </p>
                                            </div>
                                            <Table>
                                              <tbody>
                                              {this.state.supersetLink.map((link, index) => {
                                                switch(link.appName){
                                                  case "superset":
                                                  var groupType = ''
                                                  if(link.groupInfo.dafGroupType==='Organization'){
                                                    groupType = 'Organizzazione'
                                                  }else{
                                                    groupType = "Workgroup dell'organizzazione"+link.groupInfo.parentGroup
                                                  }
                                                  return (
                                                    <tr key={index}>
                                                      <td className="h5">{link.groupInfo.groupCn}</td>
                                                      <td className="h5">{groupType}</td>
                                                      <td><a className="text-primary float-right" title="Crea un widget privato su superset" href={link.url} target='_blank'><i className="fas fa-external-link-alt fa-lg"/></a></td>
                                                    </tr>
                                                  )
                                                  case "superset_open":
                                                  return (
                                                    <tr key={index}>
                                                      <td className="h5">Gruppo Open Data</td>
                                                      <td></td>
                                                      <td><a className="text-primary float-right" title="Crea un widget pubblico su superset" href={link.url} target='_blank'><i className="fas fa-external-link-alt fa-lg"/></a></td>
                                                    </tr>
                                                  )
                                                }
                                              })
                                              }
                                              </tbody>
                                            </Table>
                                          </div>
                                          :
                                          <p className="desc-dataset text-dark">La tabella associata non è presente su Superset oppure non si hanno i permessi di accesso. Verifica che il dataset sia stato condiviso almeno con una tua organizzazione o workgroup</p>
                                      }
                                  </div>
                              }
                              {this.state.supersetState === 2 && <div className="alert alert-danger">Ci sono stati dei problemi durante l'accesso a Superset, contatta l'assistenza.</div>}
                              {this.state.supersetState === 3 && <div className="desc-dataset"><i className="fa fa-spinner fa-spin fa-lg pr-1" /> Caricamento in corso..</div>}
                              <div className="col-12">
                                  <div className="row text-muted">
                                      <i className="text-icon fa fa-chart-pie fa-lg mr-3 mt-1" style={{ lineHeight: '1' }} /><h4 className="mb-3"><b>Metabase</b></h4>
                                  </div>
                              </div>
                              {this.state.hasMetabase &&
                                  <div className="desc-dataset text-dark">
                                      <p>Collegati a <a href={serviceurl.urlMetabase + '/question/new'} target='_blank'>Metabase</a> e cerca il dataset per creare nuovi widget.</p>
                                  </div>
                              }
                              {!this.state.hasMetabase && <p className="desc-dataset text-dark">Il dataset non è ancora stato associato a Metabase</p>}
                              <div className="col-12">
                                <div className="row text-muted">
                                    <i className="text-icon fa fa-sticky-note fa-lg mr-3 mt-1" style={{ lineHeight: '1' }} /><h4 className="mb-3"><b>Jupyter</b></h4>
                                </div>
                                {this.state.hasPreview &&
                                <div>
                                <div className="row text-muted">
                                    <p className="desc-dataset text-dark">Leggi attentamente le <a href="https://daf-dataportal.readthedocs.io/it/latest/datascience/jupyter/index.html#creazione-e-configurazione-di-un-notebook" target='_blank'>istruzioni </a> per collegarti a Jupyter.  </p>
                                    <p className="desc-dataset text-dark">Dopo aver attivato la sessione seguendo le istruzioni potrai analizzare il file al percorso:</p>
                                    <p className="desc-dataset text-dark"><strong>{dataset.operational.physical_uri}</strong>.</p>
                                    <p className="desc-dataset text-dark">Usa i seguenti comandi per caricare il file nel notebook:</p>
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
                                </div>}
                              </div>
                              {!this.state.hasPreview && <p>Non è possibile usare Jupyter per questo dataset</p>}
                          </div>
                            <div hidden={!this.state.showDett} className="col-md-5 px-0 pt-5">
                                <div>
                                    <div className="border-left pl-3 row">
                                        {!isPublic() && <div className="col-12">
                                            <p className='status'>Stato</p>
                                        </div>}
                                        {!isPublic() && (!dataset.operational.ext_opendata || dataset.operational.ext_opendata === {}) &&
                                            <div className="col-8 mb-3">
                                                {!feed && isAdditionalFetching &&
                                                    <div className="progress" style={{ height: '30px' }}>
                                                        <div className="progress-bar bg-gray-600 w-50 h-100" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">Recupero dell'informazione</div>
                                                    </div>
                                                }
                                                {feed && feed.has_job && feed.job_status === 'COMPLETED' &&
                                                    <div className="progress" style={{ height: '30px' }}>
                                                        <div className="progress-bar bg-success w-100 h-100 text-dark" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Attivo</div>
                                                    </div>
                                                }
                                                {feed && feed.has_job && feed.job_status === 'STARTED' &&
                                                    <div className="progress" style={{ height: '30px' }}>
                                                        <div className="progress-bar bg-warning w-75 h-100 text-dark" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">In attesa di verifica</div>
                                                    </div>
                                                }
                                                {feed && feed.has_job && (feed.job_status === 'FAILED' || feed.job_status === 'ABANDONED') &&
                                                    <div className="progress" style={{ height: '30px' }}>
                                                        <div className="progress-bar bg-danger w-50 h-100" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">Caricamento non riuscito</div>
                                                    </div>
                                                }
                                                {feed && !feed.has_job && (feed.state === 'ENABLED') &&
                                                    <div className="progress" style={{ height: '30px' }}>
                                                        <div className="progress-bar bg-gray-600 w-50 h-100" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">Feed attivo in attesa di caricamento</div>
                                                    </div>
                                                }
                                                {feed && !feed.has_job && (feed.state !== 'ENABLED') &&
                                                    <div className="progress" style={{ height: '30px' }}>
                                                        <div className="progress-bar bg-gray-600 w-50 h-100" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">Feed in fase di creazione</div>
                                                    </div>
                                                }
                                            </div>
                                        }
                                        {!isPublic() && (dataset.operational.ext_opendata && dataset.operational.ext_opendata != {}) &&
                                            <div className="col-8 mb-3">
                                                {!this.state.hasPreview &&
                                                    <div className="progress" style={{ height: '30px' }}>
                                                        <div className="progress-bar bg-danger w-50 h-100" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">Caricamento non riuscito</div>
                                                    </div>
                                                }
                                                {this.state.hasPreview &&
                                                    <div className="progress" style={{ height: '30px' }}>
                                                        <div className="progress-bar bg-success w-100 h-100 text-dark" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Attivo</div>
                                                    </div>
                                                }
                                            </div>
                                        }

                                        <div className="col-8 my-3">
                                            <i className="fa fa-calendar text-icon float-left pr-3" style={{ lineHeight: 'inherit' }} /><p className="text-muted pb-1 mb-2">{" Creato " + dataset.dcatapit.modified}</p>
                                            <i className="fa fa-balance-scale text-icon float-left pr-3" style={{ lineHeight: 'inherit' }} /><p className="text-muted pb-1 mb-2">{dataset.dcatapit.license_title ? dataset.dcatapit.license_title : 'Licenza non trovata'}</p>
                                            {dataset.dcatapit.privatex ?
                                                <div><i className="fa fa-lock text-icon float-left pr-3" style={{ lineHeight: 'inherit' }} /><p className="text-muted pb-1 mb-2">Il dataset è privato</p></div> :
                                                <div><i className="fa fa-globe text-icon float-left pr-3" style={{ lineHeight: 'inherit' }} /><p className="text-muted pb-1 mb-2">Il dataset è pubblico</p></div>
                                            }
                                        </div>

                                        <div className="col-12 my-3">
                                            <p className="text-muted pb-1 mb-2"><b className="pr-2">Autore </b> <b className="text-primary">{dataset.dcatapit.author}</b></p>
                                            <p className="text-muted pb-1 mb-2"><b className="pr-2">Organizzazione </b>  <b className="text-primary">{dataset.dcatapit.owner_org}</b></p>
                                        </div>

                                        <div className="col-12 my-3">
                                            <p className="text-muted pb-1 mb-2"><b className="pr-2">Tema </b> <span className="badge badge-info"> {decodeTheme(dataset.dcatapit.theme)}</span></p>
                                        </div>

                                        {!isPublic() && <div className="col-6 mt-3 pr-0">
                                            <p className='status'>DAF Index</p>
                                        </div>}
                                        {!isPublic() && <div className="col-3 mt-3">
                                            <span className="badge badge-pill badge-success text-dark">{this.state.dafIndex}</span> <span className="ml-1 text-muted"> su 5</span>
                                        </div>}

                                        {!isPublic() && <div className="col-8">
                                            <table className="table table-bordered table-responsive d-inline-table">
                                                <tbody className="w-100">
                                                    <tr>
                                                        <td className="bg-white"><i className="fa fa-download text-icon ml-1 mr-3" />Download</td> <td className={this.state.hasPreview ? "bg-success text-center text-dark" : "bg-warning text-center text-dark"} style={{ width: '46px' }}><i className={"fa " + (this.state.hasPreview ? "fa-check" : "fa-times") + " fa-lg"} /></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="bg-white"><i className="fa fa-plug text-icon ml-1 mr-3" />API</td> <td className={this.state.hasPreview ? "bg-success text-center text-dark" : "bg-warning text-center text-dark"}><i className={"fa " + (this.state.hasPreview ? "fa-check" : "fa-times") + " fa-lg"} /></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="bg-white"><i className="fa fa-sticky-note text-icon ml-1 mr-3" />Jupyter</td> <td className={this.state.hasPreview ? "bg-success text-center text-dark" : "bg-warning text-center text-dark"}><i className={"fa " + (this.state.hasPreview ? "fa-check" : "fa-times") + " fa-lg"} /></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="bg-white"><i className="fa fa-database text-icon ml-1 mr-3" />Superset</td> <td className={this.state.hasSuperset ? "bg-success text-center text-dark" : "bg-warning text-center text-dark"}><i className={"fa " + (this.state.hasSuperset ? "fa-check" : "fa-times") + " fa-lg"} /></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="bg-white"><i className="fa fa-chart-pie text-icon ml-1 mr-3" />Metabase</td> <td className={this.state.hasMetabase ? "bg-success text-center text-dark" : "bg-warning text-center text-dark"}><i className={"fa " + (this.state.hasMetabase ? "fa-check" : "fa-times") + " fa-lg"} /></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>}

                                    </div>
                                </div>
                            </div>


                            {/* <div className="col-12">
                            <div>
                                <button type="button" className="btn btn-link float-right" onClick={this.searchDataset.bind(this, query, this.state.category_filter, this.state.group_filter, this.state.organization_filter, this.state.order_filter)} title="torna alla lista dei risultati di ricerca"><i className="fa fa-list fa-lg mt-2"></i> Torna alla lista dei risultati di ricerca</button>
                            </div>
                        </div> */}

                            {!isPublic() && this.state.showAdmin && <DatasetAdmin showAdmin={this.state.showAdmin} hasPreview={this.state.hasPreview} owner={dataset.operational.author} />}
                        </div>
                    </div>
                    <div hidden={!this.state.showWidget} className="col-12 card-text pt-4 bg-light">
                        {isAdditionalFetching?<h1 className="text-center"><i className="fas fa-spin fa-circle-notch mr-2"/> Caricamento</h1>:<Widgets widgets={iframes} loading={false} />}
                    </div>
                    {<div hidden={!this.state.showDett} className="bg-light">
                        <div>
                            <div className="container body w-100">
                                <div className="row mx-auto text-muted">
                                    <i className="fa fa-chart-bar fa-lg m-4" style={{ lineHeight: '1' }} /><h2 className="mt-3 mb-4">Widget</h2>
                                </div>
                                {isAdditionalFetching?<h1 className="text-center"><i className="fas fa-spin fa-circle-notch mr-2"/>Caricamento</h1>:<div>
                                {iframes && iframes.length > 0 ?
                                    <div className="row mx-auto m-0">
                                        {iframes.map((iframe, key) => {
                                            if (key > 2) return;
                                            return (
                                                <WidgetCard
                                                    iframe={iframe}
                                                    key={key}
                                                />)
                                        })
                                        }
                                        <div className="w-100 text-center">
                                            <button className="btn btn-link" onClick={() => { this.setState({ showWidget: true, showAdmin: false, showTools: false, showAPI: false, showPreview: false, showDownload: false, showDett: false }) }}>
                                                <h4 className="text-primary"><u>Vedi tutti</u></h4>
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    <div className="row mx-auto m-0">
                                        <i className="px-auto mx-auto py-4">Non sono stati creati Widget con questo dataset, se vuoi essere il primo a crearli clicca qui</i>
                                    </div>
                                }
                                </div>}
                            </div>
                        </div>
                    </div>}
                    {isPublic() &&
                                <div className="py-5 text-center col-12">
                                    Vuoi scoprire maggiori informazioni sul dataset? <button type="button" className="ml-3 p-3 btn btn-accento" onClick={() => this.props.history.push('/private/dataset/' + dataset.dcatapit.name)}>Accedi all'area Privata</button>
                                </div>
                            }
                </div>
            }
            {(ope === 'RECEIVE_METADATA' && metadata) &&
                <div>
                    <div className='top-dataset-1'>
                        <div className="container pt-4">
                            <div className="row">
                              <div className="col-md-10">
                                <h2 className="title-dataset px-4 text-primary dashboardHeader" title={metadata.title}><i className="fa fa-table fa-xs mr-3 text-primary"/>{this.truncate(metadata.title, 75)}</h2>
                              </div>
                              <div className="col-md-2">
                                {isPublic() && <ShareButton background="bg-white" className="mt-2" />}
                              </div>
                            </div>
                            <ul className="nav b-b-0 nav-tabs w-100 pl-4" style={{ display: "inline-flex" }}>
                                <li className="nav-item">
                                    <a className={!this.state.showMeta ? 'nav-link button-data-nav' : 'nav-link active button-data-nav'} onClick={() => { this.setState({ showMeta: true, showRes: false }) }}><i className="text-icon fa fa-info-circle pr-2" />Dettaglio</a>
                                </li>
                                <li className="nav-item">
                                    <a className={!this.state.showRes ? 'nav-link button-data-nav' : 'nav-link active button-data-nav'} onClick={this.handleResources.bind(this, metadata.name)}><i className="text-icon fa fa-info-circle pr-2" />Risorse</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row pt-5">
                            <div className="col-md-7" hidden={!this.state.showMeta}>
                                <div>
                                    <div className="row px-3">
                                        <div className="col-12">
                                            <p className="desc-dataset" dangerouslySetInnerHTML={{ __html: metadata.notes }} />
                                        </div>
                                        <div className="col-2 mx-auto">
                                            <a className="btn btn-accento px-3 py-2 text-dark" href={serviceurl.urlCkan + metadata.name} target='_blank'>
                                                APRI CKAN
                                            </a>
                                        </div>
                                        <div className="col-12 card-text mt-4">
                                            <div className="row">
                                                <div className="col-12">
                                                    <p className="text-muted mb-4"><b>Metadati </b></p>
                                                </div>
                                                <div className="col-12">
                                                    <table className="table table-responsive-1">
                                                        <tbody className="w-100">
                                                            <tr>
                                                                <th className="bg-white" style={{ width: "192px" }}><strong>Identificativo dataset</strong></th>
                                                                <td className="bg-grigino">{this.truncate(metadata.identifier, 50)}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="bg-white" style={{ width: "192px" }}><strong>Temi dataset</strong></th>
                                                                <td className="bg-grigino">
                                                                    {metadataThemes && metadataThemes.map((theme, index) => {
                                                                        if (index == 0) {
                                                                            return (
                                                                                <b key={index}>{theme.theme}</b>
                                                                            )
                                                                        } else {
                                                                            return (
                                                                                <b key={index}>, {theme.theme}</b>
                                                                            )
                                                                        }

                                                                    })
                                                                    }
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="bg-white" style={{ width: "192px" }}><strong>Data creazione</strong></th>
                                                                <td className="bg-grigino">{metadata.metadata_created}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="bg-white" style={{ width: "192px" }}><strong>Data modifica</strong></th>
                                                                <td className="bg-grigino">{metadata.metadata_modified}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="bg-white" style={{ width: "192px" }}><strong>Nome titolare</strong></th>
                                                                <td className="bg-grigino">{metadata.holder_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="bg-white" style={{ width: "192px" }}><strong>Identificativo titolare</strong></th>
                                                                <td className="bg-grigino">{metadata.holder_identifier}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="bg-white" style={{ width: "192px" }}><strong>Autore</strong></th>
                                                                <td className="bg-grigino">{metadata.author}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="bg-white" style={{ width: "192px" }}><strong>Email autore</strong></th>
                                                                <td className="bg-grigino">{metadata.author_email}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="bg-white" style={{ width: "192px" }}><strong>Manutentore</strong></th>
                                                                <td className="bg-grigino">{metadata.maintainer}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="bg-white" style={{ width: "192px" }}><strong>Email manutentore</strong></th>
                                                                <td className="bg-grigino">{metadata.maintainer_email}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <p className="text-muted mb-4"><b>Informazioni Addizionali </b></p>
                                                </div>
                                                <div className="col-12">
                                                    <table className="table table-responsive-1">
                                                        <tbody className="w-100">
                                                            {metadata.extras && metadata.extras.map((extra, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <th className="bg-white" style={{ width: "192px" }}><strong>{decodeCkan(extra.key)}</strong></th>
                                                                        <td className="bg-grigino">{checkIsLink(extra.value)}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 px-0" hidden={!this.state.showMeta}>
                                <div>
                                    <div className="border-left pl-3 row">
                                        <div className="col-12">
                                            <p className='status'>Stato</p>
                                        </div>
                                        <div className="col-12 my-3">
                                            <i className="fa fa-calendar text-icon float-left pr-3" style={{ lineHeight: 'inherit' }} /><p className="text-muted pb-1 mb-2">{" Creato " + metadata.metadata_created}</p>
                                            <i className="fa fa-balance-scale text-icon float-left pr-3" style={{ lineHeight: 'inherit' }} /><p className="text-muted pb-1 mb-2">{metadata.license_title}</p>
                                            <i className="fa fa-globe text-icon float-left pr-3" style={{ lineHeight: 'inherit' }} /><p className="text-muted pb-1 mb-2">Il dataset è pubblico</p>
                                        </div>

                                        <div className="col-12 my-3">
                                            <p className="text-muted pb-1 mb-2"><b className="pr-2">Autore </b> <b className="text-primary">{metadata.author}</b></p>
                                            <p className="text-muted pb-1 mb-2"><b className="pr-2">Organizzazione </b>  <b className="text-primary">{metadata.organization.title}</b></p>
                                        </div>

                                        <div className="col-12 my-3">
                                            <p className="text-muted pb-1 mb-2"><b className="pr-2">Tema </b>
                                                {metadataThemes && metadataThemes.map((theme, index) => {
                                                    if (index == 0) {
                                                        return (
                                                            <span className="badge badge-info" key={index}>{theme.theme}</span>
                                                        )
                                                    } else {
                                                        return (
                                                            <span className="badge badge-info ml-2" key={index}>{theme.theme}</span>
                                                        )
                                                    }

                                                })
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12" hidden={!this.state.showRes}>
                                <div>
                                    <div className="px-3">
                                        <div className="card-text">
                                            {metadata.resources && metadata.resources.map((res, index) => {
                                                var dafName = this.getNameInDaf(res.id, this.state.jsonOpendataResources)
                                                return (
                                                    <div className="row" key={index}>
                                                        <div className="col-sm-8 pt-4">
                                                            <div className="text-muted" key={index}>
                                                                <i className="text-icon fa fa-sticky-note fa-pull-left fa-lg mr-3 mt-1" style={{ lineHeight: '1' }} /><h4 className="mb-3"><b>{res.name}</b></h4>
                                                            </div>
                                                            <div>
                                                                <div className="">
                                                                    <p><i>{res.description}</i></p>
                                                                </div>
                                                                <div className="">
                                                                    <p><b>Data creazione: </b>{res.created}</p>
                                                                </div>
                                                                <div className="">
                                                                    <p><b> Formato: </b>{res.format}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-4 pb-4">
                                                            <div className="py-4">
                                                                <button className="btn btn-accento" style={{ right: '20%', height: '48px', width: '200px' }} onClick={this.handleDownloadResource.bind(this, res.url)}>Download<i className="ml-4 fa fa-download" /></button>
                                                            </div>
                                                            {dafName &&
                                                                <div className="py-4">
                                                                    <button className="btn btn-accento" style={{ right: '20%', height: '48px', width: '200px' }} onClick={this.handleDafRedirect.bind(this, dafName)}>Vai al dettaglio<i className="ml-4 fa fa-chevron-circle-right" /></button>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {!dataset && !metadata && (ope === 'RECEIVE_DATASET_DETAIL_ERROR') &&
                <div className="row mx-4 mt-3">
                    <div className="col-12">
                        <div className="alert alert-danger" role="alert">
                            Il dataset cercato non esiste
                            </div>
                    </div>
                </div>}
        </div>
        )
    }
}

function mapStateToProps(state) {
    const { isFetching, isAdditionalFetching, lastUpdated, dataset, items: datasets, metadata, query, ope, feed, iframes } = state.datasetReducer['obj'] || { isFetching: true, items: [], ope: '' }
    const { newNotifications } = state.notificationsReducer['notifications'] || {}
    const { loggedUser } = state.userReducer['obj'] || {}
    return { datasets, dataset, metadata, isFetching, lastUpdated, query, ope, feed, iframes, newNotifications, loggedUser, isAdditionalFetching }
}

export default connect(mapStateToProps)(DatasetDetail)