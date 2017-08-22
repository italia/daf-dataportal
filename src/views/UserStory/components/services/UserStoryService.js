
export default class WidgetService {
    
    baseUrl = "http://localhost:3000/mock/" + "widgets";
    urlIframe = "http://datipubblici.default.svc.cluster.local:9000/dati-gov/v1/dashboard/iframes?apikey=test";

    constructor() {

    }

    async getIframe(){
        const response = await fetch( this.urlIframe );
        return response.json();
    }

    async get(layout, widgets) {
        const response = await fetch( this.baseUrl );
        return response.json();
    }

    async save(layout, widgets) {

        const response = await fetch( this.baseUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                layout: layout,
                widgets: widgets,
            })
        })
        
        return response.json();
    }
} 