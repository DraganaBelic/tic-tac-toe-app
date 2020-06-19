import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';


class History extends Component {
    render() {
        const { history} = this.props
        let historyOfTurns = []
        if(history) {
           history.forEach((el, index) => historyOfTurns.push(
           <div className='turnsMade row' key={index}>
                <div className="col-8 pl-0">Player {el.player == 0 ? 'O' : 'X'} chose cell {el.square + 1} </div>
                {(index+1==history.length || index+1 == history.length-1) && 
                 <div className="col-4"><Button disabled={index+1!=history.length}  onClick={() => this.props.onUndo(el)} className='undoBtn btn-sm'>Undo</Button></div>}
            </div>
           
           )) 
        }
        return (
            <div className="col-lg-10">
            <p className="historyHeader">Turn History</p>
            <div className="col-lg-8">
                {historyOfTurns && historyOfTurns.length > 0 ? 
                <div>
                    {historyOfTurns}
                </div>
                :
                <p className="noTurnsMade">Currently no turns made</p>
                }
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}
export default connect(
    mapStateToProps,
)(History);