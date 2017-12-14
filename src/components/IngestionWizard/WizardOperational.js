import React from 'react';
import { Field,FieldArray ,reduxForm, formValueSelector } from 'redux-form';
import validate from './validate';
import TestSelect from './TestSelect';
import TestSelectDomain from './TestSelectDomain';
import { connect  } from 'react-redux';
import { serviceurl } from '../../config/serviceurl.js'



import 'react-select/dist/react-select.css';


const isStds = ['true'];
const tipo_lettura = ['ts']

const renderField = ({ input, label, type, value = '', meta: { touched, error } }) => (
  <div>
      {(touched && error) ?
        <div className="form-group row has-danger">
          <input {...input} placeholder={label} type={type} className="form-control form-control-danger"/>
          <div className="form-control-feedback">{error}</div>
        </div>
      :
          <input {...input} placeholder={label} type={type} className="form-control"/>
      }
  </div>
)

const renderTipoLettura = ({ input, meta: { touched, error } }) => (
  <div>
    <select className="form-control" {...input}>
      <option value="update" selected key='update'>Ultimo Aggiornamento</option>
      {tipo_lettura.map(val => <option value={val} key={val}>Time Series</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

const renderDatasetType = ({ input, meta: { touched, error } }) => (
  <div>
    <select className="form-control" {...input}>
      <option value="batch" selected key='batch'>Batch</option>
      <option value="stream"  key='stream'>Realtime Stream</option>
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

const renderYesNoSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select className="form-control" {...input}>
      <option value='false' defaultValue key='false'>No</option>
      {isStds.map(val => <option value={val} key={val}>Si</option>)}
    </select>
    {touched && error && <span>{error}</span>}

  </div>
);

const pushOrPull = ({ input, meta: { touched, error } }) => (
  <div>
    <select className="form-control" {...input}>
      <option value={true} defaultValue>Invia</option>
      <option value={false} >Esponi</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

const storages = ({ input, meta: { touched, error } }) => (
  <div>
    <select className="form-control" {...input}>
      <option value="" defaultValue></option>
      <option value="hdfs">Hdfs</option>
      <option value="kudu" >Kudu</option>
      <option value="hbase" >Hbase</option>
      <option value="textdb" >Textdb</option>
      <option value="mongodb" >Mongodb</option>
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

const ftpOrWebservice = ({ input, meta: { touched, error } }) => (
  <div>
    <select className="form-control" {...input}>
      <option value='sftp' defaultValue='sftp' selected>sFTP</option>
      <option value='webservice' >Webservice</option>)}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

const renderDomain = ({ input, label, type, key, domains, meta: { touched, error } }) => (
    <div>
        <select className="form-control" {...input}>
          <option value=""  key={key} defaultValue></option>
          {domains.map(domain => <option value={domain.key} key={domain.key}>{domain.value}</option>)}
        </select>
      {touched && error && <div className="text-danger">{error}</div>}
    </div>
);

const renderSftp = ({ fields, meta: { error, submitFailed } }) => (
   <div> 
      <div className="form-group">
        <label>Sftp</label>
        <button type="button" className="btn btn-link" onClick={() => fields.push({})}>
      <i className="fa fa-plus-circle fa-lg m-t-2"></i>
    </button>
      {submitFailed && error && <span>{error}</span>}
      </div>
    <ul>
    {fields.map((sfpt, index) => (
      <li key={index}>
      <div className="form-group">     
              <div className="form-group">
                <label>Name</label>
                <Field
                  name={`${sfpt}.name`}
                  type="text"
                  component={renderField}
                  label="Name"
                  />
              </div>
         </div> 
        <div className="form-group">     
              <div className="form-group">
                <label>Url</label>
                <Field
                  name={`${sfpt}.url`}
                  type="text"
                  component={renderField}
                  label="url"
                  />
              </div>
         </div>     
         <div className="form-group">     
              <div className="form-group">
                <label>Username</label>
                <Field
                  name={`${sfpt}.username`}
                  type="text"
                  component={renderField}
                  label="Username"
                />
              </div>
         </div>
         <div className="form-group">     
              <div className="form-group">
                <label>Password</label>
                <Field
                  name={`${sfpt}.password`}
                  type="text"
                  component={renderField}
                  label="Password"
                />
              </div>
         </div>
         <div className="form-group">     
              <div className="form-group">
                <label>Param</label>
                <Field
                  name={`${sfpt}.param`}
                  type="text"
                  component={renderField}
                  label="Param"
                />
              </div>
         </div>
         <button
         type="button"
         title="Remove Member"
         onClick={() => fields.remove(index)}
       >
       <i className="fa fa-trash fa-lg m-t-2"></i>
       </button>
      </li>
    ))}
  </ul>
  </div>
)

const renderWebServices = ({ fields, meta: { error, submitFailed } }) => (
  <div> 
     <div className="form-group">
       <label>Webservices</label>
       <button type="button" className="btn btn-link" onClick={() => fields.push({})}>
     <i className="fa fa-plus-circle fa-lg m-t-2"></i>
   </button>
     {submitFailed && error && <span>{error}</span>}
     </div>
   <ul>
   {fields.map((ws, index) => (
     <li key={index}>
     <div className="form-group">
        <label>Esponi i dati o li invii?</label>
        <Field name={`${ws}.push`} component={pushOrPull} />
      </div>
     <div className="form-group">     
              <div className="form-group">
                <label>Name</label>
                <Field
                  name={`${ws}.name`}
                  type="text"
                  component={renderField}
                  label="Name"
                  />
              </div>
         </div>
       <div className="form-group">     
             <div className="form-group">
               <label>Url</label>
               <Field
                 name={`${ws}.url`}
                 type="text"
                 component={renderField}
                 label="url"
                 />
             </div>
        </div>     
        <div className="form-group">     
             <div className="form-group">
               <label>Username</label>
               <Field
                 name={`${ws}.username`}
                 type="text"
                 component={renderField}
                 label="Username"
               />
             </div>
        </div>
        <div className="form-group">     
             <div className="form-group">
               <label>Password</label>
               <Field
                 name={`${ws}.password`}
                 type="text"
                 component={renderField}
                 label="Password"
               />
             </div>
        </div>
        <div className="form-group">     
             <div className="form-group">
               <label>Access Token</label>
               <Field
                 name={`${ws}.token`}
                 type="text"
                 component={renderField}
                 label="Token"
               />
             </div>
        </div>
        <div className="form-group">     
             <div className="form-group">
               <label>Param</label>
               <Field
                 name={`${ws}.param`}
                 type="text"
                 component={renderField}
                 label="Param"
               />
             </div>
        </div>
        <button
        type="button"
        title="Remove Member"
        onClick={() => fields.remove(index)}
      >
      <i className="fa fa-trash fa-lg m-t-2"></i>
      </button>
     </li>
   ))}
   </ul>
 </div>
)

const renderDatasetUri = ({ fields, meta: { error, submitFailed } }) => (
  <div> 
     <div className="form-group">
       <label>Dataset Uri</label>
       <button type="button" className="btn btn-link" onClick={() => fields.push({})}>
        <i className="fa fa-plus-circle fa-lg m-t-2"></i>
      </button>          
     {submitFailed && error && <span>{error}</span>}
     </div>
   <ul>
   {fields.map((uri, index) => (
     <li key={index}>
     <div className="form-group">     
              <div className="form-group">
                <label>Dataset Uri</label>
                <Field
                  name={`${uri}.dataset_uri`}
                  type="text"
                  component={renderField}
                  label="Dataset Uri"
                  />
              </div>
         </div>

        <button
         type="button"
         title="Remove Member"
         onClick={() => fields.remove(index)}
       >
       <i className="fa fa-trash fa-lg m-t-2"></i>
       </button>
     </li>
   ))}
 </ul>
 </div>
)

const renderDaf = ({ fields, meta: { error, submitFailed } }) => (
  <div> 
     <div className="form-group">
       <label>Daf Dataset</label>
       <button type="button" className="btn btn-link" onClick={() => fields.push({})}>
     <i className="fa fa-plus-circle fa-lg m-t-2"></i>
   </button>
     {submitFailed && error && <span>{error}</span>}
     </div>
   <ul>
   {fields.map((daf, index) => (
     <li key={index}>
     <div className="form-group">     
              <div className="form-group">
                <label>Sql</label>
                <Field
                  name={`${daf}.sql`}
                  type="text"
                  component={renderField}
                  label="Sql"
                  />
              </div>
         </div>
         <div className="form-group">     
              <div className="form-group">
                <label>Param</label>
                <Field
                  name={`${daf}.param`}
                  type="text"
                  component={renderField}
                  label="Param"
                  />
              </div>
         </div>  
         <FieldArray name={`${daf}.uris`} component={renderDatasetUri} /> 

         <button
         type="button"
         title="Remove Member"
         onClick={() => fields.remove(index)}
       >
       <i className="fa fa-trash fa-lg m-t-2"></i>
       </button>
     </li>
   ))}
 </ul>
 </div>
)

const renderIngestionPipeline = ({ fields, meta: { error, submitFailed } }) => (
  <div> 
     <div className="form-group">
       <label>Ingestion Pipeline</label>
       <button type="button" className="btn btn-link" onClick={() => fields.push({})}>
          <i className="fa fa-plus-circle fa-lg m-t-2"></i>
      </button>
              
     {submitFailed && error && <span>{error}</span>}
     </div>
   <ul>
   {fields.map((ing, index) => (
     <li key={index}>
     <div className="form-group">     
              <div className="form-group">
                <label> Pipeline</label>
                <Field
                  name={`${ing}.pipeline`}
                  type="text"
                  component={renderField}
                  label="Ingestion Pipeline"
                  />
              </div>
         </div>

        <button
         type="button"
         title="Remove Member"
         onClick={() => fields.remove(index)}
       >
       <i className="fa fa-trash fa-lg m-t-2"></i>
       </button>
     </li>
   ))}
 </ul>
 </div>
)

const renderStorageInfo = ({ fields, meta: { error, submitFailed } }) => (
  <div> 
     <div className="form-group">
       <label>Storage Info</label>
       <button type="button" className="btn btn-link" onClick={() => fields.push({})}>
     <i className="fa fa-plus-circle fa-lg m-t-2"></i>
   </button>
     {submitFailed && error && <span>{error}</span>}
     </div>
   <ul>
   {fields.map((storage, index) => (
     <li key={index}>
     <div className="form-group">
        <label>Scegli storages?</label>
        <Field name={`${storage}.db`} component={storages} />
      </div>
     <div className="form-group">     
              <div className="form-group">
                <label>Name</label>
                <Field
                  name={`${storage}.name`}
                  type="text"
                  component={renderField}
                  label="Name"
                  />
              </div>
         </div>
       <div className="form-group">     
             <div className="form-group">
               <label>Path</label>
               <Field
                 name={`${storage}.path`}
                 type="text"
                 component={renderField}
                 label="path"
                 />
             </div>
        </div>     
        <div className="form-group">     
             <div className="form-group">
               <label>Param</label>
               <Field
                 name={`${storage}.param`}
                 type="text"
                 component={renderField}
                 label="Param"
               />
             </div>
        </div>
        <button
        type="button"
        title="Remove Member"
        onClick={() => fields.remove(index)}
      >
      <i className="fa fa-trash fa-lg m-t-2"></i>
      </button>
     </li>
   ))}
   </ul>
 </div>
)

const renderGeoRef = ({ fields, meta: { error, submitFailed } }) => (
  <div> 
     <div className="form-group">
       <label>Geo Reference</label>
       <button type="button" className="btn btn-link" onClick={() => fields.push({})}>
     <i className="fa fa-plus-circle fa-lg m-t-2"></i>
   </button>
     {submitFailed && error && <span>{error}</span>}
     </div>
   <ul>
   {fields.map((geo, index) => (
     <li key={index}>
     <div className="form-group">     
              <div className="form-group">
                <label>Latitudine</label>
                <Field
                  name={`${geo}.lat`}
                  type="text"
                  component={renderField}
                  label="Latitudine"
                  />
              </div>
         </div>
         <div className="form-group">     
              <div className="form-group">
                <label>Longitudine</label>
                <Field
                  name={`${geo}.param`}
                  type="text"
                  component={renderField}
                  label="Longitudine"
                  />
              </div>
         </div>  

         <button
         type="button"
         title="Remove Member"
         onClick={() => fields.remove(index)}
       >
       <i className="fa fa-trash fa-lg m-t-2"></i>
       </button>
     </li>
   ))}
 </ul>
 </div>
)

const renderGroupAccess = ({ fields, meta: { error, submitFailed } }) => (
  <div> 
     <div className="form-group">
       <label>Group Access</label>
       <button type="button" className="btn btn-link" onClick={() => fields.push({})}>
     <i className="fa fa-plus-circle fa-lg m-t-2"></i>
   </button>
     {submitFailed && error && <span>{error}</span>}
     </div>
   <ul>
   {fields.map((access, index) => (
     <li key={index}>
     <div className="form-group">     
              <div className="form-group">
                <label>Name</label>
                <Field
                  name={`${access}.name`}
                  type="text"
                  component={renderField}
                  label="Name"
                  />
              </div>
         </div>
         <div className="form-group">     
              <div className="form-group">
                <label>Role</label>
                <Field
                  name={`${access}.role`}
                  type="text"
                  component={renderField}
                  label="Role"
                  />
              </div>
         </div>  
         <button
         type="button"
         title="Remove Member"
         onClick={() => fields.remove(index)}
       >
       <i className="fa fa-trash fa-lg m-t-2"></i>
       </button>
     </li>
   ))}
 </ul>
 </div>
)

let WizardOperational = props => {

  const { handleSubmit, pristine, previousPage, getDomain, domain, submitting, isStandard, isOk = 'false', isPush = true,isFtp = 'sftp', followStandard = 'false' } = props;  
  let standards = serviceurl.apiURLCatalog + '/dataset-catalogs/standard-uris' ; 
  let domainUrl = serviceurl.apiURLCatalog + '/voc/themes/getall';
  let subdomainUrl = serviceurl.apiURLCatalog + '/voc/subthemes/getall' 
  var subdomain = getDomain(2,domain)

  return (
    <form  onSubmit={handleSubmit}>
      <div className="col-md-12">
      <div className="form-group">
        <label>Definisce uno standard?</label>
        <Field name="is_std" type="text" component={renderYesNoSelector} />
      </div>
        {(isOk === 'false') &&
      <div className="form-group">
        <label>Segue uno standard?</label>
        <Field name="follow_standard" type="text" component={renderYesNoSelector} />
        {(followStandard === 'true') &&
        <Field name="uri_associato" type="text" component={TestSelect}  url={standards} />
        }
      </div>}

      <div className="form-group">
        <label>Dominio</label>
        <Field name="domain" type="text" component={renderDomain} domains={getDomain(1,undefined)} key='domain'/>
      </div>
      {(subdomain && subdomain.length >0) &&
      <div className="form-group">
        <label>Sotto dominio</label>
        <Field name="subdomain" type="text" component={renderDomain} domains={subdomain} />
      </div>
      }

      <div className="form-group">
        <label>Tipo Lettura del dataset</label>
        <Field name="read_type" type="text" component={renderTipoLettura} />
      </div>

      <div className="form-group">
        <label>Tipo Dataset</label>
        <Field name="dataset_type" type="text" component={renderDatasetType} />
      </div>
      
      {/* <h4>Group Access</h4>
      <FieldArray name="accesses" component={renderGroupAccess} />

      <h4>Sorgenti</h4>
      <FieldArray name="sfpts" component={renderSftp} />
      <FieldArray name="wss" component={renderWebServices} />
      <FieldArray name="dafs" component={renderDaf} />

      <h4>Ingestion Pipeline</h4>
      <FieldArray name="ings" component={renderIngestionPipeline} />

      <h4>Storage Info</h4>
      <FieldArray name="storages" component={renderStorageInfo} />

      <h4>Geo Reference</h4>
      <FieldArray name="geos" component={renderGeoRef} /> */}


      <div className="form-group row justify-content-between">
        <div className="col-6">
          <button type="button" className="btn btn-primary float-left" onClick={previousPage}>Indietro</button>
        </div>
        <div className="col-6">
          <button type="submit" className="btn btn-primary float-right" disabled={pristine || submitting}>Invia</button>
        </div>
      </div>

      </div>
    </form>
  );
};
/*
      <div>
        <button type="button" className="previous" onClick={previousPage}>
          Previous
        </button>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
      </div>
*/

// Decorate with connect to read form values
const selector = formValueSelector('wizard') // <-- same as form name
WizardOperational = connect(state => {
  // can select values individually
  const isOk = selector(state, 'is_std')
  const isPush = selector(state, 'pushOrPull')
  const followStandard = selector(state, 'follow_standard')
  let isFtp = "sftp"
  let reload = false
  let domain = selector(state, 'domain')
  isFtp = selector(state, 'ftporws')
  reload = selector(state, '')
  return {
    isOk,
    isPush,
    isFtp,
    followStandard,
    domain
  }
})(WizardOperational)


WizardOperational = reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(WizardOperational);

export default WizardOperational