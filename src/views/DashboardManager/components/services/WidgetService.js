import { serviceurl } from '../../../../config/serviceurl.js'

export default class WidgetService {
    
    urlIframe = serviceurl.apiURLDatiGov + "/dashboard/iframesbyorg/";
    urlOpenIframe = serviceurl.apiURLDatiGov + "/dashboard/open-iframes";

    constructor() {

    }

    async getIframe(org, pvt) {
        var url = ''
        if(pvt==="0"){
          url = this.urlOpenIframe
        }else if(pvt==="1"){
          url = this.urlIframe + org
        }
        const response = await fetch( url , {
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
