import React from 'react'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { connect  } from 'react-redux';
import { renderFieldInput, renderFieldTextArea, renderFieldSelect, renderFieldTags, renderFieldInputButton, renderFieldCheckbox, renderFieldCategoria} from './renderField';
import asyncValidate from './asyncValidate';
import validate from './validate';
import FileInput from './FileInput'
import Query from './Query'


const renderFieldArray = ({fields, setName, onDropFunction, handleSubmit, setTemplate, uploading, getCategoria, filePullLoaded, sottocategoria, tipodataset, modalitacaricamento, tipofile, addTagsFiletagsToForm, tempopolling, nomefile, urlws, reset, errorNext, getSchemaFromWS, query, setQuery, resultQuery, executeQuery, resetQueryValue, openModalInfo, config, meta : {touched, error} }) => <div>
            <Field
              name="titolo"
              component={renderFieldInput}
              label="Titolo"
              onChange={setName}
              openModalInfo={openModalInfo}
              config={config}
            />
          <Field
              name="nome"
              component={renderFieldInput}
              label="Nome"
              readonly="true"
              openModalInfo={openModalInfo}
              config={config}
            />
{/*             <Field
              name="public"
              options={config['dafvoc-ingform-dataset_visibility']}
              component={renderFieldSelect}
              label="Pubblico/OpenData"
              openModalInfo={openModalInfo}
              config={config}
            /> */}
             <Field
              name="descrizione"
              component={renderFieldTextArea}
              label="Descrizione"
              openModalInfo={openModalInfo}
              config={config}
            />
            <Field
              name="categoria"
              options={getCategoria(1,undefined)}
              component={renderFieldCategoria}
              label="Categoria"
              openModalInfo={openModalInfo}
              config={config}
            />
            {(sottocategoria && sottocategoria.length>0) &&
                <Field
                  name="sottocategoria"
                  options={sottocategoria}
                  component={renderFieldCategoria}
                  label="Sotto categoria"
                  openModalInfo={openModalInfo}
                  config={config}
                />
            }
            {/* <Field
              name="filetags"
              component={renderFieldTags}
              label="Tags"
              addTagsToForm={addTagsFiletagsToForm}
              openModalInfo={openModalInfo}
              config={config}
            /> */}
{/*             <Field
              name="template"
              options={config['dafvoc-ingform-template']}
              component={renderFieldSelect}
              label="Template"
              onChange={setTemplate}
              openModalInfo={openModalInfo}
              config={config}
            /> */}

            <Field
              name="tipodataset"
              options={config['dafvoc-ingform-newtype']}
              component={renderFieldSelect}
              label="Tipo Dataset"
              openModalInfo={openModalInfo}
              config={config}
            />
            {tipodataset=='primitive' &&
              <div>
                 <Field
                  name="tipofile"
                  options={config['dafvoc-ingform-filetype']}
                  component={renderFieldSelect}
                  label="Tipo di File"
                  openModalInfo={openModalInfo}
                  config={config}
                />
                <Field
                  name="modalitacaricamento"
                  options={config['dafvoc-ingform-ingest_type']}
                  component={renderFieldSelect}
                  label="Modalità Caricamento"
                  openModalInfo={openModalInfo}
                  config={config}

                />
                {(modalitacaricamento=='sftp' || modalitacaricamento=='webservice_push')&& 
                <div className="card">
                <div className="card-body">
                <h5 className="card-title">Caricamento tramite SFTP</h5>
                    <div className="form-group">
                      <div className="col-md-12">
                          <p>Definisci lo schema del tuo Dataset caricando un sample (max 1MB), il file completo lo potrai caricare in seguito:</p>
                          <h5>Tempo di polling</h5>
                          {/* <Field
                            name="caricafile"
                            component={renderFieldCheckbox}                
                            label="Caricare il file al termine della metadatazione"
                            openModalInfo={openModalInfo}
                            config={config}
                          /> */}
                          {/* <Field
                            name="tempopolling"
                            options={config['tempoDiPollingOptions']}
                            component={renderFieldSelect}
                            label="Tempo di Polling"
                            openModalInfo={openModalInfo}
                            config={config}

                          /> */}
                          {/* tempopolling==0 &&
                              <Field
                                name="espressionecron"
                                component={renderFieldInput}
                                label="Espressione"
                                openModalInfo={openModalInfo}
                                config={config}

                            />
                           */}
                          {/* tempopolling==1 && */
                              <div>
                                  <Field
                                    name="timerunita"
                                    options={config['timerUnita']}
                                    component={renderFieldSelect}
                                    label="Unità"
                                    openModalInfo={openModalInfo}
                                    config={config}
                                />
                                <Field
                                  name="timerquantita"
                                  component={renderFieldInput}
                                  label="Quantità"
                                  openModalInfo={openModalInfo}
                                  config={config}
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
                                config={config}

                              />
                          </div>
                          :
                          <Field
                            name="filesftp"
                            label="Caricamento:"
                            component={FileInput}
                            classNameLabel="file-input-label"
                            className="file-input"
                            dropzone_options={{
                              multiple: false,
                              accept: 'image/*'
                            }}
                            onDropFunction={onDropFunction}
                            fields={fields}
                            tipofile={tipofile}
                          />
                           }
                        </div>
                    </div>
                  </div>
                </div>

              }
              {modalitacaricamento=='webservice_pull' &&
               <div className="card">
                <div className="card-body">
                 <h5 className="card-title">Caricamento tramite Web Service</h5>
                    <div className="form-group">
                    <div className="col-md-12">
                    <h5>Tempo di polling</h5>
                        {/* <Field
                            name="tempopolling"
                            options={config['tempoDiPollingOptions']}
                            component={renderFieldSelect}
                            label="Tempo di Polling"
                            openModalInfo={openModalInfo}
                            config={config}

                          />
                          {tempopolling==0 &&
                              <Field
                                name="espressionecron"
                                component={renderFieldInput}
                                label="Espressione"
                                openModalInfo={openModalInfo}
                                config={config}

                            />
                          }
                          {tempopolling==1 && */}
                              <div>
                                <Field
                                  name="timerunita"
                                  options={config['timerUnita']}
                                  component={renderFieldSelect}
                                  label="Unità"
                                  openModalInfo={openModalInfo}
                                  config={config}
                                />
                                <Field
                                  name="timerquantita"
                                  component={renderFieldInput}
                                  label="Quantità"
                                  openModalInfo={openModalInfo}
                                  config={config}
                                />
                              </div>
                          {/* } */}
                      {filePullLoaded? 
                          <div>
                              <Field
                                name="urlws"
                                component={renderFieldInputButton}
                                label="Url Servizio Pull"
                                readonly="true"
                                buttonLabel="Elimina File"
                                onClick={reset}
                                iconClassName={uploading?"fas fa-circle-notch fa-spin fa-lg":"fa fa-trash fa-lg"}
                                config={config}
                              />
                        </div>
                        :
                        <Field
                          name="urlws"
                          component={renderFieldInputButton}
                          label="Inserisci URL"
                          buttonLabel="Carica"
                          onClick={getSchemaFromWS.bind(this,fields, urlws, tipofile)}
                          iconClassName="fa fa-plus"
                          placeholder="http://"
                          openModalInfo={openModalInfo}
                          config={config}

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
              <Query 
                setQuery={setQuery}
                fields={fields}
                onDropFunction={onDropFunction} 
                />
            }
            {tipodataset=='derived_procspark' &&
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
                    config={config}

                  />
              </div>
            }
            {errorNext && <div className="text-danger">{errorNext}</div>}
            <div>
                <button type="button" onClick={handleSubmit} className="btn btn-primary float-right">Avanti</button>
            </div>
</div>



let WizardFormFirstPage = props => {
  const { onDropFunction, handleSubmit, reset, categoria, filePullLoaded, tipodataset, tipofile, setTemplate, addTagsFiletagsToForm, modalitacaricamento, tempopolling, getCategoria, setName, nomefile, urlws, previousPage, getSchemaFromWS, query, setQuery, resultQuery, executeQuery, resetQueryValue, openModalInfo, errorNext, config, uploading } = props;
  var sottocategoria = getCategoria(2,categoria)
  return (
      <div className="mt-5">
        <p className="text-justify"><b>Benvenuto</b> ricordati che a grandi poteri derivano grandi responsabilità</p>     
        <form className="mt-5">
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
                  addTagsFiletagsToForm={addTagsFiletagsToForm}
                  openModalInfo={openModalInfo}
                  config={config}
                  tipofile={tipofile}
                  filePullLoaded={filePullLoaded}
                  handleSubmit={handleSubmit}
                  uploading={uploading}
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
  asyncValidate,
  asyncBlurFields: ['titolo']
})(WizardFormFirstPage);

const selector = formValueSelector('wizard') 
WizardFormFirstPage = connect(state => {
  const categoria = selector(state, 'categoria')
  const tipodataset = selector(state, 'tipodataset')
  const modalitacaricamento = selector(state, 'modalitacaricamento')
  const tempopolling = selector(state, 'tempopolling')
  const nomefile = selector(state, 'nomefile')
  const urlws = selector(state, 'urlws')
  const tipofile = selector(state, 'tipofile')
  return { categoria, tipodataset, modalitacaricamento, tempopolling, nomefile, urlws, tipofile }
})(WizardFormFirstPage)

export default WizardFormFirstPage
