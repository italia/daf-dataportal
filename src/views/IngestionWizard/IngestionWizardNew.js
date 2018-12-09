import React, { Component } from 'react';
import { Values } from "redux-form-website-template";
import WizardForm from "../../components/IngestionWizardForm/WizardForm";
import { connect } from 'react-redux'
import { addDataset } from './../../actions.js'
import {createMetacatalog} from '../../helpers/TrasformForm'
import {toastr} from 'react-redux-toastr'

const transformer = values => {
  var metacatalog = {}
  metacatalog = createMetacatalog(values, metacatalog)
  return metacatalog
}

class IngestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = { msg: null,
                   msgErr: null,
                   isOpen: false,
                   saving: false
                  }
    this.showResults = this.showResults.bind(this);
  }

/*   showResults = values =>{
    this.setState({
      saving: true
    })
    setTimeout(() => {
      const transformed = transformer(values)
      console.log(transformed)
      toastr.success('Complimenti', 'Il caricamento dei metadati è avvenuto con successo')
      this.setState({saving: false})
      
    }, 1000);
  } */

  showResults = values =>{
    this.setState({
      saving: true
    })
    const transformed = transformer(values)
    console.log("transformed: " + transformed)
    this.setState({transformed:transformed})
    const { dispatch } = this.props;
    if(localStorage.getItem('token') && localStorage.getItem('token') !== 'null'){
      console.log("tipofile: " + values.tipofile)
      const fileType = values.tipofile?values.tipofile:'csv'
      dispatch(addDataset(transformed, localStorage.getItem('token'), fileType))
      .then(response => {
        if(response.ok){
          console.log('La richiesta di creazione è avvenuta con successo. Riceverai una notifica a creazione completata')
          this.setSending(false, undefined);
          localStorage.removeItem('kyloSchema')
          this.setState({saving: false})
          toastr.success('Complimenti', "La richiesta di creazione è avvenuta con successo. Riceverai una notifica a creazione completata", {timeOut: 20000})
          this.props.history.push('/private/home')
        }else{
          this.setSending(false, 'Errore durante il caricamento del dataset. riprovare più tardi.');
          console.log('Errore durante il caricamento dei metadati')
          this.setState({msg: '', msgErr:'Errore durante il caricamento de dataset'})
          this.setState({saving: false})
        }
      })
      } else {
        this.setSending(false, 'Errore durante il caricamento del dataset. riprovare più tardi.');
        console.log('token non presente');
        this.setState({saving: false})
      }
    }  

  render() {
    const { loggedUser } = this.props
    return (
      <div className="container">
            <WizardForm onSubmit={this.showResults} loggedUser={loggedUser}/>
          <Values form="wizard" /> 
       </div>
    )
  }
}

function mapStateToProps(state) {
  const { loggedUser } = state.userReducer['obj'] || { }
  return { msg: state.userReducer.msg,  loggedUser}
}

export default connect(mapStateToProps)(IngestionForm)