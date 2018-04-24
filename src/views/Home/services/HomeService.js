import { serviceurl } from '../../../config/serviceurl.js'



export default class HomeService {
    
    dashboardUrl = serviceurl.apiURLDatiGov + "/dashboards";
    storyUrl =  serviceurl.apiURLDatiGov + "/user-stories";
    iframesUrl = serviceurl.apiURLDatiGov + '/dashboard/iframesbyorg/default_org'


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
        /* var url = 'http://10.100.208.165:9000/dati-gov/v1/elasticsearch/home'; */
        var url = serviceurl.apiURLDatiGov + '/elasticsearch/home';
        var token = localStorage.getItem('token')
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
                /* 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyIkaW50X3Blcm1zIjpbXSwic3ViIjoib3JnLnBhYzRqLmxkYXAucHJvZmlsZS5MZGFwUHJvZmlsZSNsdWNhcGljIiwiJGludF9yb2xlcyI6W10sIm1lbWJlck9mIjpbImNuPWRhZl9hZG1pbnMsY249Z3JvdXBzLGNuPWFjY291bnRzLGRjPWV4YW1wbGUsZGM9dGVzdCIsImNuPXRlc3Rfb3JnMyxjbj1ncm91cHMsY249YWNjb3VudHMsZGM9ZXhhbXBsZSxkYz10ZXN0IiwiY249aXBhdXNlcnMsY249Z3JvdXBzLGNuPWFjY291bnRzLGRjPWV4YW1wbGUsZGM9dGVzdCIsImNuPXRlc3Rfb3JnMixjbj1ncm91cHMsY249YWNjb3VudHMsZGM9ZXhhbXBsZSxkYz10ZXN0IiwiY249Y29tdW5lX2RpX3JvbWEsY249Z3JvdXBzLGNuPWFjY291bnRzLGRjPWV4YW1wbGUsZGM9dGVzdCIsImNuPXRlc3Rfb3JnLGNuPWdyb3Vwcyxjbj1hY2NvdW50cyxkYz1leGFtcGxlLGRjPXRlc3QiLCJjbj1kYWYsY249Z3JvdXBzLGNuPWFjY291bnRzLGRjPWV4YW1wbGUsZGM9dGVzdCIsImNuPWRlZmF1bHRfb3JnLGNuPWdyb3Vwcyxjbj1hY2NvdW50cyxkYz1leGFtcGxlLGRjPXRlc3QiXSwiZXhwIjoxNTI0NTkzMDYyfQ.qxUWtye--LOM_5vwyOkObgXeP2faYENmH21bY17tc30' */
                
            }
        })

        return response.json()
    }
} 