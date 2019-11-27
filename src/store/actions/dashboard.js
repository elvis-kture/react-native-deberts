import * as actionTypes from './actionTypes';

export const addRow = ( row ) => {
    return {
        type: actionTypes.ADD_ROW,
        row: row
    };
};

export const removeRow = ( key ) => {
    return {
        type: actionTypes.REMOVE_ROW,
        rowKey: key
    };
};

export const clearRows = () => {
    return {
        type: actionTypes.CLEAR_ROWS,
    };
};

export const setRows = ( newState ) => {
    return {
        type: actionTypes.SET_ROWS,
        newState: newState
    };
};

export const updateInitial = (value) => {
    return {
        type: actionTypes.UPDATE_INITIAL,
        value: value
    };
};

export const calculateRound = (game, side, count) => {
    return {
        type: actionTypes.CALCULATE_ROUND,
        game: game,
        side: side,
        count: count
    };
};

export const changeSide = (side) => {
    return {
        type: actionTypes.CHANGE_SIDE,
        side: side,
    };
};

export const changeName = (side, name) => {
    return {
        type: actionTypes.CHANGE_NAME,
        side: side,
        name: name
    };
};

// export const initRows = ( rows ) => {
//     return dispatch => {
//         dispatch(setIngredients(rows));
//     };
// };