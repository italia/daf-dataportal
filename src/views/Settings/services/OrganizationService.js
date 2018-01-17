import { serviceurl } from '../../../config/serviceurl'

export default class OrganizationService {
    
    constructor(){

    }

    async organizations() {
        var url = serviceurl.apiURLSecurity + '/daf/organizations'
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

    async userAdd(org, user) {
        let token = localStorage.getItem('token')
        const userAndGroup = {
            groupCn: org,
            userId: user
        }
        const response = await fetch(serviceurl.apiURLSecurity + '/daf/organization/useradd', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(userAndGroup)
        })
        return response.json();
    }

    async userDel(org, user) {
        let token = localStorage.getItem('token')
        const userAndGroup = {
            groupCn: org,
            userId: user
        }
        const response = await fetch(serviceurl.apiURLSecurity + '/daf/organization/userdel', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(userAndGroup)
        })
        return response.json();
    }

    async create(organization) {
        let token = localStorage.getItem('token')
        const response = await fetch(serviceurl.apiURLSecurity + '/daf/organization', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(organization)
        })
        return response.json();
    }

    async delete(organization) {
        let token = localStorage.getItem('token')
        const response = await fetch(serviceurl.apiURLSecurity + '/daf/organization/' + organization, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        return response.json();
    }
}