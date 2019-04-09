import React, { Component } from 'react'
import { connect } from 'react-redux'

import { toastr } from 'react-redux-toastr'

import { messages } from '../../i18n/i18n-ita'
import MessageService from "./services/MessageService";
import { ButtonClass, StyleColor, TopBannerPage, EasyTitleContainer } from '../Settings/LayoutCustom';
import { Container, Card, Row, Col } from 'reactstrap';

const messageService = new MessageService()

class EditTTL extends Component {

  constructor(props) {
      super(props);
      this.props = props;

      this.handleInputChange    = this.handleInputChange.bind(this);
      // this.handleSave           = this.handleSave.bind(this);
      this.handleSaveByOne      = this.handleSaveByOne.bind(this);
      this.handleCancellByOne   = this.handleCancellByOne.bind(this);
      this.isInputVisible = 'isInputVisible';
      this.labelError = 'validationMSgTTL';
      this.state = { 
                      storeTTL: [ ],
                      infoType:0,
                      successType:0,
                      errorType:0,
                      isInputVisibleinfoType:false,
                      isInputVisiblesuccessType:false,
                      isInputVisibleerrorType:false
       }
    }

    handleInputChange(event) {
      const target  = event.target;
      const value   = target.type === 'checkbox' ? target.checked : target.value;
      const name    = target.name;
  
      this.setState({
        [name]: value
      });

      if(!value){
        this.setState({
          [this.labelError+name]: messages.validazione.campoObbligatorio
        });
      }else if (!/^[0-9]+$/.test(value)) {
        this.setState({
          [this.labelError+name]: messages.validazione.soloNumeri
        });
      }else {
        this.setState({
          [this.labelError+name]: null
        });
      }
    }

  componentWillMount(){
      console.log('Init Form');
      this.load ();
  }

  load = () => {
    console.log('Load Data');
    let response = messageService.messageTTL();
        response.then(response => response.json())
         .then((json)=> {

          this.setState({
              storeTTL: json
            });

            this.state.storeTTL.map( field => {
        
              this.setState({
                [field.name]: field.value
              });
             
              if(field.value == 0 || field.value == undefined){
                this.setState({
                  [this.labelError+field.name]: messages.validazione.campoObbligatorio
                });
              }else {
                this.setState({
                  [this.labelError+field.name]: null
                });
              }
            });
        })
        .catch(error => { 
            console.log('Errore nel caricamento della lista');  
            toastr.error(messages.label.errore, error.message);
        })
        ;
  }

  // handleSave = (e) => {
     
  //     e.preventDefault();

  //     let countError =  this.state.storeTTL.length;
  //     this.state.storeTTL.map( field => {
  //       if(!this.state[this.labelError+field.name] || this.state[this.labelError+field.name] == null ){
  //         countError--;
  //       }
  //     });

  //     if( countError === 0 ){
  //           console.log('Salvataggio');
  //           //Aggiorno obj per gestire il salvataggio
  //           const objUpdate ={
  //             "infoType": this.state["infoType"],
  //             "successType": this.state["successType"],
  //             "errorType": this.state["errorType"]
  //           };
            
  //           const response = messageService.updateMessageTTL( objUpdate );
  //                 response.then(response => response.json())
  //                         .then((response)=> {
  //                             toastr.success(messages.label.salvataggio, messages.label.salvataggioOK)
  //                         })
  //                         .catch(error => { 
  //                             console.log('Errore nel salvataggio');  
  //                             toastr.error(messages.label.errore, error.message);
  //                         });
  //     }else{
  //           console.log('NO Salva');
  //           toastr.error(messages.label.errore, messages.label.salvataggioKO)
  //     }
  // }

  handleSaveByOne = ( name ) => {
  
    let countError =  1;
    if(!this.state[this.labelError+name] || this.state[this.labelError+name] == null ){
        countError--;
    }

    if( countError === 0 ){
          console.log('Salvataggio');
          //Aggiorno obj per gestire il salvataggio
          const objUpdate =[
                              {
                                  "name": name,
                                  "value": parseInt(this.state[name])
                              }
                          ];
          const response = messageService.updateMessageTTL( objUpdate );
                response.then(response => response.json())
                        .then((json)=> {                          
                            toastr.success(messages.label.salvataggio, messages.label.salvataggioOK)
                            this.load ();
                            this.setState({
                              [this.isInputVisible+name]:false
                            });
                        })
                        .catch(error => { 
                            console.log('Errore nel salvataggio: ',error);  
                            toastr.error(messages.label.errore, error.message);
                        });
    }else{
          console.log('NO Salva');
          toastr.error(messages.label.errore, messages.label.salvataggioKO)
    }
}

handleCancellByOne = ( name ) => {
  
        console.log('Annulla');
        const restore = this.state.storeTTL.filter( (obj) => { return obj.name==name  } );
        this.setState({
          [name]: restore[0].value,
          [this.labelError+name]: null,
          [this.isInputVisible+name]:false
        });
}

  render() {
    return (
      <Container className="container">
          <TopBannerPage
                    title={messages.menu.gestioneTTL}
                    icon={
                      ButtonClass.CLOCK.description
                    }
            />
            <EasyTitleContainer message={ messages.label.editTTLDescFunction }  />
            <Card body>
              
            </Card>




        <div className="card">
          <div className="card-block">
          {/* <div class="row m-0">
            <div class="col-5"><label for="example-search-input">{messages.menu.gestioneTTL}</label></div>
          </div> */}
            <div className="form-group">
                  {
                    this.state.storeTTL.map( (field, index ) => {
                        return (
                          <div key={index} className="form-group row">
                              <label className="col-md-2 form-control-label">{messages.label[field.name]}</label>
                              <div className="col-md-8">
                                <div className="form-group row">
                                  {!this.state[this.isInputVisible + field.name] ? 
                                          <label  className="form-control-label" 
                                                  style={{  cursor:'pointer', 
                                                            'border-bottom': '1px dotted' }} 
                                                  onClick={()=>{  
                                                                  this.setState({ [this.isInputVisible + field.name] :true })
                                                                }
                                                          }>
                                                      {this.state[field.name]}
                                          </label>
                                  :
                                  [
                                          <div className="col-md-8">
                                            <input  type        = "text" 
                                                    className   = "form-control" 
                                                    name        = { field.name  } 
                                                    onChange    = { this.handleInputChange      } 
                                                    placeholder = { messages.label[field.name]  } 
                                                    value       = { this.state[field.name]  } 
                                                    />
                                          </div>,
                                          <div className="col-md-2">
                                              <button type="button" 
                                                      className="btn btn-link" 
                                                      title={messages.label.salva} 
                                                      onClick={() => this.handleSaveByOne(field.name)} >
                                                <i className="fas fa-save fa-lg m-t-2"></i>
                                              </button>  
                                              <button type="button" 
                                                      className="btn btn-link" 
                                                      title={messages.label.annulla}  
                                                      onClick={() => this.handleCancellByOne(field.name)} >
                                                <i className="fas fa-ban fa-lg m-t-2"></i>
                                              </button>  
                                          </div>
                                      ]  
                                }
                                </div>          
                                { this.state[this.labelError+field.name] && 
                                   <div className="ml-5 w-100">
                                        <div className="alert alert-danger" role="alert">
                                            <i className="fa fa-times-circle fa-lg m-t-2"></i>{this.state[this.labelError+field.name]}
                                        </div>
                                    </div>}
                              </div>
                          </div>    
                        )
                    })
                  } 
                  {/* <div className="form-group row">
                    <button type="button" className="btn btn-primary px-2" onClick={this.handleSave.bind(this)}>
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                          {messages.label.modifica}
                      </button>
                  </div> */}
              </div> 
          </div>      
        </div>
      </Container>
    )
  }
}

function mapStateToProps(state) {
    const loggedUser = state.userReducer['obj'].loggedUser || { }
    const properties = state.propertiesReducer ? state.propertiesReducer['prop'] || {} : {} 
    return { loggedUser, properties }
}

export default connect(mapStateToProps)(EditTTL)


