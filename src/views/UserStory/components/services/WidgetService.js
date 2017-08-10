
export default class WidgetService {
    
    baseUrl = "http://localhost:3000/mock/" + "widgets";

    constructor() {

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