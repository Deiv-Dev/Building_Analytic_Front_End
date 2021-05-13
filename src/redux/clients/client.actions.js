import { ClientActionTypes } from './client.types';

export const setCurrentClientName = client => ({
    type: ClientActionTypes.SET_CURRENT_CLIENT_NAME,
    payload: client
})

export const setCurrentClientId = client => ({
    type: ClientActionTypes.SET_CURRENT_CLIENT_ID,
    payload: client
})
