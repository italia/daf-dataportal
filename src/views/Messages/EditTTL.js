import React, { Component } from 'react'
import { connect } from 'react-redux'

import { toastr } from 'react-redux-toastr'

import { messages } from '../../i18n-ita'
import MessageService from "./services/MessageService";

const messageService = new MessageService()

class EditTTL extends Component {

  constructor(props) {
      super(props);
      this.props = props;

      this.handleInputChange = this.handleInputChange.bind(this);

      this.labelError = 'validationMSgTTL';
      this.state = { 
                      storeTTL: [ ],
                      Info:0,
                      Success:0,
                      Error:0,
                      System:0
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

  componentDidMount(){
      console.log('Init Form');
      this.load ();
  }

  load = () => {
    console.log('Load Data');
    let response = messageService.messageTTL();
        response.then(response => response.json())
         .then((json)=> {
            console.log('data response:', json);
            
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
        });
  }

  handleSave = (e) => {
     
      e.preventDefault();

      let countError =  this.state.storeTTL.length;
      this.state.storeTTL.map( field => {
        if(!this.state[this.labelError+field.name] || this.state[this.labelError+field.name] == null ){
          countError--;
        }
      });

      if( countError === 0 ){
            console.log('Salvataggio');
            //Aggiorno obj per gestire il salvataggio
            const objUpdate ={
              "infoType": this.state["infoType"],
              "successType": this.state["successType"],
              "errorType": this.state["errorType"]
            };
            
            const response = messageService.updateMessageTTL( objUpdate );
                  response.then(response => response.json())
                          .then((json)=> {
                              toastr.success(messages.label.salvataggio, messages.label.salvataggioOK)
                          })
                          .catch(error => { 
                              console.log('Errore nel salvataggio');  
                              toastr.error(messages.label.errore, error.message);
                          });
      }else{
            console.log('NO Salva');
            toastr.error(messages.label.errore, messages.label.salvataggioKO)
      }
  }

  render() {
    return (
        <div>
           <div className="form-group">
                {
                  this.state.storeTTL.map( (field, index ) => {
                      return (
                        <div key={index} className="form-group row">
                            <label className="col-md-2 form-control-label">{messages.label[field.name]}</label>
                            <div className="col-md-8">
                              <input type="text" className="form-control" name={messages.label[field.name]} onChange={this.handleInputChange} placeholder={messages.label[field.name]} value={this.state[field.name]} />
                              {this.state[this.labelError+field.name] && <span>{this.state[this.labelError+field.name]}</span>}
                            </div>
                        </div>    
                      )
                  })
                } 
               
                <div className="form-group row">
                  <button type="button" className="btn btn-primary px-2" onClick={this.handleSave.bind(this)}>
                      <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                        {messages.label.modifica}
                    </button>
                </div>
             </div>   
        </div>
    )
  }
}

function mapStateToProps(state) {
    const loggedUser = state.userReducer['obj'].loggedUser || { }
    const properties = state.propertiesReducer ? state.propertiesReducer['prop'] || {} : {} 
    return { loggedUser, properties }
}

export default connect(mapStateToProps)(EditTTL)

