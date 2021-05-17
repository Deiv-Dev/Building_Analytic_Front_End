import { WorkerActionTypes } from './worker.types';

const INITIAL_STATE = {
    currentWorkerName: [],
    currentWorkerId: []
}

const workerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case WorkerActionTypes.SET_CURRENT_WORKER_NAME:
            return {
                ...state,
                currentWorkerName: [action.payload, ...state.currentWorkerName]
            }
        case WorkerActionTypes.SET_CURRENT_WORKER_ID:
            return {
                ...state,
                currentWorkerId: [action.payload, ...state.currentWorkerId]
            }
        default:
            return state;
    }
}

export default workerReducer;