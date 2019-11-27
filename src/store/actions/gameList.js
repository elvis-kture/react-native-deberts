import * as actionTypes from './actionTypes';

export const gameChange = (game) => {
    return {
        type: actionTypes.GAME_CHANGE,
        cur_game: game,
    };
};

// export const initRows = ( rows ) => {
//     return dispatch => {
//         dispatch(setIngredients(rows));
//     };
// };