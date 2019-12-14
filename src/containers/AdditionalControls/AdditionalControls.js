import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { Button } from 'react-native-material-ui';

import {connect} from "react-redux";
import * as actions from '../../store/actions/index';
import * as consts from "../../consts";
import AlertDialog from '../Promp/Promp';


class AdditioanlControls extends Component {

    onMinusHandler(minus){

        let new_row = {
            [consts.LEFT]: 0,
            [consts.RIGHT]: 0

        }
        new_row[this.props.side] = minus

        this.props.onMinus(new_row)
    }

    onBaitHandler(){
        let new_row = {}
        if(this.props.side === consts.LEFT){
            new_row[consts.LEFT] = consts.BAIT
            new_row[consts.RIGHT] = this.props.game
        }
        else{
            new_row[consts.LEFT] = this.props.game
            new_row[consts.RIGHT] = consts.BAIT
        }

        this.props.onMinus(new_row)
    }

    render(){
        const isDisabled = this.props.winner ? true : false;

        return (
            <View style={styles.view}>
                    <View style={styles.buttonsText}>
                        <View style={{flex:2, borderWidth: 1, borderColor: 'red'}}>
                            <Text style={styles.buttonText}>{this.props.total[consts.LEFT]} </Text>
                        </View>
                        <View  style={{flex:2, borderWidth: 1, borderColor: 'red'}}>
                            <Text style={styles.buttonText}>{this.props.total[consts.RIGHT]} </Text>
                        </View>
                    </View>

                    <View style={styles.buttons}>
                        <AlertDialog
                            confirm={this.props.clearRows}
                        />
                        <Button primary raised style={styles.button} text="-&nbsp;50" disabled={isDisabled} onPress={() => this.onMinusHandler(-50)}  />
                        <Button primary raised style={styles.button} text="БАЙТ"  disabled={isDisabled} onPress={() => this.onBaitHandler(-50)} />
                        <Button primary raised style={styles.button} text="-&nbsp;100" disabled={isDisabled} onPress={() => this.onMinusHandler(-100)} />
                    </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    buttons: {
        // height: 50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        marginBottom: 20,
        position: 'relative'
    },
    buttonsText: {
        // height: 50,
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'space-around',
        alignItems: 'stretch',
        marginBottom: 20
    },
    button: {
        color: '#fff'
    },
    buttonText: {
        padding: 10,
        color: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    view: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        flex: 1
    }
});

const mapStateToProps = state => {
    return {
        points: state.dashboard.points,
        side: state.dashboard.side,
        game: state.gameList.game
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onMinus: (row) => dispatch(actions.addRow(row)),
        clearRows: () => dispatch(actions.clearRows()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdditioanlControls);
