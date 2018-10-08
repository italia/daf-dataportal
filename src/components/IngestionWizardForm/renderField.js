import React from 'react';
import TagsInput from './tags/TagsInput'
import { ingestionFormOptions } from './const';


export const renderFieldInput = ({ input, label, openModalInfo, readonly, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}
    {ingestionFormOptions.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, ingestionFormOptions.info[input.name])}>
          <i className="fa fa-info-circle"></i>
      </button>
    }
    </label>
    <div className="col-sm-10">
      <input {...input} type='text' readOnly={readonly} className="form-control" />
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);

export const renderFieldInputButton = ({ input, openModalInfo, buttonLabel, label, placeholder, onClick, readonly, iconClassName, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}
    {ingestionFormOptions.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, ingestionFormOptions.info[input.name])}>
          <i className="fa fa-info-circle"></i>
      </button>
    }
    </label>    
    <div className="col-sm-8">
      <input {...input} placeholder={placeholder} type='text' readOnly={readonly} className="form-control" />
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
    <div className="col-2">
      <button title={buttonLabel} type="button" className="btn btn-link" onClick={onClick}><i className={iconClassName}></i></button>
    </div>
  </div>
);

export const renderFieldTextArea = ({ input, openModalInfo, label, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}
    {ingestionFormOptions.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, ingestionFormOptions.info[input.name])}>
          <i className="fa fa-info-circle"></i>
      </button>
    }
    </label>
    <div className="col-sm-10">
      <textarea {...input} type='text' className="form-control" />
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);

export const renderFieldSelect = ({ input, openModalInfo, label, options, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}
    {ingestionFormOptions.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, ingestionFormOptions.info[input.name])}>
          <i className="fa fa-info-circle"></i>
      </button>
    }
    </label>
      <div className="col-sm-10">
        <select className="form-control" type='text' {...input}>
          <option value="" defaultValue></option>
          {options.map(value => <option value={value.val} key={value.val}>{value.name}</option>)}
        </select>
      {touched && error && <span className="text-danger">{error}</span>}
      </div>

 </div>
);

const tipiKylo = ['bigint','binary','boolean','date','decimal','double','float','int','string','timestamp','tinyint']

export const renderTipi = ({ input, label, openModalInfo, tipi, index, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}
    {ingestionFormOptions.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, ingestionFormOptions.info[input.name])}>
          <i className="fa fa-info-circle"></i>
      </button>
    }
    </label>
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

 export const renderFieldTags = ({input, openModalInfo ,label, addTagsToForm, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}
    {ingestionFormOptions.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, ingestionFormOptions.info[input.name])}>
          <i className="fa fa-info-circle"></i>
      </button>
    }
    </label>    <div className="col-sm-10">
          <TagsInput {...input} name={input.name} addTagsToForm={addTagsToForm}/>
          {touched && error && <div className="text-danger">{error}</div>}
      </div>
  </div>
  )

  export const renderContesti = ({ input, openModalInfo, label, contesti, index, meta: { touched, error } }) => (
    <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}
    {ingestionFormOptions.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, ingestionFormOptions.info[input.name])}>
          <i className="fa fa-info-circle"></i>
      </button>
    }
    </label>    <div className="col-sm-10">
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
   
   export const renderFieldCheckbox = ({ input, openModalInfo, label, meta: { touched, error } }) => (
    <div className="form-group row">
    <label className="col-sm-5 col-form-label">{label}
    {ingestionFormOptions.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, ingestionFormOptions.info[input.name])}>
          <i className="fa fa-info-circle"></i>
      </button>
    }
    </label>      
    <div className="col-sm-2 pt-2">
        <input {...input} type='checkbox' className="form-control" />
        {touched && error && <span className="text-danger">{error}</span>}
      </div>
    </div>
  );

  export const renderOrganization = ({ input, openModalInfo, label, organizations, meta: { touched, error } }) => (
    <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}
    {ingestionFormOptions.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, ingestionFormOptions.info[input.name])}>
          <i className="fa fa-info-circle"></i>
      </button>
    }
    </label>    
    <div className="col-sm-10">
        <select className="form-control" type='text' {...input}>
          {organizations && organizations.length>0 && organizations.map(organization => {
           return(<option value={organization} key={organization}>{organization}</option>)
          }
         )}
        </select>
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
   </div>
   );