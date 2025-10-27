import { generate } from 'random-words';

import React, { useEffect, useState } from "react";
import bg from "../assets/option2.jpg";
import Navbar from "../components/Navbar/Navbar";
import "./typing6.css";

const NUMB_OF_WORDS = 20
// const seconds=60

function Word(props){
  const {text,active,correct} = props;

  if(correct===true)
  {
      return <span className="correct">{text} </span>
  }
  if(correct===false)
      return <span className="incorrect">{text} </span>
  if(active===true)
      return <span className="active">{text} </span>
  return <span>{text} </span>
}
Word = React.memo(Word)

// function Timer(props){
//     const {correctWords,startCounting,cloud} = props;
//     const [timeElapsed,setTimeElapsed] = useState(0);
//     useEffect(()=>{
//         let id;
//         if(startCounting){
//             id = setInterval(()=>{
//                 if(timeElapsed>10)
//                 {
//                     clearInterval(id);
//                 }
//                 setTimeElapsed(oldTime=>oldTime+1)
//             },1000)
//         }
//         return ()=>{
//             clearInterval(id);
//         }
//     },[startCounting])
//     const minutes = timeElapsed/60;
//     return <div className="Data">
//       <div className="ScoreDetail">
//         <div className="score">
//           {timeElapsed}
//         </div>
//         <div className="text">Time</div>
//       </div>
//       <div className="ScoreDetail">
//         <div className="score">
//           {((correctWords/minutes)||0).toFixed(2)}     
//         </div>
//         <div className="text">Speed (wpm)</div>
//       </div>
//       <div className="ScoreDetail">
//         <div className="score">
//           {(((correctWords/cloud.length||0))*100).toFixed(2)}
//         </div>
//         <div className="text">Accuracy %</div>
//       </div>
//     </div>
  
//   }

const Typing6 = () => {

    const [cloud,setClouds] = useState([]);
    const [userInput,setUserInput] = useState("");
    const[startCounting,setStartCounting] = useState(false)
    const [activeWordIndex,setActiveWordIndex] = useState(0);
    const [correctWordArray,setCorrectWordArray] = useState([]);
    const [timeElapsed,setTimeElapsed] = useState(0);


    // useEffect(()=>{
    //     setClouds(generateWords());
    // },[])

    //to generate a new word
    function generateWords(){
        return new Array(NUMB_OF_WORDS).fill(null).map(()=>generate({minLength : 1,maxLength : 10}))
    }

    //to check wheter the type word matches with the paragraph word
    function processInput(value){
        if(startCounting)
        {
            if(value.endsWith(" ")){
                setActiveWordIndex(index=>index+1);
                setUserInput("");
                setCorrectWordArray(data => {
                    const word = value.trim();
                    const newResult = [...data]
                    newResult[activeWordIndex] = word===cloud[activeWordIndex];
                    return newResult;
                })
                if(activeWordIndex === cloud.length-1){
                    document.querySelector('.TextArea').disabled = true;
                    return;
                }
            }
            else
                setUserInput(value);
        }
    }

    //to start the timer
    function start(){
        setStartCounting(true);
        setClouds(generateWords());
        setActiveWordIndex(0);
        document.querySelector('.TextArea').disabled = false;
        setUserInput("");
        setCorrectWordArray([]);
        setTimeElapsed(0);
    }

    function submit(){
        setUserInput("Completed!")
        setStartCounting(false);
        return;
    }
    
        useEffect(()=>{
        let id;
        if(startCounting){
            id = setInterval(()=>{
                if(timeElapsed>10)
                {
                    clearInterval(id);
                }
                setTimeElapsed(oldTime=>oldTime+1)
            },1000)
        }
        return ()=>{
            clearInterval(id);
        }
    },[startCounting])

    function Display(props){
        const minutes = timeElapsed/60;
        const {correctWords,cloud}=props;
        return <div className="Data">
      <div className="ScoreDetail">
        <div className="score">
          {timeElapsed}
        </div>
        <div className="text">Time</div>
      </div>
      <div className="ScoreDetail">
        <div className="score">
          {((correctWords/minutes)||0).toFixed(2)}     
        </div>
        <div className="text">Speed (wpm)</div>
      </div>
      <div className="ScoreDetail">
        <div className="score">
          {(((correctWords/cloud.length||0))*100).toFixed(2)}
        </div>
        <div className="text">Accuracy %</div>
      </div>
    </div>
    }


  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="single-wrapper">
        <img src={bg} alt="" className="bg" />
        <div className="single-content">
          <h1 className="head1">Welcome to Type Champ</h1>
          <h2 className="head2">Prove Your SWIFT Fingers!</h2>
          <Display
            correctWords={correctWordArray.filter(Boolean).length}
            cloud={cloud}
          />
          <p className="TypePara">{cloud.map((word,index)=>{
            return <Word 
                text={word} 
                active={index===activeWordIndex}
                correct={correctWordArray[index]}
                />
            })}
          </p>
          <input 
            className="TextArea" 
            type="text" 
            value={userInput} 
            onChange={(e) => processInput(e.target.value)}
            placeholder="Start Typing Here"
          />
          <button className="start" onClick={start}>Start</button>
          <button className="submit" onClick={submit}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default Typing6;

