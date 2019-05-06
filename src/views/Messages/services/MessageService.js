import { serviceurl } from '../../../config/serviceurl'
import { messages } from '../../../i18n/i18n-ita'

export default class MessageService {
     
    constructor(){}

    //############# TTL #############
    /*
    [GET TTL]
        GET  /notifications/get/ttl
        risposte:
        200: <-- array con i ttl
        [
            {
                "name": "a",
                "value": 1
            },
            {
                "name": "b",
                "value": 3
            }
        ]
        401: <- l'utente che fa la chiamata non è system admin
        {
            "code": 401,
            "message": "xxxx",
            "fields": null
        }
        500: <- errore generico
        {
            "code": 500,
            "message": "xxx",
            "fields": null
        }
    */
    async messageTTL() {
        // var url = 'http://www.mocky.io/v2/5c8b586b3600007c068f800b'
        var url = serviceurl.apiURLDatiGov + '/notifications/get/ttl'
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function(response) {
            console.log(response.status)     //=> number 100–599
            console.log(response.statusText) //=> String
            console.log(response.headers)    //=> Headers
            console.log(response.url)        //=> String
            if (response.status === 200) {
                return response;
            } else if (response.status === 401) {
                throw new Error( messages.validazione.utenteNoAdmin );
            } else if (response.status === 500) {
                throw new Error( messages.validazione.erroreGenerico );
            }else{
                throw new Error(response.statusText);  
            }
          })

        return response;
    }

    /*
    [UPDATE TTL NOTIFICHE - NO SYSTEM]
        PUT  /notifications/update/ttl
        body

            [
                {
                    "name": "successType",
                    "value": 14
                },
                {
                    "name": "infoType",
                    "value": 18
                }
            ]
        risposte:
        200: <- ttl aggiornato
        {
            "message": "xxxxx",
            "fields": null
        }
        401: <- l'utente che fa la chiamata non è system admin
        {
            "code": 401,
            "message": "xxxx",
            "fields": null
        }
        500: <- errore generico
        {
            "code": 500,
            "message": "xxx",
            "fields": null
        }
    */
    async updateMessageTTL ( messageTTL ) {
        let token = localStorage.getItem('token')
        const response = await fetch(serviceurl.apiURLDatiGov + '/notifications/update/ttl', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(messageTTL)
        }).then(function(response) {
            console.log(response.status)     //=> number 100–599
            console.log(response.statusText) //=> String
            console.log(response.headers)    //=> Headers
            console.log(response.url)        //=> String
            if (response.status === 200) {
                return response;
            } else if (response.status === 401) {
                throw new Error( messages.validazione.utenteNoAdmin );
            } else if (response.status === 500) {
                throw new Error( messages.validazione.erroreGenerico );
            }else{
                throw new Error(response.statusText);  
            }
          })
        return response;
    }

    //############# MESSAGGI (system) #############

    async saveMessage(message){
        // var url = 'http://www.mocky.io/v2/5c824ed9310000941f1d1d18';
        var url = serviceurl.apiURLDatiGov + '/notifications/system/save'

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(message)
        }).then(function(response) {
            if (response.status === 200) {
                return response;
            } else if (response.status === 401) {
                throw new Error( messages.validazione.utenteNoAdmin );
            } else if (response.status === 500) {
                throw new Error( messages.validazione.erroreGenerico );
            }else{
                throw new Error(response.statusText);  
            }
          })
        return response;
    }

    async updateMessage(message){
        // var url = 'http://www.mocky.io/v2/5c824ed9310000941f1d1d18';
        var url = serviceurl.apiURLDatiGov + '/notifications/system/update/'+message.offset

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(message)
        }).then(function(response) {
            if (response.status === 200) {
                return response;
            } else if (response.status === 401) {
                throw new Error( messages.validazione.utenteNoAdmin );
            } else if (response.status === 500) {
                throw new Error( messages.validazione.erroreGenerico );
            }else{
                throw new Error(response.statusText);  
            }
          })
        return response;
    }

    async listMessagesPublic(){
         // var url = 'http://www.mocky.io/v2/5c98d8833200004d00d9063e?mocky-delay=2000ms'
         var url = serviceurl.apiURLDatiGov + '/public/notifications/system/get/all'
         const response = await fetch(url, {
             method: 'GET',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer ' + localStorage.getItem('token')
             }
         }).then(function(response) {
             if (response.status === 200) {
                 return response;
             } else if (response.status === 401) {
                 throw new Error( messages.validazione.utenteNoAdmin );
             } else if (response.status === 500) {
                 throw new Error( messages.validazione.erroreGenerico );
             }else{
                 throw new Error(response.statusText);  
             }
           })
         return response;
    }

    async listMessages() {
        // var url = 'http://www.mocky.io/v2/5c98d8833200004d00d9063e?mocky-delay=2000ms'
        var url = serviceurl.apiURLDatiGov + '/notifications/system/get/all'
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function(response) {
            if (response.status === 200) {
                return response;
            } else if (response.status === 401) {
                throw new Error( messages.validazione.utenteNoAdmin );
            } else if (response.status === 500) {
                throw new Error( messages.validazione.erroreGenerico );
            }else{
                throw new Error(response.statusText);  
            }
          })
        return response;
    }

    async detailMessage(message) {
        // var url = 'http://www.mocky.io/v2/5c98db403200002c00d90653'
        var url = serviceurl.apiURLDatiGov + '/notifications/system/'+message.offset
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function(response) {
            if (response.status === 200) {
                return response;
            } else if (response.status === 401) {
                throw new Error( messages.validazione.utenteNoAdmin );
            } else if (response.status === 500) {
                throw new Error( messages.validazione.erroreGenerico );
            }else{
                throw new Error(response.statusText);  
            }
          })
        return response;
    }

    async deleteMessage(message) {
        // var url = 'http://www.mocky.io/v2/5c824ed9310000941f1d1d18?mocky-delay=2000ms'
        var url = serviceurl.apiURLDatiGov + '/notifications/system/'+message.offset
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(function(response) {
            if (response.status === 200) {
                return response;
            } else if (response.status === 401) {
                throw new Error( messages.validazione.utenteNoAdmin );
            } else if (response.status === 500) {
                throw new Error( messages.validazione.erroreGenerico );
            }else{
                throw new Error(response.statusText);  
            }
          })
        return response;
    }

    async listPublicMessages() {
        var url = serviceurl.apiURLDatiGov + '/public/notifications/system/get/all'
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'            
            }
        }).then(function(response) {
            if (response.status === 200) {
                return response;
            } else if (response.status === 401) {
                throw new Error( messages.validazione.utenteNoAdmin );
            } else if (response.status === 500) {
                throw new Error( messages.validazione.erroreGenerico );
            }else{
                throw new Error(response.statusText);  
            }
          })
        return response;
    }
}

