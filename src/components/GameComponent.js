import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from './Board';
import History from './History';
import { toggleNextPlayer, addSelectedFieldToStore, updateHistory, addResult } from '../actions/actionCreators';
import { setToLocalStorage, getFromLocalStorage } from '../storage';

const solutions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]

class GameComponent extends Component {

    constructor(props) {
        super(props)
        this.checkWinner = this.checkWinner.bind(this)
        this.state={
            clicked: false,
            disabledSquares: []
        }
    }

    componentDidMount() {
        const { toggleNextPlayer, updateHistory, addSelectedFieldToStore } = this.props
        // in case of page refresh
        // get data from local storage
        if(getFromLocalStorage('oIsNext')) toggleNextPlayer(getFromLocalStorage('oIsNext'))
        updateHistory(getFromLocalStorage('history'))
        addSelectedFieldToStore(getFromLocalStorage('selectedFields'))
    }

    componentWillUnmount() {
        localStorage.clear();
    }

    onPlayerMove = (i) => {
        const { oIsNext, history, toggleNextPlayer, updateHistory, addSelectedFieldToStore } = this.props
        let disabledSquares = []
        let currentHistory = history ? [...history] : []
        let xSquares = []
        let oSquares = []
        // change players turn
        toggleNextPlayer(!oIsNext)
        currentHistory.push({
            player: oIsNext ? 1 : 0,
            square: i
        })
        // add move to history tab
        updateHistory(currentHistory)
        currentHistory.map(el => {
            el.player == 1 
            ? xSquares.push(el.square)
            : oSquares.push(el.square);
            disabledSquares.push(el.square)
        })
        let newMap = currentHistory.reduce(function(map, obj) {
            map[obj.square] = obj.player;
            return map;
        }, {});
        // add selected field to store
        addSelectedFieldToStore(newMap)
          this.setState({
              clicked: true,
              disabledSquares: disabledSquares
        })
        let localStorageObject = {
            history: JSON.stringify(currentHistory),
            oIsNext: !oIsNext,
            selectedFields: JSON.stringify(newMap)
        }
        // update local storage
        setToLocalStorage(localStorageObject)
        // check if we have a winner 
        this.checkWinner(xSquares, oSquares)
    }

    checkWinner(xSquares, oSquares) {
        const { updateHistory, addResult } = this.props
        let result
        for(let i=0; i<solutions.length; i++) {
            // check is x winner
            if(xSquares.includes(solutions[i][0]) && xSquares.includes(solutions[i][1]) && xSquares.includes(solutions[i][2])) {
                result = {
                    winner: 'X',
                    looser: 'O'
                }
            }
            // check is o winner
            if(oSquares.sort().includes(solutions[i][0]) && oSquares.sort().includes(solutions[i][1]) && oSquares.sort().includes(solutions[i][2])) {
                result = {
                    winner: 'O',
                    looser: 'X'
                }
            }
        }
        // check if it's a tie
        if(xSquares.length + oSquares.length == 9 && !result) {
            result = {
                tie: 'It\'s a tie'
            }
        }
        // if we have winner or it's a tie
        // reset history and declare the winner 
        if(result) {
            updateHistory([])
            addResult(result)
        }
    }

    onUndo = (values) => {
        const { history, oIsNext, toggleNextPlayer, updateHistory, addSelectedFieldToStore } = this.props
        let disabledSquares = []
        let currentHistory = history ? [...history] : []

        // reset player turn
        toggleNextPlayer(!oIsNext)
        // remove last move from history
        currentHistory.splice(history.length-1, 1)
        updateHistory(currentHistory)

        currentHistory.map(el => 
            disabledSquares.push(el.square)
        )
        let newMap = currentHistory.reduce(function(map, obj) {
            map[obj.square] = obj.player;
            return map;
        }, {});
        addSelectedFieldToStore(newMap)
        // update disabled buttons
        this.setState({ disabledSquares: disabledSquares })
        let localStorageObject = {
            history: JSON.stringify(currentHistory),
            oIsNext: oIsNext,
            selectedFields: JSON.stringify(newMap)
        }
        // update local storage
        setToLocalStorage(localStorageObject)
    }

    render() {
        const {oIsNext, history} = this.props
        let player = oIsNext ? 'Players X\'s turn' : 'Players O\'s turn' 
        return (
            <div>
                <div className='gameHeader'>
                    <p>{player}</p>
                </div>
                <div className='gameBody row'> 
                    <div className='col-md-12 col-lg-7 game-board'>
                        <Board 
                            onSquareClicked={this.onPlayerMove}
                            history={history}
                            rerender={this.state.clicked}
                            disabledSquares={this.state.disabledSquares}
                        />   
                    </div>
                    <div className='col-md-12 col-lg-5 history-board'>
                        <History 
                        history={history}
                        onUndo={this.onUndo}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateHistory: history => dispatch(updateHistory(history)),
        addResult: result => dispatch(addResult(result)),
        toggleNextPlayer: oIsNext => dispatch(toggleNextPlayer(oIsNext)),
        addSelectedFieldToStore: field => dispatch(addSelectedFieldToStore(field))
    }
}

const mapStateToProps = state => {
    return {
        oIsNext: state.oIsNext,
        history: state.history
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameComponent);