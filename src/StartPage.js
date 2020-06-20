import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReadyToGo from './components/ReadyToGo';
import GameComponent from './components/GameComponent';
import GameResultPage from './components/GameResultPage';
import { addResult, updateHistory, addSelectedFieldToStore, toggleNextPlayer } from './actions/actionCreators';
import { getFromLocalStorage } from './storage';


class StartPage extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            gameStart: false
        }
    }
    componentDidMount() {
        const { updateHistory } = this.props;
        updateHistory(getFromLocalStorage('history'));
    }

    getRandomValue = () => { return Math.random() > 0.5 ? true : false }
    
    onBegin = () => {
        const { toggleNextPlayer } = this.props
        // get random value to choose player's turn
        let randomValue = this.getRandomValue()
        this.setState({gameStart: true})
        // set value oIsNext to store
        toggleNextPlayer(randomValue)
    }
    
    playAgain = () => {
        const { addResult, updateHistory, addSelectedFieldToStore, toggleNextPlayer } = this.props
        // get random value to choose player's turn
        let randomValue = this.getRandomValue() 
        this.setState({gameStart: true})
        // reset all values
        addResult(null)
        updateHistory(null)
        addSelectedFieldToStore(null)
        // set value oIsNext to store
        toggleNextPlayer(randomValue)
    }
    render() {
        const { result, history } = this.props
        return (
            <div>
                { !this.state.gameStart  && !history ?
                    <ReadyToGo begin={this.onBegin} /> // game start false, history [], winner undefined
                    :
                    result ?
                    <GameResultPage winner={result.winner} tie={result.tie}  looser={result.looser} playAgain={this.playAgain} /> //game start true, winner defined
                    :
                    <GameComponent /> // game start true, winner undefined
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addResult: (result) => dispatch(addResult(result)),
        updateHistory: (history) => dispatch(updateHistory(history)),
        addSelectedFieldToStore: (field) => dispatch(addSelectedFieldToStore(field)),
        toggleNextPlayer: oIsNext => dispatch(toggleNextPlayer(oIsNext))
    }
}

const mapStateToProps = state => {
    return {
        result: state.result,
        history: state.history
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartPage);