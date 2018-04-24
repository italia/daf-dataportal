import { serviceurl } from '../../../config/serviceurl.js'



export default class HomeService {
    
    dashboardUrl = serviceurl.apiURLDatiGov + "/dashboards";
    storyUrl =  serviceurl.apiURLDatiGov + "/user-stories";
    iframesUrl = serviceurl.apiURLDatiGov + '/dashboard/iframesbyorg/default_org';
    homeUrl = serviceurl.apiURLDatiGov + '/elasticsearch/home';

    constructor() {

    }

    async dashboards() {
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

    async stories() {
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

    async datasetDetail(name){
        var url = serviceurl.apiURLCatalog + '/catalog-ds/getbyname/' + name;
        var token = localStorage.getItem('token')
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        return response.json()
    }

    async homeElements(){
        //var url = serviceurl.apiURLDatiGov + '/elasticsearch/home';
        var token = localStorage.getItem('token')
        const response = await fetch(this.homeUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })

        return response.json()
    }
} 