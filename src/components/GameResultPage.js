import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';

class GameResultPage extends Component {
    componentWillUnmount() {
        localStorage.clear();
    }
    render() {
        const { winner, tie, playAgain, looser } = this.props
         return (
            <div>
                {tie ?
                 <p className="header">{tie }</p>
                :
                <Fragment>
                <p className="header">Player {winner ? winner : '???'} wins</p>
                <p>What a shame Player {looser ? looser : '!!!'} looks like you aren't good enough, want to try your luck again ?</p>
                </Fragment>
            }
            <div className="offset-5 col-2">
                <hr></hr>
            </div>
            <button onClick={playAgain} className="beginButton">Play again</button>
        </div>
        );
    }
}

export default connect(
)(GameResultPage);