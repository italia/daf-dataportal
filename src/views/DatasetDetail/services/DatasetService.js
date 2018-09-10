import { serviceurl } from '../../../config/serviceurl.js'

export default class DatasetService {
    baseUrl = serviceurl.apiURLCatalog  + "/ckan/searchDataset?rows=5";
    
}