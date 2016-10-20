import { READY_TO_CAST } from '../constants/CastConstants';

export const readyToCast = () => ({ type: READY_TO_CAST, payload: true });
export const castUnavailable = () => ({ type: READY_TO_CAST, payload: false });
