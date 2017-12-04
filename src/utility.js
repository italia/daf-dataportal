import { serviceurl } from './config/serviceurl.js'

export function transformName(name){
    console.log('transform name ' + name);
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

  export function setCookie(app, json){
    console.log('setCookie - app: ' + app + ' json: ' + json)
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