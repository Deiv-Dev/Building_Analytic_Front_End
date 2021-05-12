import { JobActionTypes } from './job.types';

const INITIAL_STATE = {
    currentJob: null
}

const jobReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case JobActionTypes.SET_CURRENT_JOB:
            return {
                ...state,
                currentJob: action.payload
            }
        default:
            return state;
    }
}

export default jobReducer;