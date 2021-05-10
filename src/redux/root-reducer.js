import { combineReducers } from 'redux';
//import { persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';

import userReducer from './users/user.reducer';
import clientReducer from './clients/client.reducer';

export default combineReducers({
    user: userReducer,
    client: clientReducer
});