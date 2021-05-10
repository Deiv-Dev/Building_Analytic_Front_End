import { ClientActionTypes } from './client.types';

export const setCurentClientName = client => ({
    type: ClientActionTypes.SET_CURRENT_CLIENT_NAME,
    payload: client
})

export const setCurentClientId = client => ({
    type: ClientActionTypes.SET_CURRENT_CLIENT_ID,
    payload: client
})
