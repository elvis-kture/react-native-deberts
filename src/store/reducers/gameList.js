import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    game: 162
};

const gameChange = (state, action) => {

    return updateObject( state, {
        game: action.cur_game
    } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GAME_CHANGE: return gameChange( state, action );
        default: return state;
    }
};

export default reducer;