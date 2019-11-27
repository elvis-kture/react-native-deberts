import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { RadioButton } from 'react-native-material-ui';
import { connect } from "react-redux";

import RadioForm from 'react-native-simple-radio-button';

import * as actions from "../../store/actions/index";

const GAME_LIST = [
    {label:162, value:162},
    {label:182, value:182},
    {label:212, value:212},
    {label:222, value:222},
    {label:232, value:232},
    {label:242, value:242},
    {label:252, value:252},
    {label:262, value:262},
    {label:272, value:272},
    {label:282, value:282},
    {label:292, value:292},
    {label:302, value:302},
    {label:312, value:312},
    {label:322, value:322},
    {label:352, value:352},
    {label:362, value:362},
    {label:382, value:382}
]

class GameList extends Component {

    render() {
        return (
            <>
                <RadioForm
                    showsVerticalScrollIndicator={false}
                    radio_props={GAME_LIST}
                    initial={0}
                    buttonSize={20}
                    formHorizontal={false}
                    labelHorizontal={true}
                    buttonColor={'#2196f3'}
                    labelColor={'#c9c9c9'}
                    selectedLabelColor={'#fff'}
                    animation={true}
                    onPress={(game) => this.props.onGameChange(game)}
                />
            </>

        );
    }

};

const mapStateToProps = state => {
    return {
        game: state.gameList.game,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGameChange: (game) => dispatch(actions.gameChange(game)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameList);