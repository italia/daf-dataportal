import React, { Component } from 'react'
import { connect } from 'react-redux'
import { messages } from '../../i18n-ita'

class EditTTL extends Component {

  constructor(props) {
      super(props);
      this.props = props;

      this.handleInputChange = this.handleInputChange.bind(this);

      this.fields = ['Info', 'Success', 'Error', 'System'];

      this.state = {
        validationMSgTTLInfo: null,
        validationMSgTTLSuccess: null,
        validationMSgTTLError: null,
        validationMSgTTLSystem: null
      }
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
          ['validationMSgTTL'+name]: 'Campo obbligatorio'
        });
      }else {
        this.setState({
          ['validationMSgTTL'+name]: null
        });
      }

    }

    componentWillMount(){
      console.log('Init Form');

      this.fields.map( field => {
        if(!this.state[field]){
          this.setState({
            ['validationMSgTTL'+field]: 'Campo obbligatorio'
          });
        }else {
          this.setState({
            ['validationMSgTTL'+field]: null
          });
        }
      });
    }

  handleSave = (e) => {
    
    e.preventDefault();

    if( !this.state.validationMSgTTLInfo       &&
        !this.state.validationMSgTTLSuccess    &&
        !this.state.validationMSgTTLError      &&
        !this.state.validationMSgTTLSystem  ){
          console.log('Salva');
    }else{
          console.log('NO Salva');
    }




//     if(this.title.value){
//       if(!this.org || this.org.value == ''){
//         this.setState({
//           validationMSgOrg: 'Campo obbligatorio'
//         });
//       }else{
//         let layout = { rows: [] };
//         let widgets = {};
//         //save data
//         let request = {
//           title: this.title.value,
//           pvt: this.state.pvt,
//           org: this.state.org,
//           layout: JSON.stringify(layout),
//           widgets: JSON.stringify(widgets),
//           published: 0
//         };
// /*         userStoryService.save(request).then((data)=> {
//             this.props.history.push('/userstory/list/'+ data.message + '/edit');
//         }); */
//         this.props.history.push({
//           'pathname':'/private/userstory/create',
//           'story': request,
//           'modified':true
//         })
//       }
//     }else{
//       this.setState({
//           validationMSg: 'Campo obbligatorio'
//         });
//     }

  }

  render() {
    return (
        <div>
           <div className="form-group">
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">{messages.label.Info}</label>
                  <div className="col-md-8">
                    <input type="text" className="form-control" name="Info" onChange={this.handleInputChange} placeholder={messages.label.Info} />
                    {this.state.validationMSgTTLInfo && <span>{this.state.validationMSgTTLInfo}</span>}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">{messages.label.Success}</label>
                  <div className="col-md-8">
                    <input type="text" className="form-control" name="Success" onChange={this.handleInputChange} placeholder={messages.label.Success} />
                    {this.state.validationMSgTTLSuccess && <span>{this.state.validationMSgTTLSuccess}</span>}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">{messages.label.Error}</label>
                  <div className="col-md-8">
                    <input type="text" className="form-control" name="Error" onChange={this.handleInputChange}  placeholder={messages.label.Error} />
                    {this.state.validationMSgTTLError && <span>{this.state.validationMSgTTLError}</span>}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">{messages.label.System}</label>
                  <div className="col-md-8">
                    <input type="text" className="form-control" name="System" onChange={this.handleInputChange}  placeholder={messages.label.System}/>
                    {this.state.validationMSgTTLSystem && <span>{this.state.validationMSgTTLSystem}</span>}
                  </div>
                </div>
                <div className="form-group row">
                  <button type="button" className="btn btn-primary px-2" onClick={this.handleSave.bind(this)}>
                      <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                        Modifica
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