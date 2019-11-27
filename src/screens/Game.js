import { View } from 'react-native';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import CountList from '../components/CountList/CountList';
import * as actions from '../store/actions/index';
import * as consts from '../consts';
import AdditionalControls from '../containers/AdditionalControls/AdditionalControls';
import { calculatePointsTotal, checkWinner } from "../store/utility";
import SnackBar from 'react-native-snackbar-component';


class Game extends Component {

    constructor(props) {
        super()

        this.state = {
            error_rount_count: false,
            show_change_popup: false,
            clicked_name_side: false,
            game_finished: false,
            new_game: false
        }

        if (props.navigation.getParam('newGame', false)) {
            props.onNewGame()
            props.onChangeName(consts.LEFT, consts.DEFAULT_LEFT_NAME)
            props.onChangeName(consts.RIGHT, consts.DEFAULT_RIGHT_NAME)
        }

    }

    componentDidMount () {

        AsyncStorage.getItem('last_game', (err, result) => {
            storedGame = JSON.parse(result)

            const storedPoints = storedGame && storedGame.hasOwnProperty('points') ? storedGame.points : []
            const total = calculatePointsTotal(storedPoints)
            const winner = checkWinner(total)

            lastState = {
                points: storedPoints,
                total: total,
                winner: winner
            }

            this.props.onInitRows(lastState);

        });

    }

    onPopupClose = () => {
        this.setState({show_change_popup: false})
    }

    handleButtonPress = (side) => {
        this.setState({show_change_popup: true})
        this.setState({clicked_name_side: side})
    }

    onChangeName = (side, name) => {
        this.setState({show_change_popup: false})
        this.props.onChangeName(side, name)
    }

    nameClickedHandler = ( side ) => {
        this.props.onChangeSide(side)
    }

    handleSnackCloseHandler = () => {
        this.setState({error_rount_count: false})
    }

    initialChangeHandler = (points_amount) => {
        this.props.onInitialChange(parseInt(points_amount) | 0)
    }

    rowDeletedHandler = (index) => {
        this.props.onDeleteRow(index)
    }

    roundCalculateHandler = (input) => {
        //Change only if round points non zero values and not more than a game
        if (this.props.initial && this.props.initial <= this.props.game){

            this.setState({error_rount_count: false})

            let newRow = {}

            if (this.props.side === consts.RIGHT) {
                newRow[consts.LEFT] = this.props.game - this.props.initial
                newRow[consts.RIGHT] = this.props.initial
            }
            else {
                newRow[consts.RIGHT] = this.props.game - this.props.initial
                newRow[consts.LEFT] = this.props.initial
            }

            this.props.onAddRow(newRow)
            input.clear()
            input.blur()
        }
        else {
            this.setState({error_rount_count: true})
        }
    }

    render () {
        return (
            <View style={{flex:1, backgroundColor: '#313131'}}>

                <SnackBar
                    position="top"
                    visible={this.state.error_rount_count}
                    textMessage="Введите правильный счет!"
                    actionHandler={() => this.handleSnackCloseHandler()}
                    actionText="Х"/>

                <View  style={{flex:4}}>
                    <CountList
                        isNewGame={false}
                        clickedSide={this.state.clicked_name_side}
                        onChangeName={this.onChangeName}
                        onPopupClose={this.onPopupClose}
                        handleSnackClose={this.handleSnackCloseHandler}
                        handleButtonPress={this.handleButtonPress}
                        nameClicked={this.nameClickedHandler}
                        roundCalculate={this.roundCalculateHandler}
                        initial={this.props.initial}
                        initialChange={this.initialChangeHandler}
                        error_round_count={this.state.error_rount_count}
                        rowDeleted={this.rowDeletedHandler}
                        points={this.props.points}
                        total={this.props.total}
                        side={this.props.side}
                        winner={this.props.winner}
                        leftName={this.props.leftName}
                        rightName={this.props.rightName}
                        openChangePopup={this.state.show_change_popup}
                    />
                </View>


                <View  style={{flex:1}}>
                    <AdditionalControls
                        total={this.props.total}
                        winner={this.props.winner}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.dashboard.initial, '---')
    return {
        total: state.dashboard.total,
        initial: state.dashboard.initial,
        points: state.dashboard.points,
        side: state.dashboard.side,
        winner: state.dashboard.winner,
        leftName: state.dashboard.sideNames[consts.LEFT],
        rightName: state.dashboard.sideNames[consts.RIGHT],
        game: state.gameList.game,
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onInitRows: (lastState) => dispatch(actions.setRows(lastState)),
        onInitialChange: (value) => dispatch(actions.updateInitial(value)),
        onAddRow: (row) => dispatch(actions.addRow(row)),
        onDeleteRow: (index) => dispatch(actions.removeRow(index)),
        onChangeSide: (side) => dispatch(actions.changeSide(side)),
        onChangeName: (side, name) => dispatch(actions.changeName(side, name)),
        onNewGame: () => dispatch(actions.clearRows()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);

// export default Game;
