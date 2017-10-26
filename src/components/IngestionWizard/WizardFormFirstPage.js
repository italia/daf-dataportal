import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import asyncValidate from './asyncValidate'
import renderField from './renderField'

const themes = [
{'val' : 'AGRI', 'name' : 'AGRICOLTURA'},
{'val' : 'ECON', 'name' : 'ECONOMIA'},
{'val' : 'EDUC', 'name' : 'EDUCAZIONE'},
{'val' : 'ENER', 'name' : 'ENERGIA'},
{'val' : 'ENVI', 'name' : 'AMBIENTE'},
{'val' : 'GOVE', 'name' : 'GOVERNO'},
{'val' : 'HEAL', 'name' : 'SANITA'},
{'val' : 'INTR', 'name' : 'INTERNAZIONALE'},
{'val' : 'JUST', 'name' : 'GIUSTIZIA'},
{'val' : 'REGI', 'name' : 'REGIONE'},
{'val' : 'SOCI', 'name' : 'SOCIETA'},
{'val' : 'TECH', 'name' : 'TECNOLOGIA'},
{'val' : 'TRAN', 'name' : 'TRASPORTO'}
]

const renderThemes = ({ input, meta: { touched, error } }) => (
    <div className="form-group">
      <label className="form-control-label">Categoria</label>
      <div>
         <div className="form-group">
          <select className="form-control" {...input}>
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
        <select className="form-control" {...input}>
          <option value=""  key='organization' defaultValue></option>
          {organizations.map(organization => <option value={organization.name} key={organization.name}>{organization.description}</option>)}
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
        <div className="col-6">
          <button type="button" className="btn btn-primary float-left" onClick={previousPage}>Indietro</button>
        </div>
        <div className="col-6">
          <button type="submit" className="btn btn-primary float-right">Avanti</button>
        </div>
      </div>
 
    </form>
  )
}

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
  asyncValidate,
  asyncBlurFields: ['title']
})(WizardFormFirstPage)
