
export default class UserStoryService {
    

    urlIframe = "http://localhost:9000/dati-gov/v1/dashboard/iframes?apikey=test";
    baseUrl = "http://localhost:3000/mock/" + "user_story";


    constructor() {

    }

    async get(id) {
        const response = await fetch( this.baseUrl + "/" + id );
        return response.json();
    }

    async list() {
        const response = await fetch( this.baseUrl + "/list" );
        return response.json();
    }

    async save(id, story) {

        const response = await fetch( this.baseUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                story: story
            })
        })
        
        return response.json();
    }
} 