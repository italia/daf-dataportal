import React from 'react';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import validate from './validate';
import { connect  } from 'react-redux';
import { ingestionFormOptions } from './const';
import { renderFieldInput, renderFieldTextArea, renderFieldSelect, renderTipi, renderFieldTags, renderContesti, renderFieldCheckbox} from './renderField';
import Collapse from 'rc-collapse'
import 'rc-collapse/assets/index.css'

var Panel = Collapse.Panel;

let WizardFormThirdPage = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit} className="col-12 mt-5">
          <FieldArray
              name="inferred"
              component={renderFieldArray}
              previousPage={previousPage}
        />
    </form> 
  );
};

const renderFieldArray = ({fields, previousPage, meta : {touched, error} }) => 
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
              />
              <Field
                name="licenza"
                options={ingestionFormOptions.licenza}
                component={renderFieldSelect}
                label="Licenza"
              />
              <Field
                name="organizzazionetitolare"
                options={ingestionFormOptions.organizzazionetitolare}
                component={renderFieldSelect}                
                label="Organizzazione Titolare"
              />
              <Field
                name="ultimamodifica"
                component={renderFieldInput}
                label="Ultima Modifica"
              />
              <Field
                name="frequenzaaggiornamento"
                options={ingestionFormOptions.frequenzaaggiornamento}
                component={renderFieldSelect}                
                label="Frequenza Aggiornamento"
              />
              <Field
                name="note"
                component={renderFieldTextArea}
                label="Note"
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
                options={ingestionFormOptions.gruppoproprietario}
                component={renderFieldSelect}
                label="Gruppo Proprietario"
              />
              <Field
                name="gruppiaccesso"
                options={ingestionFormOptions.gruppiaccesso}
                component={renderFieldSelect}
                label="Gruppi Accesso"
              />
              <Field
                name="datasetstd"
                options={ingestionFormOptions.datasetstd}
                component={renderFieldCheckbox}                
                label="Dataset standard"
              />
              <Field
                name="seguestd"
                component={renderFieldCheckbox}
                label="Segue uno Standard"
              />
              <Collapse accordion={true}>
                <Panel header="Informazioni Ingestion" headerClass="my-header-class">
                  <Field
                      name="sftp"
                      component={renderFieldInput}
                      label="SFTP"
                      readonly="readonly"
                    />
                  <Field
                      name="servicepull"
                      component={renderFieldInput}
                      label="Service Pull"
                      readonly="readonly"
                    />
                  <Field
                      name="servicepush"
                      component={renderFieldInput}
                      label="Service Push"
                      readonly="readonly"
                    />
                    <Field
                      name="dafdata"
                      component={renderFieldInput}
                      label="DAF Data"
                      readonly="readonly"
                    />
                </Panel>
                <Panel header="Informazioni Memorizzazione">
                  <Field
                      name="hdfs"
                      component={renderFieldInput}
                      label="HDFS"
                    />
                  <Field
                      name="kudu"
                      component={renderFieldInput}
                      label="Kudu"
                    />
                  <Field
                      name="hbase"
                      component={renderFieldInput}
                      label="HBase"
                    />
                  <Field
                      name="elastic"
                      component={renderFieldInput}
                      label="ELASTIC"
                    />
                  <Field
                      name="mongodb"
                      component={renderFieldInput}
                      label="MongoDB"
                    />
                </Panel>
                <Panel header="Informazioni Procedurali">
                  <Field
                    name="tiposalvataggio"
                    options={ingestionFormOptions.tiposalvataggio}
                    component={renderFieldSelect}
                    label="Tipo Salvataggio e Lettura"
                  />
                  <Field
                    name="tipoingestiondati"
                    options={ingestionFormOptions.tipoingestiondati}
                    component={renderFieldSelect}
                    label="Tipo Ingestion Dati"
                  />
                  <Field
                    name="strategiamerge"
                    options={ingestionFormOptions.strategiamerge}
                    component={renderFieldSelect}
                    label="Strategia di Merge"
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
