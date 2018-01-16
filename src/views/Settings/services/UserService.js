import { serviceurl } from '../../../config/serviceurl'

export default class UserService {
    
    constructor(){

    }

    async users(org) {
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

    async saveUser(user) {
        var url = serviceurl.apiURLSecurity + '/daf/user'
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(user)
        })

        return response.json();
    }

    async userDetail(user) {
        var url = serviceurl.apiURLSecurity + '/ipa/userbyname/' + user
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

    async saveChanges(user, json) {
        var url = serviceurl.apiURLSecurity + '/daf/user/' + user
        const response = await fetch(url, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(json)
        })

        return response.json();
    }

    async deleteUser(user) {
        var url = serviceurl.apiURLSecurity + '/daf/user/' + user;
        const response = await fetch(url, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        return response.json();
    }
}