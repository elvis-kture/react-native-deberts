import { View } from 'react-native';
import { connect } from 'react-redux';
import React, { Component } from 'react';


import * as actions from '../store/actions/index';
import HistoryCell from '../containers/HistoryList/HistoryCell/HistoryCell'


class HistoryList extends Component {

    componentDidMount(){
        console.log('HistoryComponentDidMount')
        this.props.onInitHistoryRows();
    }

    render () {

        const history = this
            .props
            .historyArray
            .map((item, key) => {
                return <HistoryCell
                    date={item.date}
                    sideNames={item.sideNames}
                    winner={item.winner}
                    key={key}
                    index={key}
                    pair_obj={item.total}
                    deleted={() => this.props.onDeleteHistoryRow(key)}
                />
            })

        return (
            <View style={{flex:1, backgroundColor: '#313131'}}>
                {history}
            </View>
        )
    }

};

const mapStateToProps = state => {
    return {
        historyArray: state.history,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteHistoryRow: (index) => dispatch(actions.removeHistoryRow(index)),
        onInitHistoryRows: () => dispatch(actions.initHistoryRows()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryList);
