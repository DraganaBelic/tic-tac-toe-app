import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fragment } from 'react';

class GameResultPage extends Component {
    componentWillUnmount() {
        localStorage.clear();
    }
    render() {
        return (
            <div>
                {this.props.tie ?
                 <p className="header">{this.props.tie }</p>
                :
                <Fragment>
                <p className="header">Player {this.props.winner ? this.props.winner : '???'} wins</p>
                <p>What a shame Player {this.props.looser ? this.props.looser : '!!!'} looks like you aren't good enough, want to try your luck again ?</p>
                </Fragment>
            }
            <div className="offset-5 col-2">
                <hr></hr>
            </div>
            <button onClick={this.props.playAgain} className="beginButton">Play again</button>
        </div>
        );
    }
}

export default connect(
)(GameResultPage);