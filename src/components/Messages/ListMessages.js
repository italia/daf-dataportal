import React, { Component } from 'react'
import ReactTable from "react-table"
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
  } from 'react-modal-bootstrap';
import MessageService from '../../views/Messages/services/MessageService';
import { toastr } from 'react-redux-toastr'
  
const messageService = new MessageService()

const buttonStyle = {
    margin: '1px'
}

export default class ListMessages extends Component {
    constructor(props) {
        super(props)

        this.state = {
           jsonPreview: [],
           columns: [
                {
                    Header: "Titolo",
                    accessor: "title"
                },
                {
                    Header: "Messaggio",
                    accessor: "message"
                },
                {
                    Header: "Data",
                    accessor: "date"
                },
                {
                    accessor: "actions",
                    Cell: row => (
                        <div>
                            <button style={buttonStyle} className="btn btn-primary px-2" onClick={() => this.editMethod(row.row)}>Modifica</button>
                            <button style={buttonStyle} className="btn btn-primary px-2" onClick={() => this.deleteMethod(row.row)}>Cancella</button>
                        </div>
                    )
                }
            ],
            isOpen: false,
            isLoading: true,
            title: '',
            message: '',
            date: ''
        }
    };

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

    editMethod = param => {
        console.log("##### editMethod ######");
        this.setState({
            title : param.title,
            message : param.message,
            date : param.date
        })
        this.openModal();
    }

    deleteMethod = param => {
        alert(param)
    }

    handleSubmit(e) {
      let dataToPost = {
        title: this.state.title,
        message: this.state.message,
        date: this.state.date
      }
  
      const response = messageService.saveMessage(dataToPost);

      this.hideModal();

      toastr.success("OK", "OK")
    }

    componentDidMount(){
        messageService
        .listMessages()
        .then(data => this.setState({ jsonPreview : data, isLoading : false }));
    }

    render() {
    return (
        <div>
            <ReactTable 
                data={this.state.jsonPreview}
                columns={this.state.columns}
                loading={this.state.isLoading}
                defaultPageSize={10}
                className="-striped -highlight"
            />
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
