import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  requestValidatorsList,
  requestServerValidation
} from '../actions/validatorActions'
import {
  initialList,
  initialDetail as initialValidation
} from '../config/initialStates'
import ValidatorForm from '../components/ValidatorForm'

const mapStateToProps = state => ({
  validatorsList: state.validatorsList || initialList,
  serverValidation: state.serverValidation || initialValidation
})

const mapDispatchToProps = dispatch => ({
  fetchValidatorsList: () => dispatch(requestValidatorsList()),
  fetchValidationStatus: valuesToParse =>
    dispatch(requestServerValidation(valuesToParse))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ValidatorForm)
)
