import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import * as consts from '../../consts'

const initialState = {
    points: [],
};

const onMinus = (state, action) => {

    console.log('reducer:onMinus')
    let new_row = {
        [consts.LEFT]: 0,
        [consts.RIGHT]: 0

    }
    new_row[action.side] = action.minus
    let newPoints = [...action.points]
    newPoints.push(new_row)

    return updateObject( state, {
        points: newPoints
    } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ON_MINUS: return onMinus( state, action );
        default: return state;
    }
};

export default reducer;