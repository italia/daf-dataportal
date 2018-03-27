import { serviceurl } from './config/serviceurl.js'
import { truncate } from 'fs';

const themes = [
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

  export function isEditor(){
    var isEditor = false;
    var token = localStorage.getItem('token')
    var jwtDecode = require('jwt-decode');
    var decoded = jwtDecode(token);
    try{
      decoded['memberOf'].map((elem) => {
        if(elem.indexOf('cn=daf_editors') !== -1)
          isEditor = true
      })
    }catch(error){
      console.log('error isEditor: ' + error)
    }

    return isEditor
  }

  export function isAdmin(){
    var isEditor = false;
    var token = localStorage.getItem('token')
    var jwtDecode = require('jwt-decode');
    var decoded = jwtDecode(token);
    try{
      decoded['memberOf'].map((elem) => {
        if(elem.indexOf('cn=daf_admins') !== -1)
          isEditor = true
      })
    }catch(error){
      console.log('error isEditor: ' + error)
    }

    return isEditor
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
    if (name.length >= 30)
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

  export default themes