import { serviceurl } from '../../../../config/serviceurl.js'

export default class UserStoryService {
    

    baseUrl = serviceurl.apiURLDatiGov  + "/user-stories";
    baseUrlSave = serviceurl.apiURLDatiGov  + "/save/user-stories";
    baseUrlRemove = serviceurl.apiURLDatiGov  + "/delete/user-stories";
    constructor() {

    }

    async get(id) {
        const response = await fetch( this.baseUrl + "/" + id , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        return response.json();
    }

    async list() {
        const response = await fetch( this.baseUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        //mock
        //const response = await fetch( this.baseUrl + "/list");
        return response.json();
    }

    async save(story) {
        story['timestamp'] = new Date(); 
        console.log('Salvataggio story: ' + story);
        const response = await fetch( this.baseUrlSave, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(story)
        })
        
        return response.json();
    }
    
    async remove(id) {

        const response = await fetch( this.baseUrlRemove + "/" + id , {
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