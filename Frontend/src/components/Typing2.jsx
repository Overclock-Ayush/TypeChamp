import React, { useRef, useState } from 'react';
import './Typing2.css';

const getcloud = () => "A son asked his father (a programmer) why the sun rises in the east, and sets in the west. His response? It works, don’t touch!".split(" ").sort(()=>Math.random()>0.5?1:-1)

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

function Typing2()
{
    const cloud = useRef(getcloud());
    const [userInput,setUserInput] = useState("");
    const [startTimer,setstartTimer] = useState(false);
    const [activeWordIndex,setActiveWordIndex] = useState(0);
    const [correctWordArray,setCorrectWordArray] = useState([]);
    const [timeElapsed,setTimeElapsed] = useState(0);
    const [speed,setSpeed] = useState(0);
    const [accuracy,setAccuracy] = useState(0);

    function start(){
        if(startTimer===false)
        {
            setstartTimer(true);
            document.querySelector('.TextArea').disabled = false;
            setUserInput("");
        }
    }

    if(startTimer){
        id = setInterval(()=>{
            setTimeElapsed(oldTime=>oldTime+1)
        },1000)
    }
    else
        clearInterval(id);


    // function Timer(props){
    //     const {correctWords} = props;
        
        // const minutes = timeElapsed/60;
        // return <div>
        //     <p>Time : {timeElapsed}</p>
        //     <p>Speed : {((correctWords/minutes)||0).toFixed(2)} WPM</p>
        //     <p>Accuracy : {((correctWords/cloud.current.length).toFixed(2))*100}%</p>
        // </div>
    // }

    function processInput(value){
        if(value.endsWith(" ")){
            setActiveWordIndex(index=>index+1);
            setUserInput("");
            setCorrectWordArray(data => {
                const word = value.trim();
                const newResult = [...data]
                newResult[activeWordIndex] = word===cloud.current[activeWordIndex];
                return newResult;
            })
            if(activeWordIndex === cloud.current.length-1){
                setUserInput("Completed!")
                setstartTimer(false)
                const minutes = timeElapsed/60;
                const correctWords = correctWordArray.filter(Boolean).length
                setSpeed(((correctWords/minutes)||0).toFixed(2))
                setAccuracy(((correctWords/cloud.current.length).toFixed(2))*100)
                document.querySelector('.TextArea').disabled = true;
                document.querySelector('.start').innerHTML = "Start again";
                return;
            }
        }
        else
        { 
            setUserInput(value);
        }
    }

    function submit(){
        
    }

    return (
        <>
        <h1 className="TypeHeading">Welcome to Typechamp</h1>
        <h5 className="TypeQuote">Let the battle commence</h5>
        {/* <Timer
            startTimer={startTimer}
            correctWords={correctWordArray.filter(Boolean).length}
            cloud={cloud}
        /> */}
        <p className="TypePara">{cloud.current.map((word,index)=>{
            return <Word 
                text={word} 
                active={index===activeWordIndex}
                correct={correctWordArray[index]}
                />
        })}</p>
        <input className="TextArea" type="text" value={userInput} onChange={(e) => processInput(e.target.value)}/>
        <button className="start" onClick={start}>Start</button>
        <button className="submit" onClick={submit}>Submit</button>
        </>
    )
}

export default Typing2
