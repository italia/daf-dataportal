import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import validate from './validate';
import TestSelect from './TestSelect';
import { connect } from 'react-redux';

import 'react-select/dist/react-select.css';


const isStds = ['true'];
const tipo_lettura = ['ts']

const renderTipoLettura = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="update" selected key='update'>Ultimo Aggiornamento</option>
      {tipo_lettura.map(val => <option value={val} key={val}>Time Series</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

const renderYesNoSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value='false' selected key='false'>No</option>
      {isStds.map(val => <option value={val} key={val}>Yes</option>)}
    </select>
    {touched && error && <span>{error}</span>}

  </div>
);

//  

let WizardOperational = props => {
  const { handleSubmit, pristine, previousPage, submitting, isStandard, isOk } = props;
  return (
    <form className="from-horizontal" onSubmit={handleSubmit}>
      <div>
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
        <div>
        <label>Definisce uno standard?</label>
        <Field name="is_std" component={renderYesNoSelector} />
      </div>
        {(isOk === 'true') &&
        <div>
        <label>Uri Standard Associato</label>
        <div>
          <Field name="uri_associato" component="input" type="text" placeholder="uri associato" />
        </div>
        <Field name="country" component={TestSelect}  url='https://api.myjson.com/bins/4gzai' />

      </div>}

      </div>
      <div>
        <label>Tipo Lettura del dataset</label>
        <Field name="read_type"  component={renderTipoLettura} />
      </div>
      <div>
        <button type="button" className="previous" onClick={previousPage}>
          Previous
        </button>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
      </div>
    </form>
  );
};

//
// Decorate with connect to read form values
const selector = formValueSelector('wizard') // <-- same as form name
WizardOperational = connect(state => {
  // can select values individually
  const isOk = selector(state, 'is_std')
  return {
    isOk
  }
})(WizardFormThirdPage)


WizardOperational = reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(WizardOperational);

export default WizardOperational


//export default reduxForm({
//  form: 'wizard', //                 <------ same form name
//  destroyOnUnmount: false, //        <------ preserve form data
//  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
//  validate,
//})(WizardFormThirdPage);




