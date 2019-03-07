import React, { Component } from 'react'
import { connect } from 'react-redux'
import { messages } from '../../i18n-ita'

class EditTTL extends Component {

  constructor(props) {
      super(props);
      this.props = props;

      this.handleInputChange = this.handleInputChange.bind(this);
      this.storeTTL = [
              {
                type : 'Info',
                value: 10,
                descrizione: 'Msg Info'
              },
              {
                type : 'Success',
                value: 11,
                descrizione: 'Msg Success'
              },
              {
                type : 'Error',
                value: 12,
                descrizione: 'Msg Error'
              },
              {
                type : 'System',
                value: 13,
                descrizione: 'Msg System'
              }
      ];

      this.labelError = 'validationMSgTTL';
      this.state = {  }
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });

      if(!value){
        this.setState({
          [this.labelError+name]: messages.validazione.campoObbligatorio
        });
      }else {
        this.setState({
          [this.labelError+name]: null
        });
      }

    }

  componentDidMount(){
      console.log('Init Form');

      this.storeTTL.map( field => {
        
        this.setState({
          [field.type]: field.value
        });
       
        if(field.value == 0 || field.value == undefined){
          this.setState({
            [this.labelError+field.type]: messages.validazione.campoObbligatorio
          });
        }else {
          this.setState({
            [this.labelError+field.type]: null
          });
        }
      });
  }

  handleSave = (e) => {
    
      e.preventDefault();

      let countError =  this.storeTTL.length;
      this.storeTTL.map( field => {
        if(!this.state[this.labelError+field.type] || this.state[this.labelError+field.type] == null ){
          countError--;
        }
      });

      if( countError === 0 ){
            console.log('Salva');
      }else{
            console.log('NO Salva');
      }
  }

  render() {
    return (
        <div>
           <div className="form-group">
                {
                  this.storeTTL.map( (field, index ) => {
                      return (
                        <div key={index} className="form-group row">
                            <label className="col-md-2 form-control-label">{messages.label[field.type]}</label>
                            <div className="col-md-8">
                              <input type="text" className="form-control" name="Info" onChange={this.handleInputChange} placeholder={messages.label[field.type]} value={this.state[field.type]} />
                              {this.state[this.labelError+field.type] && <span>{this.state[this.labelError+field.type]}</span>}
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