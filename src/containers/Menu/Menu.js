import React from 'react';
import { View, Text } from 'react-native';
// import Button from '@material-ui/core/Button';
// import { Link } from 'react-router-dom';
import { Toolbar } from 'react-native-material-ui';

// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import * as classes from './Menu.module.css'

export default function SimpleMenu({navigation}) {
    return (
        <View>
            <Toolbar
                leftElement={<Text onPress={() => navigation.navigate('Home')} style={{color: '#fff', marginLeft: 10, fontSize: 20}}>Главная</Text>}
                onLeftElementPress={ () => alert() }

            />
        </View>
    );
}
