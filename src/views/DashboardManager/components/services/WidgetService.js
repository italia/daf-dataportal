import { serviceurl } from '../../../../config/serviceurl.js'

export default class WidgetService {
    
    baseUrl = serviceurl.apiURL_mock + "widgets";
    urlIframe = serviceurl.apiURL + "/dati-gov/v1/dashboard/iframes?apikey=test";

    constructor() {

    }

    async getIframe() {
        const response = await fetch( this.urlIframe );
        return response.json();
    }

} 