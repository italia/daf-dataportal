import fetch from 'isomorphic-fetch'
import page from './data/dataset'
import det from './data/datasetdetail'
import { serviceurl } from './config/serviceurl.js'

export const REQUEST_DATASETS = 'REQUEST_DATASETS'
export const RECEIVE_DATASETS = 'RECEIVE_DATASETS'
export const DELETE_DATASETS = 'DELETE_DATASETS'
export const SELECT_DATASET = 'SELECT_DATASET'
export const REQUEST_DATASET_DETAIL = 'REQUEST_DATASET_DETAIL'
export const RECEIVE_DATASET_DETAIL = 'RECEIVE_DATASET_DETAIL'
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export const REMOVE_LOGGED_USER = 'REMOVE_LOGGED_USER'
export const RECEIVE_ORGANIZATION = 'RECEIVE_ORGANIZATION'
export const RECEIVE_REGISTRATION = 'RECEIVE_REGISTRATION'
export const RECEIVE_REGISTRATION_ERROR = 'RECEIVE_REGISTRATION_ERROR'
export const RECEIVE_ACTIVATION = 'RECEIVE_ACTIVATION'
export const RECEIVE_ACTIVATION_ERROR = 'RECEIVE_ACTIVATION_ERROR'
export const RECEIVE_ADD_DATASET = 'RECEIVE_ADD_DATASET'

function requestDatasets() {
  return {
    type: REQUEST_DATASETS
  }
}

function requestDatasetDetail(selectDataset) {
  return {
    type: REQUEST_DATASET_DETAIL
  }
}

function requestLogin() {
  return {
    type: REQUEST_LOGIN
  }
}

function receiveDataset(json) {
  console.log('receiveDataset');
  //This function creates an action that a reducer can handle 
  //Action are payload of information that sends data from the application to the store
  //Store doesn't have any other way to get data
  //Action are not responsible for update the state (only reducers) !!! 
  return {
      type: RECEIVE_DATASETS,
      datasets: json,
      receivedAt: Date.now(),
      ope: 'RECEIVE_DATASETS'
  }
}

function receiveDatasetDetail(json) {
  return {
      type: RECEIVE_DATASET_DETAIL,
      dataset: json,
      receivedAt: Date.now(),
      ope: 'RECEIVE_DATASET_DETAIL'
  }
}

function receiveAddDataset(response) { 
  return {
      type: RECEIVE_ADD_DATASET,
      user: response,
      receivedAt: Date.now(),
      ope: 'RECEIVE_ADD_DATASET'
  }
}

function removeLoggedUser() {
  console.log('removeLoggedUser');
  return {
      type: REMOVE_LOGGED_USER,
      receivedAt: Date.now(),
      ope: 'REMOVE_LOGGED_USER'
  }
}

function receiveLogin(response) { 
  return {
      type: RECEIVE_LOGIN,
      user: response,
      receivedAt: Date.now(),
      ope: 'RECEIVE_LOGIN'
  }
}

function receiveOrganization(response) {  
  return {
      type: RECEIVE_ORGANIZATION,
      org: response,
      receivedAt: Date.now(),
      ope: 'RECEIVE_ORGANIZATION'
  }
}

function receiveActivationSuccess(response) {  
  if(response.ok)
  return {
      type: RECEIVE_ACTIVATION,
      message: 'Attivazione avvenuta con successo !!!',
      error: 0,
      receivedAt: Date.now(),
      ope: 'RECEIVE_ACTIVATION'
  }
  else
  return {
      type: RECEIVE_ACTIVATION_ERROR,
      error: 1,
      message: 'Errore durante l\'attivazione riprovare più tardi',
      receivedAt: Date.now(),
      ope: 'RECEIVE_ACTIVATION_ERROR'
  }
}

function receiveActivationError(json) {  
  return {
      type: RECEIVE_ACTIVATION_ERROR,
      error: 1,
      message: 'Errore durante l\'attivazione riprovare più tardi',
      receivedAt: Date.now(),
      ope: 'RECEIVE_ACTIVATION_ERROR'
  }
}

function receiveRegistrationSuccess(response) {  
  if(response.ok)
  return {
      type: RECEIVE_REGISTRATION,
      message: 'Registrazione avvenuta con successo !!!',
      error: 0,
      receivedAt: Date.now(),
      ope: 'RECEIVE_REGISTRATION'
  }
  else
  return {
      type: RECEIVE_REGISTRATION_ERROR,
      error: 1,
      message: 'Errore durante la registrazione riprovare più tardi',
      receivedAt: Date.now(),
      ope: 'RECEIVE_REGISTRATION_ERROR'
  }
}

function receiveRegistrationError(json) {  
  return {
      type: RECEIVE_REGISTRATION_ERROR,
      error: 1,
      message: 'Errore durante la registrazione riprovare più tardi',
      receivedAt: Date.now(),
      ope: 'RECEIVE_REGISTRATION_ERROR'
  }
}

function cleanDataset(json) {
  //This function creates an action that a reducer can handle 
  return {
    type: DELETE_DATASETS,
    datasets: null,
    receivedAt: Date.now()
  }
}

function fetchDataset(query) {
  var queryurl='';
  var encodedString = '';
  if(query)
    queryurl='?q=name:*'+query+'*';
  //var url = 'http://' + serviceurl.DatasetBackend.Search.host + ':' + serviceurl.DatasetBackend.Search.port + serviceurl.DatasetBackend.Search.nameSearch + '?rows=20' + queryurl;
  var url = serviceurl.apiURLSecurity + '/ckan/searchDataset' + queryurl;  
  if(localStorage.getItem('username') && localStorage.getItem('encodedString') &&
    localStorage.getItem('username') != 'null' && localStorage.getItem('encodedString') != 'null'){
      encodedString = localStorage.getItem('encodedString')
    }
  return dispatch => {
      dispatch(requestDatasets())
      return fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + encodedString
        }
      })
        .then(response => response.json())
        .then(json => dispatch(receiveDataset(json)))
    }
  }


function fetchDatasetDetail(datasetname) {
  var encodedString = '';
  //http://localhost:9000/dati-gov/v1/ckan/datasets/${this.props.params.post
  //var url = 'http://' + serviceurl.DatasetBackend.Search.host + ':' + serviceurl.DatasetBackend.Search.port + serviceurl.DatasetBackend.Search.nameDetail + datasetname;
  var url = serviceurl.apiURLSecurity + '/ckan/datasets/'  + datasetname;
  if(localStorage.getItem('username') && localStorage.getItem('encodedString') &&
    localStorage.getItem('username') != 'null' && localStorage.getItem('encodedString') != 'null'){
      encodedString = localStorage.getItem('encodedString')
    }
  return dispatch => {
      dispatch(requestDatasetDetail())
      return fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + encodedString
        }
      })
        .then(response => response.json())
        .then(json => dispatch(receiveDatasetDetail(json)))
    }
  }


export function loadDatasets(query) {
  console.log('Load Dataset action');
  return (dispatch, getState) => {
      return dispatch(fetchDataset(query))
  }
 
}

export function unloadDatasets() {
  console.log('Unload Dataset action');
  return (dispatch, getState) => {
      return dispatch(cleanDataset())
  }
}

export function datasetDetail(datasetname) {
  console.log('Dataset Detail action');
  return (dispatch, getState) => {
      return dispatch(fetchDatasetDetail(datasetname))
  }
}

export function loginAction(username, pw) {
  console.log("Called action loginAction");
  var url = serviceurl.apiURLSecurity + '/ipa/user/' + username;
  var toencode = username + ':' +pw;
  const encodedString = new Buffer(toencode).toString('base64');
  localStorage.setItem('encodedString', encodedString);
  localStorage.setItem('username', username);
  return dispatch => {
      dispatch(requestLogin())
      return fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + encodedString
          }
        })
        .then(response => response.json())
        .then(json => dispatch(receiveLogin(json)))
  }
}

export function loginActionEncoded(username, encodedString) {
  console.log("Called action loginActionEncoded");
  var url = serviceurl.apiURLSecurity + '/ipa/user/' + username;
  localStorage.setItem('encodedString', encodedString);
  localStorage.setItem('username', username);
  return dispatch => {
      dispatch(requestLogin())
      return fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + encodedString
          }
        })
        .then(response => response.json())
        .then(json => dispatch(receiveLogin(json)))
  }
}

export function logout() {
  localStorage.removeItem('encodedString');
  localStorage.removeItem('username');
  return dispatch => { dispatch(removeLoggedUser()) }
}

export function addUserOrganization(username, pw) {
  console.log("Called action loginActionEncoded");
  var url = serviceurl.apiURLSecurity + '/ckan/userOrganizations/' + username;
  var toencode = username + ':' +pw;
  const encodedString = new Buffer(toencode).toString('base64');
  localStorage.setItem('encodedString', encodedString);
  localStorage.setItem('username', username);
  return dispatch => {
      return fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + encodedString
          }
        })
        .then(response => response.json())
        .then(json => dispatch(receiveOrganization(json)))
  }
}

export function addUserOrganizationEncoded(username, encodedString) {
  console.log("Called action loginActionEncoded");
  var url = serviceurl.apiURLSecurity + '/ckan/userOrganizations/' + username;
  localStorage.setItem('encodedString', encodedString);
  localStorage.setItem('username', username);
  return dispatch => {
      return fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + encodedString
          }
        })
        .then(response => response.json())
        .then(json => dispatch(receiveOrganization(json)))
  }
}

export function registerUser(nome, cognome, username, email, pw) {
  console.log("Called action registerUser");
  var url = serviceurl.apiURLSecurity + '/ipa/registration/request';
  //http://localhost:9001/catalog-manager/v1/ipa/registration/request

  //TODO: remove basic authentication from register service 
  //var toencode = 'raippl' + ':' + 'raippl';
  //const encodedString = new Buffer(toencode).toString('base64');
  var input = {
    'uid': username,
    'givenname': nome,
    'sn': cognome,
    'mail': email,
    'userpassword': pw,
  };

  return dispatch => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + serviceurl.auth
      },
      body: JSON.stringify(input)
    }).then(response => dispatch(receiveRegistrationSuccess(response)))
    .catch(error => dispatch(receiveRegistrationError(error)))
  }
}

export function activateUser(token) {
  console.log("Called action activateUser");
  var url = serviceurl.apiURLSecurity + '/ipa/registration/confirm?token=' + token;

  //TODO: remove basic authentication from register service 
  //var toencode = 'raippl' + ':' + 'raippl';
  //const encodedString = new Buffer(toencode).toString('base64');

  return dispatch => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + serviceurl.auth
      }
    }).then(response => dispatch(receiveActivationSuccess(response)))
      .catch(error => dispatch(receiveActivationError(error)))
  }
}

export function addDataset(json, encodedString) {
  console.log("Called action addDataset");
  var url = serviceurl.apiURLCatalog + "/catalog-ds/add";
  localStorage.setItem('encodedString', encodedString);

  return dispatch => {
      dispatch(requestLogin())
      return fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + encodedString
          },
          body: JSON.stringify(json)
        })
        .then(response => response.json())
        .then(json => dispatch(receiveAddDataset(json)))
  }
}