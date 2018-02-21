import { serviceurl } from '../../config/serviceurl.js'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values) => {
  return sleep(100).then(() => {
    console.log('Controllo se il titolo è gia presente: ' + values.nome);
    var that = this;
    var token = '';
    var queryurl='?q=name:'+values.nome;
    var url = serviceurl.apiURLCatalog + '/ckan/searchDataset' + queryurl;  
    if(localStorage.getItem('username') && localStorage.getItem('token') &&
      localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
        token = localStorage.getItem('token')
      }
      return fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }).then(response => response.json())
      .then(array => {
        if (array.length>0){
            throw { title: 'Titolo già presente nel DAF. Si prega di scegliere un altro titolo.' } 
        } 
      })
  })
}
export default asyncValidate;