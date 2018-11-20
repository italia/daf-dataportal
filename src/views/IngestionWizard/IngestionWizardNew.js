import React, { Component } from 'react';
import { Values } from "redux-form-website-template";
import WizardForm from "../../components/IngestionWizardForm/WizardForm";
import MappingStandards from '../../components/IngestionWizardForm/MappingStandards'
import { connect } from 'react-redux'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function showResults(values) {
  await sleep(500); // simulate server latency
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
}

class IngestionForm extends Component {
  constructor(props) {
    super(props);
}
  render() {
    const { loggedUser } = this.props
    return (
      <div className="container">
            <WizardForm onSubmit={showResults} loggedUser={loggedUser}/>
          <Values form="wizard" /> 
{/*                 <MappingStandards fields={new Object([{'nome':'nome1'},{'nome':'nome2'},{'nome':'nome3'},{'nome':'nome4'}])}/>
 */}       </div>
    )
  }
}

function mapStateToProps(state) {
  const { loggedUser } = state.userReducer['obj'] || { }
  return { msg: state.userReducer.msg,  loggedUser}
}

export default connect(mapStateToProps)(IngestionForm)