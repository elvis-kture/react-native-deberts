import React, { Component } from 'react';
import { connect } from 'react-redux';

import HistoryCell from './HistoryCell/HistoryCell'
import * as actions from "../../store/actions/index";

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
                            pair_obj={item.total}
                            deleted={() => this.props.onDeleteHistoryRow(key)}
                        />
        })

        return (
            <React.Fragment>
                <table style={{width: '100%'}}>
                    <thead>
                    </thead>
                    <tbody>
                    {history}
                    </tbody>
                </table>

            </React.Fragment>
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