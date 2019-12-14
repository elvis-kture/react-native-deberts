import * as actionTypes from './actionTypes';
import {AsyncStorage} from 'react-native';

export const removeHistoryRow = (index) => {
    return {
        type: actionTypes.REMOVE_HISTORY_ROW,
        index: index,
    };
};


export const initHistoryRowsSuccess = (history) => {
    return {
        type: actionTypes.INIT_HISTORY_ROWS,
        history: history
    };
};

export const initHistoryRows = () => {

    return dispatch => {
        AsyncStorage.getItem('history', (err, result) => {
            const history = JSON.parse(result) || [];
            dispatch(initHistoryRowsSuccess(history));
        });
    };

};
