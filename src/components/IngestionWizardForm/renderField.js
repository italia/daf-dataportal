import React from 'react';
import TagsInput from './tags/TagsInput'
import TagsInputAutocomplete from './tags/TagsInputAutocomplete'


export const renderFieldInput = ({ input, label, openModalInfo, config, readonly, meta: { asyncValidating,touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}
    {config.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, config.info[input.name])}>
          <i className="fa fa-info-circle"></i>
      </button>
    }
    </label>
    <div className={asyncValidating ? 'async-validating col-sm-10' : 'col-sm-10'}>
      <input {...input} type='text' readOnly={readonly} className="form-control" />
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);

export const renderFieldRadio = ({ input, label, openModalInfo, val, config, readonly, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-5 col-form-label">{label}
    {config.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, config.info[input.name])}>
          <i className="fa fa-info-circle"></i>
      </button>
    }
    </label>
    <div className="col-sm-2">
      <input {...input} type='radio' readOnly={readonly} className="form-control" value={val} />
      {touched && error && <span className="text-danger">{error}</span>}
    </div>
  </div>
);

export const renderFieldInputButton = ({ input, openModalInfo, buttonLabel, label, config, placeholder, onClick, readonly, iconClassName, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}
    {config.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, config.info[input.name])}>
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

export const renderFieldTextArea = ({ input, openModalInfo, label, config, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}
    {config.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, config.info[input.name])}>
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

export const renderFieldSelect = ({ input, openModalInfo, label, config, options, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}
    {config.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, config.info[input.name])}>
          <i className="fa fa-info-circle"></i>
      </button>
    } 
    </label>
      <div className="col-sm-10">
        <select className="form-control" type='text' {...input}>
          <option value="" defaultValue></option>
          {options.map(value => <option value={value.uid} key={value.uid}>{value.name.ita?value.name.ita:value.name.default}</option>)}
        </select>
      {touched && error && <span className="text-danger">{error}</span>}
      </div>
 </div>
);

export const renderStd = ({ input, openModalInfo, label, config, options, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}
    {config.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, config.info[input.name])}>
          <i className="fa fa-info-circle"></i>
      </button>
    } 
    </label>
      <div className="col-sm-10">
        <select className="form-control" type='text' {...input}>
          <option value="" defaultValue></option>
          {options.map(value => <option value={value.name} key={value.name}>{value.name}</option>)}
        </select>
      {touched && error && <span className="text-danger">{error}</span>}
      </div>
 </div>
);


export const renderFieldLicenze = ({ input, openModalInfo, label, config, options, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}
    {config.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, config.info[input.name])}>
          <i className="fa fa-info-circle"></i>
      </button>
    } 
    </label>
      <div className="col-sm-10">
        <select className="form-control" type='text' {...input}>
          <option value="" defaultValue></option>
          {options.map(value => <option value={value.label} key={value.label}>{value.label}</option>)}
        </select>
      {touched && error && <span className="text-danger">{error}</span>}
      </div>
 </div>
);

export const renderFieldCategoria = ({ input, openModalInfo, label, readonly, config, options, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}
    {config.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, config.info[input.name])}>
          <i className="fa fa-info-circle"></i>
      </button>
    } 
    </label>
      <div className="col-sm-10">
        <select className="form-control" readOnly={readonly} type='text' {...input}>
          <option value="" defaultValue></option>
          {options.map(value => <option value={value.val} key={value.val}>{value.name}</option>)}
        </select>
      {touched && error && <span className="text-danger">{error}</span>}
      </div>
 </div>
);

/*  export const renderFieldTags = ({input, openModalInfo ,label, config, addTagsToForm, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}
    {config.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, config.info[input.name])}>
          <i className="fa fa-info-circle"></i>
      </button>
    }
    </label>    
    <div className="col-sm-10">
          <TagsInput {...input} name={input.name} addTagsToForm={addTagsToForm}/>
          {touched && error && <div className="text-danger">{error}</div>}
      </div>
  </div>
  ) */

  export const renderFieldTags = ({input, openModalInfo ,label, config, addTagsToForm, meta: { touched, error } }) => (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label">{label}
      {config.info[input.name] &&
        <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, config.info[input.name])}>
            <i className="fa fa-info-circle"></i>
        </button>
      }
      </label>    
      <div className="col-sm-10">
            <TagsInputAutocomplete {...input} name={input.name} addTagsToForm={addTagsToForm}/>
            {touched && error && <div className="text-danger">{error}</div>}
        </div>
    </div>
    )

  export const renderContesti = ({ input, openModalInfo, label, config, contesti, index, meta: { touched, error } }) => (
    <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}
    {config.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, config.info[input.name])}>
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
   
   export const renderFieldCheckbox = ({ input, openModalInfo, config, label, meta: { touched, error } }) => (
    <div className="form-group row">
    <label className="col-sm-5 col-form-label">{label}
    {config.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, config.info[input.name])}>
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

  export const renderOrganization = ({ input, openModalInfo, label, config, organizations, meta: { touched, error } }) => (
    <div className="form-group row">
    <label className="col-sm-2 col-form-label">{label}
    {config.info[input.name] &&
      <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, config.info[input.name])}>
          <i className="fa fa-info-circle"></i>
      </button>
    }
    </label>    
    <div className="col-sm-10">
        <select className="form-control" type='text' {...input}>
            <option value="" defaultValue></option>
            {organizations && organizations.length>0 && organizations.map(organization => {
            return(<option value={organization} key={organization}>{organization}</option>)
            }
         )}
        </select>
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
   </div>
   );