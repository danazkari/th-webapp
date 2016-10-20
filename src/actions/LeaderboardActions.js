import { LOAD_LEADERBOARD, SHOW_NEXT_PAGE } from '../constants/ActionTypes';
import Api from '../shared/Api';
import Config from '../shared/Config';

export const showNextPage = () => ({ type: SHOW_NEXT_PAGE });

export const loadLeaderboard = () => {
    return (dispatch) => {
        Api.getLeaderboard().then((loadedLeaderboard) => {
            dispatch({
                type: LOAD_LEADERBOARD,
                payload: {
                    ...loadedLeaderboard
                }
            });
        });
    };
};
