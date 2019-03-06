import React, { Component } from 'react'
import { connect } from 'react-redux'
import { messages } from '../../i18n-ita'

class EditTTL extends Component {

  constructor(props) {
      super(props);
      this.props = props;

      this.state = {
        validationMSgTTLInfo: null,
        validationMSgTTLSuccess: null,
        validationMSgTTLError: null,
        validationMSgTTLSystem: null
      }
  }

  validateTTLSystem = (e) => {
    e.preventDefault()
    if(!this.ttlSystem.value){
      this.setState({
        validationMSgTTLSystem: 'Campo obbligatorio'
      });
    }else{
      this.setState({
        validationMSgTTLSystem: null
      });
    }
  }

  validateTTLInfo = (e) => {
    e.preventDefault()
    if(!this.ttlInfo.value){
      this.setState({
        validationMSgTTLInfo: 'Campo obbligatorio'
      });
    }else{
      this.setState({
        validationMSgTTLInfo: null
      });
    }
  }

  validateTTLSuccess = (e) => {
    e.preventDefault()
    if(!this.ttlSuccess.value){
      this.setState({
        validationMSgTTLSuccess: 'Campo obbligatorio'
      });
    }else{
      this.setState({
        validationMSgTTLSuccess: null
      });
    }
  }

  validateTTLError = (e) => {
    e.preventDefault()
    if(!this.ttlError.value){
      this.setState({
        validationMSgTTLError: 'Campo obbligatorio'
      });
    }else{
      this.setState({
        validationMSgTTLError: null
      });
    }
  }

  handleSave = (e) => {
    e.preventDefault()
    console.log('Salva');
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
                    <input type="text" className="form-control" ref={(ttlInfo) => this.ttlInfo = ttlInfo} onChange={this.validateTTLInfo.bind(this)} id="title" placeholder={messages.label.Info} />
                    {this.state.validationMSgTTLInfo && <span>{this.state.validationMSgTTLInfo}</span>}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">{messages.label.Success}</label>
                  <div className="col-md-8">
                    <input type="text" className="form-control" ref={(ttlSuccess) => this.ttlSuccess = ttlSuccess} onChange={this.validateTTLSuccess.bind(this)} id="title" placeholder={messages.label.Success} />
                    {this.state.validationMSgTTLSuccess && <span>{this.state.validationMSgTTLSuccess}</span>}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">{messages.label.Error}</label>
                  <div className="col-md-8">
                    <input type="text" className="form-control" ref={(ttlError) => this.ttlError = ttlError} onChange={this.validateTTLError.bind(this)} id="title" placeholder={messages.label.Error} />
                    {this.state.validationMSgTTLError && <span>{this.state.validationMSgTTLError}</span>}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">{messages.label.System}</label>
                  <div className="col-md-8">
                    <input type="text" className="form-control" ref={(ttlSystem) => this.ttlSystem = ttlSystem} onChange={this.validateTTLSystem.bind(this)} id="title" placeholder={messages.label.System}/>
                    {this.state.validationMSgTTLSystem && <span>{this.state.validationMSgTTLSystem}</span>}
                  </div>
                </div>
                <div className="form-group row">
                  {/* <div className="col-md-1 form-control"> */}
                      {/* <button className='btn btn-gray-200' onClick={this.hideModal}>
                        Chiudi
                      </button> */}
                      <button type="button" className="btn btn-primary px-2" onClick={this.handleSave.bind(this)}>
                        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                          Modifica
                      </button>
                  {/* </div> */}
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