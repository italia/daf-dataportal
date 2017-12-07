import React, { Component } from 'react'
import PropTypes from 'prop-types'
import WizardFormFirstPage from './WizardFormFirstPage'
import WizardFormSecondPage from './WizardFormSecondPage'
import WizardFormThirdPage from './WizardFormThirdPage'
import WizardOperational from './WizardOperational'
import WizardFormMetadata from './WizardFormMetadata'
import {getJsonDataschema} from './inputform_reader.js'
import { change } from 'redux-form';
import { connect } from 'react-redux'
import licenze from '../../data/licenze'
import themes from '../../data/themes'

import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

class WizardForm extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.nextPage2 = this.nextPage2.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.setUploading = this.setUploading.bind(this)
    this.state = {
      page: 1,
      dataschema : {},
      isOpen: false,
      uploading: false,
      tipi: new Object()
    }
  }

  setTipi = (value) => {
    this.setState({
      tipi: value
    });
  }

  setUploading = (value) => {
    this.setState({
      uploading: value
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

  getLicenze(liv,notation){
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
  }

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
    const { onSubmit, organizations } = this.props
    const { page } = this.state
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                {page === 1 &&
                <div><strong> Passo 1:</strong> Carica file e descrivi le colonne</div> 
                }
                {page === 2 &&
                <div><strong> Passo 2:</strong> Metadati </div> 
                }
              {page === 3 &&
                <div><strong> Passo 3: </strong> Modalitá di invio</div> 
                }
              </div>
              <div className="card-block">

                {page === 1 &&
                <WizardFormMetadata
                      onSubmit={this.nextPage}
                      setUploading={this.setUploading}
                      uploading={this.state.uploading}
                      setTipi={this.setTipi}
                      tipi={this.state.tipi}/>}
                {page ===2 &&  <WizardFormFirstPage
                      previousPage={this.previousPage}
                      onSubmit={this.nextPage}
                      organizations={organizations}
                      licenze={licenze}
                      openModal={this.openModal}
                  />}
                {page === 3 &&
                    <WizardOperational
                      previousPage={this.previousPage}
                      onSubmit={onSubmit}
                      getDomain={this.getDomain}
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
          <p>Il valore di defaul sar il nome del file.</p>
          <p>Un servizio controllera l'univocita del titolo.</p>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-default' onClick={this.hideModal}>
              Chiudi
            </button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loggedUser: PropTypes.object,
  organizations: PropTypes.array
}

function mapStateToProps(state) {
    const organizations = state.userReducer['org'] ? state.userReducer['org'].organizations : [];
    const loggedUser = state.userReducer['obj'].loggedUser || { } 
    return { loggedUser, organizations }
}

export default connect(mapStateToProps)(WizardForm)
