import * as consts from "../consts";

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const calculatePointsTotal = (points) => {
    let total = {
        [consts.LEFT]: 0,
        [consts.RIGHT]: 0
    }

    points.map((pair_obj) => {
        if (pair_obj[consts.LEFT] !== consts.WINNER && pair_obj[consts.RIGHT] !== consts.WINNER) {
            if (pair_obj[consts.LEFT] === consts.BAIT) {
                total[consts.LEFT] += 0
                total[consts.RIGHT] += pair_obj[consts.RIGHT]
            }
            else if(pair_obj[consts.RIGHT] === consts.BAIT){
                total[consts.LEFT] += pair_obj[consts.LEFT]
                total[consts.RIGHT] += 0
            }
            else {
                total[consts.LEFT] += pair_obj[consts.LEFT]
                total[consts.RIGHT] += pair_obj[consts.RIGHT]
            }
        }
        return true
    })

    return total;
};

export const checkWinner = (total) => {

    let winner = false

    if (total[consts.LEFT] > consts.GAME_END && total[consts.LEFT] > total[consts.RIGHT]) {
        winner = consts.LEFT
    }
    else if (total[consts.RIGHT] > consts.GAME_END && total[consts.RIGHT] > total[consts.LEFT]) {
        winner = consts.RIGHT
    }

    return winner;
};