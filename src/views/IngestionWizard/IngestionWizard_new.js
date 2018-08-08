import React, { Component } from 'react';
import { Values } from "redux-form-website-template";
import WizardForm from "../../components/IngestionWizardForm/WizardForm";
import PropTypes from 'prop-types'
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
         <WizardForm onSubmit={showResults}/>
         <Values form="wizard" />
      </div>
    )
  }
}

IngestionForm.propTypes = {
  msg: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  resetForm: PropTypes.func,
  loggedUser: PropTypes.object
}

function mapStateToProps(state) {
  const { loggedUser } = state.userReducer['obj'] || { }
  return { msg: state.userReducer.msg,  loggedUser}
}

export default connect(mapStateToProps)(IngestionForm)