import { serviceurl } from '../../../../config/serviceurl.js'

export default class WidgetService {
    
    urlIframe = serviceurl.apiURLDatiGov + "/dashboard/iframes?apikey=test";

    constructor() {

    }

    async getIframe() {
        const response = await fetch( this.urlIframe );
        return response.json();
    }

} 