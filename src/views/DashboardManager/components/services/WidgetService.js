import { serviceurl } from '../../../../config/serviceurl.js'

export default class WidgetService {
    
    urlIframe = serviceurl.apiURLDatiGov + "/dashboard/iframes?apikey=test";

    constructor() {

    }

    async getIframe() {
        const response = await fetch( this.urlIframe , {
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
