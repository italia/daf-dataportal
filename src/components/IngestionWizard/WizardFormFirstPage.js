import React, { Component } from 'react'
import { Field, reduxForm, formValueSelector, change } from 'redux-form'
import validate from './validate'
import asyncValidate from './asyncValidate'
import renderField from './renderField'
import { connect  } from 'react-redux';
import { getSystemNameKylo } from '../../actions'

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
          {organizations.map(organization => 
              <option value={organization} key={organization}>{organization}</option>
              )}
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
          {licenze.map(licenza => <option value={licenza.label} key={licenza.label}>{licenza.label}</option>)}
        </select>
      </div>
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
 </div>
);


class WizardFormFirstPage extends Component {
  constructor(props) {
    super(props);
    this.setName = this.setName.bind(this); 
  }

  setName(e){
    console.log(e.target.value)
    const { dispatch } = this.props;
    dispatch(getSystemNameKylo(e.target.value))
    .then(json => dispatch(change('wizard', 'nome', json.system_name)))
  }

render(){
  const { handleSubmit, previousPage, organizations, licenze, openModal, pvt} = this.props
  return (
    <form  onSubmit={handleSubmit}>
        <div className="col-md-12">
          <Field
            name="title"
            type="text"
            component={renderField}
            label="Titolo"
            openModal={openModal}
            onChange={this.setName}
          />
          <Field
            name="nome"
            type="text"
            component={renderField}
            label="Nome"
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
