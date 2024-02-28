import React from "react"
import "./app.css"
import Header from "./components/header/header"
import Game from "./components/main/game"

function App(){
    return(
        <div className="app">
            <Header />
            <Game />
        </div>
    )
}

export default App