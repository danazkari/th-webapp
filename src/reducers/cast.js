import { READY_TO_CAST } from '../constants/CastConstants';

const DEFAULT_CAST_STATE = {
    castAvailable: false
};
const cast = (state = DEFAULT_CAST_STATE, action) => {
    const actionTypes = {
        [READY_TO_CAST]: () => ({
            castAvailable: action.payload
        })
    };

    const actionType = actionTypes[action.type];
    return actionType ? actionType() : state;
};

export default cast;
