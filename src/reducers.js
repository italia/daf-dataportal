import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form';
import {
  REQUEST_ALL_DATASTORY,
  RECEIVE_ALL_DATASTORY,
  REQUEST_DATASTORY,
  RECEIVE_DATASTORY,
  REQUEST_DATASETS,
  RECEIVE_DATASETS,
  DELETE_DATASETS,
  REQUEST_DATASET_DETAIL,
  RECEIVE_DATASET_DETAIL,
  RECEIVE_DATASET_ADDITIONAL_DETAIL,
  RECEIVE_DATASET_DETAIL_ERROR,
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  REMOVE_LOGGED_USER,
  RECEIVE_ORGANIZATION,
  RECEIVE_REGISTRATION,
  RECEIVE_REGISTRATION_ERROR,
  RECEIVE_ACTIVATION,
  RECEIVE_ACTIVATION_ERROR,
  RECEIVE_ADD_DATASET,
  RECEIVE_PROPERTIES,
  REQUEST_PROPERTIES,
  RECEIVE_NOTIFICATIONS,
  REQUEST_NOTIFICATIONS,
  RECEIVE_NEW_NOTIFICATIONS,
  REQUEST_NEW_NOTIFICATIONS,
  REQUEST_REGISTRATION,
  RECEIVE_FILE_STORAGEMANAGER,
  REQUEST_RESET,
  RECEIVE_RESET,
  RECEIVE_RESET_ERROR,
  REQUEST_SEARCH,
  RECEIVE_SEARCH,
  RECEIVE_METADATA,
  RESET_QUERY_RESULT,
  REQUEST_QUERY_RESULT,
  RECEIVE_QUERY_RESULT
} from './actions'
import { reducer as toastrReducer } from 'react-redux-toastr'

import {
  dataApplicationsReducer
} from './views/Public/DataApplication/reducers/dataApplicationsReducer'

// semantic's reducers
import {
  ontListReducer,
  ontDetailReducer
} from  './semantics/reducers/ontologiesReducers'
import {
  vocListReducer,
  vocDetailReducer
} from './semantics/reducers/vocabulariesReducers'
import {
  validatorsListReducer,
  serverValidationReducer
} from  './semantics/reducers/validatorReducers'

//Object.assign({}, state, .. create a new copy of the state
function datasets(state = { isFetching: false, didInvalidate: false, items: [], dataset: null, ope: '' }, action
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
        query: action.query,
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
        isAdditionalFetching: true,
        isFeedLoading: true,
        didInvalidate: false,
        items: null,
        query: action.query,
        dataset: action.dataset,
        category_filter: action.category_filter,
        group_filter: action.group_filter,
        organization_filter: action.organization_filter,
        order_filter: action.order_filter,
        lastUpdated: action.receivedAt,
        ope: action.ope
      })
    case RECEIVE_DATASET_ADDITIONAL_DETAIL:
      return Object.assign({}, state, {
        isAdditionalFetching: false,
        isFeedLoading: false,
        dataset: action.dataset,
        feed: action.feed,
        iframes: action.iframes,
        linkedDs: action.linkedDs,
        ope: action.ope
      })
    case REQUEST_UPDATE_DATASET_FEED_INFO:
      return Object.assign({}, state, {
        isFeedLoading: true,
        feed: undefined,
        ope: action.ope
      })
    case UPDATE_DATASET_FEED_INFO:
      return Object.assign({}, state, {
        isFeedLoading: false,
        feed: action.feed,
        ope: action.ope
      })      
    case RECEIVE_DATASET_DETAIL_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: null,
        query: action.query,
        dataset: action.dataset,
        feed: action.feed,
        iframes: action.iframes,
        category_filter: action.category_filter,
        group_filter: action.group_filter,
        organization_filter: action.organization_filter,
        order_filter: action.order_filter,
        lastUpdated: action.receivedAt,
        ope: action.ope
      })
    case RECEIVE_FILE_STORAGEMANAGER:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        json: action.json,
        lastUpdated: action.receivedAt,
        ope: action.ope
      })
    case RECEIVE_METADATA:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        metadata: action.metadata,
        ope: action.ope
      })
    default:
      return state
  }
}

function user(state = { isFetching: false, didInvalidate: false, user }, action
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

function org(state = { isFetching: false, didInvalidate: false, user }, action
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

function propertiesReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_PROPERTIES:
      return Object.assign({}, state, { 'prop': { 'properties': action.properties, 'organization': action.organization, 'error': action.error } })
    default:
      return state
  }
}

function notificationsReducer(state = {}, action) {
  switch (action.type) {
    case REQUEST_NEW_NOTIFICATIONS:
      return Object.assign({}, state, { 'notifications': {'isNewFetching': true, 'newNotifications': undefined}})
    case RECEIVE_NEW_NOTIFICATIONS:
      return Object.assign({}, state, { 'notifications': {'isNewFetching': false, 'newNotifications': action.newNotifications}})
    case REQUEST_NOTIFICATIONS:
      return Object.assign({}, state, { 'notifications': {'isFetching': true, 'notifications': undefined}})
    case RECEIVE_NOTIFICATIONS:
      return Object.assign({}, state, { 'notifications': {'isFetching': false, 'notifications': action.notifications}})
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
    case RECEIVE_DATASET_ADDITIONAL_DETAIL:
    case RECEIVE_DATASET_DETAIL_ERROR:
    case DELETE_DATASETS:
    case RECEIVE_DATASETS:
    case REQUEST_DATASETS:
    case RECEIVE_FILE_STORAGEMANAGER:
    case RECEIVE_METADATA:
      return Object.assign({}, state, {
        'obj': datasets(state[action], action)
      })
    case RECEIVE_ADD_DATASET:
      return Object.assign({}, state, { 'msg': action.message })
    default:
      return state
  }
}

function userReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ACTIVATION_ERROR:
    case RECEIVE_ACTIVATION:
    case RECEIVE_REGISTRATION_ERROR:
    case RECEIVE_REGISTRATION:
      return Object.assign({}, state, { 'msg': action.message, 'error': action.error })
    case REQUEST_REGISTRATION:
      return Object.assign({}, state, { 'msg': undefined, 'error': undefined })
    case RECEIVE_RESET_ERROR:
      return Object.assign({}, state, { 'msg': action.message, 'loading': false,'error': action.error })
    case REQUEST_RESET:
      return Object.assign({}, state, { 'msg': undefined, 'error': undefined, 'loading': true })
    case RECEIVE_RESET:
      return Object.assign({}, state, { 'msg': action.message, 'error': action.error, 'loading': false })
    case REQUEST_LOGIN:
    case RECEIVE_LOGIN:
      return Object.assign({}, state, { 'obj': user(state[action], action) })
    case RECEIVE_ORGANIZATION:
      return Object.assign({}, state, { 'org': org(state[action], action) })
    case REMOVE_LOGGED_USER:
      return Object.assign({}, state, { 'obj': null })
    default:
      return state
  }
}

function datastoryReducer(state = {}, action){
  switch (action.type){
    case REQUEST_ALL_DATASTORY:
      return Object.assign({}, state, {'datastories': { 'list': [], 'isLoading': true }, 'datastory': { 'datastory': undefined}})
    case RECEIVE_ALL_DATASTORY:
      return Object.assign({}, state, {'datastories': { 'list': action.datastoriesList, 'isLoading': false }})
    case REQUEST_DATASTORY:
      return Object.assign({}, state, {'datastory': { 'datastory': undefined, 'isFetching': true }})
    case RECEIVE_DATASTORY:
      return Object.assign({}, state, {'datastory': { 'datastory': action.datastory, 'isFetching': false }})
    default:
      return state
  }
}

function queryReducer(state = {}, action){
  switch(action.type) {
    case RESET_QUERY_RESULT: 
      return Object.assign({}, state, {'query':{ 'queryLoading': false, 'queryResult': action.result, 'query': undefined }})
    case REQUEST_QUERY_RESULT:
      return Object.assign({}, state, {'query': { 'queryLoading': action.queryLoading, 'queryResult': action.result, 'query': action.query }})
    case RECEIVE_QUERY_RESULT:
      return Object.assign({}, state, {'query': { 'queryLoading': action.queryLoading, 'queryResult': action.result, 'query': action.query }})
    default:
      return state
  }
}

function searchReducer(state = {}, action) {
  switch (action.type) {
    case REQUEST_SEARCH:
      return Object.assign({}, state, { 'search': { 'isFetching': true, 'results': undefined } })
    case RECEIVE_SEARCH:
      return Object.assign({}, state, { 'search': { 'isFetching': action.isFetching, 'results': action.results, 'query': action.query, 'filter': action.filter, 'filterInt': action.filterInt } })
    default:
      return state
  }
}

//will mount each reducer with the corresponding key (datasetReducer)
//but you can change it by naming the key differently (form: reduxFormReducer)
const rootReducer = combineReducers({
  form: reduxFormReducer,
  datastoryReducer,
  datasetReducer,
  userReducer,
  searchReducer,
  queryReducer,
  propertiesReducer,
  notificationsReducer,
  toastr: toastrReducer, // <- Mounted at toastr.
  dataApplicationsList: dataApplicationsReducer,
  // semantic's reducers
  ontologiesList: ontListReducer,
  ontologyDetail: ontDetailReducer,
  vocabulariesList: vocListReducer,
  vocabularyDetail: vocDetailReducer,
  validatorsList: validatorsListReducer,
  serverValidation: serverValidationReducer
})

export default rootReducer