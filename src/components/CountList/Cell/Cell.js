import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import * as consts from '../../../consts';

const Cell = ( props ) => {

    background = (props.index)%2 == 0 ? {backgroundColor: 'lightgray'} : {}
    color = (props.index)%2 == 0 ? {} : {color: '#fff'}

    return <View style={{...styles.blocks, ...background}}>
        <View style={{flex: 2}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', top: 10, left: 20, ...color}}>{props.pair_obj[consts.LEFT]}</Text>
        </View>
        <View style={{flex: 3}}>
            <Text style={{
                ...color,
                fontSize: 20,
                fontWeight: 'bold',
                position: 'absolute',
                top: 10
            }}>{props.pair_obj[consts.RIGHT]}</Text>
            {
                props.pair_obj[consts.RIGHT] !== consts.WINNER && props.pair_obj[consts.LEFT] !== consts.WINNER ?
                    <View style={{marginTop: 10, marginLeft: 20}}>
                            <Icon

                                onPress={props.deleted}
                                name="remove-circle"
                                size={30}
                                color="red"
                            />
                    </View>
                    : null
            }
        </View>
    </View>
};

const styles = StyleSheet.create({
    blocks: {
        height: 50,
        textAlign: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
    block: {
        flex: 2,
    },
});

export default Cell;