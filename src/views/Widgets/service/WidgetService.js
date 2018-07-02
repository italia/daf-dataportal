import { serviceurl } from '../../../config/serviceurl.js'



export default class WidgetService {

    iframesUrl = serviceurl.apiURLDatiGov + '/dashboard/iframes'

    async iframes() {
        const response = await fetch(this.iframesUrl, {
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