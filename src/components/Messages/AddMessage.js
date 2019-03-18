import React, { Component } from 'react'
import { toastr } from 'react-redux-toastr'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import MessageService from '../../views/Messages/services/MessageService';
import { messages } from '../../i18n-ita'

const messageService = new MessageService()

export default class AddMessage extends Component {
  constructor() {
    super()
    this.state = {
      isOpen: false,
      title: '',
      message: '',
      date: ''
   }

   this.handleInputChange = this.handleInputChange.bind(this);
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

  saveMessage(e) {
    let dataToPost = {
      title: this.state.title,
      description: this.state.message,
      endDate: this.state.date
    }

    const response = messageService.saveMessage(dataToPost);
    response.then(response => response.json())
            .then((json)=> {
                toastr.success(messages.label.salvataggio, messages.label.salvataggioOK)
            })
            .catch(error => { 
                console.log('Errore nel salvataggio');  
                toastr.error(messages.label.errore, error.message);
            });

    this.hideModal();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <div className="form-group row">
        <label className="col-sm-2 col-form-label"></label>
            <div className="col-sm-10">
                <button type="button" className="btn btn-link float-right" title="Aggiungi Messaggio" onClick={this.openModal}>
                    <i className="fa fa-plus-circle fa-lg m-t-2"></i>
                </button>
            </div>
        </div>
        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
        <form>
                <ModalHeader>
                    <ModalTitle>{messages.label.newMessage}</ModalTitle>
                    <ModalClose onClick={this.hideModal}/>
                </ModalHeader>
                <ModalBody>
                <div className="form-group">
                    <div className="form-group row">
                      <label className="col-md-2 form-control-label">{messages.label.titolo}</label>
                      <div className="col-md-8">
                        <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleInputChange} id="title" placeholder={messages.label.titolo}/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-2 form-control-label">{messages.label.message}</label>
                      <div className="col-md-8">
                        <input type="text" className="form-control"  name="message" value={this.state.message} onChange={this.handleInputChange} id="message" placeholder={messages.label.message}/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-2 form-control-label">{messages.label.data}</label>
                      <div className="col-md-2">
                        <input type="text" className="form-control"  name="date" value={this.state.date} onChange={this.handleInputChange} id="date" placeholder={messages.label.data}/>
                      </div>
                    </div>
                </div>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-default' type="button" onClick={this.hideModal}>
                      {messages.label.chiudi}
                    </button>
                    <button className='btn btn-primary' type="button" onClick={this.saveMessage.bind(this)} >
                      {messages.label.salva}
                    </button>
                </ModalFooter>
              </form>
          </Modal>
      </div>
    )
  }
}
