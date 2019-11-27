import React from 'react';
import { RadioButton } from 'react-native-material-ui';
// import Radio from '@material-ui/core/Radio';
// import FormControlLabel from '@material-ui/core/FormControlLabel';

import classes from './GameRadioOption.module.css';


const GameRadioList = ( props ) => {

    return (
        <>
            <RadioButton
                className={classes.RadioColor}
                label={props.value}
                checked={props.value === props.game}
                value={props.value}
                onSelect={() => props.changed(props.value)}
            />
        </>
    );
};

export default GameRadioList;