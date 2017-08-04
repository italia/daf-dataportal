import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'

const themes = [
{'val' : 'AGRI', 'name' : 'AGRICOLTURA'},{'val' : 'EDUC', 'name' : 'EDUCAZIONE'},
{'val' : 'ECON', 'name' : 'ECONOMIA'},{'val' : 'AGRI', 'name' : 'AGRICOLTURA'},
{'val' : 'ENVI', 'name' : 'AMBIENTE'},{'val' : 'HEAL', 'name' : 'SANITA'},
{'val' : 'INTR', 'name' : 'INTERNAZIONALE'},{'val' : 'JUST', 'name' : 'GIUSTIZIA'},
{'val' : 'SOCI', 'name' : 'REGIONE'},{'val' : 'TECH', 'name' : 'TECNOLOGIA'},
{'val' : 'TRAN', 'name' : 'TRASPORTO'}]




const renderThemes = ({ input, meta: { touched, error } }) => (
    <div className="form-group row">
      <label className="col-md-3 form-control-label">Categoria</label>
      <div className="col-md-9">
      <select {...input}>
        <option value="ECON"  key='theme'>ECONOMIA</option>
        {themes.map(value => <option value={value.val} key={value.val}>{value.name}</option>)}
        </select>
        {touched && error && <span>{error}</span>}
      </div>
   </div>
);

 

const WizardFormFirstPage = props => {
  const { handleSubmit } = props
  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <Field
        name="title"
        type="text"
        component={renderField}
        label="Title"
      />
      <Field
        name="identifier"
        type="text"
        component={renderField}
        label="Identifier"
      />
      <Field
        name="notes"
        type="text"
        component={renderField}
        label="Description"
      />
      <Field
        name="theme"
        type="text"
        component={renderThemes}
        label="Themes"
      />
      <Field
        name="publisher_editor"
        type="text"
        component={renderField}
        label="Editor"
      />
      <Field
        name="publisher_identifier"
        type="text"
        component={renderField}
        label="Ipa/Iva"
      />
      <Field
        name="creation_date"
        type="text"
        component={renderField}
        label="Modification Date"
      />
      <Field
        name="holder_name"
        type="text"
        component={renderField}
        label="Rights Holder"
      />
      <Field
        name="holder_identifier"
        type="text"
        component={renderField}
        label="R. Ipa/Iva"
      />
      <Field
        name="license_title"
        type="text"
        component={renderField}
        label="License"
      />
      <Field
        name="license_id"
        type="text"
        component={renderField}
        label="License ID"
      />
      <Field
        name="owner_org"
        type="text"
        component={renderField}
        label="Organization"
      />
      <div>
        <button type="submit" className="next">Next</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormFirstPage)
