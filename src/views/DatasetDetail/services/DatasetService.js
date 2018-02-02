import { serviceurl } from '../../../config/serviceurl.js'

export default class DatasetService {
    baseUrl = serviceurl.apiURLCatalog  + "/ckan/searchDataset?rows=5";
    constructor() {
    }

    async listCorrelati() {
        const response = await fetch( this.baseUrl, {
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