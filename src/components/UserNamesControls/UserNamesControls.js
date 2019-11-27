import React from 'react';
import { Button } from 'react-native-material-ui';
import { View, StyleSheet, Text } from 'react-native';
import * as consts from '../../consts'
import FormDialog from '../../containers/DialogWithForm/DialogWithForm'

const UserNamesControls = ( props ) => {

    return (
            <View style={styles.buttons}>

                <FormDialog
                    onPopupClose={props.onPopupClose}
                    onChangeName={props.onChangeName}
                    clickedSide={props.clickedSide}
                    clicked={props.nameClicked}
                    openChangePopup={props.openChangePopup}

                />
                <View style={styles.button}>
                    <Button text={props.leftName}
                            primary={props.side === consts.LEFT}
                            raised
                            onPress={() => props.nameClicked(consts.LEFT)}
                            onLongPress={() => props.handleButtonPress(consts.LEFT)}
                    />
                </View>
                <View style={styles.button}>
                    <Button  text={props.rightName}
                             raised
                             primary={props.side === consts.RIGHT}
                             onPress={() => props.nameClicked(consts.RIGHT)}
                             onLongPress={() => props.handleButtonPress(consts.RIGHT)}
                    />
                </View>
            </View>
    );
};

const styles = StyleSheet.create({
    buttons: {
        // flex: 1,
        flexDirection: 'row',
        // justifyContent: 'space-around',
        alignItems: 'stretch',
        marginBottom: 5
    },
    button: {
        flex: 2,
    },
});

export default UserNamesControls;