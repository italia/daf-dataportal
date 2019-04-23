import React, { Component } from 'react'
import ReactTable from "react-table"
import {
    Container, 
    Row, 
    Col, 
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from 'reactstrap';
import MessageService from '../../views/Messages/services/MessageService';
import { toastr } from 'react-redux-toastr'
import { messages } from '../../i18n/i18n-ita'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment';
import { TopBannerPage, EasyTitleContainer } from '../Settings/LayoutCustom';

const messageService = new MessageService()

const buttonStyle = {
  margin: '1px'
}

export default class Messages extends Component { //PADRE
    constructor(props) {
      super(props)
    
      this.state = {
        jsonPreview: [],
        columns: [
             {
                 Header: "Titolo",
                 accessor: "info.title",
                 width: 310,
                 resizable: false
             },
             {
                 Header: "Messaggio",
                 accessor: "info.description",
                 resizable: false
             },
             {
                 Header: "Data fine validità",
                 id: "endDate",
                 accessor: d => {
                   return moment(d.endDate, "YYYY-MM-DD_HH:mm:ss").format("DD/MM/YYYY")
                 },
                 width: 120,
                 resizable: false
             },
             {
               accessor: "offset",
               show: false
             },
             {
                 accessor: "actions",
                 Cell: row => (
                     <div>
                         <button style={buttonStyle} className="btn btn-link" onClick={() => this.editMethod(row.row)}><i className="pointer fas fa-edit text-primary" title="Modifica"/></button>
                         <button style={buttonStyle} className="btn btn-link" onClick={() => this.deleteMethod(row.row)}><i className="pointer fas fa-trash text-primary" title="Cancella"/></button>
                     </div>
                 ),
                 width: 100,
                 resizable: false
             }
         ],
         isLoading : true,
         isOpenClose : false,
         focused: false,
         title       : '',
         description : '',
         endDate     : null,
         offset      : ''
      }

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.onFocusChange = this.onFocusChange.bind(this)
    }

    handleInputChange(event) {
      console.log(event)
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

    saveMessage = () => {
      let dataToPost = {
        title: this.state.title,
        description: this.state.description,
        endDate: moment(this.state.endDate).format('YYYY-MM-DD')+"_23:59:59"
      }
      let that = this;
      const response = messageService.saveMessage(dataToPost);
      response.then(response => response.json())
              .then((json)=> {
                  this.setState({
                    isLoading: true
                  })

                  toastr.success(messages.label.salvataggio, messages.label.salvataggioOK)
                  
                  setTimeout(function(){
                    that.loadData()
                    that.setState({
                        isLoading: false
                     })
                  }, 1000);
                  
              })
              .catch(error => { 
                  console.log('Errore nel salvataggio');  
                  toastr.error(messages.label.errore, error.message);
              });
  
          this.openCloseModal(false);
    }

    saveEditMessage(e) {
      let dataToPost = {
        title       : this.state.title,
        description : this.state.description,
        endDate     : moment(this.state.endDate).format('YYYY-MM-DD')+"_23:59:59",
        offset      : this.state.offset
      }
      
      const responseFromServer = messageService.updateMessage(dataToPost);
      let that = this;
      responseFromServer  .then(response => response.json())
                          .then((json)=> {

        this.setState({
          isLoading: true
        })

        toastr.success(messages.label.editMessage, messages.label.editMessageOK);
        
        setTimeout(function(){
          that.loadData() 
          that.setState({
            isLoading: false
          })
        }, 1000);
        
      })
      .catch(error => { 
        console.log('Errore nella cancellazione');
        toastr.error(messages.label.errore, error.message);
      });
      
      this.openCloseModal(false);
    } 

    editMethod = param => {
      const detailMessage = messageService.detailMessage(param);
      detailMessage .then(response => response.json())
                    .then((json)=> {
                      console.log(json.endDate)
                      this.setState({
                        title       : json.info.title,
                        description : json.info.description,
                        endDate     : moment(json.endDate, "YYYY-MM-DD_HH:mm:ss"),
                        offset      : json.offset
                      })
                      this.openCloseModal(true);
                    })
                    .catch(error => { 
                        console.log('Errore nel recupero dei dati');
                        toastr.error(messages.label.errore, error.message);
                    });
    }

    openCloseModal(isOpen = true) {

      this.setState({
        isOpenClose: isOpen
      });
  };

  newMessage = () => {
    this.setState({
      title       : '',
      description : '',
      endDate     : null,
      offset      : ''
    })
    this.openCloseModal(true);
  }
  
   loadData() {
    console.log("loadData")
      messageService
      .listMessages()
      .then(response => response.json())
      .then((response)=> {
  
        this.setState({ jsonPreview : response, isLoading : false })
      })
      .catch(error => { 
          console.log('Errore nel recupero dei dati');
          toastr.error(messages.label.errore, error.message);
      });
  }

    componentWillMount(){
        this.loadData()
     }

    deleteMethod = param => {
        const responseFromServer = messageService.deleteMessage(param);
        responseFromServer  .then(response => response.json())
                            .then((json)=> {
                              toastr.success(messages.label.deleteMessage, messages.label.deleteMessageOK);
                              this.loadData()
                            })
                            .catch(error => { 
                                console.log('Errore nella cancellazione');
                                toastr.error(messages.label.errore, error.message);
                            });
      }

      onFocusChange({ focused }) {
        this.setState({ focused });
      }

  render() {
    return (
      <Container className="container">
  
      <Row>
        <Col sm={1} />
        <Col sm={10}>
        <TopBannerPage title="Messaggi di Sistema" icon="fa fa-tasks"></TopBannerPage>
        <EasyTitleContainer message={messages.label.systemMessageTitle}></EasyTitleContainer>
        <div className="form-group row">
            <label className="col-sm-2 col-form-label"></label>
            <div className="col-sm-10">
                <button type="button" className="btn btn-link float-right" title="Aggiungi Messaggio" onClick={this.newMessage}>
                    <i className="fa fa-plus-circle fa-lg m-t-2"></i>
                </button>
            </div>
        </div>
        <Modal isOpen={this.state.isOpenClose} toggle={() => this.openCloseModal(false)}>
                <ModalHeader toggle={() => this.openCloseModal(false)}>
                  {messages.label.newMessage}
                </ModalHeader>
                <ModalBody>
                <div className="form-group">
                    <div className="form-group row">
                      <label className="col-md-2 form-control-label">{messages.label.titolo}</label>
                      <div className="col-md-8">
                        <input type="text" className="form-control" name="title" maxLength="50" value={this.state.title} onChange={this.handleInputChange} id="title" placeholder={messages.label.titolo}/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-2 form-control-label">{messages.label.message}</label>
                      <div className="col-md-8">
                        <input type="text" className="form-control"  name="description" maxLength="140" value={this.state.description} onChange={this.handleInputChange} id="description" placeholder={messages.label.message}/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-md-2 form-control-label">{messages.label.dataFineValidita}</label>
                      <div className="col-md-2">                      
                        <SingleDatePicker
                          // name="endDate"
                          focused={this.state.focused}
                          onFocusChange={this.onFocusChange}
                          date={this.state.endDate}
                          onDateChange={this.handleDateChange}
                          placeholder=''
                          isOutsideRange={day => {
                            let tomorrow = moment(new Date()).subtract(1, 'days')
                            return (day.isBefore(tomorrow))
                          }
                          }
                          numberOfMonths={1}
                        />
                      </div>
                    </div>
                </div>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-default' type="button" onClick={() => this.openCloseModal(false)}>
                      {messages.label.chiudi}
                    </button>
                    <button className='btn btn-primary' type="button" onClick={this.state.offset === '' ? this.saveMessage.bind(this) : this.saveEditMessage.bind(this)} >
                      {messages.label.salva}
                    </button>
                </ModalFooter>
            </Modal>
        <ReactTable 
                data={this.state.jsonPreview}
                columns={this.state.columns}
                loading={this.state.isLoading}
                defaultPageSize={10}
                className="-striped -highlight"
        />
        </Col>
          <Col sm={1} />
        </Row>
      </Container>
    )
  }
}
