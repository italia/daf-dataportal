import { serviceurl } from './config/serviceurl.js'
import { truncate } from 'fs';

export const themes = [
  { 'val': 'AGRI', 'name': 'AGRICOLTURA' },
  { 'val': 'ECON', 'name': 'ECONOMIA' },
  { 'val': 'EDUC', 'name': 'EDUCAZIONE' },
  { 'val': 'ENER', 'name': 'ENERGIA' },
  { 'val': 'ENVI', 'name': 'AMBIENTE' },
  { 'val': 'GOVE', 'name': 'GOVERNO' },
  { 'val': 'HEAL', 'name': 'SANITA' },
  { 'val': 'INTR', 'name': 'INTERNAZIONALE' },
  { 'val': 'JUST', 'name': 'GIUSTIZIA' },
  { 'val': 'REGI', 'name': 'REGIONE' },
  { 'val': 'SOCI', 'name': 'SOCIETA' },
  { 'val': 'TECH', 'name': 'TECNOLOGIA' },
  { 'val': 'TRAN', 'name': 'TRASPORTO' }
]

export const ckanTranslate = [
  {'key': 'contact_name','val': 'Contact Name'},
  {'key': 'contact_uri','val': 'Contact URI'},
  {'key': 'guid','val': 'GUID'},
  /* {'key': 'source_catalog_description','val': ''},
  {'key': 'source_catalog_homepage','val': ''},
  {'key': 'source_catalog_language','val': ''},
  {'key': 'source_catalog_modified','val': ''},
  {'key': 'source_catalog_publisher','val': ''},
  {'key': 'source_catalog_title','val': ''}, */
  {'key':'contact_email', 'val': 'Contact email	'},
  {'key':'publisher_uri', 'val': 'Publisher URI'},

  {'key': 'uri','val': 'URI'},

]

export const tipi = [{ 'val': 'catalog_test','name': 'Dataset'},{ 'val': 'dashboards','name': 'Dashboard'},{ 'val': 'stories','name': 'Storie'}, {'val':'ext_opendata', 'name':'Ext. Opendata'}]

export const visibilita = [{ 'val': '2','name': 'Open data'},{ 'val': '0','name': 'Privato'},{ 'val': '1','name': 'Organizzazione'}]

export const roles = [{"key":"daf_sys_admin", "label":"Amministratore di sistema"},{"key":"daf_adm", "label":"Amministratore"},{"key":"daf_vwr", "label":"Utente base"},{"key":"daf_edt", "label":"Editor"}]

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

export function transformName(name){
    try{
      var sp1 = name.split('_o_');
      var org = sp1[0];
      var name  = sp1[1];
      var find = '_d_';
      var re = new RegExp(find, 'g');
      if(name)
        return org + ' - ' + name.replace(re, " ");
      else
        return org
    } catch(exception){
      return name;
    }
  }

  export function setCookie(json){
    if(json.error!=1){
      if(json.length>0){
        for(let i in json) {
          let cookie = json[i];
          if(cookie)
            document.cookie = cookie.name+"="+ cookie.value + "; path="+cookie.path+"; domain=" + serviceurl.domain;
        }
      }
    }
  }

  export function isSysAdmin(loggedUser){
    var isAdmin = false;
    loggedUser && loggedUser.roles.map((role) => {
      if(role === 'daf_sys_admin')
      isAdmin = true
      }
    )
    return isAdmin
  }

  export function isAdmin(loggedUser){
    var isAdmin = false;
    loggedUser && loggedUser.roles.map((role) => {
      if(role.indexOf('daf_adm_')>-1)
        isAdmin = true
      }
    )
    return isAdmin
  }

  export function isEditor(loggedUser){
    var isEditor = false;
    loggedUser && loggedUser.roles.map((role) => {
      if(role.indexOf('daf_edt_')>-1)
        isEditor = true
      }
    )
    return isEditor
  }

  export function getEditorAdminOrganizations(loggedUser){
    var result=[]
    loggedUser && loggedUser.organizations.map((org) => {
       if(loggedUser.roles.indexOf('daf_edt_' + org)>-1 || loggedUser.roles.indexOf('daf_adm_' + org)>-1)
          result.push(org)
    })
    return result
  }

  export function isPublic(){
    var route = window.location.hash
    if(route && route.indexOf('/private/') != -1){
      return false
    } else {
      return true
    }

  }

  export function getKyloSchema(kyloSchema, value){
    kyloSchema.fields.map((field) => {
      value.tests.map((value) =>{
        if(value.nome==field.name){
          field.dataTypeWithPrecisionAndScale=value.tipo
          field.derivedDataType=value.tipo
          if(value.tipo=='int' || value.tipo=='bigint' || value.tipo=='decimal'
            || value.tipo=='double' || value.tipo=='float' || value.tipo=='tinyint'){
              field.dataTypeDescriptor.numeric=true
            }else{
              field.dataTypeDescriptor.numeric=false
            }
        }
      })
    })
    return JSON.stringify(kyloSchema)
  }

  export function transformWidgetName(name){
    var sp1 = name.split('_o_')
    if(sp1[1])
    return sp1[1]
    else 
    return name
  }

  export function truncateWidgetTitle(name) {
    var result = ''
    if(name.length>=29)
      result=name.substring(0,25)+'...'
    else
      result = name

    return result
  }

  export function truncateDatasetName(name, cut) {
    var result = name
    if (name.length >= cut)
      result = result.substring(0, cut) + '...'

    return result
  }

  export function transformDatasetName(name) {
    var result = name.replaceAll('_',' ')
    if (name.length >= 22)
      result = result.substring(0, 20) + '...'

    return result
  }

  export function getCurrentDate(){
    var currentDate = new Date()
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    if(day<10) {
      day = '0'+day
    } 
    
    if(month<10) {
      month = '0'+month
    } 
    return  day + "/" + month + "/" + year
  }

  export function boldMyWords(sentence, word){
    if(sentence.indexOf(word)!=-1){
      return sentence.replace(word, '<b>'+word+'</b>')
    }else{
      return sentence
    }

  }
/* 
  export function decodeTheme(value){
    var found=value
    for(var i = 0; i < themes.length; i++) {
      if (themes[i].val == value) {
          found = themes[i].name
          break
      }
    }
    return found
  }
 */
   export function decodeTheme(value){
    var found=''
    if(value.indexOf('{')!=-1){
      value = value.substring(1,value.length-1)
      var valueArr = value.split(',')
      for(var i=0;i<valueArr.length;i++){
        if(found=='')
          found+=getThemeDescFromCode(valueArr[i])
        else
        found+=', ' + getThemeDescFromCode(valueArr[i])
      }
    }else{
      found = getThemeDescFromCode(value)
    }
    return found
  }
  
  function getThemeDescFromCode(code){
    var found=code
    for(var i = 0; i < themes.length; i++) {
      if (themes[i].val == code.trim()) {
          found = themes[i].name
          break
      }
    }
    return found

  }

  export function decodeTipo(value){
    var found=value
    for(var i = 0; i < tipi.length; i++) {
      if (tipi[i].val == value) {
          found = tipi[i].name
          break
      }
    }
    return found
  }

  export function decodeCkan(value){
    var found=value
    for(var i = 0; i < ckanTranslate.length; i++) {
      if (ckanTranslate[i].key == value) {
          found = ckanTranslate[i].val
          break
      }
    }
    return found
  }

  export function decodeVisibilita(value){
    var found=value
    for(var i = 0; i < visibilita.length; i++) {
      if (visibilita[i].val == value) {
          found = visibilita[i].name
          break
      }
    }
    return found
  }

/* 
  export default themes

  export default tipi */