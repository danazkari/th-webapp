import { combineReducers } from 'redux';
import leaderboard from './leaderboard';
import cast from './cast';

const rootReducer = combineReducers({
    leaderboard,
    cast, 
});

export default rootReducer;
