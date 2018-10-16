import fetch from 'isomorphic-fetch'
import { serviceurl } from './config/serviceurl.js'

// MOCK
//import page from './data/dataset'
//import det from './data/datasetdetail'
import settings from './data/settings'

export const REQUEST_DATASETS = 'REQUEST_DATASETS'
export const RECEIVE_DATASETS = 'RECEIVE_DATASETS'
export const DELETE_DATASETS = 'DELETE_DATASETS'
export const SELECT_DATASET = 'SELECT_DATASET'
export const RECEIVE_METADATA = 'RECEIVE_METADATA'
export const REQUEST_DATASET_DETAIL = 'REQUEST_DATASET_DETAIL'
export const RECEIVE_DATASET_DETAIL = 'RECEIVE_DATASET_DETAIL'
export const RECEIVE_DATASET_ADDITIONAL_DETAIL = 'RECEIVE_DATASET_ADDITIONAL_DETAIL'
export const RECEIVE_DATASET_DETAIL_ERROR = 'RECEIVE_DATASET_DETAIL_ERROR'
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export const REMOVE_LOGGED_USER = 'REMOVE_LOGGED_USER'
export const RECEIVE_ORGANIZATION = 'RECEIVE_ORGANIZATION'
export const RECEIVE_REGISTRATION = 'RECEIVE_REGISTRATION'
export const RECEIVE_REGISTRATION_ERROR = 'RECEIVE_REGISTRATION_ERROR'
export const REQUEST_RESET = 'REQUEST_RESET'
export const RECEIVE_RESET = 'RECEIVE_RESET'
export const REQUEST_RESET_ERROR = 'REQUEST_RESET_ERROR'
export const RECEIVE_RESET_ERROR = 'RECEIVE_RESET_ERROR'
export const RECEIVE_ACTIVATION = 'RECEIVE_ACTIVATION'
export const RECEIVE_ACTIVATION_ERROR = 'RECEIVE_ACTIVATION_ERROR'
export const RECEIVE_ADD_DATASET = 'RECEIVE_ADD_DATASET'
export const RECEIVE_PROPERTIES = 'RECEIVE_PROPERTIES'
export const REQUEST_PROPERTIES = 'REQUEST_PROPERTIES'
export const REQUEST_REGISTRATION = 'REQUEST_REGISTRATION'
export const RECEIVE_FILE_STORAGEMANAGER = 'RECEIVE_FILE_STORAGEMANAGER'
export const REQUEST_SEARCH = 'REQUEST_SEARCH'
export const RECEIVE_SEARCH = 'RECEIVE_SEARCH'
export const REQUEST_NOTIFICATIONS = 'REQUEST_NOTIFICATIONS'
export const RECEIVE_NOTIFICATIONS = 'RECEIVE_NOTIFICATIONS'
export const REQUEST_NEW_NOTIFICATIONS = 'REQUEST_NEW_NOTIFICATIONS'
export const RECEIVE_NEW_NOTIFICATIONS = 'RECEIVE_NEW_NOTIFICATIONS'


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

function receiveNotifications(json){
  console.log('receiveNotifications');
  return {
    type: RECEIVE_NOTIFICATIONS,
    notifications: json,
    receivedAt: Date.now(),
    ope: 'RECEIVE_NOTIFICATIONS'
  }
}

function receiveNewNotifications(json){
  console.log('receiveNewNotifications');
  return {
    type: RECEIVE_NEW_NOTIFICATIONS,
    newNotifications: json,
    receivedAt: Date.now(),
    ope: 'RECEIVE_NEW_NOTIFICATIONS'
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

function requestNotifications(){
  return {
    type: REQUEST_NOTIFICATIONS
  }
}

function requestNewNotifications(){
  return {
    type: REQUEST_NEW_NOTIFICATIONS
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

function receiveMetadataAndResources(jsonMetadata){
    return{
        type: RECEIVE_METADATA,
        metadata: jsonMetadata,
        ope: 'RECEIVE_METADATA'
    }
  }

function receiveDatasetDetail(jsonDataset, query, category_filter, group_filter, organization_filter, order_filter) {
  return {
      type: RECEIVE_DATASET_DETAIL,
      dataset: jsonDataset,
      query: query,
      category_filter: category_filter,
      group_filter: group_filter,
      organization_filter: organization_filter,
      order_filter: order_filter,
      receivedAt: Date.now(),
      ope: 'RECEIVE_DATASET_DETAIL'
  }
}

function receiveDatasetAdditionalDetail(jsonDataset, jsonFeed, jsonIFrames) {
  return {
      type: RECEIVE_DATASET_ADDITIONAL_DETAIL,
      dataset: jsonDataset,
      feed: jsonFeed,
      iframes: jsonIFrames,
      receivedAt: Date.now(),
      ope: 'RECEIVE_DATASET_ADDITIONAL_DETAIL'
  }
}

function receiveDatasetDetailError(query, category_filter, group_filter, organization_filter, order_filter) {
  return {
      type: RECEIVE_DATASET_DETAIL_ERROR,
      dataset: undefined,
      feed: undefined,
      iframes: undefined,
      query: query,
      category_filter: category_filter,
      group_filter: group_filter,
      organization_filter: organization_filter,
      order_filter: order_filter,
      receivedAt: Date.now(),
      ope: 'RECEIVE_DATASET_DETAIL_ERROR'
  }
}

function requestSearch() { 
  return {
    type: REQUEST_SEARCH
  }
}

function receiveSearchError(query) { 
  return {
    type: RECEIVE_SEARCH,
    results: undefined,
    query: query,
    receivedAt: Date.now(),
    ope: 'RECEIVE_SEARCH',
    isFetching: false
  }
}

function receiveSearch(json, query, filter, filterInt) { 
  return {
    type: RECEIVE_SEARCH,
    results: json,
    query: query,
    filter: filter,
    filterInt: filterInt,
    receivedAt: Date.now(),
    ope: 'RECEIVE_SEARCH',
    isFetching: false
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

function requestResetPwd() {
  return {
    type: REQUEST_RESET,
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
    var reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9%@#,;:_'/<([{^=$!|}.>-]{8,}$")
    var regUid = new RegExp("^[a-z0-9_]*$")
    if(regUid.test(username)){
      if(reg.test(pw)){
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
      } else{
        dispatch(receiveRegistrationError('La password inserita non rispetta i criteri. La password inserita deve avere almeno 8 caratteri, una maiuscola ed un numero. I caratteri speciali consentiti sono: "%@#,;:_\'/<([{^=$!|}.>-"'))
      }
    }else{
      dispatch(receiveRegistrationError('Lo username inserito contiene caratteri non consentiti. Sono accettati solo lettere minuscole, numeri e il carattere speciale "_", non sono ammessi gli spazi'))
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
        .then(response => response)
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
        .then(response => response)
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  deleteDataportalCookies()
  return dispatch => { dispatch(removeLoggedUser()) }
}

function deleteDataportalCookies() {
    document.cookie = "dataportal=;path=/;domain=" + serviceurl.domain
    document.cookie = "session=;path=/;domain=" + serviceurl.domain
    document.cookie = "metabase.SESSION_ID=;path=/;domain=" + serviceurl.domain
    document.cookie = "jupyter=;path=/;domain=" + serviceurl.domain
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

/******************************** RESET PASSWORD ******************************* */

export function resetPwd(email) {
  console.log("Called action reset password");
  var url = serviceurl.apiURLSecurity + '/ipa/resetpwd/request';

  var input = {
    "mail": email,
  };

  console.log(input)

  return dispatch => {
    dispatch(requestResetPwd())
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          console.log(json);
          dispatch(receiveResetSuccess('ok', json))
        });
      } else {
        response.json().then(json => {
          console.log(json);
          dispatch(receiveResetSuccess('ko', json))
        });
      }
    })
    .catch(error => dispatch(receiveResetError(error)))
  }
}

export function changePwd(token, pwd1, pwd2) {
  console.log("Called action changePwd");
  var url = serviceurl.apiURLSecurity + '/ipa/resetpwd/confirm';

  var input = {
    'token': token,
    'newpwd': pwd1,
  }

  return dispatch => {
    dispatch(requestRegistration())
    var reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9%@#,;:_'/<([{^=$!|}.>-]{8,}$")
    if (reg.test(pwd1)) {
      if (pwd1 === pwd2) {
        return fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(input),
        })
      } else {
        dispatch(receiveRegistrationError('I campi Password e Ripeti Password non coincidono'))
      }
    } else {
      dispatch(receiveRegistrationError('La password inserita non rispetta i criteri. La password inserita deve avere almeno 8 caratteri, una maiuscola ed un numero. I caratteri speciali consentiti sono: "%@#,;:_\'/<([{^=$!|}.>-"'))
    }
  }
}

function receiveResetSuccess(ok, json) {
  if (ok === 'ok')
    return {
      type: RECEIVE_RESET,
      message: 'Reset della password avvenuta con successo, a breve riceverai una mail per inserire la nuova password all\'indirizzo indicato',
      error: 0,
      receivedAt: Date.now(),
      ope: 'RECEIVE_RESET'
    }
  else {
    if (json.code === 1) {
      console.log("messaggio errore codificato: " + json.message);
      return {
        type: RECEIVE_RESET_ERROR,
        error: 1,
        message: json.message,
        receivedAt: Date.now(),
        ope: 'RECEIVE_RESET_ERROR'
      }
    } else {
      console.log("messaggio errore non codificato !!!");
      return {
        type: RECEIVE_RESET_ERROR,
        error: 1,
        message: 'Errore durante la registrazione riprovare più tardi',
        receivedAt: Date.now(),
        ope: 'RECEIVE_RESET_ERROR'
      }
    }
  }
}

function receiveResetError(json) {
  return {
    type: RECEIVE_RESET_ERROR,
    error: 1,
    message: json,
    receivedAt: Date.now(),
    ope: 'RECEIVE_RESET_ERROR'
  }
}

export function fetchProperties(org) {
  var url = serviceurl.apiURLDatiGov + "/settings?domain="+ org
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
    .catch(error => {
      console.log('Errore nel caricamento delle properties, carico default')
      dispatch(receiveProperties(settings))})
  }
}

/******************************** NOTIFICATIONS ************************************** */

export function fetchNotifications(user, counter){
  var token = ''
  var url = serviceurl.apiURLDatiGov +'/notifications/'+user+ (counter?'?limit='+counter:'')
  if(localStorage.getItem('username') && localStorage.getItem('token') &&
  localStorage.getItem('username') !== 'null' && localStorage.getItem('token') !== 'null'){
    token = localStorage.getItem('token')
  }
  return dispatch => {
    dispatch(requestNotifications())
    return fetch(url,{
      method: 'GET',
      headers: {
        /* 'Accept': 'application/json', */
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(json => dispatch(receiveNotifications(json)))
    .catch(error => {
      console.log('Errore nel caricamento delle notifiche')
      console.error(error)
    })
  }
}

export function fetchNewNotifications(user){
  var token = ''
  var url = serviceurl.apiURLDatiGov +'/notifications/check-new/'+user
  if(localStorage.getItem('username') && localStorage.getItem('token') &&
  localStorage.getItem('username') !== 'null' && localStorage.getItem('token') !== 'null'){
    token = localStorage.getItem('token')
  }
  return dispatch => {
    dispatch(requestNewNotifications())
    return fetch(url,{
      method: 'GET',
      headers: {
        /* 'Accept': 'application/json', */
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(receiveNewNotifications(json))
        if(json.length > 0){
          console.log("nuova-notifica")
          dispatch(fetchNotifications(user, 20))
        }
      })
    .catch(error => {
      console.log('Errore nel caricamento delle nuove notifiche')
      console.error(error)
    })
  }
}

/******************************** DATASET ************************************** */
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

export function datasetDetail(datasetname, query, isPublic) {
  console.log('Dataset Detail action');
  return (dispatch, getState) => {
      return dispatch(fetchDatasetDetail(datasetname, query, isPublic))
  }
}

export function datasetMetadata(datasetname, query) {
    console.log('Metadata Detail action');
    return (dispatch, getState) => {
        return dispatch(fetchMetadataAndResources(datasetname))
    }
  }
  
export function getOpendataResources(datasetname) {
    console.log('Opendata resources Detail action');
    return (dispatch, getState) => {
        return dispatch(fetchOpendataResources(datasetname))
    }
  }

export function addDataset(inputJson, token, fileType) {
  console.log("Called action addDataset");
  var url = serviceurl.apiURLCatalog + "/catalog-ds/add-queue";
  return dispatch => {
      return fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(inputJson)
        }).then(response => response)
      .catch(error => console.log('Eccezione durante il caricamento dei metafati '))
  }
}

function fetchOpendataResources(datasetname) {
    var token = '';
    var url = serviceurl.apiURLDatiGov + '/public/opendata_resource/' + datasetname
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
            //'Authorization': 'Bearer ' + token
          }
        })
          .then(response => response.json())
          .catch(error => {
            console.log('Nessun Metadato trovato con questo nome');
            
          }) 
      }
    }
  
  function fetchMetadataAndResources(datasetname) {
    var token = '';
    var url = serviceurl.apiURLDatiGov + '/public/opendata/' + datasetname    
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
            //'Authorization': 'Bearer ' + token
          }
        })
          .then(response => response.json())
          .then(json => {
            dispatch(receiveMetadataAndResources(json))
          })
          .catch(error => {
            console.log('Nessun Metadato trovato con questo nome');
            
          }) 
      }
    }
  
export function addDatasetKylo(json, token, fileType) {
  console.log("Called action addDataset");
  var url = serviceurl.apiURLCatalog + "/kylo/feed/" + fileType
  return dispatch => {
      return fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(json)
        }).then(response => response)
        .catch(error => console.log('Eccezione durante il caricamento del file su Kylo ')) 
  }
}

function fetchDatasetDetail(datasetname, query, isPublic) {
  var token = '';
  var url = serviceurl.apiURLCatalog + (isPublic?'/public/catalog-ds/getbyname/'  + datasetname:'/catalog-ds/getbyname/'  + datasetname)
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
        .then(jsonDataset => {
              console.log(jsonDataset)
              if(!jsonDataset.operational.ext_opendata){
                dispatch(receiveDatasetDetail(jsonDataset))
                dispatch(getFeedDetail(jsonDataset.dcatapit.owner_org, jsonDataset.dcatapit.name))
                .catch(error => console.log('Errore durante il caricamento delle info sul feed'))
                .then(jsonFeed => {
                  dispatch(getDatasetIframes(jsonDataset.dcatapit.name, jsonDataset.dcatapit.privatex))
                  .catch(error => console.log('Errore durante il caricamento degli iframes associati al dataset'))
                  .then(jsonIFrames => dispatch(receiveDatasetAdditionalDetail(jsonDataset, jsonFeed, jsonIFrames)))
                })
              }else{
                dispatch(receiveDatasetDetail(jsonDataset))
                dispatch(getDatasetIframes(jsonDataset.dcatapit.name, jsonDataset.dcatapit.privatex))
                  .catch(error => console.log('Errore durante il caricamento degli iframes associati al dataset'))
                  .then(jsonIFrames => dispatch(receiveDatasetAdditionalDetail(jsonDataset, undefined, jsonIFrames)))
              }
              })
        .catch(error => {
          console.log('Nessun Dataset con questo nome');
          dispatch(receiveDatasetDetailError(query))
        }) 
      }
  }

  export function search(query, filter, isPublic, filterInt) {
    var url = serviceurl.apiURLDatiGov + (isPublic?'/public':'')+'/elasticsearch/search'
    return dispatch => {
      dispatch(requestSearch())
      return fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(filter)
      })
      .then(response => {
          if(response.ok)
              response.json().then(json => dispatch(receiveSearch(json, query, filter, filterInt)))
          else dispatch(receiveSearchError(query))
      }).catch(error => console.log('Errore durante la ricerca'))
    }
  }

  export function getDatasetIframes(nomeDataset, privatex) {
    var token = '';
    console.log('richiedo gli iframes per il dataset: ' + nomeDataset)
    var url = ''
    if(privatex){ 
      url = serviceurl.apiURLDatiGov + '/dashboard/iframesByName/' + nomeDataset;
    }else{
      url = serviceurl.apiURLDatiGov + '/dashboard/open-iframesByName/' + nomeDataset;
    }
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
        .then(json => json)
      }
    }

  export function getFeedDetail(org, nomeDataset) {
    var token = '';
    var name = org + '.' + org + '_o_' + nomeDataset;
    console.log('richiedo lo stato del feed per il dataset: ' + name) 
    var url = serviceurl.apiURLDatiGov + '/kylo/feeds/' + name;
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
        .then(json => json)
      }
    }

    export function checkFileOnHdfs(logical_uri) {
      var token = '';
      var url = serviceurl.apiURLHdfs + logical_uri + '?op=LISTSTATUS';
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
          .then(response => response)
        }
      }

      export function getFileFromStorageManager(logical_uri, limit, format, isPublic) {
        var token = ''
        var rows = ''
        var formatType = ''
        if(limit!==null && limit!==undefined){
          rows = '?limit='+limit
        }
        if(format!==null && format!==undefined){
          formatType = '?format='+format
        }
        var url = ''
        if(isPublic!==true){
          url = serviceurl.apiURLDataset + '/dataset/' + encodeURIComponent(logical_uri) + rows + formatType
        }else if(isPublic===true){
          url = serviceurl.apiURLDatiGov + '/public/storage-manager/'+ encodeURIComponent(logical_uri) + rows + formatType
        }
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
            .then(response => response)
            .catch(error=> console.error(error))
          }
        }

      export function checkMetabase(nomeDataset) {
        var token = '';
        var url = serviceurl.apiURLDatiGov + '/metabase/table/' + nomeDataset
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




  export function getSupersetUrl(nomeDataset, org, isExtOpendata) {
    var token = '';
    var name = isExtOpendata ? nomeDataset :  org + '_o_' + nomeDataset;
    var url = serviceurl.apiURLDatiGov + '/superset/table/' + name

    /*     if(!isExtOpendata)
      var url = serviceurl.urlSuperset + '/tablemodelview/api/readvalues?_flt_3_table_name=' + org + '_o_' + nomeDataset
    else
      var url = serviceurl.urlSupersetOpen + '/tablemodelview/api/readvalues?_flt_3_table_name=' + nomeDataset */

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

    export function getSchema(filesToUpload, typeFile) {
      console.log('getSchema'); 
      var url = serviceurl.apiURLDatiGov + "/infer/kylo/" + typeFile
      //var url = 'http://localhost:3001/dati-gov/v1/infer/kylo/csv'
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

      export function getSchemaWS(url, typeFile) {
        console.log('getSchemaWS'); 
        var url = serviceurl.apiURLDatiGov + "/infer/ws/kylo/" + encodeURIComponent(url) + "/" + typeFile
        var token = '';
        if(localStorage.getItem('username') && localStorage.getItem('token') &&
        localStorage.getItem('username') !== 'null' && localStorage.getItem('token') !== 'null'){
          token = localStorage.getItem('token')
        }
        return dispatch => {
            return fetch(url, {
              method: 'POST',
              body: JSON.stringify({username: 'test', password: 'test'}),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              }
            })
            .then(response => response.json())
            .then(json => JSON.parse(json))
          }
        }

      export function getSystemNameKylo(title) {
        console.log('getSchemaWS'); 
        var token = '';
        if(localStorage.getItem('username') && localStorage.getItem('token') &&
          localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
            token = localStorage.getItem('token')
          }

        //Generate System name from kylo
        var url = serviceurl.apiURLDatiGov + '/infer/system_name/kylo?name=' + title
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

      export function updateNotifications(unreadNotifications){
        var url = serviceurl.apiURLDatiGov + '/notifications/update'
        var token = ''

        if(localStorage.getItem('username') && localStorage.getItem('token') &&
        localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
          token = localStorage.getItem('token')
        }

        return dispatch => {
          return fetch(url, {
            method: 'POST',
            headers: {
              //'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }, 
            body: JSON.stringify(unreadNotifications)
          })
          .then(response => response.json())
        }
      }
      
      export function getDatasetACL(datasetname){
        var url = serviceurl.apiURLSecurity + '/daf/datasetACL/' + datasetname
        var token = ''

        if(localStorage.getItem('username') && localStorage.getItem('token') &&
        localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
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

      export function setDatasetACL(datasetname, groupname){
        var url = serviceurl.apiURLSecurity + '/daf/datasetACL/' + datasetname + '/setPermission'
        var token = ''

        if(localStorage.getItem('username') && localStorage.getItem('token') &&
        localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
          token = localStorage.getItem('token')
        }

        var payload = {
          "groupName": groupname,
          "groupType": "group",
          "permission": "rwx"
        }
        
        return dispatch => {
          return fetch(url, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(payload)
          })
          .then(response => response.json())
        }
      }

      export function deleteDatasetACL(datasetname, groupname){
        var url = serviceurl.apiURLSecurity + '/daf/datasetACL/' + datasetname + '/deletePermission'
        var token = ''

        if(localStorage.getItem('username') && localStorage.getItem('token') &&
        localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
          token = localStorage.getItem('token')
        }

        var payload = {
          "groupName": groupname,
          "groupType": "group",
        }
        
        return dispatch => {
          return fetch(url, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(payload)
          })
          .then(response => response.json())
        }
      }

      export function uploadHdfsFile(url, file){
        var token = '' 
        if(localStorage.getItem('username') && localStorage.getItem('token') &&
        localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
          token = localStorage.getItem('token')
        }

        return dispatch => {
          return fetch(url, {
            method: 'PUT',
            headers: {
              'Authorization': 'Bearer ' + token
            },
            body: file
          })
          .then(response => response)
        }
      }

      export function groupsInfo(groups){
        var url = serviceurl.apiURLSecurity + '/daf/getGroupsInfo'
        var token = ''

        if(localStorage.getItem('username') && localStorage.getItem('token') &&
        localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
          token = localStorage.getItem('token')
        }

        return dispatch => {
          return fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(groups)
          })
          .then(response => response.json())
        }
      }

      export function getSupersetOpenCookie() {
        console.log("Called getSupersetOpenCookie");
        var url = serviceurl.apiURLSSOManager + '/secured/bi-open-loginH'
        return dispatch => {
            return fetch(url, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  //'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
              })
              .then(response => response.text())
              .catch(error => JSON.parse("{}"))
        }
      }

      export function getSubscriptions(user){
        var url = serviceurl.apiURLDatiGov + '/subscribe/'+user
        var token = ''

        if(localStorage.getItem('username') && localStorage.getItem('token') &&
        localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
          token = localStorage.getItem('token')
        }

        return dispatch => {
          return fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
          })
          .then(response => response.json())
        }
      }

      export function deleteAllSubscriptions(user){
        var url = serviceurl.apiURLDatiGov + '/unsubscribe/'+user
        var token = ''

        if(localStorage.getItem('username') && localStorage.getItem('token') &&
        localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
          token = localStorage.getItem('token')
        }

        return dispatch => {
          return fetch(url, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
          })
          .then(response => response.json())
        }
      }

      export function deleteSubscription(subscription){
        var url = serviceurl.apiURLDatiGov + '/unsubscribe'
        var token = ''

        if(localStorage.getItem('username') && localStorage.getItem('token') &&
        localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
          token = localStorage.getItem('token')
        }

        return dispatch => {
          return fetch(url, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(subscription)
          })
          .then(response => response.json())
        }
      }

      export function publishOnCKAN(dcatapit){
        var url = serviceurl.apiURLCatalog + '/ckan-geo/add'
        var token = ''

        if(localStorage.getItem('username') && localStorage.getItem('token') &&
        localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
          token = localStorage.getItem('token')
        }

        dcatapit.extras=[{"value":true,"key":"Open Data Daf"}]

        return dispatch => {
          return fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(dcatapit)
          })
          .then(response => response)
        }
      }

      export function deleteOnCKAN(dcatapit){
        var url = serviceurl.apiURLCatalog + '/ckan-geo/delete'
        var token = ''

        if(localStorage.getItem('username') && localStorage.getItem('token') &&
        localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
          token = localStorage.getItem('token')
        }

        return dispatch => {
          return fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(dcatapit)
          })
          .then(response => response)
        }
      }

      export function deleteDataset(nomeDataset, org){
        var url = serviceurl.apiURLCatalog + 'catalog-ds/delete/'+nomeDataset+'/'+org

        var token = ''

        if(localStorage.getItem('username') && localStorage.getItem('token') &&
        localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
          token = localStorage.getItem('token')
        }

        return dispatch => {
          return fetch(url, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          })
          .then(response => response.json())
        }
      }

      export function sendNotification(title, description, group, link){
        var url = serviceurl.apiURLCatalog + '/kafka/notifications/add'
        var token = ''

        if(localStorage.getItem('username') && localStorage.getItem('token') &&
        localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
          token = localStorage.getItem('token')
        }

        var json = {
          "topicName": "notification",
          "description": description,
          "title": title,
          "group": group,
          "link": link,
          "notificationType": "generic"
        }


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
        .then(response => response.json())
        }
      }

      export function getAllOrganizations(){
        var url = serviceurl.apiURLSecurity + '/daf/organizations'
        var token = ''

        if(localStorage.getItem('username') && localStorage.getItem('token') &&
        localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
          token = localStorage.getItem('token')
        }

        return dispatch => {
          return fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
          })
          .then(response => response.json())
        }
      }

      export function loadVocabulary(value){
        var url = 'https://api.daf.teamdigitale.it/daf-configurator/v2/vocabulary/dafvoc-ingestionform-option'
        var token = ''

        if(localStorage.getItem('username') && localStorage.getItem('token') &&
        localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
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
          .then(response => response)
        }
      }