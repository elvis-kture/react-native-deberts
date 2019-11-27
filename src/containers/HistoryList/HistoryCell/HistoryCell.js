import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import * as consts from '../../../consts';

const HistoryCell = (props) => {
    background = (props.index)%2 == 0 ? {backgroundColor: 'lightgray'} : {}
    textColor = (props.index)%2 == 0 ? '#000' : '#fff'

    return <View style={{ ...background, paddingBottom: 20}}>
            <View style={styles.buttons}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 20, color: textColor}}>
                    {props.date}
                </Text>
                <View style={{top: 40}}>
                    <Icon
                        onPress={props.deleted}
                        name="remove-circle"
                        size={30}
                        color="red"
                    />
                </View>
            </View>
            <View style={styles.buttons}>
                <Text style={{fontSize: 20, color: (consts.LEFT === props.winner ? 'red' : textColor)}}>
                    {props.sideNames[consts.LEFT]}
                </Text>
                <Text style={{marginRight: 70, fontSize: 20, color: (consts.RIGHT === props.winner ? 'red' : textColor)}}>
                    {props.sideNames[consts.RIGHT]}
                </Text>
            </View>
            <View style={styles.buttons}>
                <Text style={{color: (consts.LEFT === props.winner ? 'red' : textColor)}}>
                    {props.pair_obj[consts.LEFT]}
                </Text>
                <Text style={{marginRight: 65, color: (consts.RIGHT === props.winner ? 'red' : textColor)}}>
                    {props.pair_obj[consts.RIGHT]}
                </Text>
            </View>
    </View>
};

const styles = StyleSheet.create({
    block: {
        flex: 2,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        fontSize: 40
    },
    button: {
        fontSize: 40
    }
});

export default HistoryCell;