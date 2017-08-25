import React, { Component } from 'react'
import { Field, FieldArray, reduxForm, formValueSelector,  change  } from 'redux-form'
import validate from './validate'
import {processInputFileMetadata} from './avroschema.js'
import Dropzone from 'react-dropzone'
import TestSelect2 from './TestSelect2';
import { connect } from 'react-redux';


const calcDataFields = (fields, files) =>
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
     })

     
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
         <div className="form-group row">
          <select className="form-control" {...input}>
            <option value="ECON"  key='theme' defaultValue>ECONOMIA</option>
            {themes.map(value => <option value={value.val} key={value.val}>{value.name}</option>)}
          </select>
        </div>
        {touched && error && <span>{error}</span>}
      </div>
   </div>
);

const renderField = ({ input, label, type, value = '', readonly, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-md-3 form-control-label">{label}</label>
      {(touched && error) ?
      <div className="col-md-9"> 
        <div className="form-group row has-danger">
          <input {...input} placeholder={label} type={type} className="form-control form-control-danger"/>
          <div className="form-control-feedback">{error}</div>
        </div>
      </div>
      :
      <div className="col-md-9">
        <div className="form-group row">  
          <input {...input} placeholder={label} readOnly={readonly} type={type} className="form-control"/>
        </div>
      </div>
      }
  </div>
)

  const renderFieldMeta = ({ input, label, type, value = '', meta: { touched, error } }) => (
    <div>
    <label className="form-control-label">{label}</label>
   <div className="col-md-12">
      <input {...input} placeholder={label} type={type} className="form-control"/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderYesNoSelector = ({ input, meta: { touched, error } }) => (
    <div>
    <label className="form-control-label">Obbligatorio?</label>
   <div className="col-md-12">
    <select className="form-control" {...input}>
      <option value="0" defaultValue key='false'>No</option>
      <option value="1" key="1">Yes</option>
    </select>
    {touched && error && <span>{error}</span>}
</div>
  </div>
);

const renderFieldType = ({ input, meta: { touched, error } }) => (
    <div>
    <label className="form-control-label">Tipo Colonna</label>
   <div className="col-md-12">
    <select className="form-control" {...input}>
      <option value="" defaultValue key=''></option>
      <option value="dimension" key='dimension'>Dimension</option>
      <option value="numerical" key="numerical">Numerical Value</option>
      <option value="textual" key="textual">Textual Value</option>
    </select>
    {touched && error && <span>{error}</span>}
</div>
  </div>
);

/*const renderHobbies = ({ fields, meta: { error } }) =>
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>
        Add Hobby
      </button>
    </li>
    {fields.map((hobby, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}
        />
        <Field
          name={hobby}
          type="text"
          component={renderField}
          label={`Hobby #${index + 1}`}
        />
      </li>
    )}
    {error &&
      <li className="error">
        {error}
      </li>}
  </ul> */


/*
const renderMembers = ({ fields, meta: { error, submitFailed } }) =>
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
    {fields.map((member, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
        />
        <h4>
          Field #{index + 1}
        </h4>
        <Field
          name={`${member}.nome`}
          type="text"
          component={renderField}
          label="Nome Campo"
        />
        <Field
          name={`${member}.tipo`}
          type="text"
          component={renderField}
          label="Tipo"
        />
       <FieldArray name={`${member}.hobbies`} component={renderHobbies} />
      </li>
    )}
  </ul> */

  /*      <li>
        <label htmlFor="ds_datafile">Add File</label>
            <input className="form-control" type="file" id="ds_datafile" accept=".csv, .txt, .json, .avro" />
            <input type="button" value="Calc Schema" onClick={() => calcDataFields(fields)}/>
        </li> */

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

//      <FieldArray name="tests" component={addMetadataFromFile}/>
/*      <Field
        name="namespace"
        type="text"
        component={renderField}
        label="namespace"
      />
      <Field
        name="name"
        type="text"
        component={renderField}
        label="name"
      />
      <Field
        name="aliases"
        type="text"
        component={renderField}
        label="aliases"
      />
  */

//let WizardFormMetadata = props => {

class WizardFormMetadata extends Component {
  constructor(props) {
    super(props)
  }

  renderDropzoneInput = ({fields,columnCard, input, reset, meta : {touched, error} }) => 
      <div>     
      {fields.length > -1 &&
      <div className="form-group">
         <div className="col-md-6 offset-md-3">
          <label htmlFor='tests'>Carica il file max 50MB</label>
          <Dropzone
            name="input"
            multiple={false}
            maxSize={52428800}
            onDrop={( filesToUpload, e ) => {
              const {dispatch} = this.props 
              calcDataFields(fields, filesToUpload);
              let fileName = filesToUpload[0].name.toLowerCase().split(".")[0]
              fileName = fileName.toLowerCase()
              fileName = fileName.split(" ").join("-")
              dispatch(change('wizard', 'title', fileName))
              }
            }>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
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
      <div>
        <div className="form-group">
          <Field
            name={`${test}.tipo.name`}
            type="text"
            component={renderField}
            label="Nome File"
            value={`${test}.tipo.name`}
          />
        </div>
        <div className="form-group">
          <div className="col-md-9 offset-md-8">
            <button type="button" className="btn btn-primary" onClick={reset}>Clear Values</button>
          </div>
        </div>
      </div>
      :
      <div className="row">
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
        <h6>
        Metadata  Colonna #{index}
        </h6>

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
       <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify"></i> Colonna #{index}
              </div>
              <div className="card-block">
                <table className="table">
                  <thead>
                    <tr>
                      <th>{index}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> test </td>
                      <td>
                        <span className="badge badge-success">Active</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Estavan Lykos</td>
                      <td>
                        <span className="badge badge-danger">Banned</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Chetan Mohamed</td>
                      <td>
                        <span className="badge badge-default">Inactive</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Derick Maximinus</td>
                      <td>
                        <span className="badge badge-warning">Pending</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Friderik Dávid</td>
                      <td>
                        <span className="badge badge-success">Active</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      </div>
      )}
    </div>
  
  render() {
    const { handleSubmit, previousPage, pristine, submitting, reset, title, columnCard } = this.props;
    return (
    <form onSubmit={handleSubmit}>
      <div className="form-group row">
        <div className="col-md-12">
          <FieldArray
            name="tests"
            component={this.renderDropzoneInput}
            title={title}
            reset={reset}
            columnCard={columnCard}
          />
        </div>
      </div>
      <div className="form-group row">
            <div className="col-md-11 offset-md-11">
              <button type="submit" className="btn btn-primary">Next</button>
            </div>
      </div>
    </form>
    )
  }
}











/*
     
      <div>
        <button type="submit" className="next">Next</button>
         <button type="button" className="previous" onClick={previousPage}>
          Previous
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
      */



// <FieldArray name="members" component={renderMembers} />


//const selector = formValueSelector('wizard') // <-- same as form name
//WizardFormMetadata = connect(state => {
  // can select values individually
//const title = (title) => change('wizard', 'title', title)
// return {
//    title
//  }
//})(WizardFormMetadata)

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
