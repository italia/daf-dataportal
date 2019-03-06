import React, { Component } from 'react'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

export default class AddMessage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
   }

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

  handleSubmit(e) {
    alert('A name was submitted: ' + this.title.value);
  }

  onTitleChange(e, value){
    this.setState({
      title: value
    });
  }

  onMessageChange(e, value){
    this.setState({
      message: value
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Aggiungi</button>

        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
        <form>
                <ModalHeader>
                    <ModalClose onClick={this.hideModal}/>
                    <ModalTitle></ModalTitle>
                </ModalHeader>
                <ModalBody>
                <div className="form-group">
                    <div className="form-group row">
                      <label className="col-md-2 form-control-label">Titolo</label>
                      <div className="col-md-8">
                        <input type="text" className="form-control" ref={(title) => this.title = title} onChange={(e) => this.onTitleChange(e, e.target.value)} id="title" placeholder="Titolo"/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-2 form-control-label">Messaggio</label>
                      <div className="col-md-8">
                        <input type="text" className="form-control" ref={(message) => this.message = message} onChange={(e) => this.onMessageChange(e, e.target.value)} id="message" placeholder="Messaggio"/>
                      </div>
                    </div>
                </div>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-default' onClick={this.hideModal}>
                      Chiudi
                    </button>
                    <button className='btn btn-primary' type="button" onClick={this.handleSubmit.bind(this)} >
                      Salva
                    </button>
                </ModalFooter>
              </form>
          </Modal>
      </div>
    )
  }
}
