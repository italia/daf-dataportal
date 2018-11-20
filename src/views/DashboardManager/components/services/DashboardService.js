import { serviceurl } from '../../../../config/serviceurl.js'

export default class DashboardService {
    
    baseUrl = serviceurl.apiURLDatiGov + "/dashboards";
    baseUrlSave = serviceurl.apiURLDatiGov + "/save/dashboards";
    baseUrlRemove = serviceurl.apiURLDatiGov + "/delete/dashboards";
    constructor() {

    }

    async get(id) {
        const response = await fetch( this.baseUrl + "/" + id , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        return response.json();
    }

    async list(layout, widgets) {
        const response = await fetch( this.baseUrl , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        return response.json();
    }

    async save(dashboard, shared) {
        var condividi = ''
        if(shared!==undefined){
          condividi = '?shared='+shared
        }
        let id = dashboard.id || "save"
        dashboard['timestamp'] = new Date(); 
        console.log('Salvataggio dashboard: ' + dashboard);
        const response = await fetch( this.baseUrlSave+condividi, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(dashboard)
        })
        
        return response.json();
    }
    
    async remove(id) {

        const response = await fetch( this.baseUrlRemove + "/" + id , {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        
        return response.json();
    }
} 