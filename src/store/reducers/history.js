import * as actionTypes from '../actions/actionTypes';
import {AsyncStorage} from 'react-native';

let initialState = []
AsyncStorage.getItem('history', (err, result) => {
    initialState = JSON.parse(result) || initialState;
});

const removeHistoryRow = (state, action) => {
    const newHistoryPoints = state.filter((point, index) => index !== action.index)
    AsyncStorage.setItem('history', JSON.stringify(newHistoryPoints))

    return newHistoryPoints;
};

const initHistoryRows = (state, action) => {
    return action.history;
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.REMOVE_HISTORY_ROW: return removeHistoryRow(state, action);
        case actionTypes.INIT_HISTORY_ROWS: return initHistoryRows(state, action);
        default: return state;
    }
};

export default reducer;