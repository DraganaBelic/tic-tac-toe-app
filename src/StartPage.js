import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReadyToGo from './components/ReadyToGo';
import GameComponent from './components/GameComponent';
import GameResultPage from './components/GameResultPage';
import { addWinner, updateHistory, addSelectedFieldToStore } from './actions/actionCreators';
import { getFromLocalStorage, setToLocalStorage } from './storage';


class StartPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            gameStart: false
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(updateHistory(getFromLocalStorage('history')));
      }
    onBegin = () => {
        this.setState({gameStart: true})
    }

    playAgain = () => {
        const { dispatch } = this.props
        this.setState({gameStart: true})
        dispatch(addWinner(null))
        dispatch(updateHistory(null))
        dispatch(addSelectedFieldToStore(null))
    }
    render() {

        const { winner } = this.props
        let randomValue = parseInt(Math.random() * 2) ? true : false
        return (
            <div>
                { !this.state.gameStart  && !this.props.history ?
                    <ReadyToGo begin={this.onBegin} /> // prva strana: game start false, history [], winner undefined

                    :
                    winner ?
                    <GameResultPage winner={winner.winner} tie={winner.tie}  looser={winner.looser} playAgain={this.playAgain} /> //game start true, winner defined
                    :
                    <GameComponent /> // game start true, winner undefined
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        winner: state.winner,
        history: state.history
    };
}
export default connect(
    mapStateToProps,
)(StartPage);