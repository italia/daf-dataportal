import { serviceurl } from '../../../../config/serviceurl.js'

export default class WidgetService {
    
    baseUrl = serviceurl.apiURL_mock + "widgets";
    urlIframe = serviceurl.apiURLDatiGov + serviceurl.apiURL_dati_gov + "/dashboard/iframes?apikey=test";

    constructor() {

    }

    async getIframe() {
        const response = await fetch( this.urlIframe );
        return response.json();
    }

} 