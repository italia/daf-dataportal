import React from 'react';
import { Field,FieldArray ,reduxForm, formValueSelector } from 'redux-form';
import validate from './validate';
import TestSelect from './TestSelect';
import { connect  } from 'react-redux';
import { serviceurl } from '../../config/serviceurl.js'

const isStds = ['true'];
const tipo_lettura = ['ts']

const renderField = ({ input, label, type, value = '', meta: { touched, error } }) => (
  <div>
      {(touched && error) ?
        <div className="form-group row has-danger">
          <input {...input} placeholder={label} type={type} className="form-control form-control-danger"/>
          <div className="form-control-feedback">{error}</div>
        </div>
      :
          <input {...input} placeholder={label} type={type} className="form-control"/>
      }
  </div>
)

const renderTipoLettura = ({ input, meta: { touched, error } }) => (
  <div>
    <select className="form-control" {...input}>
      <option value="update" selected key='update'>Ultimo Aggiornamento</option>
      {tipo_lettura.map(val => <option value={val} key={val}>Time Series</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

const renderYesNoSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select className="form-control" {...input}>
      <option value='false' defaultValue key='false'>No</option>
      {isStds.map(val => <option value={val} key={val}>Si</option>)}
    </select>
    {touched && error && <span>{error}</span>}

  </div>
);

const pushOrPull = ({ input, meta: { touched, error } }) => (
  <div>
    <select className="form-control" {...input}>
      <option value={true} defaultValue>Invia</option>
      <option value={false} >Esponi</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

const storages = ({ input, meta: { touched, error } }) => (
  <div>
    <select className="form-control" {...input}>
      <option value="hdfs" defaultValue>Hdfs</option>
      <option value="kudu" >Kudu</option>
      <option value="hbase" >Hbase</option>
      <option value="textdb" >Textdb</option>
      <option value="mongodb" >Mongodb</option>
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

const ftpOrWebservice = ({ input, meta: { touched, error } }) => (
  <div>
    <select className="form-control" {...input}>
      <option value='sftp' defaultValue='sftp' selected>sFTP</option>
      <option value='webservice' >Webservice</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);



let WizardFormThirdPage = props => {

  const { handleSubmit, pristine, previousPage, submitting, isStandard, isOk = 'false', isPush = true, isFtp = 'sftp', followStandard = 'false' } = props;  
  let standards = serviceurl.apiURLCatalog + '/dataset-catalogs/standard-uris' ; 
 
  return (
    <form  onSubmit={handleSubmit}>
      <div className="col-md-12">
      <div className="form-group">
        <label>Esponi i dati o li invii?</label>
        <Field name="pushOrPull" component={pushOrPull} />
      </div>

      <div className="form-group">
        <label>SFTP o web service</label>
        <Field name="ftporws" component={ftpOrWebservice} />
      </div>
      <div className="form-group">
         {(isFtp === 'sftp') 
             ? <div className="form-group">
                <label>URI</label>
                <Field name="dest_uri" component={renderField} type="text" label="sftp://..." />
              </div>
            : <div className="form-group">
                <label>URI</label>
                <Field name="dest_uri" component={renderField} type="text" label="https://..." />
              </div>
         }
      </div>
      <div className="form-group">
        <label>Definisce uno standard?</label>
        <Field name="is_std" component={renderYesNoSelector} />
      </div>
        {(isOk === 'false') &&
      <div className="form-group">
        <label>Segue uno standard?</label>
        <Field name="follow_standard" component={renderYesNoSelector} /><br/>
        {(followStandard === 'true') &&
        <Field name="uri_associato" component={TestSelect}  url={standards} />
        }
      </div>}


      <div className="form-group">
        <label>Tipo Lettura del dataset</label>
        <Field name="read_type"  component={renderTipoLettura} />
      </div>

      <div className="form-group row justify-content-between">
        <div className="col-6">
          <button type="button" className="btn btn-primary float-left" onClick={previousPage}>Indietro</button>
        </div>
        <div className="col-6">
          <button type="submit" className="btn btn-primary float-right" disabled={pristine || submitting}>Invia</button>
        </div>
      </div>

      </div>
    </form>
  );
};
/*
      <div>
        <button type="button" className="previous" onClick={previousPage}>
          Previous
        </button>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
      </div>
*/


//
// Decorate with connect to read form values
const selector = formValueSelector('wizard') // <-- same as form name
WizardFormThirdPage = connect(state => {
  // can select values individually
  const isOk = selector(state, 'is_std')
  const isPush = selector(state, 'pushOrPull')
  const followStandard = selector(state, 'follow_standard')
  let isFtp = "sftp"
  isFtp = selector(state, 'ftporws')
  return {
    isOk,
    isPush,
    isFtp,
    followStandard
  }
})(WizardFormThirdPage)


WizardFormThirdPage = reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(WizardFormThirdPage);

export default WizardFormThirdPage


//export default reduxForm({
//  form: 'wizard', //                 <------ same form name
//  destroyOnUnmount: false, //        <------ preserve form data
//  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
//  validate,
//})(WizardFormThirdPage);




