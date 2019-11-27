import React from 'react';
import { View } from 'react-native';
import Dialog from "react-native-dialog";
import { Button } from 'react-native-material-ui';

export default function AlertDialog(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        setOpen(false);
        props.confirm()
    };

    return (
        <View>
            <Button secondary raised style={{color:'red'}} text="Очистить" onPress={handleClickOpen}  />

            <Dialog.Container visible={open}>
                <Dialog.Title>Очистить</Dialog.Title>
                <Dialog.Description>{"Вы уверены, что хотите очистить игру?"}</Dialog.Description>
                <Dialog.Button onPress={handleCancel} label="Отмена" />
                <Dialog.Button bold={true} color={'red'} onPress={handleConfirm} label="Да" />
            </Dialog.Container>
        </View>
    );
}
