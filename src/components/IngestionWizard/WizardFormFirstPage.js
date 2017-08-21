import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'

const themes = [
{'val' : 'AGRI', 'name' : 'AGRICOLTURA'},{'val' : 'EDUC', 'name' : 'EDUCAZIONE'},
{'val' : 'ECON', 'name' : 'ECONOMIA'},
{'val' : 'ENVI', 'name' : 'AMBIENTE'},{'val' : 'HEAL', 'name' : 'SANITA'},
{'val' : 'INTR', 'name' : 'INTERNAZIONALE'},{'val' : 'JUST', 'name' : 'GIUSTIZIA'},
{'val' : 'SOCI', 'name' : 'REGIONE'},{'val' : 'TECH', 'name' : 'TECNOLOGIA'},
{'val' : 'TRAN', 'name' : 'TRASPORTO'}]

const renderThemes = ({ input, meta: { touched, error } }) => (
    <div className="form-group">
      <label className="form-control-label">Categoria</label>
      <div>
         <div className="form-group">
          <select className="form-control" {...input}>
            <option value="ECON"  key='theme' defaultValue>ECONOMIA</option>
            {themes.map(value => <option value={value.val} key={value.val}>{value.name}</option>)}
          </select>
        </div>
        {touched && error && <span>{error}</span>}
      </div>
   </div>
);

 

const WizardFormFirstPage = props => {
  const { handleSubmit, previousPage } = props
  return (
    <form  onSubmit={handleSubmit}>
        <div className="col-md-12">
          <Field
            name="title"
            type="text"
            component={renderField}
            label="Title"
            readonly="readonly"
          />
          <Field
            name="notes"
            type="textarea"
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
            name="license_title"
            type="text"
            component={renderField}
            label="License"
          />
          <Field
            name="ownership"
            type="text"
            component={renderField}
            label="Ownership"
          />
        </div>
      <div className="btn-group mr-2" role="group" aria-label="First group">
        <button type="button" className="btn btn-primary" onClick={previousPage}>Previous</button>
        <button type="submit" className="btn btn-primary">Next</button>
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
