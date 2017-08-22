
export default class DashboardService {
    
    baseUrl = "http://localhost:3000/mock/" + "dashboards";

    constructor() {

    }

    async get(id) {
        const response = await fetch( this.baseUrl + "/" + id );
        return response.json();
    }

    async list(layout, widgets) {
        const response = await fetch( this.baseUrl + "/list" );
        return response.json();
    }

    async save(id, layout, widgets, title) {

        const response = await fetch( this.baseUrl + "/" + id , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                layout: layout,
                widgets: widgets,
                title: title
            })
        })
        
        return response.json();
    }
} 