import React, { useState } from 'react';
import Dialog from "react-native-dialog";

import * as consts from '../../consts'

export default function FormDialog(props) {
    const [newName, setNewName] = useState('')
    return (
            <Dialog.Container visible={props.openChangePopup}>
                <Dialog.Title>{consts.CHANGE_NAME_TEXT_TITLE}</Dialog.Title>
                <Dialog.Description>{consts.CHANGE_NAME_TEXT_LABEL}</Dialog.Description>
                <Dialog.Input onChangeText={newName => setNewName(newName)}/>
                <Dialog.Button onPress={props.onPopupClose} label="Отмена" />
                <Dialog.Button onPress={() => props.onChangeName(props.clickedSide, newName)} label="Изменить" />
            </Dialog.Container>
    );
}
