import { JobActionTypes } from './job.types';

export const setCurrentJobId = job => ({
    type: JobActionTypes.SET_CURRENT_JOB_ID,
    payload: job
})

export const setCurrentJobAddress = job => ({
    type: JobActionTypes.SET_CURRENT_JOB_ADDRESS,
    payload: job
})

export const setCcurrentJobDescription = job => ({
    type: JobActionTypes.SET_CURRENT_JOB_DESCRIPTION,
    payload: job
})

export const setCurrentJobStart = job => ({
    type: JobActionTypes.SET_CURRENT_JOB_START,
    payload: job
})

export const setCurrentJobFinish = job => ({
    type: JobActionTypes.SET_CURRENT_JOB_FINISH,
    payload: job
})