import React, { Component } from 'react'
import { Field, FieldArray, reduxForm, formValueSelector,  change  } from 'redux-form'
import validate from './validate'
import {processInputFileMetadata} from './avroschema.js'
import Dropzone from 'react-dropzone'
import DropDownSelect from './DropDownSelect'
import TestSelect2 from './TestSelect2';
import { connect } from 'react-redux';
import { getSchema } from '../../actions';
import $ from 'jquery';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
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
          <input {...input} placeholder={label} type={type} className="form-control form-control-danger"/>
          <div className="form-control-feedback">{error}</div>
      </div>
      :
      <div className="col-md-9">
          <input {...input} placeholder={label} readOnly={readonly} type={type} className="form-control"/>
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
      <textarea {...input} name={input.name} placeholder={label} type={type} className="form-control"/>
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

const renderTipi = ({ input, label, type, tipi, index, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-md-3 form-control-label">{label}</label>
    <div className="col-md-9">
         {<select className="form-control" {...input}>
           {tipi[index].map(tipo => <option value={tipo} key={tipo}>{tipo}</option>)}
         </select>  }
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
      tipi: new Object()
    }
    this.calcDataFields = this.calcDataFields.bind(this);
  }

  calcDataFields (fields, json, tipi, setTipi) {
    let inferred = json["inferredType"];
    inferred.map((item, index) => {
      tipi[index] =  item.inferredType;
      fields.push({nome : item.column_name, tipo : item.inferredType[0], concetto : '', 
      desc : '', required : 0, field_type : '' , cat : '', tag : '', 
      constr : [{"`type`": "","param": ""}], semantics : { id: '',context: '' },
      data :  item.data});
    })
    setTipi(tipi)
  }

  addTagsToForm(fieldName, tags){
    var tagString=""
    tags.map((tag) => {
      tagString=tagString==''?tagString.concat(tag.text):tagString.concat("," + tag.text)
    })
    this.onChange(tagString)
  }

  renderDropzoneInput = ({fields,columnCard, input, reset, calcDataFields, setTipi, tipi, addTagsToForm, setUploading, uploading, meta : {touched, error} }) => 
      <div>
      {fields.length === 0 &&
        <div className="form-group row">
          <div className="col-md-5">
            <p className="text-justify">Benvenuto nel cruscotto per la registrazione di nuovi dataset.</p>
            <p className="text-justify">Scegli se caricare il file tramite URL (PULL) oppure se caricare il file direttamente attraverso la dropbox (PUSH).</p>
            <p className="text-justify">Nel caso scegliessi la seconda opzione se il file è minore di 10 mega verrà metadatato e caricato direttamente nel DAF altrimenti il file verrà lo stesso metadatato ma il contenuto dovrà essere caricato in un secondo momento.</p> 
            <p className="text-justify">Per ulteriori informazioni clicca <a href="http://daf-docs.readthedocs.io/en/latest/datamgmt/index.html" target="_blank">qui</a></p>
          </div>
          <div className="col-md-7">
          <OverlayLoader 
              color={'#06c'} 
              loader="ScaleLoader" 
              text="Caricamento in corso..." 
              active={uploading} 
              backgroundColor={'grey'}
              >
            <div className="form-group">
              <div className="col-md-12">
              <label htmlFor='tests'>Inserisci un link al tuo file:</label>
              </div>
              <div className="col-md-12">
                <input placeholder="http://" type="text" className="form-control-90"/>
                <button type="button"  className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off"><i className="fa fa-plus"></i></button>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-12">
              <label htmlFor='tests'>Oppure carica il file (max 10MB):</label>
                <Dropzone
                  name="input"
                  className="dropzone"
                  multiple={false}
                  maxSize={10485760}
                  onDrop={( filesToUpload, e ) => {
                    setUploading(true);
                    const {dispatch} = this.props 
                    if(filesToUpload.length>0){
                      this.setState({errorDrop:''})
                      dispatch(getSchema(filesToUpload))
                        .then(json => { calcDataFields(fields, json, tipi, setTipi)
                                        dispatch(change('wizard', 'separator', json.separator))
                                        dispatch(change('wizard', 'filesToUpload', filesToUpload))
                                        dispatch(change('wizard', 'tipi', tipi))
                                        setUploading(false);
                                      })
                        .catch(exception => {
                                          console.log('Eccezione !!!')
                                          setUploading(false);
                                      })
              
                      let nomeFile = filesToUpload[0].name.toLowerCase().split(".")[0]
                      nomeFile = nomeFile.toLowerCase()
                      nomeFile.split(" ").join("-")
                      dispatch(change('wizard', 'title', nomeFile))
                    }else{
                      alert('Dimensioni file non consentite')
                      this.setState({errorDrop: 'Dimensioni file non consentite'})
                      this.setState({uploading: false})
                      setUploading(false);
                    }
                  }
                  }>
                    <div className="container">
                      <div className="row" style={{"paddingTop": "10px"}}>
                        <div className="col">Trascina il tuo file qui, oppure clicca per selezionare il file da caricare.</div>
                      </div>
                      <div className="row justify-content-md-center" style={{"paddingTop": "30px"}}>
                        {this.state.errorDrop && 
                            <div className="alert alert-danger">File non conforme alle specifiche, controllare la dimensione e l'estensione.</div>
                        }
                      </div>
                    </div>
              </Dropzone>
            </div>
          </div>
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
        <div className="form-group row justify-content-center">
          <div className="col-7">
            <Field
              name={'private'}
              type="text"
              component={renderYesNoSelector}
              label="Privato"
            />
          </div>
          <div className="col-3"></div>
        </div>
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
              />
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
            {/*<Field
                name={`${test}.cat`}
                type="text"
                component={renderFieldMeta}
                label="Categoria"
                value={`${test}.cat`}
              />*/}
{/*               <div className="col-md-12">
                <button type="button" onClick={() => fields.remove(index)} className="btn btn-primary float-right" data-toggle="button" aria-pressed="false" autoComplete="off">
                  Rimuovi
                </button>
              </div> */}
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
    const { handleSubmit, previousPage, pristine, submitting, reset, title, columnCard, setTipi, tipi, setUploading, uploading } = this.props;
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
              tipi={tipi}
              setTipi={setTipi}
              uploading={uploading}
              setUploading={setUploading}
            />
    </form>
    </div>
    )
  }
}

WizardFormMetadata = connect(state => {
  // can select values individually
  const nomefile = state.nomefile || 'prova';
  //const dataSample = state.dataSample || [];
  return {
    nomefile
    //,
 //   dataSample
  }
})(WizardFormMetadata)


export default reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(WizardFormMetadata);