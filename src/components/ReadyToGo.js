import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class ReadyToGo extends Component {
    render() {
        return (
            <div>
                <p className="header">Ready to go ?</p>
                <div className="offset-5 col-2">
                    <hr></hr>
                </div>
                <p>When you click begin, we will randomly choose a player to start</p>
            <button onClick={this.props.begin} className="beginButton">Begin</button>
        </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(ReadyToGo);