import * as actionTypes from './actionTypes';

export const onMinus = (minus, side, points) => {
    return {
        type: actionTypes.ON_MINUS,
        minus: minus,
        points: points,
        side: side,
    };
};
