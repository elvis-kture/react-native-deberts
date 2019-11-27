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
            console.log()
            const history = JSON.parse(result) || [];
            console.log(err, result, 'console.log')
            dispatch(initHistoryRowsSuccess(history));
        });
    };

};

// export const initRows = ( rows ) => {
//     return dispatch => {
//         dispatch(setIngredients(rows));
//     };
// };