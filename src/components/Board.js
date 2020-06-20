import React, { Component } from 'react';
import { connect } from 'react-redux';
import Square from './Square';
import { updateHistory } from '../actions/actionCreators';

class Board extends Component {

    constructor(props) {
        super(props)
        this.renderBoard = this.renderBoard.bind(this)

    }

    componentDidUpdate(prevProps, prevState) {
        const { updateHistory, history } = this.props
        if (this.props !== prevProps) {
            updateHistory(history)
        }
    }

    renderBoard(row, col) {
        let board = [];
        let counter =0
        
        for(let i=0; i< row; i+=1){
            let elements = [];
            for(let j=0; j<col; j += 1) {
                elements.push(
                    this.renderSquare(counter++)
                )
            }
            board.push(
                <div key={i} className='board-row'>
                    {elements}
                </div>
            )

        }
        return board
    } 

    renderSquare = (i) => {
        const {oIsNext, selectedField, onSquareClicked, disabledSquares} = this.props
        let squareValue = oIsNext ? 'O' : 'X'
        let pickedValues = selectedField ? selectedField : {}
        let value = pickedValues[i]
        return <Square 
                key={i}
                squareIndex={i}
                squareValue={squareValue}
                value={value}
                onSquareClicked={()=>{onSquareClicked(i)}}
                disabledSquares = {disabledSquares}
                />
    }
    render() {
        return (
            <div className='board-all'>
                <div>{this.renderBoard(3, 3)}</div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateHistory: (history) => dispatch(updateHistory(history))
    }
}

const mapStateToProps = state => {
    return {
        oIsNext: state.oIsNext,
        selectedField: state.selectedField
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);