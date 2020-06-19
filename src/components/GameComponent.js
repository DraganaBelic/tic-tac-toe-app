import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from './Board';
import History from './History';
import { toggleNextPlayer, addSelectedFieldToStore, updateHistory, addWinner } from '../actions/actionCreators';
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
        const {dispatch} = this.props
        dispatch(toggleNextPlayer(getFromLocalStorage('oIsNext')));
        dispatch(updateHistory(getFromLocalStorage('history')))
        dispatch(addSelectedFieldToStore(getFromLocalStorage('selectedFields')))
    }

    componentWillUnmount() {
        localStorage.clear();
    }

    onPlayerMove = (i) => {
        const {dispatch, oIsNext, history} = this.props
        let disabledSquares = []
        let currentHistory = history ? [...history] : []
        let xSquares = []
        let oSquares = []
        
        dispatch(toggleNextPlayer(!oIsNext))
        currentHistory.push({
            player: oIsNext ? 1 : 0,
            square: i
        })
        dispatch(updateHistory(currentHistory))
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
        dispatch(addSelectedFieldToStore(newMap))
          this.setState({
              clicked: true,
              disabledSquares: disabledSquares
        })
        let localStorageObject = {
            history: JSON.stringify(currentHistory),
            oIsNext: oIsNext,
            selectedFields: JSON.stringify(newMap)
        }
        setToLocalStorage(localStorageObject)
        getFromLocalStorage('history')
        this.checkWinner(xSquares, oSquares)
    }

    checkWinner(xSquares, oSquares) {
        let winner
        for(let i=0; i<solutions.length; i++) {
            if(xSquares.includes(solutions[i][0]) && xSquares.includes(solutions[i][1]) && xSquares.includes(solutions[i][2])) {
                winner = {
                    winner: 'X',
                    looser: 'O'
                }
            }
            if(oSquares.sort().includes(solutions[i][0]) && oSquares.sort().includes(solutions[i][1]) && oSquares.sort().includes(solutions[i][2])) {
                winner = {
                    winner: 'O',
                    looser: 'X'
                }
            }
        }
        if(xSquares.length + oSquares.length == 9 && !winner) {
            winner = {
                tie: 'It\'s a tie'
            }
        }
        if(winner) {
            this.props.dispatch(updateHistory([]))
            this.props.dispatch(addWinner(winner))
        }
    }

    onUndo = (values) => {
        const {dispatch, history, oIsNext} = this.props
        let disabledSquares = []
        let currentHistory = history ? [...history] : []

        dispatch(toggleNextPlayer(!oIsNext))

        currentHistory.splice(history.length-1, 1)
        dispatch(updateHistory(currentHistory))
        currentHistory.map(el => 
            disabledSquares.push(el.square)
        )
        let newMap = currentHistory.reduce(function(map, obj) {
            map[obj.square] = obj.player;
            return map;
        }, {});
        dispatch(addSelectedFieldToStore(newMap))
        this.setState({ disabledSquares: disabledSquares })
        let localStorageObject = {
            history: JSON.stringify(currentHistory),
            oIsNext: oIsNext,
            selectedFields: JSON.stringify(newMap)
        }
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

function mapStateToProps(state) {
    return {
        oIsNext: state.oIsNext,
        history: state.history
    };
}
export default connect(
    mapStateToProps,
)(GameComponent);