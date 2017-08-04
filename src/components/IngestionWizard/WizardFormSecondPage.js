import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import renderField from './renderField';
import WizardDataSchema from './WizardDataSchema.js'
import NewDsForm from '../../components/IngestionForm/'
import DataInputForm from '../../components/IngestionForm/data_form.js'


const data_dcatap = DataInputForm.getDcatap()
const data_dataschema = DataInputForm.getDataschema()
const data_dataschema_field = DataInputForm.getDataschemaField()
const data_dataschema_field_metadata = DataInputForm.getDataschemaFieldMetadata()
const data_operational = DataInputForm.getOperational()

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const WizardFormSecondPage = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <form className="form-horizontal wizard" onSubmit={handleSubmit}>
    <WizardDataSchema dcatap={data_dcatap} dataschema={data_dataschema} operational={data_operational} onSubmit={handleSubmit} />
     </form>
  );
};

export default reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(WizardFormSecondPage);
