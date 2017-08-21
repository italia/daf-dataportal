
export default class WidgetService {
    
    baseUrl = "http://localhost:3000/mock/" + "widgets";
    urlIframe = "http://localhost:9000/dati-gov/v1/dashboard/iframes?apikey=test";

    constructor() {

    }

    async getIframe(){
        const response = await fetch( this.urlIframe );
        return response.json();
    }

} 