
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

    async save(dashboard) {

        const response = await fetch( this.baseUrl + "/" + dashboard._id , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dashboard)
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