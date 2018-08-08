import React from 'react'
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { connect  } from 'react-redux';
import { renderFieldInput, renderFieldTextArea, renderFieldSelect} from './renderField';
import { publicOptions, tipodatasetOptions, modalitacaricamentoOptions } from './const';
import validate from './validate';
import FileInput from './FileInput'


const renderFieldArray = ({fields, name, onDropFunction, getCategoria, sottocategoria, tipodataset, modalitacaricamento, meta : {touched, error} }) => <div>
  <Field
              name="nome"
              type="text"
              component={renderFieldInput}
              label="Nome"
            />
            <Field
              name="public"
              type="text"
              options={publicOptions}
              component={renderFieldSelect}
              label="Pubblico/OpenData"
            />
            <Field
              name="descrizione"
              type="text"
              component={renderFieldTextArea}
              label="Descrizione"
            />
            <Field
              name="categoria"
              type="text"
              options={getCategoria(1,undefined)}
              component={renderFieldSelect}
              label="Categoria"
            />
            {(sottocategoria && sottocategoria.length>0) &&
                <Field
                  name="sottocategoria"
                  type="text"
                  options={sottocategoria}
                  component={renderFieldSelect}
                  label="Sotto categoria"
                />
            }
            <Field
              name="tags"
              type="text"
              component={renderFieldInput}
              label="Tags"
            />
            <Field
              name="tipodataset"
              type="text"
              options={tipodatasetOptions}
              component={renderFieldSelect}
              label="Tipo Dataset"
            />
            <Field
              name="template"
              type="text"
              component={renderFieldInput}
              label="Template"
            />
            {tipodataset &&
              <Field
                name="modalitacaricamento"
                type="text"
                options={modalitacaricamentoOptions}
                component={renderFieldSelect}
                label="Modalità Caricamento"
              />
            }
            {(modalitacaricamento === 'sftp') && 
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
                </FileInput>}
</div>



let WizardFormFirstPage = props => {
  const { onDropFunction, handleSubmit, categoria, tipodataset, modalitacaricamento, getCategoria } = props;
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
  return { categoria, tipodataset, modalitacaricamento }
})(WizardFormFirstPage)

export default WizardFormFirstPage
