import { WorkerActionTypes } from './worker.types';

export const setCurrentWorkerName = worker => ({
    type: WorkerActionTypes.SET_CURRENT_WORKER_NAME,
    payload: worker
})

export const setCurrentWorkerId = worker => ({
    type: WorkerActionTypes.SET_CURRENT_WORKER_ID,
    payload: worker
})