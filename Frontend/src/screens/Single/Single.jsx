import { generate } from 'random-words';
import React, { useEffect, useState } from "react";
import bg from "../../assets/option2.jpg";
import Navbar from "../../components/Navbar/Navbar";
import Popup from '../../components/popup/Popup';
import "./Single.css";

const NUMB_OF_WORDS = 20;

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

const Single = () => {
    const [cloud,setClouds] = useState([]);
    const [userInput,setUserInput] = useState("");
    const[startCounting,setStartCounting] = useState(false)
    const [activeWordIndex,setActiveWordIndex] = useState(0);
    const [correctWordArray,setCorrectWordArray] = useState([]);
    const [timeElapsed,setTimeElapsed] = useState(0);
    const [speed,setSpeed] = useState(0);
    const [trigger,setTrigger] = useState(false);
    const [accuracy,setAccuracy] = useState(0);
    
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

    //to stop the timer
    function submit(){
        setUserInput("Completed!")
        setStartCounting(false);
        setTrigger(true);
        return;
    }
    
    useEffect(()=>{
        let id;
        if(startCounting){
            id = setInterval(()=>{
                setTimeElapsed((oldTime)=>{
                    if(oldTime>60)
                    {
                        setStartCounting(false);
                        setUserInput("Time Out!");
                        setTrigger(true);
                    }
                    return oldTime+1
                })
            },1000)
        }
        return ()=>{
            clearInterval(id);
        }
    },[startCounting])

    function Display(props){
        const minutes = timeElapsed/60;
        const {correctWords,cloud}=props;
        setSpeed(((correctWords/minutes)||0).toFixed(2));
        setAccuracy((((correctWords/cloud.length||0))*100).toFixed(2));
        return <div className="Data">
      <div className="ScoreDetail">
        <div className="score">
          {timeElapsed}
        </div>
        <div className="text">Time</div>
      </div>
      <div className="ScoreDetail">
        <div className="score">
          {speed}     
        </div>
        <div className="text">Speed (wpm)</div>
      </div>
      <div className="ScoreDetail">
        <div className="score">
          {accuracy}
        </div>
        <div className="text">Accuracy %</div>
      </div>
    </div>
    }


  return (
    <>
      <main>
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
                <div className="ButtonGroup">
                  <button className="start" onClick={start}>Start</button>
                  <button className="submit" onClick={submit}>Submit</button>
                </div>
            </div>
        </div>
      </main>
      <Popup trigger={trigger} speed={speed} setTrigger={setTrigger}>
          <p>Your speed is {speed} wpm and accuracy is {accuracy}%</p>
      </Popup>
    </>
  );
};

export default Single;