import { JobActionTypes } from './job.types';

export const setCurentJob = job => ({
    type: JobActionTypes.SET_CURRENT_JOB,
    payload: job
})