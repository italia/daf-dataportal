import { serviceurl } from '../../config/serviceurl.js'

let publicMessagesAPI = `${serviceurl.apiURLDatiGov}/public/notifications/system/get/all`

const requestAllPublicMessages = () => ({
    type: 'REQUEST_ALL_PUBLIC_MESSAGES'
})

const receiveAllPublicMessages = response => ({
    type: 'RECEIVE_ALL_PUBLIC_MESSAGES',
    messages: response
})

const receiveAllPublicMessagesError = error => ({
    type: 'RECEIVE_ALL_PUBLIC_MESSAGES_ERROR',
    error: error
})

export const getAllPublicMessages = () => dispatch =>
    new Promise(()=> dispatch(requestAllPublicMessages())).then(
        fetch(publicMessagesAPI,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then( response =>
                response.ok
                    ?
                        response.json()
                        .then(json => dispatch(receiveAllPublicMessages(json)))
                    : dispatch(receiveAllPublicMessagesError(response.statusText)))
            .catch(error => dispatch(receiveAllPublicMessagesError(error)))
    )
