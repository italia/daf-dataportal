import React from 'react';
import TagsInput from './tags/TagsInput'

export const renderFieldInput = ({ input, label, readonly, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}</label>
    <div className="col-sm-10">
      <input {...input} type='text' readOnly={readonly} className="form-control" />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

export const renderFieldInputButton = ({ input, buttonLabel, label, placeholder, onClick, readonly, iconClassName, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}</label>
    <div className="col-sm-8">
      <input {...input} placeholder={placeholder} type='text' readOnly={readonly} className="form-control" />
      {touched && error && <span>{error}</span>}
    </div>
    <div className="col-2">
      <button title={buttonLabel} type="button" className="btn btn-link" onClick={onClick}><i className={iconClassName}></i></button>
    </div>
  </div>
);

export const renderFieldTextArea = ({ input, label, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}</label>
    <div className="col-sm-10">
      <textarea {...input} type='text' className="form-control" />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

export const renderFieldSelect = ({ input, label, options, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}</label>
      <div className="col-sm-10">
        <select className="form-control" type='text' {...input}>
          <option value="" defaultValue></option>
          {options.map(value => <option value={value.val} key={value.val}>{value.name}</option>)}
        </select>
      </div>
      {touched && error && <div className="text-danger">{error}</div>}
 </div>
);

const tipiKylo = ['bigint','binary','boolean','date','decimal','double','float','int','string','timestamp','tinyint']

export const renderTipi = ({ input, label, tipi, index, meta: { touched, error } }) => (
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

 export const renderFieldTags = ({input, label, addTagsToForm, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}</label>
    <div className="col-sm-10">
          <TagsInput {...input} name={input.name} addTagsToForm={addTagsToForm}/>
          {touched && error && <div className="text-danger">{error}</div>}
      </div>
  </div>
  )

  export const renderContesti = ({ input, label, contesti, index, meta: { touched, error } }) => (
    <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}</label>
    <div className="col-sm-10">
        <select className="form-control" type='text' {...input}>
          {contesti && contesti.length>0 && contesti.map(value => {
           return(<option value={value.id} key={value.id}>{value.humanlabel}</option>)
          }
         )}
        </select>
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
   </div>
   );
   
   export const renderFieldCheckbox = ({ input, label, meta: { touched, error } }) => (
    <div className="form-group row">
      <label className="col-sm-3 col-form-label">{label}</label>
      <div className="col-sm-2">
        <input {...input} type='checkbox' className="form-control" />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );