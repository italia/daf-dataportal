import React, { Component } from 'react';
import WizardFormFirstPage from './WizardFormFirstPage';
import WizardFormSecondPage from './WizardFormSecondPage';
import WizardFormThirdPage from './WizardFormThirdPage';
import Steps, { Step } from 'rc-steps';
import themes from '../../data/themes'
import licenze from '../../data/licenze'
import { connect  } from 'react-redux';
import { getSchema, getSchemaWS, getSystemNameKylo, loadVocabulary } from '../../actions';
import { change, reset } from 'redux-form'
import { getEditorAdminOrganizations } from '../../utility'
import 'rc-steps/assets/index.css'
import 'rc-steps/assets/iconfont.css'
import { reduxForm, formValueSelector } from 'redux-form';
import validate from './validate';
import { serviceurl } from '../../config/serviceurl'
import { config } from './config'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

const steps = [{'title': 'Carica file'},{'title': 'Descrivi le colonne'},{'title': 'Aggiungi i Metadati'}]

class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.goToSecondPage = this.goToSecondPage.bind(this)
    this.setUploading = this.setUploading.bind(this);
    this.onDropFunction = this.onDropFunction.bind(this) 
    this.addSemanticToForm = this.addSemanticToForm.bind(this)
    this.addConvenzioneToForm = this.addConvenzioneToForm.bind(this)
    this.deleteConvenzioneToForm = this.deleteConvenzioneToForm.bind(this)
    this.addGerarchiaToForm = this.addGerarchiaToForm.bind(this)
    this.deleteGerarchiaToForm = this.deleteGerarchiaToForm.bind(this)
    this.addGruppiToForm = this.addGruppiToForm.bind(this)
    this.deleteGruppiToForm = this.deleteGruppiToForm.bind(this)
    this.addSorgenteToForm = this.addSorgenteToForm.bind(this)
    this.addStorageToForm = this.addStorageToForm.bind(this)
    this.deleteSorgenteToForm = this.deleteSorgenteToForm.bind(this)
    this.deleteStorageToForm = this.deleteStorageToForm.bind(this)
    this.addPipelineToForm = this.addPipelineToForm.bind(this)
    this.deletePipelineToForm = this.deletePipelineToForm.bind(this)
    this.aggiornaStato = this.aggiornaStato.bind(this)
    this.setName = this.setName.bind(this)
    this.setTemplate = this.setTemplate.bind(this)
    this.getSchemaFromWS = this.getSchemaFromWS.bind(this)
    this.setQuery = this.setQuery.bind(this)
    this.executeQuery = this.executeQuery.bind(this)
    this.resetQueryValue = this.resetQueryValue.bind(this)
    this.modificaDataDCATAPIT = this.modificaDataDCATAPIT.bind(this)
    this.changeTreeData = this.changeTreeData.bind(this)
    this.state = {
      page: 0,
      uploading: false,
      errorUpload: undefined,
      tipi: new Object(),
      context:[],
      uri_voc:[],
      listaConvenzioni:[],
      listaGerarchie: [],
      listaGruppi: [],
      listaSorgenti: [],
      listaPipelines: [],
      listaStorage:[],
      errorNext: undefined,
      query:undefined,
      resultQuery:undefined,
      isOpenInfo: false,
      infoText: undefined,
      filePullLoaded:false,
      loadingConfiguration:false,
      vocabolariControllati:[
        {
          "uid": "voc1",
          "name": {
            "ita": "voc1",
            "eng": "voc1",
            "default": "voc1"
          }
        },
        {
          "uid": "voc2",
          "name": {
            "ita": "voc2",
            "eng": "voc2",
            "default": "voc2"
          }
        }
      ],
      datasetStdList:[
        {
          "uid": "dataset1",
          "name": {
            "ita": "Dataset 1",
          }
        },
        {
          "uid": "dataset2",
          "name": {
            "ita": "Dataset 2",
          }
        }
      ],
      config: config
    };
    //this.loadConfiguration()
    //this.loadVocabolariControllati()
  }

  loadConfiguration(){
     const { dispatch } = this.props
     this.setState({ loadingConfiguration: true })
    dispatch(loadVocabulary(serviceurl.vocabularyName))
    .then(response=>{
      if(response.ok){
        response.json()
        .then(json=>{
          this.setState({ config: JSON.parse(json.voc), 
                          loadingConfiguration: false})
          console.log(json.message)
        })
     }else{
      console.log('Errore nel reperimento del json di configurazione: ' + error) 
      this.setState({ config: config, loadingConfiguration: false })
     }})
    .catch((error)=>{ 
      console.log('Errore nel reperimento del json di configurazione: ' + error) 
      this.setState({ config: config, loadingConfiguration: false })
    }) 
  }

  loadVocabolariControllati(){
    //TODO: servizio caricamento vocabolari controllati DAF
    this.setState({
      vocabolariControllati:[
        {
          "uid": "voc1",
          "name": {
            "ita": "voc1",
            "eng": "voc1",
            "default": "voc1"
          }
        },
        {
          "uid": "voc2",
          "name": {
            "ita": "voc2",
            "eng": "voc2",
            "default": "voc2"
          }
        }
      ]
    })
  }

  addSemanticToForm(semantics, id, context, subject, predicate, rdf_object, uri_voc, index){
    const { dispatch } = this.props
    this.aggiornaStato(context, uri_voc, index)
    dispatch(change('wizard', 'inferred['+index+'].id_concetto', id))
    dispatch(change('wizard', 'inferred['+index+'].rdfsoggetto', subject))
    dispatch(change('wizard', 'inferred['+index+'].rdfpredicato', predicate))
    dispatch(change('wizard', 'inferred['+index+'].rdfcomplemento', rdf_object))
    dispatch(change('wizard', 'inferred['+index+'].uri_voc', uri_voc))
    dispatch(change('wizard', 'inferred['+index+'].concetto', semantics))
  }

  addConvenzioneToForm(value, index){
    const { dispatch } = this.props
    this.state.listaConvenzioni.push(value)
    dispatch(change('wizard', 'inferred['+index+'].convenzioni',  this.state.listaConvenzioni))
  }

  addGerarchiaToForm(value, index){
    const { dispatch } = this.props
    this.state.listaGerarchie.push(value)
    dispatch(change('wizard', 'inferred['+index+'].gerarchie',  this.state.listaGerarchie))
  }

  addGruppiToForm(value){
    const { dispatch } = this.props
    this.state.listaGruppi.push(value)
    dispatch(change('wizard', 'gruppiaccesso',  this.state.listaGruppi))
  }

  addSorgenteToForm(value){
    const { dispatch } = this.props
    this.state.listaSorgenti.push(value)
    dispatch(change('wizard', 'sorgenti', this.state.listaSorgenti))
  }

  addStorageToForm(value){
    const { dispatch } = this.props
    this.state.listaStorage.push(value)
    dispatch(change('wizard', 'storage', this.state.listaStorage))
  }

  addPipelineToForm(value){
    const { dispatch } = this.props
    this.state.listaPipelines.push(value)
    dispatch(change('wizard', 'pipelines', this.state.listaPipelines))
  }  

  deleteConvenzioneToForm(index, tipo, val){
    for(var i=0;i<this.state.listaConvenzioni.length;i++){    
      if(this.state.listaConvenzioni[i].index==index&&this.state.listaConvenzioni[i].tipo==tipo&&this.state.listaConvenzioni[i].val==val) {
        this.state.listaConvenzioni.splice(i, 1);
      }
    }
    const { dispatch } = this.props
    dispatch(change('wizard', 'inferred['+index+'].convenzioni',  this.state.listaConvenzioni)) 
  }

  deleteGerarchiaToForm(index, tipo, val){
    for(var i=0;i<this.state.listaGerarchie.length;i++){    
      if(this.state.listaGerarchie[i].index==index&&this.state.listaGerarchie[i].tipo==tipo&&this.state.listaGerarchie[i].val==val) {
        this.state.listaGerarchie.splice(i, 1);
      }
    }
    const { dispatch } = this.props
    dispatch(change('wizard', 'inferred['+index+'].gerarchie',  this.state.listaGerarchie)) 
  }

  deleteGruppiToForm(nome, permesso){
    for(var i=0;i<this.state.listaGruppi.length;i++){    
      if(this.state.listaGruppi[i].nome==nome&&this.state.listaGruppi[i].permesso==permesso) {
        this.state.listaGruppi.splice(i, 1);
      }
    }
    const { dispatch } = this.props
    dispatch(change('wizard', 'gruppiaccesso',  this.state.listaGruppi)) 
  }

  deletePipelineToForm(nome, parametro){
    for(var i=0;i<this.state.listaPipelines.length;i++){    
      if(this.state.listaPipelines[i].nome==nome&&this.state.listaPipelines[i].parametro==parametro) {
        this.state.listaPipelines.splice(i, 1);
      }
    }
    const { dispatch } = this.props
    dispatch(change('wizard', 'pipelines',  this.state.listaPipelines)) 
  }

  deleteSorgenteToForm(tipo, val){
    for(var i=0;i<this.state.listaSorgenti.length;i++){    
      if(this.state.listaSorgenti[i].tipo==tipo&&this.state.listaSorgenti[i].val==val) {
        this.state.listaSorgenti.splice(i, 1);
      }
    }
    const { dispatch } = this.props
    dispatch(change('wizard', 'sorgenti', this.state.listaSorgenti))
  }

  deleteStorageToForm(tipo, val){
    for(var i=0;i<this.state.listaStorage.length;i++){    
      if(this.state.listaStorage[i].tipo==tipo&&this.state.listaStorage[i].val==val) {
        this.state.listaStorage.splice(i, 1);
      }
    }
    const { dispatch } = this.props
    dispatch(change('wizard', 'storage', this.state.listaStorage))
  }

  modificaDataDCATAPIT(value){
    const { dispatch } = this.props
    dispatch(change('wizard', 'ultimamodifica', value)) 
  }

  changeTreeData(value){
    const { dispatch } = this.props
    dispatch(change('wizard', 'treedata', value)) 
  }
  
  openModalInfo = (infoText) => {
    console.log('infoText: ' + infoText)
    this.setState({
      isOpenInfo: true,
      infoText: infoText
    });
  };

  hideModal = () => {
    this.setState({
      isOpenInfo: false
    });
  };

  aggiornaStato(context, uri_voc, index){
    var contextArray = this.state.context
    contextArray[index] = context
    
    var uri_vocArray = this.state.uri_voc
    uri_vocArray[index] = uri_voc
    
    this.setState({context: contextArray,
                   uri_voc: uri_vocArray
                  })
  }

  addTagsFiletagsToForm(tags){
    this.onChange(tags)
  }

  addTagsFieldToForm(tags){
    this.onChange(tags)
  }

  setTipi = (value) => {
    this.setState({
      tipi: value
    });
  }

  setUploading(valueUploading, valueError){
    this.setState({
      uploading: valueUploading,
      errorNext: valueError
    });
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  goToSecondPage(fields){
    const { dispatch } = this.props
    this.setState({
      errorNext: undefined
    });
      //SORGENTI
      var sorgente = new Object
      var sched = ''
      var url = ''
      var user = localStorage.getItem('user').toLowerCase()
      if(fields.modalitacaricamento=='sftp' && fields.nomefile && fields.nomefile!=''){
        sorgente.tipo = "sftp"
        url = "".concat(fields.categoria).concat("/").concat(fields.sottocategoria).concat("/").concat(fields.nome)
        if(fields.tempopolling=='0')
        sched='{cron:' + fields.espressionecron + '}'
      else if (fields.tempopolling=='1')
        sched='{timer: quantita:' + fields.timerquantita + ', unita: '+ fields.timerunita+'}'

      sorgente.val='Url='+url+' User='+user+' Schedule='+sched
      this.state.listaSorgenti.push(sorgente)
      dispatch(change('wizard', 'sorgenti', this.state.listaSorgenti))

      // STORAGE
      var stor = new Object()
      stor.tipo='hdfs'
      stor.val='hdfs://??????'
      this.state.listaStorage.push(stor)
      dispatch(change('wizard', 'storage', this.state.listaStorage))
      this.nextPage() 

      }else if(fields.modalitacaricamento=='webservice_pull' && this.state.filePullLoaded){
        sorgente.tipo = "webservice_pull"
        url=fields.urlws

      if(fields.tempopolling=='0')
        sched='{cron:' + fields.espressionecron + '}'
      else if (fields.tempopolling=='1')
        sched='{timer: quantita:' + fields.timerquantita + ', unita: '+ fields.timerunita+'}'

      sorgente.val='Url='+url+' User='+user+' Schedule='+sched
      this.state.listaSorgenti.push(sorgente)
      dispatch(change('wizard', 'sorgenti', this.state.listaSorgenti))

      // STORAGE
      var stor = new Object()
      stor.tipo='hdfs'
      stor.val='hdfs://??????'
      this.state.listaStorage.push(stor)
      dispatch(change('wizard', 'storage', this.state.listaStorage))
      this.nextPage() 

      }else{
        this.setState({
          errorNext: 'Caricare il file per la metadatazione'
        });
      }


  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  getCategoria(liv,domain){
    var appo = [];
    themes.map((theme, index) => {
      if(liv==1){
        appo.push({val: theme.theme_code, name: theme.theme_daf_ita});
      }else{
        if(theme.theme_code==domain){
          if(theme.subthemes && theme.subthemes.length>0){
            theme.subthemes.map((subtheme) => {
              appo.push({val: subtheme.subtheme_daf_code, name: subtheme.subtheme_daf_ita});
            })
          }
        }
      }
   })
   return appo;
  }

  getSchemaFromWS(fields, urlws, tipofile){
    console.log('getSchemaFromWS - url:' + urlws +' - tipofile:'+tipofile) 
    if(urlws && tipofile){
      const { dispatch } = this.props;
      this.setUploading(true, undefined);
      this.setState({filePullLoaded:false}) 
      dispatch(getSchemaWS( urlws, tipofile))
      .then(json => { 
        if(json.status=='error'){
          this.setUploading(false, 'Errore durante il caricamento. Si prega di riprovare più tardi.' );
          console.log('error: ' + json.message);
        }else{
          this.calcDataFields(fields, json)
          this.setUploading(false, undefined);
          this.setState({filePullLoaded:true}) 
        }
      })
    }else{
      this.setState({
        errorNext: 'Inserire la url e selezionare il tipo di file per il caricamento.'
      });
    }
  }

  setName(e){
    console.log(e.target.value)
    const { dispatch } = this.props;
    dispatch(getSystemNameKylo(e.target.value))
    .then(json => dispatch(change('wizard', 'nome', json.system_name)))
  }

  onDropFunction(fields, filesToUpload, tipofile, e){
    console.log('props: ' + this.props)
    const { dispatch } = this.props
    this.setUploading(true, undefined);
    console.log('tipofile: ' + tipofile)
    if(tipofile){
      if(filesToUpload.length>0){
      this.setState({errorDrop:''})
        dispatch(getSchema(filesToUpload, tipofile))//defaul value is csv
            .then(json => { this.calcDataFields(fields, JSON.parse(json))
            //.then(json => { this.calcDataFields(fields, json)
                            this.setUploading(false, undefined);
                            dispatch(change('wizard', 'separator', json.separator))
                            dispatch(change('wizard', 'filesToUpload', filesToUpload))
                            dispatch(change('wizard', 'nomefile', filesToUpload[0].name))
                        })
            .catch(exception => {
                            console.log('Eccezione !!! ' + exception)
                            this.setUploading(false, 'Errore durante il caricamento. Si prega di riprovare più tardi.' );
                            })
      }else{
          this.setUploading(false, 'Dimensioni file non consentite. Il file non può superare 10MB');
      }
    }else{
      this.setUploading(false, 'Selezionare il tipo di file da caricare.');
    }
  }


  calcDataFields (fields, json) {
    const { dispatch } = this.props
    localStorage.setItem('kyloSchema', JSON.stringify(json));
    let inferred = json["fields"];
    var tipi = new Object()
    inferred.map((item, index) => {
      tipi[index] =  new Array(item.derivedDataType); //Only one type returned from the service !!!
      fields.push({nome : item.name, tipo : item.derivedDataType, concetto : '', 
      desc : '', required : 0, field_type : '' , cat : '', tag : '', 
      constr : [{"`type`": "","param": ""}], semantics : { id: '',context: '' },
      data :  item.sampleValues, gerarchiacampinome: item.name});
    })
    this.setTipi(tipi)
    dispatch(change('wizard', 'tipi', tipi))
  }

  setTemplate(e){
    console.log(e.target.value)
    const { dispatch } = this.props;
    const { config } = this.state
    const tempales = config['dafvoc-ingform-template']
    if(tempales&&tempales.length>0){
    for(var i=0;i<tempales.length;i++){
      var templateValue = tempales[i]
      if(templateValue.uid==e.target.value){
          var actions = templateValue.actions
          if(actions&&actions.length>0){
            for(var j=0;j<actions.length;j++){
              var action = actions[j]
              if(action.action=='fill-variables'){
                var variables = action.variables
                if(variables && variables.length>0){
                  for(var k=0;k<variables.length;k++){
                    var variable = variables[k]
                    if(variable)
                      dispatch(change('wizard', variable.name, variable.value))
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  

  getFormValue(nome){
    const selector = formValueSelector('wizard') 
    const value = selector(this.state, nome) 
    return value
  }

  resetQueryValue(){
    this.setState({
      query:'',
      resultQuery:undefined
    })
  }

  setQuery(value){
    console.log(value)
    const { dispatch } = this.props;
    this.setState({
      query: value
    })
    dispatch(change('wizard', 'query', value))
  }
  
  executeQuery(value){
    const { dispatch } = this.props;
    var resultQuery = 'resultQuery'
    this.setState({
      resultQuery: resultQuery
    })
    dispatch(change('wizard', 'resultQuery', resultQuery))
  }

  render() {
    const { onSubmit, loggedUser } = this.props;
    const { page, tipi, context, infoText, datasetStdList, listaConvenzioni, listaGerarchie, listaStorage, listaGruppi, listaSorgenti, listaPipelines, errorNext, query, resultQuery, config, vocabolariControllati, filePullLoaded } = this.state;
    return this.state.loadingConfiguration === true ? <h1 className="text-center fixed-middle"><i className="fas fa-circle-notch fa-spin mr-2" />Caricamento</h1> : (
      <div>
        {config?
        <div className="row mb-5">
          <div className="col-md-10">
            <Steps current={page}>
              {steps.map((s, i) => {
                return (
                  <Step
                    key={i}
                    title={s.title}
                  />)
              }
              )}
            </Steps>
            {page === 0 &&
              <WizardFormFirstPage
                onSubmit={this.goToSecondPage}
                previousPage={this.previousPage}
                getCategoria={this.getCategoria}
                setUploading={this.setUploading}
                onDropFunction={this.onDropFunction}
                reset={reset}
                addTagsFiletagsToForm={this.addTagsFiletagsToForm}
                setName={this.setName}
                getSchemaFromWS={this.getSchemaFromWS}
                errorNext={errorNext}
                setTemplate={this.setTemplate}
                query={query}
                setQuery={this.setQuery}
                resultQuery={resultQuery}
                executeQuery={this.executeQuery}
                resetQueryValue={this.resetQueryValue}
                openModalInfo={this.openModalInfo}
                config={config}
                filePullLoaded={filePullLoaded}
              />}
            {page === 1 &&
              <WizardFormSecondPage
                previousPage={this.previousPage}
                onSubmit={this.nextPage}
                tipi={tipi}
                addTagsFieldToForm={this.addTagsFieldToForm}
                aggiornaStato={this.aggiornaStato}
                addSemanticToForm={this.addSemanticToForm}
                addConvenzioneToForm={this.addConvenzioneToForm}
                deleteConvenzioneToForm={this.deleteConvenzioneToForm}
                addGerarchiaToForm={this.addGerarchiaToForm}
                deleteGerarchiaToForm={this.deleteGerarchiaToForm}
                context={context}
                listaConvenzioni={listaConvenzioni}
                listaGerarchie={listaGerarchie}
                openModalInfo={this.openModalInfo}
                getFormValue={this.getFormValue}
                config={config}
                vocabolariControllati={vocabolariControllati}
                changeTreeData={this.changeTreeData}
              />}
            {page === 2 &&
              <WizardFormThirdPage
                previousPage={this.previousPage}
                onSubmit={onSubmit}
                organizations={getEditorAdminOrganizations(loggedUser)}
                listaGruppi={listaGruppi}
                listaSorgenti={listaSorgenti}
                listaPipelines={listaPipelines}
                addGruppiToForm={this.addGruppiToForm}
                deleteGruppiToForm={this.deleteGruppiToForm}
                addSorgenteToForm={this.addSorgenteToForm}
                deleteSorgenteToForm={this.deleteSorgenteToForm}
                addPipelineToForm={this.addPipelineToForm}
                deletePipelineToForm={this.deletePipelineToForm}
                openModalInfo={this.openModalInfo}
                modificaDataDCATAPIT={this.modificaDataDCATAPIT}
                config={config}
                licenze={licenze}
                listaStorage={listaStorage} 
                addStorageToForm={this.addStorageToForm} 
                deleteStorageToForm={this.deleteStorageToForm}
                datasetStdList={datasetStdList}
              />}
          </div>
        </div>
        :
        <div><p>Ci sono stati problemi nel reperimento della configurazione.</p></div>
        }
        <Modal
          contentLabel="Info"
          className="Modal__Bootstrap modal-dialog modal-80"
          isOpen={this.state.isOpenInfo}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal} />
            <ModalTitle>Informazioni</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p dangerouslySetInnerHTML={{__html: infoText}}></p>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-gray-200' onClick={this.hideModal}>
              Chiudi
         </button>
          </ModalFooter>
        </Modal>
      </div>
            
    );
  }
}

WizardForm = reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(WizardForm);

const selector = formValueSelector('wizard') 
WizardForm = connect(state => {
  const categoria = selector(state, 'categoria')
  const sottocategoria = selector(state, 'sottocategoria')
  const nome = selector(state, 'nome')
  const tempopolling = selector(state, 'tempopolling')
  const espressionecron = selector(state, 'espressionecron')
  const timerquantita = selector(state, 'timerquantita')
  const timerunita = selector(state, 'timerunita')
  return { categoria, sottocategoria, nome, tempopolling, espressionecron, timerquantita, timerunita  }
})(WizardForm)

export default WizardForm

