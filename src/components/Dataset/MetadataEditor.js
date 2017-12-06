import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

const themes = [
    { 'val': 'AGRI', 'name': 'AGRICOLTURA' },
    { 'val': 'ECON', 'name': 'ECONOMIA' },
    { 'val': 'EDUC', 'name': 'EDUCAZIONE' },
    { 'val': 'ENER', 'name': 'ENERGIA' },
    { 'val': 'ENVI', 'name': 'AMBIENTE' },
    { 'val': 'GOVE', 'name': 'GOVERNO' },
    { 'val': 'HEAL', 'name': 'SANITA' },
    { 'val': 'INTR', 'name': 'INTERNAZIONALE' },
    { 'val': 'JUST', 'name': 'GIUSTIZIA' },
    { 'val': 'REGI', 'name': 'REGIONE' },
    { 'val': 'SOCI', 'name': 'SOCIETA' },
    { 'val': 'TECH', 'name': 'TECNOLOGIA' },
    { 'val': 'TRAN', 'name': 'TRASPORTO' }
]


const renderThemes = ({ input, meta: { touched, error } }) => (
    <div className="form-group row">
        <label className="col-md-1 col-form-label">Categoria</label>
        <div>
            <div className="col-md-12 form-group">
                <select className="form-control" {...input}>
                    <option value="" key='theme' defaultValue></option>
                    {themes.map(value => <option value={value.val} key={value.val}>{value.name}</option>)}
                </select>
            </div>
            {touched && error && <div className="text-danger">{error}</div>}
        </div>
    </div>
);

const renderField = ({ input, label, type, value = '', readonly, meta: { touched, error } }) => (
    <div className="form-group row">
        <label className="col-md-1 col-form-label">{label}</label>
        {(touched && error) ?
            <div className="col-md-5">
                <input {...input} placeholder={label} type={type} className="form-control form-control-danger" />
                <div className="form-control-feedback">{error}</div>
            </div>
            :
            <div className="col-md-5">
                <input {...input} placeholder={label} readOnly={readonly} type={type} className="form-control" />
            </div>
        }
    </div>
)


let MetadataEditor = props => {
    const { load, dataset } = props
    return (
        <form>
            <Field
                name="name"
                component={renderField}
                type="text"
                placeholder="Titolo"
                label="Titolo"
            />
            <Field
                name="notes"
                component={renderField}
                type="text"
                placeholder="Descrizione"
                label="Descrizione"
            />
            <Field
                name="theme"
                type="text"
                component={renderThemes}
                label="Temi"
            />
            <div>
                <button type="submit" className="btn btn-primary float-right">
                    Salva
                </button>
            </div>
        </form>
    )
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
MetadataEditor = reduxForm({
    form: 'metadataEditor', // a unique identifier for this form
    destroyOnUnmount: true,
})(MetadataEditor)

// You have to connect() to any reducers that you wish to connect to yourself
MetadataEditor = connect(
    state => ({
        initialValues: state.datasetReducer['obj'].dataset // pull initial values from dataset reducer
    }),
    { } // bind dataset loading action creator
)(MetadataEditor)

export default MetadataEditor