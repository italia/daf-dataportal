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

  handleSubmit(e) {
    alert('A name was submitted: ' + this.state.title);

    
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
                    <ModalClose onClick={this.hideModal}/>
                    <ModalTitle></ModalTitle>
                </ModalHeader>
                <ModalBody>
                <div className="form-group">
                    <div className="form-group row">
                      <label className="col-md-2 form-control-label">Titolo</label>
                      <div className="col-md-8">
                        <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleInputChange} id="title" placeholder="Titolo"/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-2 form-control-label">Messaggio</label>
                      <div className="col-md-8">
                        <input type="text" className="form-control"  name="message" value={this.state.message} onChange={this.handleInputChange} id="message" placeholder="Messaggio"/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-2 form-control-label">Data</label>
                      <div className="col-md-2">
                        <input type="text" className="form-control"  name="date" value={this.state.date} onChange={this.handleInputChange} id="date" placeholder="Data"/>
                      </div>
                    </div>
                </div>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-default' type="button" onClick={this.hideModal}>
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
