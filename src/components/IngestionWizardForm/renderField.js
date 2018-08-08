import React from 'react';
import TagsInput from './tags/TagsInput'

export const renderFieldInput = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}</label>
    <div className="col-sm-10">
      <input {...input} type={type} className="form-control" />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

export const renderFieldInputButton = ({ input, label, type, buttonLabel, onClick, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}</label>
    <div className="col-sm-8">
      <input {...input} type={type} className="form-control" />
      {touched && error && <span>{error}</span>}
    </div>
    <div className="col-2">
      <button type="button" className="btn btn-primary" onClick={onClick}>{buttonLabel}</button>
    </div>
  </div>
);



export const renderFieldTextArea = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}</label>
    <div className="col-sm-10">
      <textarea {...input} type={type} className="form-control" />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

export const renderFieldSelect = ({ input, label, options, type, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}</label>
      <div className="col-sm-10">
        <select className="form-control" type={type} {...input}>
          <option value="" defaultValue></option>
          {options.map(value => <option value={value.val} key={value.val}>{value.name}</option>)}
        </select>
      </div>
      {touched && error && <div className="text-danger">{error}</div>}
 </div>
);

const tipiKylo = ['bigint','binary','boolean','date','decimal','double','float','int','string','timestamp','tinyint']

export const renderTipi = ({ input, label, type, tipi, index, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}</label>
    <div className="col-sm-10">
      <select className="form-control" {...input}>
        {tipiKylo.map(value => {
         return(<option value={value} key={value}>{value}</option>)
        }
       )}
       {(tipiKylo.indexOf(tipi[index][0])==-1) &&
           <option value={tipi[index]} key={tipi[index]}>{tipi[index]}</option>
       }
      </select>
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
 </div>
 );

 export const renderFieldTags = ({input, label, type, value, readonly, addTagsToForm, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}</label>
    <div className="col-sm-10">
          <TagsInput {...input} name={input.name} addTagsToForm={addTagsToForm}/>
          {touched && error && <div className="text-danger">{error}</div>}
      </div>
  </div>
  )