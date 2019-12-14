import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ScrollView, FlatList } from 'react-native';

import {
    OutlinedTextField,
} from 'react-native-material-textfield';

import Cell from './Cell/Cell';
import UserNamesControls from '../UserNamesControls/UserNamesControls';

import classes from './CountList.module.css';
import * as consts from '../../consts';
import GameList from '../GameList/GameList';


const CounterList = ( props ) => {

    let pairs_table = props.points.map((pair_obj, key) => {
        return {
            html: <Cell
                index={key}
                key={key}
                pair_obj={pair_obj}
                deleted={() => props.rowDeleted(key)}
            />,
            key
        }
    })

    if (props.winner) {
        if (props.winner === consts.LEFT) {
            pairs_table.push({
                    html:
                        <Cell
                            key={consts.WINNER}
                            pair_obj={{[consts.LEFT]: consts.WINNER, [consts.RIGHT]: '...'}}
                            deleted={() => props.rowDeleted(consts.WINNER)}
                        />,
                    key: consts.WINNER
                }
            )
        }
        else {
            pairs_table.push(
                {html:
                    <Cell
                        key={consts.WINNER}
                        pair_obj={{[consts.RIGHT]: consts.WINNER, [consts.LEFT]: '...'}}
                        deleted={() => props.rowDeleted(consts.WINNER)}
                    />,
                    key:consts.WINNER
                }
            )
        }
    }

    return (
        <View style={{flex:1}}>
            <View style={styles.nameBlock}>
                <View style={{flex:3, }}>
                    <OutlinedTextField
                        style={{color: '#ffffff'}}
                        baseColor={'#ffffff'}
                        color={'#ffffff'}
                        ref={input => { this.textInput = input }}
                        className={classes.CountText}
                        label='Ввод счета'
                        keyboardType='number-pad'
                        onChangeText={props.initialChange}
                    />
                </View>
                <View style={{flex:2, paddingLeft: 5}}>
                    <TouchableOpacity onPress={() => props.roundCalculate(this.textInput)} style={{ height: 55, borderRadius: 5, backgroundColor: '#2196f3' }}>
                        <Text style={{color: '#fff', padding: 15, textAlign: 'center'}}>Посчитать</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <UserNamesControls
                clickedSide={props.clickedSide}
                onChangeName={props.onChangeName}
                onPopupClose={props.onPopupClose}
                side={props.side}
                nameClicked={props.nameClicked}
                handleButtonPress={props.handleButtonPress}
                roundCalculate={props.roundCalculate}
                initial={props.initial}
                initialChange={props.initialChange}
                total={props.total}
                leftName={props.leftName}
                rightName={props.rightName}
                openChangePopup={props.openChangePopup}
            />
            <View style={styles.blocks}>
                <View style={{flex:2}}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <GameList/>
                    </ScrollView>
                </View>
                <View  style={{flex:3}}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={pairs_table}
                        renderItem={({ item }) => {
                            return item.html
                        }}
                        keyExtractor={item => ''+item.key}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    blocks: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
    nameBlock: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
});


export default CounterList;