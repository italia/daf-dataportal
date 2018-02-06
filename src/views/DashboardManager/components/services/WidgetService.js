import { serviceurl } from '../../../../config/serviceurl.js'

export default class WidgetService {
    
    urlIframe = serviceurl.apiURLDatiGov + "/dashboard/iframesbyorg/";

    constructor() {

    }

    async getIframe(org) {
        const response = await fetch( this.urlIframe + org , {
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
