import {
  initialList as initialOntList,
  initialDetail as initialOntDetail
} from '../config/initialStates'

export const ontListReducer = (state = initialOntList, action) => {
  switch (action.type) {
    case 'REQUEST_ONT_LIST_PENDING':
      return {
        ...state,
        isFetching: true
      }

    case 'REQUEST_ONT_LIST_FULFILLED':
      return {
        ...state,
        isFetching: false,
        hasFetched: true,
        data: action.payload
      }

    case 'REQUEST_ONT_LIST_REJECTED':
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }

    default:
      return state
  }
}

export const ontDetailReducer = (state = initialOntDetail, action) => {
  switch (action.type) {
    case 'REQUEST_ONT_DETAIL_PENDING':
      return {
        ...state,
        isFetching: true
      }

    case 'REQUEST_ONT_DETAIL_FULFILLED':
      return {
        ...state,
        isFetching: false,
        hasFetched: true,
        data: action.payload
      }

    case 'REQUEST_ONT_DETAIL_REJECTED':
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }

    default:
      return state
  }
}
