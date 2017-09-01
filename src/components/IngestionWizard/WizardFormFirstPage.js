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

const renderOrganization = ({ input, label, type, organizations, meta: { touched, error } }) => (
  <div className="form-group">
    <label className="form-control-label">{label}</label>
    <div>
       <div className="form-group">
        <select className="form-control">
          <option value=""  key='organization' defaultValue></option>
          {organizations.map(organization => <option value={organization.id} key={organization.id}>{organization.description}</option>)}
        </select>
      </div>
      {touched && error && <span>{error}</span>}
    </div>
 </div>
);

 

const WizardFormFirstPage = props => {
  const { handleSubmit, previousPage, organizations } = props
  return (
    <form  onSubmit={handleSubmit}>
        <div className="col-md-12">
          <Field
            name="title"
            type="text"
            component={renderField}
            label="Titolo"
            readonly="readonly"
          />
          <Field
            name="notes"
            type="textarea"
            component={renderField}
            label="Descrizione"
          />
          <Field
            name="theme"
            type="text"
            component={renderThemes}
            label="Temi"
          />
          <Field
            name="license_title"
            type="text"
            component={renderField}
            label="Licenza"
          />
          <Field
            name="ownership"
            type="text"
            component={renderOrganization}
            label="Organizzazione"
            organizations={organizations}
          />
        </div>
      <div className="form-group row justify-content-between">
        <div className="col-1">
          <button type="button" className="btn btn-primary" onClick={previousPage}>Indietro</button>
        </div>
        <div className="col-1">
          <button type="submit" className="btn btn-primary">Avanti</button>
        </div>
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
