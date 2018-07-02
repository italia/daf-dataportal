import {
  initialList as initialVocList,
  initialDetail as initialVocDetail
} from '../config/initialStates'

export const vocListReducer = (state = initialVocList, action) => {
  switch (action.type) {
    case 'REQUEST_VOC_LIST_PENDING':
      return {
        ...state,
        isFetching: true
      }

    case 'REQUEST_VOC_LIST_FULFILLED':
      return {
        ...state,
        isFetching: false,
        hasFetched: true,
        data: action.payload
      }

    case 'REQUEST_VOC_LIST_REJECTED':
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }

    default:
      return state
  }
}

export const vocDetailReducer = (state = initialVocDetail, action) => {
  switch (action.type) {
    case 'REQUEST_VOC_DETAIL_PENDING':
      return {
        ...state,
        isFetching: true
      }

    case 'REQUEST_VOC_DETAIL_FULFILLED':
      return {
        ...state,
        isFetching: false,
        hasFetched: true,
        data: action.payload
      }

    case 'REQUEST_VOC_DETAIL_REJECTED':
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }

    default:
      return state
  }
}
