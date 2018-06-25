import { initialStateList } from './initialStates'
import {
  DATA_APPLICATIONS_FETCH_START,
  DATA_APPLICATIONS_FETCH_ACHIEVE,
  DATA_APPLICATIONS_FETCH_MISS
} from '../actions/actions'

export const dataApplicationsReducer = (state = initialStateList, action) => {
  switch (action.type) {
    case DATA_APPLICATIONS_FETCH_START:
      return {
        ...state,
        isFetching: true
      }

    case DATA_APPLICATIONS_FETCH_ACHIEVE:
      return {
        ...state,
        isFetching: false,
        hasFetched: true,
        data: action.payload
      }

    case DATA_APPLICATIONS_FETCH_MISS:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }

    default:
      return state
  }
}