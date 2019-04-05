import React, { Component } from 'react'
import { Field, FieldArray, reduxForm, formValueSelector,  change, reset  } from 'redux-form'
import validate from './validate'
import {processInputFileMetadata} from './avroschema.js'
import Dropzone from 'react-dropzone'
import DropDownSelect from './DropDownSelect'
import TestSelect2 from './TestSelect2';
import { connect } from 'react-redux';
import { getSchema, getSchemaWS, getSystemNameKylo } from '../../actions';
import $ from 'jquery';
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'
import TagsInput from './TagsInput'
import AutocompleteSemantic from '../Autocomplete/AutocompleteSemantic'


//  var metadata = { "desc": "", "required": 0, "field_type": "","cat": "","tag": "","constr": [{"`type`": "","param": ""}],"semantics": {"id": "","context": ""}}
const themes = [
{'val' : 'AGRI', 'name' : 'AGRICOLTURA'},{'val' : 'EDUC', 'name' : 'EDUCAZIONE'},
{'val' : 'ECON', 'name' : 'ECONOMIA'},
{'val' : 'ENVI', 'name' : 'AMBIENTE'},{'val' : 'HEAL', 'name' : 'SANITA'},
{'val' : 'INTR', 'name' : 'INTERNAZIONALE'},{'val' : 'JUST', 'name' : 'GIUSTIZIA'},
{'val' : 'SOCI', 'name' : 'REGIONE'},{'val' : 'TECH', 'name' : 'TECNOLOGIA'},
{'val' : 'TRAN', 'name' : 'TRASPORTO'}]

const tipiKylo = ['bigint','binary','boolean','date','decimal','double','float','int','string','timestamp','tinyint']

const renderThemes = ({ input, meta: { touched, error } }) => (
    <div className="form-group row">
      <label className="col-md-3 form-control-label">Categoria</label>
      <div className="col-md-9">
          <select className="form-control" {...input}>
            {themes.map(value => <option value={value.val} key={value.val}>{value.name}</option>)}
          </select>
        {touched && error && <div className="text-danger">{error}</div>}
      </div>
   </div>
);

const renderField = ({ input, label, type, value, readonly, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-md-3 form-control-label">{label}</label>
      {(touched && error) ?
      <div className="col-md-9"> 
          <input {...input}  type={type} className="form-control form-control-danger"/>
          <div className="form-control-feedback">{error}</div>
      </div>
      :
      <div className="col-md-9">
          <input {...input}  readOnly={readonly} type={type} className="form-control"/>
      </div>
      }
  </div>
)

const renderFieldTags = ({input, label, type, value, readonly, addTagsToForm, meta: { touched, error } }) => (
<div className="form-group row">
  <label className="col-md-3 form-control-label">{label}</label>
    <div className="col-md-9"> 
        <TagsInput {...input} name={input.name} addTagsToForm={addTagsToForm}/>
        {touched && error && <div className="text-danger">{error}</div>}
    </div>
</div>
)

  const renderFieldMeta = ({ input, label, type, value = '', meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-md-3 form-control-label">{label}</label>
    <div className="col-md-9">
      <textarea {...input} name={input.name}  type={type} className="form-control"/>
      {touched && error && <div className="text-danger">{error}</div>}
      </div>
  </div>
)

const renderYesNoSelector = ({ input, type, label, value, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-md-3 form-control-label">{label}</label>
   <div className="col-md-9">
    <select className="form-control" {...input}>
      <option value="1" defaultValue key="1">Si</option>
      <option value="0" key='false'>No</option>
    </select>
    {touched && error && <div className="text-danger">{error}</div>}
  </div>
  </div>
);

const renderCsvJsonSelector = ({ input, type, label, value, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-md-3 form-control-label">{label}</label>
   <div className="col-md-9">
    <select className="form-control" {...input}>
      <option value="csv" defaultValue key="csv">CSV</option>
      <option value="json" key='json'>Json</option>
    </select>
    {touched && error && <div className="text-danger">{error}</div>}
  </div>
  </div>
);

const renderModalitaSelector = ({ input, type, label, value, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-md-3 form-control-label">{label}</label>
   <div className="col-md-9">
    <select className="form-control" {...input}>
      <option value="0" defaultValue key="0"></option>
      <option value="1" key='1'>SFTP Push </option>
      <option value="2" key='2'>Web Service Pull</option>
      <option value="3" key='3'>Web Service Push</option>
    </select>
    {touched && error && <div className="text-danger">{error}</div>}
  </div>
  </div>
);

const renderTipi = ({ input, label, type, tipi, index, meta: { touched, error } }) => (
 <div className="form-group row">
 <label className="col-md-3 form-control-label">{label}</label>
 <div className="col-md-9">
     <select className="form-control" {...input}>
       {tipiKylo.map(value => {
        return(<option value={value} key={value}>{value}</option>)
       }
      )}
      {(tipiKylo.indexOf(tipi[index][0])==-1) &&
          <option value={tipi[index]} key={tipi[index]}>{tipi[index]}</option>
      }
     </select>
   {touched && error && <div className="text-danger">{error}</div>}
 </div>
</div>
);

const renderContesti = ({ input, label, type, contesti, index, meta: { touched, error } }) => (
  <div className="form-group row">
  <label className="col-md-3 form-control-label">{label}</label>
  <div className="col-md-9">
      <select className="form-control" {...input}>
        {contesti.map(value => {
         return(<option value={value.id} key={value.id}>{value.humanlabel}</option>)
        }
       )}
      </select>
    {touched && error && <div className="text-danger">{error}</div>}
  </div>
 </div>
 );


const renderFieldType = ({ input, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-md-3 form-control-label">Tipo Colonna</label>
   <div className="col-md-9">
    <select className="form-control" {...input}>
      <option value="" defaultValue key=''></option>
      <option value="dimension" key='dimension'>Dimensione</option>
      <option value="numerical" key="numerical">Valore numerico</option>
      <option value="textual" key="textual">Valore testuale</option>
    </select>
    {touched && error && <div className="text-danger">{error}</div>}
</div>
  </div>
);

const addMetadataFromFile = ({ fields, meta: { error, submitFailed } }) =>   
 <ul>
       <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Member
      </button>
      {submitFailed &&
        error &&
        <div className="text-danger">{error}</div>}
    </li>

    {fields.map((test, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
        />
        <h4>
          Member #{index + 1}
        </h4>
        <Field
          name={`${test}.nome`}
          type="text"
          component={renderField}
          label="Nome Campo"
          value={`${test}.nome`}
        />
        <Field
          name={`${test}.tipo`}
          type="text"
          component={renderField}
          label="Tipo"
          value={`${test}.tipo`}
        />
      </li>
    )}
  </ul>

class WizardFormMetadata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      tipi: new Object(),
      context:[],
      uri_voc:[],
      showMore: false
    }
    this.calcDataFields = this.calcDataFields.bind(this)
    this.aggiornaStato = this.aggiornaStato.bind(this)
    this.cleanReduxForm()
  }
  
  handleToggleClickMore() {
    this.setState(prevState => ({
      showMore: !prevState.showMore
    }));
  }

  cleanReduxForm(){
    const {dispatch} = this.props 
    dispatch(reset('wizard'));  // requires form name
  }

  calcDataFields (fields, json, tipi, setTipi) {
    localStorage.setItem('kyloSchema', JSON.stringify(json));
    let inferred = json["fields"];
    inferred.map((item, index) => {
      tipi[index] =  new Array(item.derivedDataType); //Only one type returned from the service !!!
      fields.push({nome : item.name, tipo : item.derivedDataType, concetto : '', 
      desc : '', required : 0, field_type : '' , cat : '', tag : '', 
      constr : [{"`type`": "","param": ""}], semantics : { id: '',context: '' },
      data :  item.sampleValues});
    })
    setTipi(tipi)
  }

  getSchemaFromWS(dispatch, calcDataFields, fields, tipi, setTipi, filetype,setUploading){
    console.log('getSchemaFromWS') 
    setUploading(true, undefined);
    dispatch(change('wizard', 'ws_url', this.url.value))
    dispatch(change('wizard', 'title', this.url.value))
    dispatch(getSystemNameKylo(this.url.value))
    .then(json => dispatch(change('wizard', 'nome', json.system_name)))
    dispatch(getSchemaWS( this.url.value, filetype))
    .then(json => { 
      if(json.status=='error'){
        setUploading(false, 'Errore durante il caricamento. Si prega di riprovare più tardi.' );
        console.log('error: ' + json.message);
      }else{
        calcDataFields(fields, json, tipi, setTipi)
        //dispatch(change('wizard', 'separator', json.separator))
        //dispatch(change('wizard', 'filesToUpload', filesToUpload))
        dispatch(change('wizard', 'tipi', tipi))
        setUploading(false, undefined);
      }
    })
  }

  addSemanticToForm(semantics, id, context, subject, predicate, rdf_object, uri_voc, index, wizard, dispatch, aggiornaStato){
    aggiornaStato(context, uri_voc, index)
    dispatch(change('wizard', 'tests['+index+'].id_concetto', id))
    dispatch(change('wizard', 'tests['+index+'].subject', subject))
    dispatch(change('wizard', 'tests['+index+'].predicate', predicate))
    dispatch(change('wizard', 'tests['+index+'].rdf_object', rdf_object))
    dispatch(change('wizard', 'tests['+index+'].uri_voc', uri_voc))
    
    this.input.onChange(semantics)
  }

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

  renderDropzoneInput = ({fields,columnCard, input, reset, calcDataFields, setTipi, tipi, addTagsToForm, addSemanticToForm, getSchemaFromWS, setUploading, uploading, errorUpload, modalitacaricamento, wizard, dispatchAction, aggiornaStato, handleToggleClickMore, filetype, meta : {touched, error} }) => 
      <div>
      {fields.length === 0 &&
        <div className="form-group row">
          <div className="col-md-5">
            <p className="text-justify"><b>Benvenuto</b> ricordati che a grandi poteri derivano grandi responsabilità</p>
            {(modalitacaricamento==0 || modalitacaricamento==null) &&<p className="text-justify">Scegli una modalità di caricamento per il tuo dataset</p>}
            {modalitacaricamento==1 && <div><h4> Caricamento SFTP Push</h4>
            <p className="text-justify">Carica un file di esempio minore di 1MB nella drop-area qui accanto. </p>
            <p className="text-justify">Inserisci le informazioni seguendo la procedura guidata</p> 
            <p className="text-justify">Il file vero e proprio lo dovrai caricare all'indirizzo <b>SFTP</b> che ti abbiamo comunicato </p></div>} 
            {modalitacaricamento==2 &&<div><h4> Caricamento Web Service Pull</h4>
            <p className="text-justify">Inserisci l'url dei dati da caricare </p>
            <p className="text-justify">Inserisci le informazioni seguendo la procedura guidata</p> 
            <p className="text-justify">Il caricamento del file parte in automatico a intervalli regolari</p>
            <p className="text-justify">Per ulteriori informazioni clicca <a href="http://daf-docs.readthedocs.io/en/latest/datamgmt/index.html" target="_blank">qui</a></p></div> }
            {modalitacaricamento==3 &&<div><h4> Caricamento Web Service Push</h4>
            <p className="text-justify">Carica un file di esempio minore di 1MB nella drop-area qui accanto. </p>
            <p className="text-justify">Inserisci le informazioni seguendo la procedura guidata</p> 
            <p className="text-justify">Il file vero e proprio lo dovrai caricare successivamente chiamando l'API comunicata o attraverso la drop-area nella scheda di dettaglio del dataset. Dimensione massima 100MB.</p> 
            </div>}
          </div>
          <div className="col-md-7">
          <Field
              name={'filetype'}
              type="text"
              component={renderCsvJsonSelector}
              label="Tipo File"
            />
            <Field
              name={'modalitacaricamento'}
              type="text"
              component={renderModalitaSelector}
              label="Modalità caricamento"
            />
            <OverlayLoader 
                color={'#06c'} 
                loader="ScaleLoader" 
                text="Caricamento in corso..." 
                active={uploading} 
                backgroundColor={'grey'}
                >
            {modalitacaricamento==2 &&
              <div className="form-group">
                <label htmlFor='tests'>Inserisci un link al tuo file:</label>
                <div className="col-md-12 p-0">
                  <input placeholder="http://" type="text" ref={(url) => this.url = url} id="url" className="form-control-90"/>
                  <button type="button"  className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off" onClick={this.getSchemaFromWS.bind(this, this.props.dispatch, calcDataFields, fields, tipi, setTipi, filetype?filetype:'csv', setUploading)}><i className="fa fa-plus"></i></button>
                </div>
              </div>
            }
            {(modalitacaricamento==1 || modalitacaricamento==3) && 
              <div className="form-group">
                <label htmlFor='tests'>Carica il file (max 1MB):</label>
                  <Dropzone
                    name="input"
                    className="dropzone w-100"
                    multiple={false}
                    maxSize={10485760}
                    onDrop={( filesToUpload, e ) => {
                      setUploading(true, undefined);
                      const {dispatch} = this.props 
                      if(filesToUpload.length>0){
                        this.setState({errorDrop:''})
                        dispatch(getSchema(filesToUpload, filetype?filetype:'csv'))//defaul value is csv
                          .then(json => { calcDataFields(fields, JSON.parse(json), tipi, setTipi)
                                          dispatch(change('wizard', 'separator', json.separator))
                                          dispatch(change('wizard', 'filesToUpload', filesToUpload))
                                          dispatch(change('wizard', 'tipi', tipi))
                                          setUploading(false, undefined);
                                        })
                          .catch(exception => {
                                            console.log('Eccezione !!!')
                                            setUploading(false, 'Errore durante il caricamento. Si prega di riprovare più tardi.' );
                                            })
                
                        let nomeFile = filesToUpload[0].name.toLowerCase().split(".")[0]
                        nomeFile = nomeFile.toLowerCase()
                        nomeFile.split(" ").join("-")
                        dispatch(change('wizard', 'title', nomeFile))
                        dispatch(change('wizard', 'nomeFile', filesToUpload[0].name))
                        dispatch(getSystemNameKylo(nomeFile))
                        .then(json => dispatch(change('wizard', 'nome', json.system_name)))
                      }else{
                        setUploading(false, 'Dimensioni file non consentite. Il file non può superare 10MB');
                      }
                    }
                    }> 
                      <div className="container">
                        <div className="row" style={{"paddingTop": "10px"}}>
                          <div className="col">Trascina il tuo file qui, oppure clicca per selezionare il file da caricare.</div>
                        </div>
                      </div>
                </Dropzone>
            </div>
          }
          {errorUpload && <div className="text-danger">{errorUpload}</div>}
          </OverlayLoader>
        </div>  
      </div>
      }
      {touched && error && <div className="text-danger">{error}</div>}
      {(fields && fields.length > 0) &&
      <div key="FileName">
        <div className="form-group row justify-content-center">
          <div className="col-7">
            <Field
              name="title"
              type="text"
              component={renderField}
              label="Nome File"
              readonly="readonly"
              hidden="true"
            />
          </div>
          <div className="col-3">
            <button type="button" className="btn btn-primary" onClick={reset}>Elimina</button>
          </div>
        </div>
        {/* <div className="form-group row justify-content-center" hidden>
          <div className="col-7">
            <Field
              name={'private'}
              type="text"
              component={renderYesNoSelector}
              label="Privato"
            />
          </div>
          <div className="col-3"></div>
        </div> */}
      </div>
      } 
      {fields.map((test, index) => 
      <div key={index}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
            <div className="card">
              <div className="card-header">
                <strong>Metadata {fields.get(index).nome}</strong>
              </div>
              <div className="card-block">
              <Field
                name={`${test}.nome`}
                type="text"
                component={renderField}
                label="Nome Campo"
                value={`${test}.nome`}
                readonly="readonly"
              />
              <Field
                name={`${test}.tipo`}
                type="text"
                component={renderTipi}
                label="Tipo"
                value={`${test}.tipo`}
                tipi={tipi}
                index={index}
              />
              <Field
                name={`${test}.concetto`}
                type="text"
                component={AutocompleteSemantic}
                label="Concetto"
                value={`${test}.concetto`}
                addSemanticToForm={addSemanticToForm}
                index={index}
                wizard={wizard}
                dispatchAction={dispatchAction}
                aggiornaStato={aggiornaStato}
              />
              {this.state.context && this.state.context[index] && this.state.context[index].length>0 &&
                <div>
                  <Field
                    name={`${test}.contesto`}
                    type="text"
                    component={renderContesti}
                    label="Contesto"
                    value={`${test}.contesto`}
                    contesti={this.state.context[index]}
                    index={index}
                  /> 
                  <Field
                  name={`${test}.uri_voc`}
                  type="text"
                  component={renderField}
                  label="Uri Vocabulary"
                  value={`${test}.uri_voc`}
                  />
                   <Field
                  name={`${test}.uri_property`}
                  type="text"
                  component={renderField}
                  label="Uri Property"
                  value={`${test}.uri_property`}
                  />
                   <Field
                  name={`${test}.gerarchia`}
                  type="text"
                  component={renderField}
                  label="Gerarchia"
                  value={`${test}.gerarchia`}
                  />
                </div>
              }
              <Field
                name={`${test}.desc`}
                type="text"
                component={renderFieldMeta}
                label="Descrizione"
                value={`${test}.desc`}
              />
              <Field
                name={`${test}.tag`}
                type="text"
                component={renderFieldTags}
                label="Tags"
                value={`${test}.tag`}
                addTagsToForm={addTagsToForm}
              />
              <Field
                name={`${test}.required`}
                type="text"
                component={renderYesNoSelector}
                label="Obbligatorio"
                value={`${test}.required`}
              />
              <Field
                name={`${test}.field_type`}
                type="text"
                component={renderFieldType}
                label="Tipo Colonna"
                value={`${test}.field_type`}
              />
              <div className="form-group row">
                <div className="col-md-12">
                  <button type="button" className={"b-t-0 b-b-0 btn "+ (this.state.showMore ? "btn-secondary":"btn-light")} onClick={handleToggleClickMore}>Opzioni avanzate <i className={"fa " + (this.state.showMore ? "fa-angle-up" : "fa-angle-down")}></i></button>
                </div>
              </div>
              {this.state.showMore &&
              <div>
                  <Field
                    name={`${test}.personale`}
                    type="text"
                    component={renderYesNoSelector}
                    label="Personale"
                    value={`${test}.personale`}
                  />
                  <Field
                    name={`${test}.cat`}
                    type="text"
                    component={renderField}
                    label="Categoria"
                    value={`${test}.cat`}
                  />
                  <Field
                    name={`${test}.format_std_name`}
                    type="text"
                    component={renderField}
                    label="STD-Nome"
                    value={`${test}.format_std_name`}
                  />
                  <Field
                    name={`${test}.format_std_param`}
                    type="text"
                    component={renderField}
                    label="STD-Parametri"
                    value={`${test}.format_std_param`}
                  />
                  <Field
                    name={`${test}.field_profile_is_index`}
                    type="text"
                    component={renderField}
                    label="FP-Indice"
                    value={`${test}.field_profile_is_index`}
                  />
                  <Field
                    name={`${test}.field_profile_is_profile`}
                    type="text"
                    component={renderField}
                    label="FP-Profilo"
                    value={`${test}.field_profile_is_profile`}
                  />
                  <Field
                    name={`${test}.field_profile_validation`}
                    type="text"
                    component={renderField}
                    label="FP-Validazione"
                    value={`${test}.field_profile_validation`}
                  />
                  <Field
                    name={`${test}.field_profile_standardization`}
                    type="text"
                    component={renderField}
                    label="FP-Standardizazione"
                    value={`${test}.field_profile_standardization`}
                  />
              </div>
              }
            </div>
            </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <div className="card">
                <div className="card-header">
                  <strong>Dati colonna {fields.get(index).nome}</strong>
                </div>
                <div className="card-block">
                  {fields.get(index).data && fields.get(index).data.map((row, index) => 
                    <p key={index}>{row}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      {fields.length > 0 &&
      <div className="form-group row">
          <div className="col-12">
            <button type="submit" className="btn btn-primary float-right">Avanti</button>
          </div>
      </div>}
    </div>

  render() {
    const { handleSubmit, previousPage, pristine, submitting, reset, title, columnCard, setTipi, tipi, setUploading, uploading, errorUpload, modalitacaricamento, filetype } = this.props;
    return (
    <div>
    <form onSubmit={handleSubmit}>
        <FieldArray
              name="tests"
              component={this.renderDropzoneInput}
              title={title}
              reset={reset}
              columnCard={columnCard}
              calcDataFields={this.calcDataFields}
              addTagsToForm={this.addTagsToForm}
              addSemanticToForm={this.addSemanticToForm}
              getSchemaFromWS={this.getSchemaFromWS}
              tipi={tipi}
              setTipi={setTipi}
              uploading={uploading}
              errorUpload={errorUpload}
              setUploading={setUploading}
              modalitacaricamento={modalitacaricamento}
              filetype={filetype}
              wizard={this}
              dispatchAction={this.props.dispatch}
              aggiornaStato={this.aggiornaStato.bind(this)}
              handleToggleClickMore={this.handleToggleClickMore.bind(this)}
            />
    </form>
    </div>
    )
  }
}

const selector = formValueSelector('wizard') // <-- same as form name
WizardFormMetadata = connect(state => {
  // can select values individually
  const nomefile = state.nomefile || 'prova';
  const modalitacaricamento = selector(state, 'modalitacaricamento')
  const filetype = selector(state, 'filetype')
  return {
    nomefile,
    modalitacaricamento,
    filetype
  }
})(WizardFormMetadata)


export default reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
  initialValues: {
    private:1
  }
})(WizardFormMetadata);