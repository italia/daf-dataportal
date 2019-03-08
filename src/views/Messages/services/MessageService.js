import { serviceurl } from '../../../config/serviceurl'

export default class MessageService {
     
    constructor(){}

    async messageTTL() {
        var url = 'http://www.mocky.io/v2/5c823849310000f42f1d1c77'
        // var url = serviceurl.apiURLSecurity + '/daf/organizations'
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
}
