import React from 'react'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group ">
    <label className="form-control-label">{label}</label>
   <div>
      <input {...input} placeholder={label} type={type} className="form-control"/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderTextArea = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group ">
    <label className="form-control-label">{label}</label>
   <div>
      <input {...input} placeholder={label} type='textarea' className="form-control"/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

export default renderField
