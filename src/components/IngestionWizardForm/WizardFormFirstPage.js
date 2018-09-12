import React from 'react'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { connect  } from 'react-redux';
import { renderFieldInput, renderFieldTextArea, renderFieldSelect, renderFieldInputButton, renderFieldCheckbox} from './renderField';
import { publicOptions, tipodatasetOptions, modalitacaricamentoOptions, tempoDiPollingOptions, timerUnita } from './const';
import validate from './validate';
import FileInput from './FileInput'


const renderFieldArray = ({fields, setName, onDropFunction, getCategoria, sottocategoria, tipodataset, modalitacaricamento, tempopolling, nomefile, urlws, reset, previousPage, getSchemaFromWS, meta : {touched, error} }) => <div>
            <Field
              name="titolo"
              component={renderFieldInput}
              label="Titolo"
              onChange={setName}
            />
          <Field
              name="nome"
              component={renderFieldInput}
              label="Nome"
              readonly="true"
            />
            <Field
              name="public"
              options={publicOptions}
              component={renderFieldSelect}
              label="Pubblico/OpenData"
            />
            <Field
              name="descrizione"
              component={renderFieldTextArea}
              label="Descrizione"
            />
            <Field
              name="categoria"
              options={getCategoria(1,undefined)}
              component={renderFieldSelect}
              label="Categoria"
            />
            {(sottocategoria && sottocategoria.length>0) &&
                <Field
                  name="sottocategoria"
                  options={sottocategoria}
                  component={renderFieldSelect}
                  label="Sotto categoria"
                />
            }
            <Field
              name="tags"
              component={renderFieldInput}
              label="Tags"
            />
            <Field
              name="tipodataset"
              options={tipodatasetOptions}
              component={renderFieldSelect}
              label="Tipo Dataset"
            />
            <Field
              name="template"
              component={renderFieldInput}
              label="Template"
            />
            {tipodataset=='primitive' &&
              <div>
                <Field
                  name="modalitacaricamento"
                  options={modalitacaricamentoOptions}
                  component={renderFieldSelect}
                  label="Modalità Caricamento"
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
                          />
                          <Field
                            name="tempopolling"
                            options={tempoDiPollingOptions}
                            component={renderFieldSelect}
                            label="Tempo di Polling"
                          />
                          {tempopolling==0 &&
                              <Field
                                name="espressionecron"
                                component={renderFieldInput}
                                label="Espressione"
                            />
                          }
                          {tempopolling==1 &&
                              <div>
                                <Field
                                  name="timerquantita"
                                  component={renderFieldInput}
                                  label="Quantità"
                                />
                                    <Field
                                    name="timerunita"
                                    options={timerUnita}
                                    component={renderFieldSelect}
                                    label="Unità"
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
                            options={tempoDiPollingOptions}
                            component={renderFieldSelect}
                            label="Tempo di Polling"
                          />
                          {tempopolling==0 &&
                              <Field
                                name="espressionecron"
                                component={renderFieldInput}
                                label="Espressione"
                            />
                          }
                          {tempopolling==1 &&
                              <div>
                                <Field
                                  name="timerquantita"
                                  component={renderFieldInput}
                                  label="Quantità"
                                />
                                    <Field
                                    name="timerunita"
                                    options={timerUnita}
                                    component={renderFieldSelect}
                                    label="Unità"
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
                        <Field
                          name="urlws"
                          component={renderFieldInputButton}
                          label="Inserisci URL"
                          buttonLabel="Carica"
                          onClick={getSchemaFromWS.bind(this,fields, urlws)}
                          iconClassName="fa fa-plus"
                          placeholder="http://"
                        />
                      }
                    </div>
                  </div> 
                </div>
              </div>  
              }
              {nomefile&& 
              <div>
                <button type="submit" className="btn btn-primary float-right">Avanti</button>
              </div>
              } 
            </div>
            }
            {tipodataset=='derived_sql' &&
              <div>
                <Field
                name="sqlquery"
                component={renderFieldTextArea}
                label="Query SQL"
                />
                <div>
                  <button type="submit" className="btn btn-primary float-right">Esegui</button>
                </div>
              </div>
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
                  />
                <div>
                  <button type="submit" className="btn btn-primary float-right">Esegui</button>
                </div>
              </div>
            }
</div>



let WizardFormFirstPage = props => {
  const { onDropFunction, handleSubmit, reset, categoria, tipodataset, modalitacaricamento, tempopolling, getCategoria, setName, nomefile, urlws, previousPage, getSchemaFromWS } = props;
  var sottocategoria = getCategoria(2,categoria)
  return (
      <div className="mt-5">
        <p className="text-justify"><b>Benvenuto</b> ricordati che a grandi poteri derivano grandi responsabilità</p>
        <h4> Caricamento SFTP </h4>
        <p className="text-justify">Carica un file di esempio minore di 1MB scegliendo Drag and Drop. Inserisci le informazioni seguendo la procedura guidata. Il file vero e proprio lo dovrai caricare all'indirizzo <b>SFTP</b> che ti abbiamo comunicato </p>
        <h4> Caricamento web service (alpha version)</h4>
        <p>Inserisci l'url dei dati da caricare. Inserisci le informazioni seguendo la procedura guidata. Il caricamento del file parte in automatico a intervalli regolari. Per ulteriori informazioni clicca <a href="http://daf-docs.readthedocs.io/en/latest/datamgmt/index.html" target="_blank">qui</a></p>
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
