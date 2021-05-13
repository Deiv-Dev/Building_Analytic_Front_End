import { JobActionTypes } from './job.types';

const INITIAL_STATE = {
    currentJobId: [],
    currentJobAddress: [],
    currentJobDescription: [],
    currentJobStart: [],
    currentJobFinish: [],
}

const jobReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case JobActionTypes.SET_CURRENT_JOB_ID:
            return {
                ...state,
                // currentJobId: action.payload
                currentJobId: [action.payload, ...state.currentJobId]
            }
        case JobActionTypes.SET_CURRENT_JOB_ADDRESS:
            return {
                ...state,
                // currentJobAddress: action.payload
                currentJobAddress: [action.payload, ...state.currentJobAddress]
            }
        case JobActionTypes.SET_CURRENT_JOB_DESCRIPTION:
            return {
                ...state,
                // currentJobDescription: action.payload
                currentJobDescription: [action.payload, ...state.currentJobDescription]
            }
        case JobActionTypes.SET_CURRENT_JOB_START:
            return {
                ...state,
                // currentJobStart: action.payload
                currentJobStart: [action.payload, ...state.currentJobStart]
            }
        case JobActionTypes.SET_CURRENT_JOB_FINISH:
            return {
                ...state,
                // currentJobFinish: action.payload
                currentJobFinish: [action.payload, ...state.currentJobFinish]
            }
        default:
            return state;
    }
}

export default jobReducer;