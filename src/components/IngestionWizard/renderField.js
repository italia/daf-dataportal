import React from 'react'

const renderField = ({ input, label, type, openModal, meta: { touched, error } }) => (
  <div className="form-group ">
    <label className="form-control-label">{label}</label>
    {openModal &&
      <button type="button" className="btn btn-link" title="Aggiungi Dashboard" onClick={openModal}>
          <i className="fa fa-info-circle"></i>
      </button>
    }
   <div>
      <input {...input} placeholder={label} type={type} className="form-control"/>
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
  </div>
)

const renderTextArea = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group ">
    <label className="form-control-label">{label}</label>
   <div>
      <input {...input} placeholder={label} type='textarea' className="form-control"/>
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
  </div>
)

export default renderField
