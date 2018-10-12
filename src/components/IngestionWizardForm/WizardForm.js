import React, { Component } from 'react';
import WizardFormFirstPage from './WizardFormFirstPage';
import WizardFormSecondPage from './WizardFormSecondPage';
import WizardFormThirdPage from './WizardFormThirdPage';
import Steps, { Step } from 'rc-steps';
import themes from '../../data/themes'
import { connect  } from 'react-redux';
import { getSchema, getSchemaWS, getSystemNameKylo } from '../../actions';
import { change, reset } from 'redux-form'
import { getEditorAdminOrganizations } from '../../utility'
import 'rc-steps/assets/index.css'
import 'rc-steps/assets/iconfont.css'
import { reduxForm, formValueSelector } from 'redux-form';
import validate from './validate';
import { ingestionFormOptions } from './const';
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
    this.deleteSorgenteToForm = this.deleteSorgenteToForm.bind(this)
    this.addPipelineToForm = this.addPipelineToForm.bind(this)
    this.deletePipelineToForm = this.deletePipelineToForm.bind(this)
    this.aggiornaStato = this.aggiornaStato.bind(this)
    this.setName = this.setName.bind(this)
    this.setTemplate = this.setTemplate.bind(this)
    this.getSchemaFromWS = this.getSchemaFromWS.bind(this)
    this.setQuery = this.setQuery.bind(this)
    this.executeQuery = this.executeQuery.bind(this)
    this.resetQueryValue = this.resetQueryValue.bind(this)
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
      errorNext: undefined,
      query:undefined,
      resultQuery:undefined,
      isOpenInfo: false,
      infoText: undefined
    };
  }

  addSemanticToForm(semantics, id, context, subject, predicate, rdf_object, uri_voc, index){
    console.log('addSemanticToForm')
    const { dispatch } = this.props
    this.aggiornaStato(context, uri_voc, index)
    dispatch(change('wizard', 'inferred['+index+'].id_concetto', id))
    dispatch(change('wizard', 'inferred['+index+'].rdfsoggetto', subject))
    dispatch(change('wizard', 'inferred['+index+'].rdfpredicato', predicate))
    dispatch(change('wizard', 'inferred['+index+'].rdfcomplemento', rdf_object))
    dispatch(change('wizard', 'inferred['+index+'].uri_voc', uri_voc))
    dispatch(change('wizard', 'inferred['+index+'].concetto', semantics))
    //this.input.onChange(semantics)
  }

  addConvenzioneToForm(value, index){
    console.log('addConvenzione: ' + value)
    const { dispatch } = this.props
    this.state.listaConvenzioni.push(value)
    dispatch(change('wizard', 'inferred['+index+'].convenzioni',  this.state.listaConvenzioni))
  }

  addGerarchiaToForm(value, index){
    console.log('addGerarchia: ' + value)
    const { dispatch } = this.props
    this.state.listaGerarchie.push(value)
    dispatch(change('wizard', 'inferred['+index+'].gerarchie',  this.state.listaGerarchie))
  }

  addGruppiToForm(value){
    console.log('addGruppiToForm: ' + value)
    const { dispatch } = this.props
    this.state.listaGruppi.push(value)
    dispatch(change('wizard', 'gruppiaccesso',  this.state.listaGruppi))
  }

  addSorgenteToForm(value){
    console.log('addSorgenteToForm: ' + value)
    const { dispatch } = this.props
    this.state.listaSorgenti.push(value)
    dispatch(change('wizard', 'sorgenti', this.state.listaSorgenti))
  }

  addPipelineToForm(value){
    console.log('addPipelinesToForm: ' + value)
    const { dispatch } = this.props
    this.state.listaPipelines.push(value)
    dispatch(change('wizard', 'pipelines', this.state.listaPipelines))
  }  

  deleteConvenzioneToForm(index, tipo, val){
    console.log('deleteConvenzione')
    for(var i=0;i<this.state.listaConvenzioni.length;i++){    
      if(this.state.listaConvenzioni[i].index==index&&this.state.listaConvenzioni[i].tipo==tipo&&this.state.listaConvenzioni[i].val==val) {
        this.state.listaConvenzioni.splice(i, 1);
      }
    }
    const { dispatch } = this.props
    dispatch(change('wizard', 'inferred['+index+'].convenzioni',  this.state.listaConvenzioni)) 
  }

  deleteGerarchiaToForm(index, tipo, val){
    console.log('deleteGerarchie')
    for(var i=0;i<this.state.listaGerarchie.length;i++){    
      if(this.state.listaGerarchie[i].index==index&&this.state.listaGerarchie[i].tipo==tipo&&this.state.listaGerarchie[i].val==val) {
        this.state.listaGerarchie.splice(i, 1);
      }
    }
    const { dispatch } = this.props
    dispatch(change('wizard', 'inferred['+index+'].gerarchie',  this.state.listaGerarchie)) 
  }

  deleteGruppiToForm(nome, permesso){
    console.log('deleteGruppiToForm')
    for(var i=0;i<this.state.listaGruppi.length;i++){    
      if(this.state.listaGruppi[i].nome==nome&&this.state.listaGruppi[i].permesso==permesso) {
        this.state.listaGruppi.splice(i, 1);
      }
    }
    const { dispatch } = this.props
    dispatch(change('wizard', 'gruppiaccesso',  this.state.listaGruppi)) 
  }

  deletePipelineToForm(nome, parametro){
    console.log('deletePipelinesToForm')
    for(var i=0;i<this.state.listaPipelines.length;i++){    
      if(this.state.listaPipelines[i].nome==nome&&this.state.listaPipelines[i].parametro==parametro) {
        this.state.listaPipelines.splice(i, 1);
      }
    }
    const { dispatch } = this.props
    dispatch(change('wizard', 'pipelines',  this.state.listaPipelines)) 
  }

  deleteSorgenteToForm(tipo, url, user, chron){
    console.log('deleteSorgenteToForm')
    for(var i=0;i<this.state.listaSorgenti.length;i++){    
      if(this.state.listaSorgenti[i].tipo==tipo&&this.state.listaSorgenti[i].url==url&&this.state.listaSorgenti[i].user==user&&this.state.listaSorgenti[i].chron==chron) {
        this.state.listaSorgenti.splice(i, 1);
      }
    }
    const { dispatch } = this.props
    dispatch(change('wizard', 'sorgenti', this.state.listaSorgenti))
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

  addTagsToForm(fieldName, tags){
    var tagString=""
    tags.map((tag) => {
      tagString=tagString==''?tagString.concat(tag.text):tagString.concat("," + tag.text)
    })
    this.onChange(tagString)
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
    if(fields.nomefile && fields.nomefile!=''){
      //add source type
      var sorgente = new Object
      sorgente.tipo = "sftp"
      sorgente.url = "".concat(fields.categoria).concat("/").concat(fields.sottocategoria).concat("/").concat(fields.nome)
      sorgente.user = localStorage.getItem('user').toLowerCase()
      console.log('tempopolling: ' + fields.tempopolling)
      if(fields.tempopolling=='0')
        sorgente.chron = '{cron:' + fields.espressionecron + '}'
      else if (fields.tempopolling=='1')
        sorgente.chron = '{timer: quantita:' + fields.timerquantita + ', unita: '+ fields.timerunita+'}'
      this.state.listaSorgenti.push(sorgente)
      dispatch(change('wizard', 'sorgenti', this.state.listaSorgenti))
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

  getSchemaFromWS(fields, urlws){
    console.log('getSchemaFromWS: ' + urlws) 
    const { dispatch } = this.props;
    this.setUploading(true, undefined);
    dispatch(getSchemaWS( urlws, 'csv'))
    .then(json => { 
      if(json.status=='error'){
        this.setUploading(false, 'Errore durante il caricamento. Si prega di riprovare più tardi.' );
        console.log('error: ' + json.message);
      }else{
        this.calcDataFields(fields, json)
        this.setUploading(false, undefined);
      }
    })
  }

  setName(e){
    console.log(e.target.value)
    const { dispatch } = this.props;
    dispatch(getSystemNameKylo(e.target.value))
    .then(json => dispatch(change('wizard', 'nome', json.system_name)))
  }

  onDropFunction(fields, filesToUpload, e){
    console.log('props: ' + this.props)
    const { dispatch } = this.props
    this.setUploading(true, undefined);
    if(filesToUpload.length>0){
    this.setState({errorDrop:''})
    dispatch(getSchema(filesToUpload, 'csv'))//defaul value is csv
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
        setUploading(false, 'Dimensioni file non consentite. Il file non può superare 10MB');
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
    for(var i=0;i<ingestionFormOptions.template.length;i++){
      var templateValue = ingestionFormOptions.template[i].value
      if(templateValue && templateValue.length>0){
        for(var j=0;j<templateValue.length;j++){
          var objTemplate = templateValue[j]
          if(e.target.value==ingestionFormOptions.template[i].val)
            dispatch(change('wizard', objTemplate.name, objTemplate.value))
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
    const { page, tipi, context, infoText, listaConvenzioni, listaGerarchie, listaGruppi, listaSorgenti, listaPipelines, errorNext, query, resultQuery } = this.state;
    return (
      <div>
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
                addTagsToForm={this.addTagsToForm}
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
              />}
            {page === 1 &&
              <WizardFormSecondPage
                previousPage={this.previousPage}
                onSubmit={this.nextPage}
                tipi={tipi}
                addTagsToForm={this.addTagsToForm}
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

              />}
          </div>
        </div>
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

