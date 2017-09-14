import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form';
import {
  REQUEST_DATASETS,
  RECEIVE_DATASETS,
  DELETE_DATASETS,
  SELECT_DATASET,
  REQUEST_DATASET_DETAIL,
  RECEIVE_DATASET_DETAIL,
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  REMOVE_LOGGED_USER,
  RECEIVE_ORGANIZATION,
  RECEIVE_REGISTRATION,
  RECEIVE_ACTIVATION,
  RECEIVE_ACTIVATION_ERROR
} from './actions'

//Object.assign({}, state, .. create a new copy of the state
function datasets( state = { isFetching: false, didInvalidate: false, items: [], dataset: null, ope:'' }, action
) {
  switch (action.type) {
    case REQUEST_DATASETS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_DATASETS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.datasets,
        dataset: null,
        lastUpdated: action.receivedAt,
        ope: action.ope
      })
    case REQUEST_DATASET_DETAIL:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_DATASET_DETAIL:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: null,
        dataset: action.dataset,
        lastUpdated: action.receivedAt,
        ope: action.ope
      })
    default:
      return state
  }
}

function user( state = { isFetching: false, didInvalidate: false, user }, action
) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        loggedUser: action.user,
        authed: true
      })
    default:
      return state
  }
}

function org( state = { isFetching: false, didInvalidate: false, user }, action
) {
  switch (action.type) {
    case RECEIVE_ORGANIZATION:
      return Object.assign({}, state, {
        organizations: action.org
      })
    default:
      return state
  }
}

//The reducer is just an action that take two parameter state and action
//The reducer that handle the action will make a copy of the state,
//modify it with the data from the action and then  returns the new state
function datasetReducer(state = {}, action) {
  switch (action.type) {
    case REQUEST_DATASET_DETAIL:
    case RECEIVE_DATASET_DETAIL:
    case DELETE_DATASETS:
    case RECEIVE_DATASETS:
    case REQUEST_DATASETS:
      return Object.assign({}, state, {'obj': datasets(state[action], action)
      })
    default:
      return state
  }
}

function userReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ACTIVATION_ERROR:
    case RECEIVE_ACTIVATION:
    case RECEIVE_REGISTRATION:
      return Object.assign({}, state, {'msg': action.message, 'error': action.error})
    case REQUEST_LOGIN:
    case RECEIVE_LOGIN:
      return Object.assign({}, state, {'obj': user(state[action], action)})
    case RECEIVE_ORGANIZATION:
      return Object.assign({}, state, {'org': org(state[action], action)})
    case REMOVE_LOGGED_USER:
      return Object.assign({}, state, {'obj': null })
    default:
      return state
  }
}

//will mount each reducer with the corresponding key (datasetReducer)
//but you can change it by naming the key differently (form: reduxFormReducer)
const rootReducer = combineReducers({
  form: reduxFormReducer,
  datasetReducer,
  userReducer
})

export default rootReducer