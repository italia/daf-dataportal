import { serviceurl } from '../../../config/serviceurl'

export default class MessageService {
     
    constructor(){}

    //############# TTL #############

    async messageTTL() {
        var url = 'http://www.mocky.io/v2/5c823849310000f42f1d1c77'
        // var url = serviceurl.apiURLDatiGov + '/notifications/get/ttl'
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        return response.json();
    }

    async updateMessageTTL ( messageTTL ) {
        let token = localStorage.getItem('token')
        const response = await fetch('', {
        // const response = await fetch(serviceurl.apiURLDatiGov + '/notifications/update/ttl', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(messageTTL)
        })
        return response;
    }

    //############# MESSAGGI (system) #############

    saveMessage(message){
        var url = 'http://www.mocky.io/v2/5c824ed9310000941f1d1d18';
        // var url = serviceurl.apiURLDatiGov + '/notifications/system/save'

        const response = fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(message)
        })
        return response;
    }

    updateMessage(message){
        var url = 'http://www.mocky.io/v2/5c824ed9310000941f1d1d18';
        // var url = serviceurl.apiURLDatiGov + '/notifications/system/update'

        const response = fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(message)
        })
        return response;
    }

    async listMessages() {
        var url = 'http://www.mocky.io/v2/5c824ed9310000941f1d1d18?mocky-delay=2000ms'
        // var url = serviceurl.apiURLDatiGov + '/notifications/get-all'
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        return response.json();
    }

    detailMessage(message) {
        var url = 'http://www.mocky.io/v2/5c824ed9310000941f1d1d18?mocky-delay=2000ms'
        // var url = serviceurl.apiURLDatiGov + '/notifications/get/{offset}'
        const response = fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        return response.json();
    }

    deleteMessage(message) {
        var url = 'http://www.mocky.io/v2/5c824ed9310000941f1d1d18?mocky-delay=2000ms'
        // var url = serviceurl.apiURLDatiGov + '/notifications/system/delete/{offset}'
        const response = fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        return response.json();
    }

}
