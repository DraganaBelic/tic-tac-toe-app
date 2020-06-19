import React from 'react';

export default function Square(props) {

    let disable = props.disabledSquares.indexOf(props.squareIndex) > -1
    let renderValue= "N"
    let classes = []
    classes.push('squareButton')
    if(props.value === 1) {
         renderValue= "X"
        classes.push('xValue')
    }

    if(props.value === 0) {
         renderValue= "O"
         classes.push('oValue')
    }

        return (
                <button 
                    disabled = {disable}
                    className={classes.join(" ")}
                    onClick={props.onSquareClicked} >
                    {renderValue}
                </button>
        );
}
