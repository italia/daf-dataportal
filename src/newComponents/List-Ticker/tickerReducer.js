const initialState = {
    isFetching: true,
    messages: [],
    error: ''
}

export const tickerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_ALL_PUBLIC_MESSAGES':
            return {
                isFetching: true
            }
        case 'RECEIVE_ALL_PUBLIC_MESSAGES':
            return {
                isFetching: false,
                messages: action.messages
            }
        case 'RECEIVE_ALL_PUBLIC_MESSAGES_ERROR':
            return {
                isFetching: false,
                error: action.error
            }
        default:
            return state;
    }
}
