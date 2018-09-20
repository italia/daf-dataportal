import { apiURLs, jsonRequest, validationFormRequest } from '../config/apiURLs'

const requestValidatorsListPending = response => ({
  type: 'REQUEST_VALIDATORS_LIST_PENDING'
})
const requestValidatorsListFulfilled = response => ({
  type: 'REQUEST_VALIDATORS_LIST_FULFILLED',
  payload: response
})
const requestValidatorsListRejected = error => ({
  type: 'REQUEST_VALIDATORS_LIST_REJECTED',
  payload: error
})

const requestServerValidationPending = response => ({
  type: 'REQUEST_SERVER_VALIDATION_PENDING'
})
const requestServerValidationFulfilled = response => ({
  type: 'REQUEST_SERVER_VALIDATION_FULFILLED',
  payload: response
})
const requestServerValidationRejected = error => ({
  type: 'REQUEST_SERVER_VALIDATION_REJECTED',
  payload: error
})

export const requestValidatorsList = () => dispatch =>
  new Promise(() => dispatch(requestValidatorsListPending())).then(
    fetch(`${apiURLs.semanticValidator}/validators`, jsonRequest)
      .then(
        response =>
          response.ok
            ? response
                .json()
                .then(data => dispatch(requestValidatorsListFulfilled(data)))
            : dispatch(requestValidatorsListRejected(response.statusText))
      )
      .catch(error => dispatch(requestValidatorsListRejected(error)))
  )

export const requestServerValidation = formData => dispatch =>
  new Promise(() => dispatch(requestServerValidationPending())).then(
    fetch(
      `${apiURLs.semanticValidator}/validate`,
      validationFormRequest(formData)
    )
      .then(
        response =>
          response.ok
            ? response
                .json()
                .then(data => dispatch(requestServerValidationFulfilled(data)))
            : dispatch(requestServerValidationRejected(response.statusText))
      )
      .catch(error => dispatch(requestServerValidationRejected(error)))
  )

