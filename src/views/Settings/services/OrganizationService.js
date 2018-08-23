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

    async groupInfo(org) {
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

    async userAddWG(workgroup, user){
        let token = localStorage.getItem('token')
        const userAndGroup = {
            groupCn: workgroup,
            userId: user
        }
        const response = await fetch(serviceurl.apiURLSecurity + '/daf/workgroup/useradd', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(userAndGroup)
        })
        return response;
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
        return response;
    }

    async userDelOrg(org, user) {
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
        return response;
    }

    async userDelWg(workgroup, user) {
        let token = localStorage.getItem('token')
        const userAndGroup = {
            groupCn: workgroup,
            userId: user
        }
        const response = await fetch(serviceurl.apiURLSecurity + '/daf/workgroup/userdel', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(userAndGroup)
        })
        return response;
    }

    async workgroupDel(workgroup) {
        let token = localStorage.getItem('token')
        const response = await fetch(serviceurl.apiURLSecurity + '/daf/workgroup/' + workgroup, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        return response;
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
        return response;
    }

    async createWG(workgroup, organization) {
        let token = localStorage.getItem('token')
        const response = await fetch(serviceurl.apiURLSecurity + '/daf/workgroup/' + organization, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(workgroup)
        })
        return response;
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
        return response;
    }
}