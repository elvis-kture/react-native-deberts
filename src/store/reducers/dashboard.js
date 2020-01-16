import * as actionTypes from '../actions/actionTypes';
import * as consts from '../../consts';
import { updateObject, calculatePointsTotal, checkWinner } from '../utility';
import {AsyncStorage} from 'react-native';

const initState = {
    points: [

    ],
    total: {
        [consts.LEFT]: 0,
        [consts.RIGHT]: 0
    },
    initial: 0,
    side: consts.LEFT,
    winner: false,
    eggs: {
        [consts.LEFT]: 0,
        [consts.RIGHT]: 0
    },
    sideNames: {
        [consts.LEFT]: consts.DEFAULT_LEFT_NAME,
        [consts.RIGHT]: consts.DEFAULT_RIGHT_NAME
    },
}

let initialState = initState
AsyncStorage.getItem('last_game', (err, result) => {
    initialState = JSON.parse(result) || initialState;
});
// const initialState = JSON.parse(AsyncStorage.getItem('last_game')) || initState;

const addRow = ( state, action ) => {

    const newPoints = [...state.points]
    const newRow = {...action.row}
    const newEggs = {...state.eggs}

    //EGGS
    if (newRow[consts.RIGHT] === newRow[consts.LEFT]) {
        if (state.side === consts.RIGHT) {
            newEggs[consts.RIGHT] += newRow[consts.LEFT]
            newRow[consts.LEFT] = 0
        }
        else {
            newEggs[consts.LEFT] += newRow[consts.RIGHT]
            newRow[consts.RIGHT] = 0
        }
    }
    else{
        if(newEggs[consts.LEFT]){
            if (newRow[consts.LEFT] > newRow[consts.RIGHT]) {
                newRow[consts.LEFT] += newEggs[consts.LEFT]
            }
            else {
                newRow[consts.RIGHT] += newEggs[consts.LEFT]
            }
            newEggs[consts.LEFT] = 0
            newEggs[consts.RIGHT] = 0
        }
        else if(newEggs[consts.RIGHT]){
            if (newRow[consts.RIGHT] > newRow[consts.LEFT]) {
                newRow[consts.RIGHT] += newEggs[consts.RIGHT]
            }
            else {
                newRow[consts.LEFT] += newEggs[consts.RIGHT]
            }
            newEggs[consts.RIGHT] = 0
            newEggs[consts.LEFT] = 0
        }
    }


    newPoints.push(newRow)

    const newTotal = calculatePointsTotal(newPoints)
    const newWinner = checkWinner(newTotal)

    const lastGame = updateObject( state, {
        points: newPoints,
        total: newTotal,
        winner: newWinner,
        eggs: newEggs,
    } )

    AsyncStorage.setItem('last_game', JSON.stringify(lastGame))

    if (newWinner) {
        let history = []

        AsyncStorage.getItem('history', (err, result) => {
            history = JSON.parse(result) || [];

            const historyItem = updateObject( lastGame, {
                date: new Date(Date.now()).toLocaleDateString(),
            } )

            history.push(historyItem)

            AsyncStorage.setItem('history', JSON.stringify(history))
        });

    }

    return lastGame;
};

const removeRow = (state, action) => {

    const newPoints = state.points.filter((point, index) => index !== action.rowKey)

    const newTotal = calculatePointsTotal(newPoints)
    const newWinner = checkWinner(newTotal)

    const lastGame = updateObject( state, {
        points: newPoints,
        total: newTotal,
        winner: newWinner
    } )

    AsyncStorage.setItem('last_game', JSON.stringify(lastGame))

    return lastGame;
};

const setRows = (state, action) => {
    return updateObject( state, action.newState );
};

const updateInitial = (state, action) => {

    return updateObject( state, {
        initial: +action.value
    } );

};

const calculateRound = (state, action) => {

    return state;
};

const changeSide = (state, action) => {

    return updateObject( state, {
        side: action.side
    } );
};

const changeName = (state, action) => {

    let newSideNames = {...state.sideNames}
    newSideNames[action.side] = action.name

    return updateObject( state, {
        sideNames: newSideNames
    } );
};

const clearRows = (state, action) => {
    const lastGame = updateObject( initState, {
        sideNames: {
            [consts.LEFT]: state.sideNames[consts.LEFT],
            [consts.RIGHT]: state.sideNames[consts.RIGHT]
        }
    } );

    AsyncStorage.setItem('last_game', JSON.stringify(lastGame))
    return lastGame;
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_ROW: return addRow( state, action );
        case actionTypes.REMOVE_ROW: return removeRow(state, action);
        case actionTypes.SET_ROWS: return setRows(state, action);
        case actionTypes.UPDATE_INITIAL: return updateInitial(state, action);
        case actionTypes.CALCULATE_ROUND: return calculateRound(state, action);
        case actionTypes.CHANGE_SIDE: return changeSide(state, action);
        case actionTypes.CHANGE_NAME: return changeName(state, action);
        case actionTypes.CLEAR_ROWS: return clearRows(state, action);
        default: return state;
    }
};

export default reducer;