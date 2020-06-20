import React from 'react';

function ReadyToGo (props) {

    return (
        <div>
            <p className="header">Ready to go ?</p>
            <div className="offset-5 col-2">
                <hr></hr>
            </div>
            <p>When you click begin, we will randomly choose a player to start</p>
        <button onClick={props.begin} className="beginButton">Begin</button>
    </div>
    );
}

export default ReadyToGo