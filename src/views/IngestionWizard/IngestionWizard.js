import React, { Component } from 'react';
import {createMetacatalog} from '../../helpers/TrasformFormToDcat.js'
import WizardForm from '../../components/IngestionWizard/WizardForm'
import { addDataset } from './../../actions.js'
import {reset} from 'redux-form';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap'

const transformer = values => {
  var metacatalog = {}
  metacatalog = createMetacatalog(values, metacatalog)
  return metacatalog
}

class IngestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = { msg: null,
                   msgErr: null,
                   isOpen: false 
                  }
    this.showResults = this.showResults.bind(this);
}

openModal(){
  this.setState({
    isOpen: true
  });
};

hideModalAndRedirect = (e) => {
  const { dispatch } = this.props;
  e.preventDefault();
  this.setState({
    isOpen: false,
    transformed: undefined
  });
  dispatch(reset('wizard'))
  this.props.history.push('/home')
};

//showResults = values =>{
//  const transformed = transformer(values)
//  console.log(transformed)
//  console.log(values)
//}

 showResults = values =>{
  const transformed = transformer(values)
  console.log("transformed: " + transformed)
  this.setState({transformed:transformed})
  const { dispatch } = this.props;
  if(localStorage.getItem('token') && localStorage.getItem('token') !== 'null'){
  dispatch(addDataset(transformed, localStorage.getItem('token')))
    .then(() => {
      dispatch(this.openModal())
      localStorage.removeItem('kyloSchema')
    })
    .catch((error) => {
      this.setState({msg: '', msgErr:'Errore durante il caricamento de dataset'})
    })
    console.log('invio effettuato');
  } else {
    console.log('token non presente');
  }
} 

  render() {
    const { loggedUser } = this.props
    return (
      <div>
      <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
      <form>
        <ModalHeader>
          <ModalTitle>Operazione effettuata con successo.</ModalTitle>
        </ModalHeader>
        <ModalBody>
        <div className="form-group">
          <p>Il dataset è stato creato con successo.</p> 
          {this.state.transformed && <div>
            <p>Per caricare i dati collegati all'indirizzo sftp: <strong>daf.teamdigitale.governo.it</strong> al percorso: <strong>/home/{loggedUser.sn}/{this.state.transformed.operational.theme}/{this.state.transformed.operational.subtheme}/{this.state.transformed.dcatapit.alternate_identifier}</strong></p>
            
           {/*  <p>Di seguito il riepilogo dei metadati:</p>
            <div className="card">
              <h4 className="card-header">Dataschema</h4>
              <div className="card-block">
              <div>
                {this.state.transformed.dataschema.flatSchema.map((field, key) => 
                  <p className="card-text" key={key}><b>Nome Campo: </b>{field.name}, <b>Tipo: </b>{field.type}, <b>Concetto Semantico: </b>{field.metadata.semantics.id}, <b>Descrizione: </b> {field.metadata.desc}, <b>Tags: </b>{field.metadata.tag}, <b>Obbligatorio: </b>{field.metadata.required}, <b>Tipo Colonna: </b>{field.metadata.field_type} </p>
                )}
              </div>
              </div>
            </div>
            <div className="card">
              <h4 className="card-header">DCAT-AP_IT</h4>
              <div className="card-block">
                {this.state.transformed.dcatapit && 
                <div>
                  <p className="card-text"><b>Titolo: </b>{this.state.transformed.dcatapit.alternate_identifier}</p>
                  <p className="card-text"><b>Nome: </b>{this.state.transformed.dcatapit.name}</p>
                  <p className="card-text"><b>Descrizione: </b>{this.state.transformed.dcatapit.notes}</p>
                  <p className="card-text"><b>Categoria: </b>{this.state.transformed.dcatapit.theme}</p>
                  <p className="card-text"><b>Licenza: </b>{this.state.transformed.dcatapit.license_title}</p>
                  <p className="card-text"><b>Organizzazione: </b>{this.state.transformed.dcatapit.owner_org}</p>
                </div>
                }
              </div>
            </div>
            <div className="card">
              <h4 className="card-header">OPERATIONAL</h4>
              <div className="card-block">
                {this.state.transformed.operational && 
                <div>
                  <p className="card-text"><b>Definisce uno standard? </b>{this.state.transformed.operational.std_schema}</p>
                  <p className="card-text"><b>Segue uno standard? </b>{this.state.transformed.operational.is_std?"Si":"No"}</p>
                  <p className="card-text"><b>Dominio: </b>{this.state.transformed.operational.theme}</p>
                  <p className="card-text"><b>Sottodominio: </b>{this.state.transformed.operational.subtheme}</p>
                  <p className="card-text"><b>Tipo Lettura del dataset: </b>{this.state.transformed.operational.read_type}</p>
                  <p className="card-text"><b>Tipo Dataset: </b>{this.state.transformed.operational.dataset_type}</p>
                </div>
                }
              </div>
            </div> */}
          </div>}
        </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-default' onClick={this.hideModalAndRedirect}>Vai alla home</button>
        </ModalFooter>
      </form>
      </Modal>
      <div className="animated fadeIn">
        {this.state.msgErr &&
            <div className="alert alert-danger" role="alert">
              {this.state.msgErr} 
            </div>
        }
        {this.state.msg &&
            <div className="alert alert-success" role="alert">
              {this.state.msg} 
            </div>
        }
         <WizardForm onSubmit={this.showResults.bind(this)} />
      </div>
    </div>
    )
  }
}

IngestionForm.propTypes = {
  msg: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  resetForm: PropTypes.func,
  loggedUser: PropTypes.object
}

function mapStateToProps(state) {
  const { loggedUser } = state.userReducer['obj'] || { }
  return { msg: state.userReducer.msg,  loggedUser}
}

export default connect(mapStateToProps)(IngestionForm)

