import React, { Component } from 'react';
import {createMetacatalog} from '../../helpers/TrasformFormToDcat.js'
import WizardForm from '../../components/IngestionWizard/WizardForm'
import { addDataset, addDatasetKylo } from './../../actions.js'
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
import {toastr} from 'react-redux-toastr'


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
                   isOpen: false,
                   saving: false
                  }
    this.showResults = this.showResults.bind(this);
}

openModal(){
  this.setState({
    isOpen: true
  });
};

setSending = (valueSending, valueError) => {
  this.setState({
    sending: valueSending
  });
}

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

    showResults = values =>{
    const transformed = transformer(values)
    console.log(transformed)
    toastr.success('Complimenti', 'Il caricamento dei metadati è avvenuto con successo')
  }  

    /* showResults = values =>{
      this.setState({
        saving: true
      })
      const transformed = transformer(values)
      console.log("transformed: " + transformed)
      this.setState({transformed:transformed})
      const { dispatch } = this.props;
      if(localStorage.getItem('token') && localStorage.getItem('token') !== 'null'){
        console.log("values: " + values.filetype)
        const fileType = values.filetype?values.filetype:'csv'
        dispatch(addDataset(transformed, localStorage.getItem('token'), fileType))
        .then(response => {
          if(response.ok){
            console.log('Caricamento metadati avvenuto con successo')
            dispatch(addDatasetKylo(transformed, localStorage.getItem('token'), fileType))
            .then((response) => {
              if(response.ok){
                this.setSending(false, undefined);
                localStorage.removeItem('kyloSchema')
                this.setState({saving: false})
                this.props.history.push('/dataset/' + transformed.dcatapit.name)
              }else{
                this.setSending(false, 'Errore durante il caricamento del dataset. riprovare più tardi.');
                console.log('Errore durante il caricamento su kylo')
                this.setState({msg: '', msgErr:'Errore durante il caricamento de dataset'})
                this.setState({saving: false})
              }
            })
            .catch((error) => {
              this.setSending(false, 'Errore durante il caricamento del dataset. riprovare più tardi.');
              this.setState({msg: '', msgErr:'Errore durante il caricamento de dataset'})
              this.setState({saving: false})
            })
            console.log('invio effettuato');
          }else{
            this.setSending(false, 'Errore durante il caricamento del dataset. riprovare più tardi.');
            console.log('Errore durante il caricamento dei metadati')
            this.setState({msg: '', msgErr:'Errore durante il caricamento de dataset'})
            this.setState({saving: false})
          }
        })
        } else {
          this.setSending(false, 'Errore durante il caricamento del dataset. riprovare più tardi.');
          console.log('token non presente');
          this.setState({saving: false})
        }
      } */


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
           
          {this.state.transformed && this.state.transformed.operational.input_src.sftp && <div>
            <p>Il dataset è stato creato con successo.</p>
            <p>Per caricare i dati collegati all'indirizzo sftp: <strong>daf.teamdigitale.governo.it</strong> al percorso: <strong>/home/{loggedUser.uid}/{this.state.transformed.operational.theme}/{this.state.transformed.operational.subtheme}/{this.state.transformed.dcatapit.alternate_identifier}</strong></p>
          </div>}

          {this.state.transformed && this.state.transformed.operational.input_src.srv_pull && <div>
            <p>Il dataset all'indirizzo <strong>{this.state.transformed.operational.input_src.srv_pull[0].url}</strong> è stato creato con successo.</p>
            <p>A breve verrà caricato nel sistema.</p> 
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
         <WizardForm onSubmit={this.showResults} saving={this.state.saving}/>
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

