import React from 'react';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import validate from './validate';
import { connect  } from 'react-redux';
import DatePicker from './DatePicker'
import Sorgenti from './Sorgenti'
import Storage from './Storage'
import Pipelines from './Pipelines'
import MappingStandards from './MappingStandards'
import { renderFieldInput, renderFieldTextArea, renderFieldSelect, renderOrganization, renderStd, renderFieldLicenze} from './renderField';
import Collapse from 'rc-collapse'
require('rc-collapse/assets/index.css')

var Panel = Collapse.Panel;

let WizardFormThirdPage = props => {
  const { fields, handleSubmit, previousPage, organizations, datasetStdList, datasetstd, seguestd, config, licenze, listaStorage, addStorageToForm, deleteStorageToForm, addGruppiToForm, modificaDataDCATAPIT, openModalInfo, deleteGruppiToForm, listaGruppi, listaSorgenti, listaPipelines, addSorgenteToForm, deleteSorgenteToForm, addPipelineToForm, deletePipelineToForm } = props;
  return (
    <form onSubmit={handleSubmit} className="col-12 mt-5">
          <FieldArray
              name="inferred"
              component={renderFieldArray}
              previousPage={previousPage}
              organizations={organizations}
              addGruppiToForm={addGruppiToForm}
              deleteGruppiToForm={deleteGruppiToForm}
              listaGruppi={listaGruppi}
              listaSorgenti={listaSorgenti}
              listaPipelines={listaPipelines}
              addSorgenteToForm={addSorgenteToForm}
              deleteSorgenteToForm={deleteSorgenteToForm}
              addPipelineToForm={addPipelineToForm}
              deletePipelineToForm={deletePipelineToForm}
              openModalInfo={openModalInfo}
              modificaDataDCATAPIT={modificaDataDCATAPIT}
              config={config}
              licenze={licenze}
              listaStorage={listaStorage} 
              addStorageToForm={addStorageToForm} 
              deleteStorageToForm={deleteStorageToForm}
              seguestd={seguestd}
              datasetStdList={datasetStdList}
              datasetstd={datasetstd}
              fields={fields}
        />
    </form> 
  );
};



const renderFieldArray = ({fields, previousPage, organizations, datasetstd, listaStorage, datasetStdList, seguestd, addStorageToForm, deleteStorageToForm, licenze, modificaDataDCATAPIT, config, openModalInfo, addGruppiToForm, deleteGruppiToForm, listaGruppi, listaSorgenti, listaPipelines, addSorgenteToForm, deleteSorgenteToForm, addPipelineToForm, deletePipelineToForm, meta : {touched, error} }) => 
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Informazioni DCAT-AP_IT</h5>
            <div>
              <Field
                name="categoria"
                component={renderFieldInput}
                label="Tema"
                openModalInfo={openModalInfo}
                config={config}
                readonly="true"
                />
              <Field
                name="licenza"
                options={licenze}
                component={renderFieldLicenze}
                label="Licenza"
                openModalInfo={openModalInfo}
                config={config}
              />
              <Field
                name="gruppoproprietario"
                type="text"
                component={renderOrganization}
                label="Gruppo Proprietario"
                organizations={organizations}
                openModalInfo={openModalInfo}
                config={config}

              />
              <Field
                component={DatePicker} 
                label="Ultima Modifica" 
                name="ultimamodifica" 
                modificaDataDCATAPIT={modificaDataDCATAPIT}
                config={config}
              />
              <Field
                name="frequenzaaggiornamento"
                options={config.frequenzaaggiornamento}
                component={renderFieldSelect}                
                label="Frequenza Aggiornamento"
                openModalInfo={openModalInfo}
                config={config}

              />
              {/* <Field
                name="descrizione"
                component={renderFieldTextArea}
                label="Note"
                openModalInfo={openModalInfo}
                config={config}

              /> */}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Informazioni Operative</h5>
            <div>
              {/* <Field
                name="gruppoproprietario"
                type="text"
                component={renderOrganization}
                label="Gruppo Proprietario"
                organizations={organizations}
                openModalInfo={openModalInfo}
                config={config}

              /> */}
              <Field
                name="isvocabulary"
                options={config['vocabulary']}
                component={renderFieldSelect}
                label="Vocabolario Controllato"
                openModalInfo={openModalInfo}
                config={config}
              />
              {/* <Field
                name="seguestd"
                options={config['standard']}
                component={renderFieldSelect}
                label="Standard"
                openModalInfo={openModalInfo}
                config={config}
              />
              {seguestd=='seguestandard' &&
                      <Field
                        name="datasetstd"
                        options={datasetStdList}
                        component={renderStd}
                        label="Dataset Standard"
                        openModalInfo={openModalInfo}
                        config={config}
                      />
              }
              {seguestd=='seguestandard' && datasetstd &&
                <MappingStandards fields={fields} datasetStdList={datasetStdList} datasetstd={datasetstd}/>
              
              } */}
              {/* <Collapse accordion={true} defaultActiveKey="2">
                <Panel header="Informazioni Ingestion" headerClass="my-header-class">
                  <Sorgenti 
                    listaSorgenti={listaSorgenti} 
                    addSorgenteToForm={addSorgenteToForm} 
                    deleteSorgenteToForm={deleteSorgenteToForm}
                    config={config}
                    />
                  <Pipelines 
                    listaPipelines={listaPipelines} 
                    addPipelineToForm={addPipelineToForm} 
                    deletePipelineToForm={deletePipelineToForm}
                    config={config}
                    />                
                </Panel>
                <Panel header="Informazioni Memorizzazione">
                  <Storage
                    listaStorage={listaStorage} 
                    addStorageToForm={addStorageToForm} 
                    deleteStorageToForm={deleteStorageToForm}
                    config={config}
                    />
                </Panel>
                <Panel header="Informazioni Procedurali"> */}
                  <Field
                    name="tiposalvataggio"
                    options={config['dafvoc-ingform-operational-dataset_proc-read_type']}
                    component={renderFieldSelect}
                    label="Tipo Salvataggio e Lettura"
                    openModalInfo={openModalInfo}
                    config={config}

                  />
                  <Field
                    name="tipoingestiondati"
                    options={config['dafvoc-ingform-operational-dataset_proc-dataset_type']}
                    component={renderFieldSelect}
                    label="Tipo Ingestion Dati"
                    openModalInfo={openModalInfo}
                    config={config}

                  />
                  <Field
                    name="strategiamerge"
                    options={config.strategiamerge}
                    component={renderFieldSelect}
                    label="Strategia di Caricamento"
                    openModalInfo={openModalInfo}
                    config={config}
                  />
                {/* </Panel>
              </Collapse> */}
            </div>
          </div>
        </div>
        <div>
          <button type="button" className="btn btn-primary float-left" onClick={previousPage}>Indietro</button>
          <button type="submit" className="btn btn-primary float-right">Invia</button>
        </div>
</div>

WizardFormThirdPage = reduxForm({
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
})(WizardFormThirdPage);

const selector = formValueSelector('wizard') 
WizardFormThirdPage = connect(state => {
  const tema = selector(state, 'tema')
  const seguestd = selector(state, 'seguestd')
  const datasetstd = selector(state, 'datasetstd')
  const fields = selector(state, 'inferred')
  return { tema, seguestd, datasetstd, fields }
})(WizardFormThirdPage)

export default WizardFormThirdPage
