import { ClientActionTypes } from './client.types';

const INITIAL_STATE = {
    currentClientName: [],
    currentClientId: []
}

const clientReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ClientActionTypes.SET_CURRENT_CLIENT_NAME:
            return {
                ...state,
                //currentClient: [action.payload]
                currentClientName: [action.payload, ...state.currentClientName]
                // currentClient: state.currentClient.concat(action.newItem)
            }
        case ClientActionTypes.SET_CURRENT_CLIENT_ID:
            return {
                ...state,
                //currentClient: [action.payload]
                currentClientId: [action.payload, ...state.currentClientId]
                // currentClient: state.currentClient.concat(action.newItem)
            }
        default:
            return state;
    }
}

export default clientReducer;