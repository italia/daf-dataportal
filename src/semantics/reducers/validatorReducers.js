import {
  initialList,
  initialDetail as initialValidation
} from '../config/initialStates'

export const validatorsListReducer = (state = initialList, action) => {
  switch (action.type) {
    case 'REQUEST_VALIDATORS_LIST_PENDING':
      return {
        ...state,
        isFetching: true
      }

    case 'REQUEST_VALIDATORS_LIST_FULFILLED':
      return {
        ...state,
        isFetching: false,
        hasFetched: true,
        data: action.payload
      }

    case 'REQUEST_VALIDATORS_LIST_REJECTED':
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }

    default:
      return state
  }
}

export const serverValidationReducer = (state = initialValidation, action) => {
  switch (action.type) {
    case 'REQUEST_SERVER_VALIDATION_PENDING':
      return {
        ...state,
        isFetching: true,
        hasFetched: false
      }

    case 'REQUEST_SERVER_VALIDATION_FULFILLED':
      return {
        ...state,
        isFetching: false,
        hasFetched: true,
        data: action.payload
      }

    case 'REQUEST_SERVER_VALIDATION_REJECTED':
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }

    default:
      return state
  }
}
