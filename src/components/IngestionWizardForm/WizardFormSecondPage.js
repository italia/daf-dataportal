import React from 'react';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { connect  } from 'react-redux';
import validate from './validate';
import { ingestionFormOptions } from './const';
import AutocompleteSemantic from './AutocompleteSemantic'
import { renderFieldInput, renderFieldTextArea, renderFieldSelect, renderTipi, renderFieldTags, renderContesti, renderFieldCheckbox} from './renderField';
import Collapse from 'rc-collapse'
import 'rc-collapse/assets/index.css'


var Panel = Collapse.Panel;

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

  
let WizardFormSecondPage = props => {
  const { fields, handleSubmit, addTagsToForm, previousPage, tipi, aggiornaStato, addSemanticToForm, context } = props;
  return (
     <form onSubmit={handleSubmit} className="col-12 mt-5">
      {(fields && fields.length > 0) &&
        <FieldArray
              name="inferred"
              component={renderFieldArray}
              tipi={tipi}
              addTagsToForm={addTagsToForm}
              aggiornaStato={aggiornaStato}
              addSemanticToForm={addSemanticToForm}
              context={context}
              previousPage={previousPage}
        />
      }
    </form> 
  )}

const renderFieldArray = ({fields, tipi, addTagsToForm, aggiornaStato, addSemanticToForm, context, previousPage, meta : {touched, error} }) =>
        <div>
          {fields.map((field, index) => {
            var convenzioniValue = fields.get(index).convenzioni
            var campi = []
            if(convenzioniValue && ingestionFormOptions.convenzioni){
              for(var i=0;i<ingestionFormOptions.convenzioni.length;i++){
                if(ingestionFormOptions.convenzioni[i].val==convenzioniValue){
                  campi = ingestionFormOptions.convenzioni[i].campi
                }
              }
            }
            return(
            <div className="card" key={index}>
              <div className="card-body">
                <h5 className="card-title">Metadati campo <b>{fields.get(index).nome}</b></h5>
                <div>
                  <Collapse accordion={true}>
                    <Panel header="Informazioni Principali" headerClass="my-header-class">
                      <Field
                          name={`${field}.nome`}
                          component={renderFieldInput}
                          label="ID Campo"
                          value={`${field}.nome`}
                          readonly="readonly"
                        />
                        <Field
                          name={`${field}.tipo`}
                          component={renderTipi}
                          label="Tipo"
                          value={`${field}.tipo`}
                          tipi={tipi}
                          index={index}
                        />
                        <Field
                          name={`${field}.nomehr`}
                          component={renderFieldInput}
                          label="Nome"
                          value={`${field}.nomehr`}
                        />
                        <Field
                          name={`${field}.desc`}
                          component={renderFieldTextArea}
                          label="Descrizione"
                          value={`${field}.desc`}
                        /> 
                        <Field
                          name={`${field}.tag`}
                          component={renderFieldTags}
                          label="Tags"
                          value={`${field}.tag`}
                          addTagsToForm={addTagsToForm}
                        />
                        <Field
                          name={`${field}.concetto`}
                          component={AutocompleteSemantic}
                          label="Concetto"
                          value={`${field}.concetto`}
                          addSemanticToForm={addSemanticToForm}
                          index={index}
                          aggiornaStato={aggiornaStato}
                        />
                    </Panel>
                    <Panel header="Formato e Convenzioni">
                      <Field
                        name={`${field}.tipoinformazione`}
                        options={ingestionFormOptions.tipoinformazione}
                        component={renderFieldSelect}
                        label="Tipo Informazione"
                        value={`${field}.tipoinformazione`}
                      />
                      <Field
                        name={`${field}.standardformat`}
                        options={ingestionFormOptions.standardformat}
                        component={renderFieldSelect}
                        label="Standard Format"
                        value={`${field}.standardformat`}
                      />
                      <Field
                        name={`${field}.convenzioni`}
                        options={ingestionFormOptions.convenzioni}
                        component={renderFieldSelect}
                        label="Convenzioni"
                        value={`${field}.convenzioni`}
                      />
                      {campi && campi.map((campo, index) => {
                        console.log('campo: ' + campo)
                        return(
                          <Field
                            name={`${field}.campo.${campo.val}`}
                            component={renderFieldInput}
                            label={campo.label}
                            value={`${field}.campo.${campo.val}`}
                            key={index}
                          />)
                      })
                      }
                       <Field
                        name={`${field}.vocabolariocontrollato`}
                        options={ingestionFormOptions.vocabolariocontrollato}
                        component={renderFieldSelect}
                        label="Vocabolario Controllato"
                        value={`${field}.vocabolariocontrollato`}
                      />
                    </Panel>
                    <Panel header="Semantica e Ontologie">
                      <Field
                        name={`${field}.contesto`}
                        component={renderContesti}
                        label="Contesto"
                        value={`${field}.contesto`}
                        contesti={context[index]}
                        index={index}
                      /> 
                      <Field
                          name={`${field}.idgruppocampi`}
                          component={renderFieldInput}
                          label="ID Gruppo Campi"
                          value={`${field}.idgruppocampi`}
                        />
                      <Field
                          name={`${field}.rdfsoggetto`}
                          component={renderFieldInput}
                          label="RDF Soggetto"
                          value={`${field}.rdfsoggetto`}
                        />
                      <Field
                          name={`${field}.rdfpredicato`}
                          component={renderFieldInput}
                          label="RDF Predicato"
                          value={`${field}.rdfpredicato`}
                        />
                      <Field
                          name={`${field}.rdfcomplemento`}
                          component={renderFieldInput}
                          label="RDF Complemento"
                          value={`${field}.rdfcomplemento`}
                        />
                      <Field
                          name={`${field}.gerarchiacampi`}
                          component={renderFieldInput}
                          label="Gerarchia Campi"
                          value={`${field}.gerarchiacampi`}
                        />
                    </Panel>
                    <Panel header="Informazioni Operazionali">
                      <Field
                          name={`${field}.obbligatorio`}
                          component={renderFieldCheckbox}
                          label="Campo Obbligatorio"
                          value={`${field}.obbligatorio`}
                        />
                        <Field
                          name={`${field}.datacreazione`}
                          component={renderFieldCheckbox}
                          label="Data di Creazione"
                          value={`${field}.datacreazione`}
                        />
                        <Field
                          name={`${field}.dataaggiornamento`}
                          component={renderFieldCheckbox}
                          label="Data di Aggiornamento"
                          value={`${field}.dataaggiornamento`}
                        />
                        <Field
                          name={`${field}.indicizzare`}
                          component={renderFieldCheckbox}
                          label="Indicizzare il Campo"
                          value={`${field}.indicizzare`}
                        />
                        <Field
                          name={`${field}.profiloindicizzazione`}
                          component={renderFieldCheckbox}
                          label="Creare Profilo per Indicizzazione"
                          value={`${field}.profiloindicizzazione`}
                        />
                    </Panel>
                    <Panel header="Dati Personali">
                      <Field
                          name={`${field}.datipersonali`}
                          component={renderFieldCheckbox}
                          label="Contiene Dati Personali"
                          value={`${field}.datipersonali`}
                        />
                      <Field
                          name={`${field}.tipodatopersonale`}
                          options={ingestionFormOptions.tipodatopersonale}
                          component={renderFieldSelect}
                          label="Tipo Dato Personale"
                          value={`${field}.tipodatopersonale`}
                      />
                      <Field
                          name={`${field}.tipomascheramento`}
                          options={ingestionFormOptions.tipomascheramento}
                          component={renderFieldSelect}
                          label="Tipo di Mascheramento"
                          value={`${field}.tipomascheramento`}
                      />
                        <Field
                          name={`${field}.disponibileanalisi`}
                          component={renderFieldCheckbox}
                          label="Disponibile per Analisi"
                          value={`${field}.disponibileanalisi`}
                        />
                    </Panel>
                  </Collapse>
                </div>
              </div>  
            </div>
            )}
            )}
        <div>
          <button type="button" className="btn btn-primary float-left" onClick={previousPage}>Indietro</button>
          <button type="submit" className="btn btn-primary float-right">Avanti</button>
        </div>
      </div>

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