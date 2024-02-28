import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import Score from "./score"
import Pause from "./assets/pause.png"
import Music from "./assets/music.png"
import btn1MusicTrigger from "./assets/div1-music.mp3"
import btn2MusicTrigger from "./assets/div2-music.mp3"
import btn3MusicTrigger from "./assets/div3-music.mp3"
import btn4MusicTrigger from "./assets/div4-music.mp3"
import gameOverTrigger from "./assets/lost.mp3"

import "./game.css"

function Game(){

    var btn1Music = new Audio(btn1MusicTrigger);
    var btn2Music = new Audio(btn2MusicTrigger);
    var btn3Music = new Audio(btn3MusicTrigger);
    var btn4Music = new Audio(btn4MusicTrigger);
    var gameOverMusic = new Audio(gameOverTrigger);

    var [boxes, setBoxes] = useState([]);
    var [score , setScore] = useState(0)
    var [gameBegin , setGameBegin] = useState(false)
    var [buttonClick ,  setButtonClick] = useState(false)
    var green = document.getElementById("greenBtn");
    var red = document.getElementById("redBtn");
    var yellow = document.getElementById("yellowBtn");
    var blue = document.getElementById("blueBtn");
    var count = useRef(0);
    var value;


    useEffect(()=>{

        boxes.map((box,index)=>{
            value = index;
            setTimeout(() => {
                if(box == 1){
                    btn1Music.currentTime = 0;
                    btn1Music.play()
                    green.style.backgroundColor = "#08ff00"
                    setTimeout(() => {
                        green.style.backgroundColor = "#05A100"
                    }, 500);
                }
                else if(box == 2){
                    btn2Music.currentTime = 0;
                    btn2Music.play()
                    red.style.backgroundColor = "#ff0200"
                    setTimeout(() => {
                        red.style.backgroundColor = "#7E0100"
                    }, 500);
                }
                else if(box == 3){
                    btn3Music.currentTime = 0;
                    btn3Music.play()
                    yellow.style.backgroundColor = "#fcff00"
                    setTimeout(() => {
                        yellow.style.backgroundColor = "#CB9D02"
                    }, 500);
                }
                else{
                    btn4Music.currentTime = 0;
                    btn4Music.play()
                    blue.style.backgroundColor = "#0078ff"
                    setTimeout(() => {
                        blue.style.backgroundColor = "#013D83"
                    }, 500);
                }
            }, index*900);
        })  
        setTimeout(() => {
            setButtonClick(true)
        }, (value+1)*500 );
    },[boxes])

    function handleBeginGame(){
        setButtonClick(false)
        setGameBegin(true)
        let randomNumber = Math.floor(Math.random() * 4) + 1;
        setBoxes((preval)=>{    
            return [...preval,randomNumber];
        });
    }

    function handleClick(event){
        if(buttonClick === true){   
            console.log("true")
        }
        var box = event.target;
        if(boxes[count.current] == box.innerHTML){
            btn4Music.currentTime = 0;
            btn4Music.play();
            count.current = count.current + 1
        }
        else{
            gameOverMusic.currentTime = 0;
            gameOverMusic.play();
            count.current = 0;
            setBoxes([])
            setGameBegin(false)
            setScore(0);
        }
        if(count.current==boxes.length && boxes.length!=0){
            setScore(score+1);
            count.current = 0;
            setTimeout(() => {
                handleBeginGame();
            }, 1000);   
        }
        console.log(score)
    }
    return(
        <div className="main-container">
            <Score forScore={score}/>
            <div className="game-container">
                <div className="con-1">
                    <div onClick={buttonClick ? handleClick:null} className="btn button-1" id="greenBtn">1</div>
                    <div onClick={buttonClick ? handleClick:null} className="btn button-2" id="redBtn">2</div>    
                </div>  
                <div className="restart-div" onClick={gameBegin?null:handleBeginGame}>
                    {gameBegin?<img src={Music} alt="" />:<img src={Pause} alt="" />}
                </div>
                <div className="con-2">
                    <div onClick={buttonClick ? handleClick:null} className="btn button-3" id="yellowBtn">3</div>
                    <div onClick={buttonClick ? handleClick:null} className="btn button-4" id="blueBtn">4</div>
                </div>
            </div>
        </div>
    )
}
export default Game