import React from 'react'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { connect  } from 'react-redux';
import { renderFieldInput, renderFieldTextArea, renderFieldSelect, renderFieldTags, renderFieldInputButton, renderFieldCheckbox} from './renderField';
import { ingestionFormOptions } from './const';
import validate from './validate';
import FileInput from './FileInput'
import Query from './Query'


const renderFieldArray = ({fields, setName, onDropFunction, setTemplate, getCategoria, sottocategoria, tipodataset, modalitacaricamento, addTagsToForm, tempopolling, nomefile, urlws, reset, errorNext, getSchemaFromWS, query, setQuery, resultQuery, executeQuery, resetQueryValue, openModalInfo, meta : {touched, error} }) => <div>
            <Field
              name="titolo"
              component={renderFieldInput}
              label="Titolo"
              onChange={setName}
              openModalInfo={openModalInfo}
            />
          <Field
              name="nome"
              component={renderFieldInput}
              label="Nome"
              readonly="true"
              openModalInfo={openModalInfo}
            />
            <Field
              name="public"
              options={ingestionFormOptions.publicOptions}
              component={renderFieldSelect}
              label="Pubblico/OpenData"
              openModalInfo={openModalInfo}
            />
            <Field
              name="descrizione"
              component={renderFieldTextArea}
              label="Descrizione"
              openModalInfo={openModalInfo}
            />
            <Field
              name="categoria"
              options={getCategoria(1,undefined)}
              component={renderFieldSelect}
              label="Categoria"
              openModalInfo={openModalInfo}
            />
            {(sottocategoria && sottocategoria.length>0) &&
                <Field
                  name="sottocategoria"
                  options={sottocategoria}
                  component={renderFieldSelect}
                  label="Sotto categoria"
                  openModalInfo={openModalInfo}
                />
            }
            <Field
              name="filetags"
              component={renderFieldTags}
              label="Tags"
              addTagsToForm={addTagsToForm}
              openModalInfo={openModalInfo}
            />
            <Field
              name="template"
              options={ingestionFormOptions.template}
              component={renderFieldSelect}
              label="Template"
              onChange={setTemplate}
              openModalInfo={openModalInfo}
            />
            <Field
              name="tipodataset"
              options={ingestionFormOptions.tipodatasetOptions}
              component={renderFieldSelect}
              label="Tipo Dataset"
              openModalInfo={openModalInfo}
            />
            {tipodataset=='primitive' &&
              <div>
                <Field
                  name="modalitacaricamento"
                  options={ingestionFormOptions.modalitacaricamentoOptions}
                  component={renderFieldSelect}
                  label="Modalità Caricamento"
                  openModalInfo={openModalInfo}
                />
                {modalitacaricamento==1 && 
                <div className="card">
                <div className="card-body">
                <h5 className="card-title">Caricamento tramite SFTP</h5>
                    <div className="form-group">
                      <div className="col-md-12">
                          <Field
                            name="caricafile"
                            component={renderFieldCheckbox}                
                            label="Caricare il file al termine della metadatazione"
                            openModalInfo={openModalInfo}
                          />
                          <Field
                            name="tempopolling"
                            options={ingestionFormOptions.tempoDiPollingOptions}
                            component={renderFieldSelect}
                            label="Tempo di Polling"
                            openModalInfo={openModalInfo}
                          />
                          {tempopolling==0 &&
                              <Field
                                name="espressionecron"
                                component={renderFieldInput}
                                label="Espressione"
                                openModalInfo={openModalInfo}
                            />
                          }
                          {tempopolling==1 &&
                              <div>
                                <Field
                                  name="timerquantita"
                                  component={renderFieldInput}
                                  label="Quantità"
                                  openModalInfo={openModalInfo}
                                />
                                    <Field
                                    name="timerunita"
                                    options={ingestionFormOptions.timerUnita}
                                    component={renderFieldSelect}
                                    label="Unità"
                                    openModalInfo={openModalInfo}
                                />
                              </div>
                          }
                           {nomefile? 
                            <div>
                              <Field
                                name="nomefile"
                                component={renderFieldInputButton}
                                label="Nome File Caricato"
                                readonly="true"
                                buttonLabel="Elimina File"
                                onClick={reset}
                                iconClassName="fa fa-trash fa-lg"
                              />
                          </div>
                          :
                          <FileInput
                            name="filesftp"
                            label="Caricamento:"
                            classNameLabel="file-input-label"
                            className="file-input"
                            dropzone_options={{
                              multiple: false,
                              accept: 'image/*'
                            }}
                            onDropFunction={onDropFunction}
                            fields={fields}
                          >
                          <span>Add more</span>
                          </FileInput>
                           }
                        </div>
                    </div>
                  </div>
                </div>

              }
              {modalitacaricamento==2 &&
               <div className="card">
                <div className="card-body">
                 <h5 className="card-title">Caricamento tramite Web Service</h5>
                    <div className="form-group">
                    <div className="col-md-12">
                        <Field
                            name="tempopolling"
                            options={ingestionFormOptions.tempoDiPollingOptions}
                            component={renderFieldSelect}
                            label="Tempo di Polling"
                            openModalInfo={openModalInfo}

                          />
                          {tempopolling==0 &&
                              <Field
                                name="espressionecron"
                                component={renderFieldInput}
                                label="Espressione"
                                openModalInfo={openModalInfo}

                            />
                          }
                          {tempopolling==1 &&
                              <div>
                                <Field
                                  name="timerquantita"
                                  component={renderFieldInput}
                                  label="Quantità"
                                  openModalInfo={openModalInfo}

                                />
                                    <Field
                                    name="timerunita"
                                    options={ingestionFormOptions.timerUnita}
                                    component={renderFieldSelect}
                                    label="Unità"
                                    openModalInfo={openModalInfo}

                                />
                              </div>
                          }
                      {nomefile? 
                          <div>
                            <Field
                              name="nomefile"
                              component={renderFieldInputButton}
                              label="Nome File Caricato"
                              readonly="true"
                              buttonLabel="Elimina File"
                              onClick={reset}
                              iconClassName="fa fa-trash fa-lg"
                              openModalInfo={openModalInfo}

                            />
                        </div>
                        :
                        <Field
                          name="urlws"
                          component={renderFieldInputButton}
                          label="Inserisci URL"
                          buttonLabel="Carica"
                          onClick={getSchemaFromWS.bind(this,fields, urlws)}
                          iconClassName="fa fa-plus"
                          placeholder="http://"
                          openModalInfo={openModalInfo}

                        />
                      }
                    </div>
                  </div> 
                </div>
              </div>  
              }
            </div>
            }
            {tipodataset=='derived_sql' &&
              <Query query={query} setQuery={setQuery} resultQuery={resultQuery} executeQuery={executeQuery} resetQueryValue={resetQueryValue} setQuery={setQuery}/>
            }
            {tipodataset=='derived_proc_spark' &&
              <div>
                 <Field
                    name="sparkprocedure"
                    component={renderFieldInputButton}
                    label="File Procedura"
                    buttonLabel="Importa"
                    onClick={getSchemaFromWS.bind(this,fields, urlws)}
                    iconClassName="fa fa-upload"
                    placeholder=".jar"
                    openModalInfo={openModalInfo}

                  />
              </div>
            }
            {errorNext && <div className="text-danger">{errorNext}</div>}
            <div>
                <button type="submit" className="btn btn-primary float-right">Avanti</button>
            </div>
</div>



let WizardFormFirstPage = props => {
  const { onDropFunction, handleSubmit, reset, categoria, tipodataset, setTemplate, addTagsToForm, modalitacaricamento, tempopolling, getCategoria, setName, nomefile, urlws, previousPage, getSchemaFromWS, query, setQuery, resultQuery, executeQuery, resetQueryValue, openModalInfo, errorNext } = props;
  var sottocategoria = getCategoria(2,categoria)
  return (
      <div className="mt-5">
        <p className="text-justify"><b>Benvenuto</b> ricordati che a grandi poteri derivano grandi responsabilità</p>     
        <form onSubmit={handleSubmit} className="mt-5">
            <FieldArray
                  name="inferred"
                  component={renderFieldArray}
                  onDropFunction={onDropFunction}
                  categoria={categoria}
                  sottocategoria={sottocategoria}
                  tipodataset={tipodataset}
                  modalitacaricamento={modalitacaricamento}
                  getCategoria={getCategoria}
                  reset={reset}
                  setName={setName}
                  nomefile={nomefile}
                  previousPage={previousPage}
                  getSchemaFromWS={getSchemaFromWS}
                  urlws={urlws}
                  tempopolling={tempopolling}
                  errorNext={errorNext}
                  setTemplate={setTemplate}
                  query={query}
                  setQuery={setQuery}
                  resultQuery={resultQuery}
                  executeQuery={executeQuery}
                  resetQueryValue={resetQueryValue}
                  addTagsToForm={addTagsToForm}
                  openModalInfo={openModalInfo}
            />
        </form>
      </div>
  );
};

WizardFormFirstPage = reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(WizardFormFirstPage);

const selector = formValueSelector('wizard') 
WizardFormFirstPage = connect(state => {
  const categoria = selector(state, 'categoria')
  const tipodataset = selector(state, 'tipodataset')
  const modalitacaricamento = selector(state, 'modalitacaricamento')
  const tempopolling = selector(state, 'tempopolling')
  const nomefile = selector(state, 'nomefile')
  const urlws = selector(state, 'urlws')
  return { categoria, tipodataset, modalitacaricamento, tempopolling, nomefile, urlws }
})(WizardFormFirstPage)

export default WizardFormFirstPage
