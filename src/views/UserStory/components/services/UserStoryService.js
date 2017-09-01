import { serviceurl } from '../../../../config/serviceurl.js'

export default class UserStoryService {
    

    urlIframe = serviceurl.apiURLDatiGov + "/dati-gov/v1/dashboard/iframes?apikey=test";
    //baseUrl = "http://localhost:3000/mock/" + "user_story";
    baseUrl = serviceurl.apiURLDatiGov + serviceurl.apiURL_dati_gov + "/user-stories";

    constructor() {

    }

    async get(id) {
        const response = await fetch( this.baseUrl + "/" + id );
        return response.json();
    }

    async list() {
        const response = await fetch( this.baseUrl );
        return response.json();
    }

    async save(story) {

        const response = await fetch( this.baseUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(story)
        })
        
        return response.json();
    }
    
    async remove(id) {

        const response = await fetch( this.baseUrl + "/" + id , {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        
        return response.json();
    }
} 