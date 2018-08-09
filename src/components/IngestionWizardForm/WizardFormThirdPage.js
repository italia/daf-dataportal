import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];

const renderColorSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">Select a color...</option>
      {colors.map(val => <option value={val} key={val}>{val}</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

const WizardFormThirdPage = props => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Pagina 3</label>
      </div>
      <div>
        <button type="button" className="btn btn-primary float-left" onClick={previousPage}>Indietro</button>
        <button type="submit" className="btn btn-primary float-right">Avanti</button>
      </div>
    </form>
  );
};
export default reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(WizardFormThirdPage);
