import fetch from 'isomorphic-fetch'
import { serviceurl } from './config/serviceurl.js'

// MOCK
//import page from './data/dataset'
//import det from './data/datasetdetail'
import ont from './data/ontologies'
import voc from './data/vocabulary'

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
export const RECEIVE_ONTOLOGIES = 'RECEIVE_ONTOLOGIES'
export const RECEIVE_VOCABULARY = 'RECEIVE_VOCABULARY'
export const RECEIVE_PROPERTIES = 'RECEIVE_PROPERTIES'
export const REQUEST_PROPERTIES = 'REQUEST_PROPERTIES'
export const REQUEST_REGISTRATION = 'REQUEST_REGISTRATION'
export const RECEIVE_FILE_STORAGEMANAGER = 'RECEIVE_FILE_STORAGEMANAGER'


/*********************************** REDUX ************************************************ */
function receiveProperties(json, org){
  console.log('receiveProperties');
  return {
    type: RECEIVE_PROPERTIES,
    properties: json,
    organization: org,
    receivedAt: Date.now(),
    ope: 'RECEIVE_PROPERTIES'
  }
}

function receiveDataset(json, value) {
  console.log('receiveDataset');
  //This function creates an action that a reducer can handle 
  //Action are payload of information that sends data from the application to the store
  //Store doesn't have any other way to get data
  //Action are not responsible for update the state (only reducers) !!! 
  return {
      type: RECEIVE_DATASETS,
      datasets: json,
      query: value,
      receivedAt: Date.now(),
      ope: 'RECEIVE_DATASETS'
  }
}

function requestProperties(){
  return {
    type: REQUEST_PROPERTIES
  }
}

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

function receiveDatasetDetail(jsonDataset, jsonFile, query) {
  return {
      type: RECEIVE_DATASET_DETAIL,
      dataset: jsonDataset,
      json: jsonFile,
      query: query,
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

function receiveFileFromStorageManager(json){
  return {
      type: RECEIVE_FILE_STORAGEMANAGER,
      json: json,
      receivedAt: Date.now(),
      ope: 'RECEIVE_FILE_STORAGEMANAGER'
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

export function receiveLogin(response) {
  return {
      type: RECEIVE_LOGIN,
      user: response,
      receivedAt: Date.now(),
      ope: 'RECEIVE_LOGIN'
  }
}

function receiveOntologies(response) {
  return {
      type: RECEIVE_ONTOLOGIES,
      //ontologies: response,
      ontologies: ont,
      error: '',
      receivedAt: Date.now(),
      ope: 'RECEIVE_ONTOLOGIES'
  }
}

function receiveVocabulary(response) {
  return {
      type: RECEIVE_VOCABULARY,
      //vocabulary: response,
      vocabulary: voc,
      error: '',
      receivedAt: Date.now(),
      ope: 'RECEIVE_VOCABULARY'
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

function receiveActivationSuccess(ok, json) {  
  if(ok==='ok')
  return {
      type: RECEIVE_ACTIVATION,
      message: 'Attivazione avvenuta con successo !!!',
      error: 0,
      receivedAt: Date.now(),
      ope: 'RECEIVE_ACTIVATION'
  }
  else{
    if(json.code===1){
      console.log("messaggio errore codificato: " + json.message);
      return {
          type: RECEIVE_ACTIVATION_ERROR,
          error: 1,
          message: json.message,
          receivedAt: Date.now(),
          ope: 'RECEIVE_ACTIVATION_ERROR'
      }
    }else{
      console.log("messaggio errore non codificato!!!");
      return {
          type: RECEIVE_ACTIVATION_ERROR,
          error: 1,
          message: 'Errore durante l\'attivazione riprovare più tardi',
          receivedAt: Date.now(),
          ope: 'RECEIVE_ACTIVATION_ERROR'
      }
    }
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

function requestRegistration (){
  return {
    type: REQUEST_REGISTRATION,
  }
}

function receiveRegistrationSuccess(ok, json) {  
  if(ok==='ok')
  return {
      type: RECEIVE_REGISTRATION,
      message: 'Registrazione avvenuta con successo, a breve riceverai una mail per l\'attivazione all\'indirizzo indicato',
      error: 0,
      receivedAt: Date.now(),
      ope: 'RECEIVE_REGISTRATION'
  }
  else{
    if(json.code===1){
      console.log("messaggio errore codificato: " + json.message);
      return {
          type: RECEIVE_REGISTRATION_ERROR,
          error: 1,
          message: json.message,
          receivedAt: Date.now(),
          ope: 'RECEIVE_REGISTRATION_ERROR'
      }
    }else{
      console.log("messaggio errore non codificato !!!");
      return {
          type: RECEIVE_REGISTRATION_ERROR,
          error: 1,
          message: 'Errore durante la registrazione riprovare più tardi',
          receivedAt: Date.now(),
          ope: 'RECEIVE_REGISTRATION_ERROR'
      }
    }
  }
}

function receiveRegistrationError(json) {  
  return {
      type: RECEIVE_REGISTRATION_ERROR,
      error: 1,
      message: json,
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

/************************************************************************************************* */

/*********************************** REGISTRATION ************************************************ */
export function registerUser(nome, cognome, username, email, pw, pw2) {
  console.log("Called action registerUser");
  var url = serviceurl.apiURLSecurity + '/ipa/registration/request';

  var input = {
    'uid': username,
    'givenname': nome,
    'sn': cognome,
    'mail': email,
    'userpassword': pw,
  };
  return dispatch => {
    dispatch(requestRegistration())
    if(pw===pw2){
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'      
      },
      body: JSON.stringify(input)
    })
    .then(response => {
        if (response.ok) {
           response.json().then(json => {
            console.log(json);
            dispatch(receiveRegistrationSuccess('ok', json))
          });
        } else {
          response.json().then(json => {
            console.log(json);
            dispatch(receiveRegistrationSuccess('ko', json))
          });
        }
      })
    .catch(error => dispatch(receiveRegistrationError(error)))
    } else{
      dispatch(receiveRegistrationError('I campi Password e Ripeti Password non coincidono'))
    }
  }
}

export function activateUser(token) {
  console.log("Called action activateUser");
  var url = serviceurl.apiURLSecurity + '/ipa/registration/confirm?token=' + token;
  return dispatch => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })/* .then(response => {
      if (response.ok) {
         response.json().then(json => {
          console.log(json);
          dispatch(receiveActivationSuccess('ok', json))
        });
      } else {
        response.json().then(json => {
          console.log(json);
          dispatch(receiveActivationError('ko', json))
        });
      }
    }).catch(error => dispatch(receiveActivationError(error))) */
  }
}
/****************************************************************************************** */

/*********************************** LOGIN ************************************************ */
export function isValidToken(token) {
  console.log("Called isValidToken");
  var url = serviceurl.apiURLSSOManager + '/secured/test';
  return dispatch => {
      return fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
        .then(response => response.ok)
  }
}

export function getAuthToken(username, pw) {
  const base64 = require('base-64');
  console.log("1 - Called action setAuthToken");
  localStorage.setItem('username', username);
  var headers = new Headers();
  headers.append("Authorization", "Basic " + base64.encode(username + ":" + pw));
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  var url = serviceurl.apiURLSecurity + '/token';
  return dispatch => {
      return fetch(url, {
          method: 'GET',
          headers: headers
        })
        .then(response => response.json())
  }
}

export function getApplicationCookie(nomeApp) {
  console.log("Called setApplicationCookie");
  var url = serviceurl.apiURLSSOManager + '/secured/retriveCookie/' + nomeApp;
  return dispatch => {
      return fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(response => response.json())
        .catch(error => JSON.parse("{}"))
  }
}

export function loginAction() {
  console.log("Called action loginAction");
  var url = serviceurl.apiURLSecurity + '/ipa/userbymail/' + localStorage.getItem('username')
  return dispatch => {
      dispatch(requestLogin())
      return fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(response => response.json())
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  deleteDataportalCookies()
  return dispatch => { dispatch(removeLoggedUser()) }
}

function deleteDataportalCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        if(name.trim()=='dataportal')
          document.cookie = "dataportal=; path=/; domain=" + serviceurl.domain;
    }
}

export function addUserOrganization(uid) {
  console.log("Called action addUserOrganization");
  var url = serviceurl.apiURLCatalog + '/ckan/userOrganizations/' + uid;
  return dispatch => {
      return fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(response => response.json())
        .then(json => dispatch(receiveOrganization(json)))
  }
}
/******************************************************************************* */

/******************************** DATASET ************************************** */
export function fetchProperties(org) {
  var url = serviceurl.apiURLDatiGov + "/settings?organization="+ org
  return dispatch => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => dispatch(receiveProperties(json)))
  }
}

function fetchDataset(query, start, owner, category_filter, group_filter, organization_filter, order_filter) {
  var queryurl='';
  var ownerurl='';
  var categoryurl='';
  var groupurl='';
  var orgurl='';
  var token = '';
  var orderurl='';
  if(owner)
    ownerurl='&q=publisher_identifier:'+owner
  console.log('category: '+ category_filter);
  if (category_filter) {
    let first = true;
    for (let i in category_filter) {
      if (category_filter[i] == true) {
        if (first) {
          if (query) {
            categoryurl += "%20AND%20(";
          }
        }
        else
          categoryurl += "%20OR%20";
        categoryurl += "tags:" + i;
        first = false;
      }
    }

    if (!first)
      categoryurl += ")";
  }

  if (group_filter) {
    let first = true;
    for (let i in group_filter) {
      if (group_filter[i] == true) {
        if (first) {
          if (categoryurl || query) {
            groupurl += "%20AND%20(";
          }
        }
        else
          groupurl += "%20OR%20";
        groupurl += "res_format:" + i;
        first = false;
      }
    }

    if (!first)
      groupurl += ")";
  }
  
  if (organization_filter) {
    let first = true;
    for (let i in organization_filter) {
      if (organization_filter[i] == true) {
        if (first) {
          if (categoryurl || groupurl || query) {
            orgurl += "%20AND%20(";
          }
        }
        else
          orgurl += "%20OR%20";
        orgurl += "organization:" + i;
        first = false;
      }
    }

    if (!first)
      orgurl += ")";
  }

  if(query)
    queryurl='q=name:*'+query+'*';

  if(order_filter)
    orderurl='&sort='+order_filter

  let stringaIniz = '';
  if ((!queryurl) && (categoryurl || groupurl || orgurl))
    stringaIniz = '&q=('

  var url = serviceurl.apiURLCatalog + '/ckan/searchDataset?rows=1001&start=' + start +"&"+ stringaIniz + queryurl + ownerurl+ categoryurl + groupurl + orgurl +orderurl;  
  console.log(url)
  if(localStorage.getItem('username') && localStorage.getItem('token') &&
    localStorage.getItem('username') !== 'null' && localStorage.getItem('token') !== 'null'){
      token = localStorage.getItem('token')
    }
  return dispatch => {
      dispatch(requestDatasets())
      return fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
        .then(response => response.json())
        .then(json => dispatch(receiveDataset(json, query)))
    }
  }

export function loadDatasets(query, start, owner, category_filter, group_filter, organization_filter, order_filter) {
  console.log('Load Dataset action');
  return (dispatch, getState) => {
    return dispatch(fetchDataset(query, start, owner, category_filter, group_filter, organization_filter, order_filter))
  }

}

export function unloadDatasets() {
  console.log('Unload Dataset action');
  return (dispatch, getState) => {
      return dispatch(cleanDataset())
  }
}

export function datasetDetail(datasetname, query) {
  console.log('Dataset Detail action');
  return (dispatch, getState) => {
      return dispatch(fetchDatasetDetail(datasetname, query))
  }
}

export function addDataset(inputJson, token) {
  console.log("Called action addDataset");
  var url = serviceurl.apiURLCatalog + "/catalog-ds/add";
  return dispatch => {
      return fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(inputJson)
        })
        .then(response => response.json())
        .then(json => {
          console.log('Caricamento metadati avvenuto con successo')
          dispatch(receiveAddDataset(json))
          dispatch(addDatasetKylo(inputJson, token))
        }).catch(error => console.log('Eccezione durante il caricamento dei metadati'))
  }
}

export function addDatasetKylo(json, token) {
  console.log("Called action addDataset");
  var url = serviceurl.apiURLCatalog + "/kylo/feed"
  return dispatch => {
      return fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(json)
        })
        .then(response => {
            if(response.ok){
              console.log('Caricamento Kylo avvenuto con successo')
            }else{
              console.log('Errore durante il caricamento del dataset a Kylo')
            }
        }).catch(error => console.log('Eccezione durante il caricamento del file su Kylo '))
  }
}

function fetchDatasetDetail(datasetname, query) {
  var token = '';
  //https://api.daf.teamdigitale.it/catalog-manager/v1/catalog-ds/getbytitle/carsharing_entity_vehicle
  var url = serviceurl.apiURLCatalog + '/catalog-ds/getbytitle/'  + datasetname;
  if(localStorage.getItem('username') && localStorage.getItem('token') &&
    localStorage.getItem('username') !== 'null' && localStorage.getItem('token') !== 'null'){
      token = localStorage.getItem('token')
    }
  return dispatch => {
      dispatch(requestDatasetDetail())
      return fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
        .then(response => response.json())
        .then(jsonDataset => dispatch(getFileFromStorageManager(jsonDataset.operational.logical_uri))
        .catch(error => console.log('Errore durante il caricamento del file dallo storage manager ' + jsonDataset))
        .then(jsonFile => dispatch(receiveDatasetDetail(jsonDataset, jsonFile, query))) 
      )
    }
  }

export function getFileFromStorageManager(logical_uri) {
  var token = '';
  var url = serviceurl.apiURLDataset + '/dataset/' + encodeURIComponent(logical_uri);
  if(localStorage.getItem('username') && localStorage.getItem('token') &&
    localStorage.getItem('username') !== 'null' && localStorage.getItem('token') !== 'null'){
      token = localStorage.getItem('token')
    }
  return dispatch => {
      return fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      .then(response => response.json())
    }
  }

/******************************************************************************* */

export function loadOntologies() {
  console.log('Load Ontologies');
  /*var url = 'http://localhost:3001/catalog-manager/v1/ontologies';  
  return dispatch => {
      return fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(json => dispatch(receiveOntologies(json)))
    }*/
    return dispatch => {
      dispatch(receiveOntologies(undefined));
    }
  }

  export function loadVocabulary() {
    console.log('Load Vocabulary');
    /*var url = 'http://localhost:3001/catalog-manager/v1/ontologies';  
    return dispatch => {
        return fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(json => dispatch(receiveOntologies(json)))
      }*/
      return dispatch => {
        dispatch(receiveVocabulary(undefined));
      }
    }

    export function getSchema(filesToUpload, typeFile) {
      console.log('getSchema'); 
      var url = serviceurl.apiURLDatiGov + "/infer/kylo/" + typeFile
      var token = '';
      if(localStorage.getItem('username') && localStorage.getItem('token') &&
        localStorage.getItem('username') !== 'null' && localStorage.getItem('token') !== 'null'){
          token = localStorage.getItem('token')
        }

        const formData = new FormData()
        formData.append('upfile', new Blob(filesToUpload), 'test')
      
      return dispatch => {
          return fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                //'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                //"Content-Type": 'multipart/formdata',
              'Authorization': 'Bearer ' + token
            }
          })
            .then(response => response.json())
        } 
      }