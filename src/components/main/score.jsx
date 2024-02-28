import React, { useState } from "react"
import "./score.css"

function Score(props){
    var [bestScore , setBestScore] = useState(0);
    if(props.forScore>bestScore){
        setBestScore(props.forScore);
    }
    return(
        <div className="score-container">
            <div className="curr-score">{props.forScore}</div>
            <div className="best-score">Best Score :- {bestScore}</div>
        </div>
    )
}

export default Score