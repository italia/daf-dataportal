import { serviceurl } from '../../config/serviceurl.js'

function asyncValidate(values, dispatch, props, currentFieldName) {
  
  console.log('Controllo se il titolo è gia presente: ' + values.nome);
  var token = '';
  if(localStorage.getItem('username') && localStorage.getItem('token') &&
    localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
      token = localStorage.getItem('token')
    }
  return new Promise((resolve, reject) => {
      console.log('Controllo su mongo')
      var url = serviceurl.apiURLCatalog + '/catalog-ds/is_present/' + values.nome
      return fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }).then(response => {
          if (response.ok) {
            reject({ title: 'Titolo già presente nel DAF. Si prega di scegliere un altro titolo.' }) 
          } else {
            if(values.private==0){
              console.log('Il dataset è pubblico quindi controllo anche sul ckan')
              var queryurl='?q=title:'+values.title;
              var urlCkan = serviceurl.apiCKAN + '/package_search' + queryurl;  
                return fetch(urlCkan, {
                  method: 'GET',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                  }
                }).then((response) => {
                  if (response.ok) {
                      response.json().then(json => {
                        if (json.result.count>0){
                          reject({ title: 'Titolo già presente nel DAF. Si prega di scegliere un altro titolo.' }) 
                        } else {
                          resolve()
                        }
                      })
                    } else {
                      resolve()
                    }
                })
            }else{
              resolve()
            }
          }
        });
  })
}

export default asyncValidate;