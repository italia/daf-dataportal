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
import { messages } from '../../i18n-ita'

import DatePicker from 'react-datepicker';
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
  
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
                    accessor: "info.title"
                },
                {
                    Header: "Messaggio",
                    accessor: "info.description"
                },
                {
                    Header: "Data",
                    id: "endDate",
                    accessor: d => {
                      return moment(d.endDate, "YYYY-MM-DD_HH:mm:ss").format("DD/MM/YYYY")
                    }
                },
                {
                  accessor: "offset",
                  show: false
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
            isOpen    : false,
            isLoading : true,
            title     : '',
            message   : '',
            endDate   : moment(),
            offset    : ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
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
      const detailMessage = messageService.detailMessage(param);
      detailMessage .then(response => response.json())
                    .then((json)=> {
                      console.log(json.endDate)
                      this.setState({
                        title   : json.info.title,
                        message : json.info.description,
                        endDate : moment(json.endDate, "YYYY-MM-DD_HH:mm:ss")
                      })
                      this.openModal();
                    })
                    .catch(error => { 
                        console.log('Errore nel recupero dei dati');
                        toastr.error(messages.label.errore, error.message);
                    });
    }

    deleteMethod = param => {
      const responseFromServer = messageService.deleteMessage(param);
      responseFromServer  .then(response => response.json())
                          .then((json)=> {
                            toastr.success(messages.label.deleteMessage, messages.label.deleteMessageOK);
                          })
                          .catch(error => { 
                              console.log('Errore nella cancellazione');
                              toastr.error(messages.label.errore, error.message);
                          });
    }

    saveEditMessage(e) {
      let dataToPost = {
        title   : this.state.title,
        message : this.state.message,
        endDate : moment(this.state.endDate).format('YYYY-MM-DD')+"_00:00:00",
        offset  : this.state.offset
    }

      const responseFromServer = messageService.updateMessage(dataToPost);

      responseFromServer  .then(response => response.json())
                          .then((json)=> {
                            toastr.success(messages.label.editMessage, messages.label.editMessageOK);
                          })
                          .catch(error => { 
                              console.log('Errore nella cancellazione');
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

    handleDateChange(dateInput) {
      this.setState({
        endDate: dateInput
      });
    }

    componentDidMount(){
        messageService
        .listMessages()
        .then(response => response.json())
        .then((json)=> {

          this.setState({ jsonPreview : json, isLoading : false })
        })
        .catch(error => { 
            console.log('Errore nel recupero dei dati');
            toastr.error(messages.label.errore, error.message);
        });
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
                    <ModalTitle>{messages.label.editMessage}</ModalTitle>
                    <ModalClose onClick={this.hideModal}/>
                </ModalHeader>
                <ModalBody>
                <div className="form-group">
                    <div className="form-group row">
                      <label className="col-md-2 form-control-label">{messages.label.titolo}</label>
                      <div className="col-md-8">
                        <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleInputChange} id="title" placeholder="Titolo"/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-2 form-control-label">{messages.label.message}</label>
                      <div className="col-md-8">
                        <input type="text" className="form-control"  name="message" value={this.state.message} onChange={this.handleInputChange} id="message" placeholder="Messaggio"/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-2 form-control-label">{messages.label.data}</label>
                      <div className="col-md-2">
                        {/* <input type="text" className="form-control"  name="endDate" value={this.state.endDate} onChange={this.handleInputChange} id="endDate" placeholder="Data"/> */}
                      
                        <DatePicker
                            name="endDate"
                            selected={this.state.endDate}
                            onChange={this.handleDateChange}
                        />
                      </div>
                    </div>
                </div>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-default' type="button" onClick={this.hideModal}>
                      {messages.label.chiudi}
                    </button>
                    <button className='btn btn-primary' type="button" onClick={this.saveEditMessage.bind(this)} >
                      {messages.label.salva}
                    </button>
                </ModalFooter>
              </form>
            </Modal>
       </div>
    );
  }
}
