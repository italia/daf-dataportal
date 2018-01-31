import React from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import validate from './validate'
import asyncValidate from './asyncValidate'
import renderField from './renderField'
import { connect  } from 'react-redux';

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
            <option value=""  key='theme' defaultValue></option>
            {themes.map(value => <option value={value.val} key={value.val}>{value.name}</option>)}
          </select>
        </div>
        {touched && error && <div className="text-danger">{error}</div>}
      </div>
   </div>
);

const renderOrganization = ({ input, label, type, organizations, pvt, meta: { touched, error } }) => (
  <div className="form-group">
    <label className="form-control-label">{label}</label>
    <div>
       <div className="form-group">
        <select className="form-control" {...input}>
          <option value=""  key='organization' defaultValue></option>
          {pvt == 1 && organizations.map(organization => 
              organization != 'default_org' && <option value={organization} key={organization}>{organization}</option>
              )}
          {pvt == 0 && <option value='default_org' key='default_org'>default_org</option>}
        </select>
      </div>
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
 </div>
);

const renderLicenze = ({ input, label, type, licenze, meta: { touched, error } }) => (
  <div className="form-group">
    <label className="form-control-label">{label}</label>
    <div>
       <div className="form-group">
        <select className="form-control" {...input}>
          <option value=""  key='organization' defaultValue></option>
          {licenze.map(licenza => <option value={licenza.notation} key={licenza.notation}>{licenza.label}</option>)}
        </select>
      </div>
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
 </div>
);

let WizardFormFirstPage = props => {
  const { handleSubmit, previousPage, organizations, licenze, openModal, pvt} = props
  
  return (
    <form  onSubmit={handleSubmit}>
        <div className="col-md-12">
          <Field
            name="title"
            type="text"
            component={renderField}
            label="Titolo"
            openModal={openModal}
          />
          <Field
            name="nome"
            type="text"
            component={renderField}
            label="Nome"
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
            name="license1"
            type="text"
            component={renderLicenze}
            label="Licenza"
            licenze={licenze}
          />
          <Field
            name="ownership"
            type="text"
            component={renderOrganization}
            label="Organizzazione"
            organizations={organizations}
            pvt={pvt}
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

// Decorate with connect to read form values
const selector = formValueSelector('wizard') // <-- same as form name
WizardFormFirstPage = connect(state => {
  const pvt = state.form.wizard.values.private?state.form.wizard.values.private:-1
  return {
    pvt
  }
})(WizardFormFirstPage)

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
  asyncValidate,
  asyncBlurFields: ['title']
})(WizardFormFirstPage)
