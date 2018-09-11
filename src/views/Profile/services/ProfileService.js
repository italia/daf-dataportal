import { serviceurl } from '../../../config/serviceurl'

export default class ProfileService {
    
    constructor(){

    }

    async workgroups(org) {
        var url = serviceurl.apiURLSecurity + '/ipa/group/' + org
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