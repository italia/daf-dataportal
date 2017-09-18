import { serviceurl } from '../../../config/serviceurl.js'



export default class HomeService {
    
    dashboardUrl = serviceurl.apiURLDatiGov + "/dashboards";
    storyUrl =  serviceurl.apiURLDatiGov + "/stories";

    constructor() {

    }

    async dashboards(layout, widgets) {
        const response = await fetch( this.dashboardUrl );
        return response.json();
    }

    async stories(layout, widgets) {
        const response = await fetch( this.storyUrl );
        return response.json();
    }


} 