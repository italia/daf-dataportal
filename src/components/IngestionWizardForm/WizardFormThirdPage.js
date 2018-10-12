import React from 'react';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import validate from './validate';
import { connect  } from 'react-redux';
import { ingestionFormOptions } from './const';
import Gruppi from './Gruppi'
import Sorgenti from './Sorgenti'
import Pipelines from './Pipelines'
import { renderFieldInput, renderFieldTextArea, renderFieldSelect, renderOrganization, renderFieldCheckbox} from './renderField';
import Collapse from 'rc-collapse'
import 'rc-collapse/assets/index.css'

var Panel = Collapse.Panel;

let WizardFormThirdPage = props => {
  const { handleSubmit, previousPage, organizations, addGruppiToForm, openModalInfo, deleteGruppiToForm, listaGruppi, listaSorgenti, listaPipelines, addSorgenteToForm, deleteSorgenteToForm, addPipelineToForm, deletePipelineToForm } = props;
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
        />
    </form> 
  );
};

const renderFieldArray = ({fields, previousPage, organizations, openModalInfo, addGruppiToForm, deleteGruppiToForm, listaGruppi, listaSorgenti, listaPipelines, addSorgenteToForm, deleteSorgenteToForm, addPipelineToForm, deletePipelineToForm, meta : {touched, error} }) => 
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Informazioni DCATAP</h5>
            <div>
              <Field
                name="tema"
                options={ingestionFormOptions.tema}
                component={renderFieldSelect}
                label="Tema"
                openModalInfo={openModalInfo}

              />
              <Field
                name="licenza"
                options={ingestionFormOptions.licenza}
                component={renderFieldSelect}
                label="Licenza"
                openModalInfo={openModalInfo}

              />
              <Field
                name="ownership"
                type="text"
                component={renderOrganization}
                label="Organizzazione"
                organizations={organizations}
                openModalInfo={openModalInfo}

              />
              <Field
                name="ultimamodifica"
                component={renderFieldInput}
                label="Ultima Modifica"
                openModalInfo={openModalInfo}

              />
              <Field
                name="frequenzaaggiornamento"
                options={ingestionFormOptions.frequenzaaggiornamento}
                component={renderFieldSelect}                
                label="Frequenza Aggiornamento"
                openModalInfo={openModalInfo}

              />
              <Field
                name="note"
                component={renderFieldTextArea}
                label="Note"
                openModalInfo={openModalInfo}

              />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Informazioni Operative</h5>
            <div>
              <Field
                name="gruppoproprietario"
                type="text"
                component={renderOrganization}
                label="Gruppo Proprietario"
                organizations={organizations}
                openModalInfo={openModalInfo}

              />
              <Gruppi
                addGruppiToForm={addGruppiToForm} 
                deleteGruppiToForm={deleteGruppiToForm}
                listaGruppi={listaGruppi}
                openModalInfo={openModalInfo}

              />
              <Field
                name="datasetstd"
                options={ingestionFormOptions.datasetstd}
                component={renderFieldCheckbox}                
                label="Dataset standard"
                openModalInfo={openModalInfo}

              />
              <Field
                name="seguestd"
                component={renderFieldCheckbox}
                label="Segue uno Standard"
                openModalInfo={openModalInfo}

              />
              <Collapse accordion={true}>
                <Panel header="Informazioni Ingestion" headerClass="my-header-class">
                  <Sorgenti listaSorgenti={listaSorgenti} addSorgenteToForm={addSorgenteToForm} deleteSorgenteToForm={deleteSorgenteToForm}/>
                  <Pipelines listaPipelines={listaPipelines} addPipelineToForm={addPipelineToForm} deletePipelineToForm={deletePipelineToForm}/>                
                </Panel>
                <Panel header="Informazioni Memorizzazione">
                  <Field
                      name="hdfs"
                      component={renderFieldInput}
                      label="HDFS"
                      openModalInfo={openModalInfo}

                    />
                  <Field
                      name="kudu"
                      component={renderFieldInput}
                      label="Kudu"
                      openModalInfo={openModalInfo}

                    />
                  <Field
                      name="hbase"
                      component={renderFieldInput}
                      label="HBase"
                      openModalInfo={openModalInfo}

                    />
                  <Field
                      name="elastic"
                      component={renderFieldInput}
                      label="ELASTIC"
                      openModalInfo={openModalInfo}

                    />
                  <Field
                      name="mongodb"
                      component={renderFieldInput}
                      label="MongoDB"
                      openModalInfo={openModalInfo}

                    />
                </Panel>
                <Panel header="Informazioni Procedurali">
                  <Field
                    name="tiposalvataggio"
                    options={ingestionFormOptions.tiposalvataggio}
                    component={renderFieldSelect}
                    label="Tipo Salvataggio e Lettura"
                    openModalInfo={openModalInfo}

                  />
                  <Field
                    name="tipoingestiondati"
                    options={ingestionFormOptions.tipoingestiondati}
                    component={renderFieldSelect}
                    label="Tipo Ingestion Dati"
                    openModalInfo={openModalInfo}

                  />
                  <Field
                    name="strategiamerge"
                    options={ingestionFormOptions.strategiamerge}
                    component={renderFieldSelect}
                    label="Strategia di Merge"
                    openModalInfo={openModalInfo}

                  />
                </Panel>
              </Collapse>
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
  return { tema }
})(WizardFormThirdPage)

export default WizardFormThirdPage
