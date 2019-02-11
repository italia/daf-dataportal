import React from 'react';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { connect  } from 'react-redux';
import validate from './validate';
import AutocompleteSemantic from './AutocompleteSemantic'
import { renderFieldInput, renderFieldTextArea, renderFieldSelect, renderTipi, renderFieldTags, renderContesti} from './renderField';
import Collapse from 'rc-collapse'
import Convenzioni from './Convenzioni'
import 'rc-collapse/assets/index.css'
import GerarchiaCampi from './GerarchiaCampi';

var Panel = Collapse.Panel;

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

  
let WizardFormSecondPage = props => {
  const { fields, handleSubmit, addTagsFieldToForm, previousPage, changeTreeData, openModalInfo, getFormValue, aggiornaStato, config, addSemanticToForm, addConvenzioneToForm, deleteConvenzioneToForm, addGerarchiaToForm, deleteGerarchiaToForm, context, listaConvenzioni, listaGerarchie, vocabolariControllati } = props;
  return (
     <form className="col-12 mt-5">
      {(fields && fields.length > 0) &&
        <FieldArray
              name="inferred"
              component={renderFieldArray}
              addTagsFieldToForm={addTagsFieldToForm}
              aggiornaStato={aggiornaStato}
              addSemanticToForm={addSemanticToForm}
              addConvenzioneToForm={addConvenzioneToForm}
              deleteConvenzioneToForm={deleteConvenzioneToForm}
              addGerarchiaToForm={addGerarchiaToForm}
              deleteGerarchiaToForm={deleteGerarchiaToForm}
              context={context}
              previousPage={previousPage}
              listaConvenzioni={listaConvenzioni}
              listaGerarchie={listaGerarchie}
              openModalInfo={openModalInfo}
              getFormValue={getFormValue}
              config={config}
              vocabolariControllati={vocabolariControllati}
              changeTreeData={changeTreeData}
              handleSubmit={handleSubmit}
        />
      }
    </form> 
  )}

const renderFieldArray = ({fields, addTagsFieldToForm, handleSubmit, aggiornaStato, getFormValue, changeTreeData, openModalInfo, addSemanticToForm, addConvenzioneToForm, deleteConvenzioneToForm, config, context, listaConvenzioni, previousPage, vocabolariControllati, meta : {touched, error} }) =>
        <div>
          {/* <GerarchiaCampi 
            fields={fields} 
            getFormValue={getFormValue}
            config={config}
            changeTreeData={changeTreeData}
          /> */}
          {fields.map((field, index) => {
            var vocabolariocontrollato = fields.get(index).vocabolariocontrollato
            var datipersonali = fields.get(index).datipersonali
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
                          openModalInfo={openModalInfo}
                          config={config}

                        />
                        <Field
                            name={`${field}.tipo`}
                            options={config['dafvoc-ingform-datastruct-type']}
                            component={renderFieldSelect}
                            label="Tipo"
                            openModalInfo={openModalInfo}
                            config={config}
                          />
                        <Field
                          name={`${field}.nomehr`}
                          component={renderFieldInput}
                          label="Nome"
                          value={`${field}.nomehr`}
                          openModalInfo={openModalInfo}
                          config={config}

                        />
                        <Field
                          name={`${field}.desc`}
                          component={renderFieldTextArea}
                          label="Descrizione"
                          value={`${field}.desc`}
                          openModalInfo={openModalInfo}
                          config={config}

                        /> 
{/*                         <Field
                          name={`${field}.tag`}
                          component={renderFieldTags}
                          label="Tags"
                          value={`${field}.tag`}
                          addTagsToForm={addTagsFieldToForm}
                          openModalInfo={openModalInfo}
                          config={config}

                        /> */}
                    </Panel>
                    <Panel header="Formato e Convenzioni">
                      <Field
                        name={`${field}.tipoinformazione`}
                        options={config['dafvoc-ingform-dataschema-metadata-field_type']}
                        component={renderFieldSelect}
                        label="Tipo Informazione"
                        value={`${field}.tipoinformazione`}
                        openModalInfo={openModalInfo}
                        config={config}

                      />
                      <Field
                        name={`${field}.standardformat`}
                        options={config['dafvoc-ingform-dataschema-metadata-format_std']}
                        component={renderFieldSelect}
                        label="Standard Format"
                        value={`${field}.standardformat`}
                        openModalInfo={openModalInfo}
                        config={config}
                      />
                       {/* <Field
                        name={`${field}.vocabolariocontrollato`}
                        options={vocabolariControllati}
                        component={renderFieldSelect}
                        label="Vocabolario Controllato"
                        value={`${field}.vocabolariocontrollato`}
                        openModalInfo={openModalInfo}
                        config={config}

                      /> */}
                      {vocabolariocontrollato &&
                         <Field
                          name={`${field}.campovocabolariocontrollato`}
                          component={renderFieldInput}
                          label='Campo Vocabolario'
                          value={`${field}.campovocabolariocontrollato`}
                          openModalInfo={openModalInfo}
                          config={config}

                          />
                      }
                      <Convenzioni 
                          addConvenzioneToForm={addConvenzioneToForm} 
                          index={index} 
                          listaConvenzioni={listaConvenzioni}
                          deleteConvenzioneToForm={deleteConvenzioneToForm}
                          openModalInfo={openModalInfo}
                          config={config}

                          />
                    </Panel>
                    <Panel header="Semantica e Ontologie">
                      <Field
                        name={`${field}.concetto`}
                        component={AutocompleteSemantic}
                        label="Concetto"
                        value={`${field}.concetto`}
                        addSemanticToForm={addSemanticToForm}
                        index={index}
                        aggiornaStato={aggiornaStato}
                        openModalInfo={openModalInfo}
                        config={config}
                        />
                      <Field
                        name={`${field}.contesto`}
                        component={renderContesti}
                        label="Contesto"
                        value={`${field}.contesto`}
                        contesti={context[index]}
                        index={index}
                        openModalInfo={openModalInfo}
                        config={config}
                      /> 
{/*                       <Field
                          name={`${field}.idgruppocampi`}
                          component={renderFieldInput}
                          label="ID Gruppo Campi"
                          value={`${field}.idgruppocampi`}
                          openModalInfo={openModalInfo}
                          config={config}

                        /> */}
                      <Field
                          name={`${field}.rdfsoggetto`}
                          component={renderFieldInput}
                          label="RDF Soggetto"
                          value={`${field}.rdfsoggetto`}
                          openModalInfo={openModalInfo}
                          config={config}

                        />
                      <Field
                          name={`${field}.rdfpredicato`}
                          component={renderFieldInput}
                          label="RDF Predicato"
                          value={`${field}.rdfpredicato`}
                          openModalInfo={openModalInfo}
                          config={config}

                        />
                      <Field
                          name={`${field}.rdfcomplemento`}
                          component={renderFieldInput}
                          label="RDF Complemento"
                          value={`${field}.rdfcomplemento`}
                          openModalInfo={openModalInfo}
                          config={config}

                        />
                    </Panel>
                    <Panel header="Informazioni Operazionali">
                      <div className="form-group row">
                        <label className="col-sm-5 col-form-label">Campo chiave</label>
                        <div className="col-sm-2 pt-2">
                          <Field
                              name={`${field}.chiave`}
                              component="input"
                              type="checkbox"
                              value={`${field}.chiave`}
                              className="form-control"
                            />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-5 col-form-label">Campo Obbligatorio</label>
                        <div className="col-sm-2 pt-2">
                          <Field
                              name={`${field}.obbligatorio`}
                              component="input"
                              type="checkbox"
                              value={`${field}.obbligatorio`}
                              className="form-control"
                            />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-5 col-form-label">Data di Creazione</label>
                        <div className="col-sm-2 pt-2">
                          <Field
                              name={`${field}.datacreazione`}
                              component="input"
                              type="checkbox"
                              value={`${field}.datacreazione`}
                              className="form-control"
                            />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-5 col-form-label">Data di Aggiornamento</label>
                        <div className="col-sm-2 pt-2">
                          <Field
                              name={`${field}.dataaggiornamento`}
                              component="input"
                              type="checkbox"
                              value={`${field}.dataaggiornamento`}
                              className="form-control"
                            />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-5 col-form-label">Indicizzare il Campo</label>
                        <div className="col-sm-2 pt-2">
                          <Field
                              name={`${field}.indicizzare`}
                              component="input"
                              type="checkbox"
                              value={`${field}.indicizzare`}
                              className="form-control"
                            />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-5 col-form-label">Creare Profilo per Indicizzazione</label>
                        <div className="col-sm-2 pt-2">
                          <Field
                              name={`${field}.profiloindicizzazione`}
                              component="input"
                              type="checkbox"
                              value={`${field}.profiloindicizzazione`}
                              className="form-control"
                            />
                        </div>
                      </div>

{/*                          <Field
                          name={`${field}.entityextraction`}
                          options={config['dafvoc-ingform-dataschema-metadata-field_profile-entity_extr']}
                          component={renderFieldSelect}
                          label="Procedura Entity Extraction"
                          value={`${field}.entityextraction`}
                          openModalInfo={openModalInfo}
                          config={config}
                        /> */}
                    </Panel>
                    <Panel header="Dati Personali">
                      <div className="form-group row">
                        <label className="col-sm-5 col-form-label">Contiene Dati Personali</label>
                        <div className="col-sm-2 pt-2">
                          <Field
                              name={`${field}.datipersonali`}
                              component="input"
                              type="checkbox"
                              value={`${field}.datipersonali`}
                              className="form-control"
                            />
                        </div>
                      </div>
                      {datipersonali &&
                      <Field
                          name={`${field}.tipodatopersonale`}
                          options={config['dafvoc-ingform-dataschema-metadata-personal-cat']}
                          component={renderFieldSelect}
                          label="Tipo Dato Personale"
                          value={`${field}.tipodatopersonale`}
                          openModalInfo={openModalInfo}
                          config={config}

                      />
                      }
                      <Field
                          name={`${field}.tipomascheramento`}
                          options={config['dafvoc-ingform-dataschema-metadata-personal-processing']}
                          component={renderFieldSelect}
                          label="Tipo di Mascheramento"
                          value={`${field}.tipomascheramento`}
                          openModalInfo={openModalInfo}
                          config={config}

                      />
                      <div className="form-group row">
                        <label className="col-sm-5 col-form-label">Disponibile per Analisi</label>
                        <div className="col-sm-2 pt-2">
                          <Field
                              name={`${field}.disponibileanalisi`}
                              component="input"
                              type="checkbox"
                              value={`${field}.disponibileanalisi`}
                              className="form-control"
                            />
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </div>
              </div>  
            </div>
            )}
            )}
        <div>
          <button type="button" className="btn btn-primary float-left" onClick={previousPage}>Indietro</button>
          <button type="button" className="btn btn-primary float-right" onClick={handleSubmit}>Avanti</button>
        </div>
      </div>

WizardFormSecondPage = reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(WizardFormSecondPage);

WizardFormSecondPage = connect(state => {
  //var title = selector(state, 'title')  
  const fields = state.form.wizard.values.inferred
  return {
    fields 
  }
})(WizardFormSecondPage)

export default WizardFormSecondPage
