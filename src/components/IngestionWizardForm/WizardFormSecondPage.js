import React from 'react';
import { Field, FieldArray, reduxForm, formValueSelector, reset } from 'redux-form';
import { connect  } from 'react-redux';
import validate from './validate';
import AutocompleteSemantic from '../Autocomplete/AutocompleteSemantic'
import { yesOrNoOptions } from './const'
import { renderFieldInput, renderFieldTextArea, renderFieldSelect, renderFieldInputButton, renderTipi, renderFieldTags} from './renderField';
import Collapse from 'rc-collapse'
import 'rc-collapse/assets/index.css'


var Panel = Collapse.Panel;

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

  
let WizardFormSecondPage = props => {
  const { fields, handleSubmit, reset, addTagsToForm, previousPage, tipi, aggiornaStato, addSemanticToForm } = props;
  return (
     <form onSubmit={handleSubmit} className="col-12 mt-5">
      {(fields && fields.length > 0) &&
        <FieldArray
              name="inferred"
              component={renderFieldArray}
              reset={reset}
              tipi={tipi}
              addTagsToForm={addTagsToForm}
              aggiornaStato={aggiornaStato}
              addSemanticToForm={addSemanticToForm}
        />
      }
    </form> 
  )}

const renderFieldArray = ({fields, reset, tipi, addTagsToForm, aggiornaStato, addSemanticToForm, meta : {touched, error} }) =>
        <div>
          <Field
              name="title"
              type="text"
              component={renderFieldInputButton}
              label="Nome File"
              readonly="readonly"
              hidden="true"
              buttonLabel="Elimina"
              onClick={reset}
            />
            <Field
              name={'private'}
              type="text"
              options={yesOrNoOptions}
              component={renderFieldSelect}
              label="Privato"
            />
        
          {fields.map((field, index) => 
            <div className="card" key={index}>
              <div className="card-body">
                <h5 className="card-title">Metadati campo <b>{fields.get(index).nome}</b></h5>
                <div>
                  <Collapse accordion={true}>
                    <Panel header="Informazioni Principali" headerClass="my-header-class">
                      <Field
                          name={`${field}.nome`}
                          type="text"
                          component={renderFieldInput}
                          label="ID Campo"
                          value={`${field}.nome`}
                          readonly="readonly"
                        />
                        <Field
                          name={`${field}.tipo`}
                          type="text"
                          component={renderTipi}
                          label="Tipo"
                          value={`${field}.tipo`}
                          tipi={tipi}
                          index={index}
                        />
                        <Field
                          name={`${field}.nomehr`}
                          type="text"
                          component={renderFieldInput}
                          label="Nome"
                          value={`${field}.nomehr`}
                          readonly="readonly"
                        />
                        <Field
                          name={`${field}.desc`}
                          type="text"
                          component={renderFieldTextArea}
                          label="Descrizione"
                          value={`${field}.desc`}
                        /> 
                        <Field
                          name={`${field}.tag`}
                          type="text"
                          component={renderFieldTags}
                          label="Tags"
                          value={`${field}.tag`}
                          addTagsToForm={addTagsToForm}
                        />
                        <Field
                          name={`${field}.concetto`}
                          type="text"
                          component={AutocompleteSemantic}
                          label="Concetto"
                          value={`${field}.concetto`}
                          addSemanticToForm={addSemanticToForm}
                          index={index}
                          aggiornaStato={aggiornaStato}
                        />
                    </Panel>
                    <Panel header="Formato e Convenzioni">this is 
                    </Panel>
                    <Panel header="Semantica e Ontologie">this is 
                    </Panel>
                    <Panel header="Informazioni Operazionali">this is 
                    </Panel>
                    <Panel header="Dati Personali">this is 
                    </Panel>
                  </Collapse>
                </div>
                     
              </div>  
            </div>
            )}
      </div>



              {/* <Field
                name={`${field}.concetto`}
                type="text"
                component={AutocompleteSemantic}
                label="Concetto"
                value={`${field}.concetto`}
                addSemanticToForm={addSemanticToForm}
                index={index}
                wizard={wizard}
                dispatchAction={dispatchAction}
                aggiornaStato={aggiornaStato}
              />
              {this.state.context && this.state.context[index] && this.state.context[index].length>0 &&
                <div>
                  <Field
                    name={`${field}.contesto`}
                    type="text"
                    component={renderContesti}
                    label="Contesto"
                    value={`${field}.contesto`}
                    contesti={this.state.context[index]}
                    index={index}
                  /> 
                  <Field
                  name={`${field}.uri_voc`}
                  type="text"
                  component={renderField}
                  label="Uri Vocabulary"
                  value={`${field}.uri_voc`}
                  />
                   <Field
                  name={`${field}.uri_property`}
                  type="text"
                  component={renderField}
                  label="Uri Property"
                  value={`${field}.uri_property`}
                  />
                   <Field
                  name={`${field}.gerarchia`}
                  type="text"
                  component={renderField}
                  label="Gerarchia"
                  value={`${field}.gerarchia`}
                  />
                </div>
              } 
              <Field
                name={`${field}.desc`}
                type="text"
                component={renderFieldTextArea}
                label="Descrizione"
                value={`${field}.desc`}
              />
              <Field
                name={`${field}.tag`}
                type="text"
                component={renderFieldInput}
                label="Tags"
                value={`${field}.tag`}
                //addTagsToForm={addTagsToForm}
              />
{/*               <div className="form-group row">
                <div className="col-md-12">
                  <button type="button" className={"b-t-0 b-b-0 btn "+ (this.state.showMore ? "btn-secondary":"btn-light")} onClick={handleToggleClickMore}>Opzioni avanzate <i className={"fa " + (this.state.showMore ? "fa-angle-up" : "fa-angle-down")}></i></button>
                </div>
              </div> */}
              {/*this.state.showMore &&
              <div>
                  <Field
                    name={`${field}.personale`}
                    type="text"
                    component={renderYesNoSelector}
                    label="Personale"
                    value={`${field}.personale`}
                  />
                  <Field
                    name={`${field}.cat`}
                    type="text"
                    component={renderField}
                    label="Categoria"
                    value={`${field}.cat`}
                  />
                  <Field
                    name={`${field}.format_std_name`}
                    type="text"
                    component={renderField}
                    label="STD-Nome"
                    value={`${field}.format_std_name`}
                  />
                  <Field
                    name={`${field}.format_std_param`}
                    type="text"
                    component={renderField}
                    label="STD-Parametri"
                    value={`${field}.format_std_param`}
                  />
                  <Field
                    name={`${field}.field_profile_is_index`}
                    type="text"
                    component={renderField}
                    label="FP-Indice"
                    value={`${field}.field_profile_is_index`}
                  />
                  <Field
                    name={`${field}.field_profile_is_profile`}
                    type="text"
                    component={renderField}
                    label="FP-Profilo"
                    value={`${field}.field_profile_is_profile`}
                  />
                  <Field
                    name={`${field}.field_profile_validation`}
                    type="text"
                    component={renderField}
                    label="FP-Validazione"
                    value={`${field}.field_profile_validation`}
                  />
                  <Field
                    name={`${field}.field_profile_standardization`}
                    type="text"
                    component={renderField}
                    label="FP-Standardizazione"
                    value={`${field}.field_profile_standardization`}
                  />
              </div> */
              }
{/*           <div className="col-md-6">
            <div className="form-group">
              <div className="card">
                <div className="card-header">
                  <strong>Dati colonna {field.nome}</strong>
                </div>
                <div className="card-block">
                  {field.data && field.data.map((row, index) => 
                    <p key={index}>{row}</p>
                  )}
                </div>
              </div>
            </div>
          </div> 
        </div>
      )}
      {fields.length > 0 &&
      <div className="form-group row">
          <div className="col-12">
            <button type="submit" className="btn btn-primary float-right">Avanti</button>
          </div>
      </div>}
      </div>*/}

WizardFormSecondPage = reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(WizardFormSecondPage);

const selector = formValueSelector('wizard') 
WizardFormSecondPage = connect(state => {
  //var title = selector(state, 'title')  
  const fields = state.form.wizard.values.inferred
  return {
    fields 
  }
})(WizardFormSecondPage)

export default WizardFormSecondPage