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
        if (this.props !== prevProps) {
          this.props.dispatch(updateHistory(this.props.history));
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
        const {oIsNext, selectedField} = this.props
        let squareValue = this.props.oIsNext ? 'O' : 'X'
        let pickedValues = selectedField ? selectedField : {}
        let value = pickedValues[i]
        return <Square 
                key={i}
                squareIndex={i}
                squareValue={squareValue}
                value={value}
                onSquareClicked={()=>{this.props.onSquareClicked(i)}}
                disabledSquares = {this.props.disabledSquares}
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

function mapStateToProps(state) {
    return {
        oIsNext: state.oIsNext,
        selectedField: state.selectedField
    };
}
export default connect(
    mapStateToProps,
)(Board);