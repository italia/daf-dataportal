import React, { Component } from 'react'
import { Field, FieldArray, reduxForm, formValueSelector,  change  } from 'redux-form'
import validate from './validate'
import {processInputFileMetadata} from './avroschema.js'
import Dropzone from 'react-dropzone'
import TestSelect2 from './TestSelect2';
import { connect } from 'react-redux';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader'

/*
const calcDataFields = (obj, fields, files) =>
     processInputFileMetadata(files, (resData)=>{
        console.log(JSON.stringify(resData))
        resData.names.map((item, index) => {
           console.log(item)
           fields.push({nome : item, tipo : resData.props[index].type, concetto : '', 
            desc : '', required : 0, field_type : '' , cat : '', tag : '', 
            constr : [{"`type`": "","param": ""}], semantics : { id: '',context: '' },
            data :  resData.data[item]})
        } , 
          fields.push({nome : 'file', tipo : files[0]})
        )
        obj.setState({uploading: false})
     })
*/
     
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
        {touched && error && <span>{error}</span>}
      </div>
   </div>
);

const renderField = ({ input, label, type, value = '', readonly, meta: { touched, error } }) => (
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

  const renderFieldMeta = ({ input, label, type, value = '', meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-md-3 form-control-label">{label}</label>
    <div className="col-md-9">
      <input {...input} placeholder={label} type={type} className="form-control"/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderYesNoSelector = ({ input, type, label, value, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-md-3 form-control-label">{label}</label>
   <div className="col-md-9">
    <select className="form-control" {...input}>
      <option value="0" defaultValue key='false'>No</option>
      <option value="1" key="1">Si</option>
    </select>
    {touched && error && <span>{error}</span>}
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
    {touched && error && <span>{error}</span>}
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
        <span>
          {error}
        </span>}
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
      uploading: false
    }
    this.calcDataFields = this.calcDataFields.bind(this);
    this.setUploading = this.setUploading.bind(this);
  }

  setUploading(obj, state){
    console.log('setUploading')
    console.log(obj)
    console.log('state: ' + state)
    obj.setState({uploading: state})
  }

  calcDataFields (obj, fields, files) {
    //this.setUploading(obj, true);
    processInputFileMetadata(files, (resData)=>{
      resData.names.map((item, index) => {
          //console.log(item)
          fields.push({nome : item, tipo : resData.props[index].type, concetto : '', 
          desc : '', required : 0, field_type : '' , cat : '', tag : '', 
          constr : [{"`type`": "","param": ""}], semantics : { id: '',context: '' },
          data :  resData.data[item]})
      } , 
        fields.push({nome : 'file', tipo : files[0]}),
      );
      //this.setUploading(obj, false);
    });
  }


  renderDropzoneInput = ({fields,columnCard, input, reset, calcDataFields, meta : {touched, error} }) => 
      <div>
      {fields.length > -1 &&
        <div className="form-group">
         <div className="col-md-6 offset-md-3">
          <label htmlFor='tests'>Carica il file max 10MB</label>
          <OverlayLoader 
              color={'blue'} 
              loader="PulseLoader" 
              text="Caricamento in corso..." 
              active={this.state.uploading} 
              backgroundColor={'grey'}
              >
              <Dropzone
                name="input"
                className="dropzone"
                multiple={false}
                maxSize={10485760}
                onDrop={( filesToUpload, e ) => {
                  //this.setUploading(this, true)
                  const {dispatch} = this.props 
                  if(filesToUpload.length>0){
                    this.setState({errorDrop:''})
                    calcDataFields(this, fields, filesToUpload)
                    //this.setUploading(this, false)
                    let fileName = filesToUpload[0].name.toLowerCase().split(".")[0]
                    fileName = fileName.toLowerCase()
                    fileName.split(" ").join("-")
                    dispatch(change('wizard', 'title', fileName))
                  }else{
                    this.setState({errorDrop: 'Dimensioni file non consentite'})
                    this.setState({uploading: false})
                  }
                }
                }>
                  <div className="container">
                    <div className="row" style={{"paddingTop": "10px"}}>
                    <div className="col">Trascina il tuo file qui, oppure clicca per selezionare il file da caricare.</div>
                    </div>
                    <div className="row justify-content-md-center" style={{"paddingTop": "30px"}}>
                    {this.state.errorDrop && <div className="alert alert-danger">File non conforme alle specifiche, controllare la dimensione e l'estensione.</div>}
                    </div>
                  </div>
              </Dropzone>
          </OverlayLoader>
        </div>
      </div>
      }
      {touched &&
        error &&
        <span>
          {error}
        </span>}       

      {fields.map((test, index) => 
      (index == 0) ?
      <div key={index}>
        <div className="form-group row justify-content-center">
          <div className="col-6">
            <Field
              name={`${test}.tipo.name`}
              type="text"
              component={renderField}
              label="Nome File"
              value={`${test}.tipo.name`}
              readonly="readonly"
            />
          </div>
          <div className="col-4">
            <button type="button" className="btn btn-primary" onClick={reset}>Elimina</button>
          </div>
        </div>
        <div className="form-group row justify-content-center">
          <div className="col-6">
            <Field
              name={'private'}
              type="text"
              component={renderYesNoSelector}
              label="Privato"
            />
          </div>
          <div className="col-4"></div>
        </div>
      </div>
      :
      <div className="row" key={index}>
        <div className="col-md-6">
          <div className="form-group">
          <div className="card">
            <div className="card-header">
              <strong>Colonna #{index}</strong>
            </div>
            <div className="card-block">
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
            <Field
              name={`${test}.concetto`}
              type="text"
              component={TestSelect2}
              label="Concetto"
              value={`${test}.concetto`}
            />
            <hr className="my-4"/>
            <div className="form-group row">
              <h6>Metadata  Colonna #{index}</h6>
            </div>
            <Field
              name={`${test}.desc`}
              type="text"
              component={renderFieldMeta}
              label="Descrizione"
              value={`${test}.desc`}
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
            <Field
              name={`${test}.cat`}
              type="text"
              component={renderFieldMeta}
              label="Categoria"
              value={`${test}.cat`}
            />
            <div className="col-md-9 offset-md-9">
              <button type="button" onClick={() => fields.remove(index)} className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off">
                Rimuovi
              </button>
            </div>
          </div>
          </div>
          </div>
        </div>
      </div>
      )}
    </div>


  render() {
    const { handleSubmit, previousPage, pristine, submitting, reset, title, columnCard } = this.props;
    return (
    <div>
    <form onSubmit={handleSubmit}>
      <div className="form-group row">
        <div className="col-md-12">
        <FieldArray
            name="tests"
            component={this.renderDropzoneInput}
            title={title}
            reset={reset}
            columnCard={columnCard}
            calcDataFields={this.calcDataFields}
          />
        </div>
      </div>
      {this.state.files.length > 0 ? <div>
          <h2>Uploading files...</h2>
          </div> : null}
      <div className="form-group row">
            <div className="col-12">
              <button type="submit" className="btn btn-primary float-right">Avanti</button>
            </div>
      </div>
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
