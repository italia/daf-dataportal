import { serviceurl } from '../../../../config/serviceurl.js'
import { isPublic } from '../../../../utility'

export default class UserStoryService {
    

    baseUrlPvt = serviceurl.apiURLDatiGov  + "/user-stories";
    baseUrlPbc = serviceurl.apiURLDatiGov  + "/public/user-stories";    
    baseUrlSave = serviceurl.apiURLDatiGov  + "/save/user-stories";
    baseUrlRemove = serviceurl.apiURLDatiGov  + "/delete/user-stories";

    async getPvt(id) {
        const response = await fetch( this.baseUrlPvt + "/" + id , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        return response.json();
    }

    async getPbc(id) {
      const response = await fetch( this.baseUrlPbc + "/" + id , {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
      })
      return response.json();
  }

    async listPvt(org) {
      let url = this.baseUrlPvt + (org?('?org='+org):'')
      const response = await fetch( url, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
      })
      //mock
      //const response = await fetch( this.baseUrl + "/list");
      return response.json();
    }

    async listPbc(org) {
      let url = this.baseUrlPbc + (org?('?org='+org):'')
      const response = await fetch( url, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
      })
      //mock
      //const response = await fetch( this.baseUrl + "/list");
      return response.json();
    }

    async save(story, shared) {
        var condividi = ''
        if(shared!==undefined){
          condividi='?shared='+shared
        }
        story['timestamp'] = new Date(); 
        console.log('Salvataggio story: ' + story);
        const response = await fetch( this.baseUrlSave+condividi, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(story)
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