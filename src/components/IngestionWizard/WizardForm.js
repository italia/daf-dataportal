import React, { Component } from 'react'
import WizardFormFirstPage from './WizardFormFirstPage'
import WizardOperational from './WizardOperational'
import WizardFormMetadata from './WizardFormMetadata'
import {getJsonDataschema} from './inputform_reader.js'
import { connect } from 'react-redux'
import licenze from '../../data/licenze'
import themes from '../../data/themes'
import { getEditorAdminOrganizations } from '../../utility'

import Steps, { Step } from 'rc-steps';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

import 'rc-steps/assets/index.css'
import 'rc-steps/assets/iconfont.css'

const steps = [{'title': 'Carica file e descrivi le colonne'},{'title': 'Aggiungi i Metadati'},{'title': 'Modalità di invio'}]

class WizardForm extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.nextPage2 = this.nextPage2.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.setUploading = this.setUploading.bind(this)
    this.state = {
      page: 0,
      dataschema : {},
      isOpen: false,
      uploading: false,
      tipi: new Object(),
      errorUpload: undefined
    }
  }

  setTipi = (value) => {
    this.setState({
      tipi: value
    });
  }

  setUploading = (valueUploading, valueError) => {
    this.setState({
      uploading: valueUploading,
      errorUpload: valueError
    });
  }

  openModal = () => {
    this.setState({
      isOpen: true
    });
  };
  
  hideModal = () => {
    this.setState({
      isOpen: false
    });
  };

  nextPage() {
    this.setState({ page: this.state.page + 1
    })
  }

   nextPage2() {
    const dataschema = getJsonDataschema()
    this.setState({ page: this.state.page + 1,
       dataschema: dataschema
    })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

/*   getLicenze(liv,notation){
    var appo = [];
    licenze.map((lic, index) => {
      if(lic.rank==liv){
        if(notation){
          if(lic.notation.startsWith(notation))
            appo.push(lic);
        } else appo.push(lic);
      }
   })
   return appo;
  } */

  getDomain(liv,domain){
    var appo = [];
    themes.map((theme, index) => {
      if(liv==1){
        appo.push({key: theme.theme_code, value: theme.theme_daf_ita});
      }else{
        if(theme.theme_code==domain){
          if(theme.subthemes && theme.subthemes.length>0){
            theme.subthemes.map((subtheme) => {
              appo.push({key: subtheme.subtheme_daf_code, value: subtheme.subtheme_daf_ita});
            })
          }
        }
      }
   })
   return appo;
  }

  render() {
    const { onSubmit, loggedUser, saving } = this.props
    const { page } = this.state
    return (
      <div>
        <Steps current={page}>
          {steps.map((s, i) => {
            return (
              <Step
                key={i}
                title={s.title}
              />)
            }
          )}
        </Steps>
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-block">

                {page === 0 &&
                <WizardFormMetadata
                      onSubmit={this.nextPage}
                      setUploading={this.setUploading}
                      uploading={this.state.uploading}
                      errorUpload={this.state.errorUpload}
                      setTipi={this.setTipi}
                      tipi={this.state.tipi}/>}
                {page ===1 &&  <WizardFormFirstPage
                      previousPage={this.previousPage}
                      onSubmit={this.nextPage}
                      organizations={getEditorAdminOrganizations(loggedUser)}
                      licenze={licenze}
                      openModal={this.openModal}
                  />}
                {page === 2 &&
                    <WizardOperational
                      previousPage={this.previousPage}
                      onSubmit={onSubmit}
                      getDomain={this.getDomain}
                      saving={saving}
                    />}
              </div>
            </div>
        </div>
      </div>
      {/*<Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
          <form>
            <ModalHeader>
              <ModalClose onClick={this.hideModal}/>
              <ModalTitle>Titolo</ModalTitle>
            </ModalHeader>
            <ModalBody>
            <p>Il titolo deve essere univoco nel DAF. </p>
            <p>Il valore di defaul sar il nome del file.</p>
            <p>Un servizio controllera l'univocita del titolo.</p>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-default' onClick={this.hideModal}>
                Chiudi
              </button>
            </ModalFooter>
          </form>
                </Modal>*/}
        

          <Modal
            contentLabel="Add a widget"
            className="Modal__Bootstrap modal-dialog modal-80"
            isOpen={this.state.isOpen}>
            <ModalHeader>
            <ModalClose onClick={this.hideModal}/>
            <ModalTitle>Titolo</ModalTitle>
          </ModalHeader>
          <ModalBody>
          <p>Il titolo deve essere univoco nel DAF. </p>
          <p>Il valore di default sarà il nome del file.</p>
          <p>Un servizio controllerà l'univocita del titolo.</p>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-gray-200' onClick={this.hideModal}>
              Chiudi
            </button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
    const organizations = state.userReducer['org'] ? state.userReducer['org'].organizations : [];
    const loggedUser = state.userReducer['obj'].loggedUser || { } 
    return { loggedUser, organizations }
}

export default connect(mapStateToProps)(WizardForm)
