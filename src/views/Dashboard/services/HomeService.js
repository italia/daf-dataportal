import { serviceurl } from '../../../config/serviceurl.js'



export default class HomeService {
    
    dashboardUrl = serviceurl.apiURLDatiGov + "/dashboards";
    storyUrl =  serviceurl.apiURLDatiGov + "/stories";

    constructor() {

    }

    async dashboards(layout, widgets) {
        const response = await fetch( this.dashboardUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        return response.json();
    }

    async stories(layout, widgets) {
        const response = await fetch( this.storyUrl , {
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