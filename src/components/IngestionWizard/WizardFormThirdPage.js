import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import validate from './validate';
import TestSelect from './TestSelect';
import { connect  } from 'react-redux';


import 'react-select/dist/react-select.css';


const isStds = ['true'];
const tipo_lettura = ['ts']

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
      <option value='false' selected key='false'>No</option>
      {isStds.map(val => <option value={val} key={val}>Yes</option>)}
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

const ftpOrWebservice = ({ input, meta: { touched, error } }) => (
  <div>
    <select className="form-control" {...input}>
      <option value='sftp' defaultValue='sftp' selected>sFTP</option>
      <option value='webservice' >Webservice</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

/*       <div>
        <label htmlFor="uri">Dataset Uri</label>
        <div>
          <Field
            name="uri"
            id="uri"
            component="input"
            type="text"
          />
        </div>
       
      </div>
        <div>
        <label>Ownership</label>
        <div>
          <Field name="ownership" component="input" type="text" placeholder="ownership" />
        </div>
      </div> */


let WizardFormThirdPage = props => {
  const { handleSubmit, pristine, previousPage, submitting, isStandard, isOk, isPush, isFtp } = props;
  return (
    <form className="from-horizontal" onSubmit={handleSubmit}>
      <div className="col-md-6">
      <div className="form-group">
        <label>Esponi i dati o li invii?</label>
        <Field name="pushOrPull" component={pushOrPull} />
      </div>

      <div className="form-group">
        <label>SFTP or web service</label>
        <Field name="ftporws" component={ftpOrWebservice} />
      </div>
        {(isFtp === 'sftp') 
            ? <div className="form-group"><Field name="sftp" component="input" type="text" placeholder="sftp://..." /></div>
            : <div className="form-group"><Field name="https" component="input" type="text" placeholder="https://.." /></div>
        }
      <div className="form-group">
        <label>Definisce uno standard?</label>
        <Field name="is_std" component={renderYesNoSelector} />
      </div>
        {(isOk === 'true') &&
      <div className="form-group">
        <label>Uri Standard Associato</label>
        <Field name="uri_associato" component="input" type="text" placeholder="uri associato" />
        <Field name="country" component={TestSelect}  url='http://localhost:9000/catalog-manager/v1/dataset-catalogs/standard-uris' />
      </div>}


      <div className="form-group">
        <label>Tipo Lettura del dataset</label>
        <Field name="read_type"  component={renderTipoLettura} />
      </div>


       <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <div className="btn-group mr-2" role="group" aria-label="First group">
          <button type="button" className="btn btn-primary" onClick={previousPage}>Previous</button>
        </div>
        <div className="btn-group mr-2" role="group" aria-label="Second group">
          <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Submit</button>
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
  let isFtp = "sftp"
  isFtp = selector(state, 'ftporws')
  return {
    isOk,
    isPush,
    isFtp
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




