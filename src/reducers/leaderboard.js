import { LOAD_LEADERBOARD, SHOW_NEXT_PAGE } from '../constants/ActionTypes';
import Config from '../shared/Config';

const DEFAULT_LEADERBOARD_STATE = {
    fullResults: [],
    stats: {
        average: 0
    },
    shownResults: {
        index: 0,
        results: []
    },
    meta: {}
};
const leaderboard = (state = DEFAULT_LEADERBOARD_STATE, action) => {
    const actionTypes = {
        [LOAD_LEADERBOARD]: () => {
            let {
                results,
                date,
                workoutTitle,
                testStats
            } = action.payload;
            return {
                ...state,
                fullResults: results,
                shownResults: {
                    index: Config.resultsPerPage,
                    results: results.slice(0, Config.resultsPerPage)
                },
                stats: {
                    average: testStats[0].avg
                },
                meta: {
                    date,
                    workoutTitle
                }
            };
        },

        [SHOW_NEXT_PAGE]: () => {
            let currentIndex = state.shownResults.index;
            let results = state.fullResults;
            if(currentIndex >= state.fullResults.length) {
                currentIndex = 0;   
            }
            let newIndex = currentIndex + Config.resultsPerPage;
            return {
                ...state,
                shownResults: {
                    index: newIndex,
                    results: results.slice(currentIndex, newIndex)
                }
            }
        }
    };

    const actionType = actionTypes[action.type];
    return actionType ? actionType() : state;
};

export default leaderboard;
