import React, { useEffect, useRef, useState } from 'react';
import './Typing.css';

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

function Timer(props){
    const {correctWords,startCounting,cloud} = props;
    const [timeElapsed,setTimeElapsed] = useState(0);
    useEffect(()=>{
        let id
        if(startCounting===true&&startCounting<6){
            id = setInterval(()=>{
                setTimeElapsed(oldTime=>oldTime+1)
            },1000)
        }
        return ()=>{
            clearInterval(id);
        }
    },[startCounting])
    const minutes = timeElapsed/60;
    return <div>
        <p>Time : {timeElapsed}</p>
        <p>Speed : {((correctWords/minutes)||0).toFixed(2)} WPM</p>
        <p>Accuracy : {((correctWords/cloud.current.length).toFixed(2))*100}%</p>
    </div>

}

function Typing() {

    const [userInput,setUserInput] = useState("");
    const[startCounting,setStartCounting] = useState(false)
    const cloud = useRef(getcloud());

    const [activeWordIndex,setActiveWordIndex] = useState(0);

    const [correctWordArray,setCorrectWordArray] = useState([])

    function processInput(value){
        if(startCounting===false)
        {
            setStartCounting(true);
        }
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
                setStartCounting(false)
                document.querySelector('.TextArea').disabled = true;
                return;
            }
        }
        else
        { 
            setUserInput(value);
        }
    }

    return (
        <>
        <h1 className="TypeHeading">Welcome to Typechamp</h1>
        <h5 className="TypeQuote">Let the battle commence</h5>
        <Timer
            startCounting={startCounting}
            correctWords={correctWordArray.filter(Boolean).length}
            cloud={cloud}
        />
        <p className="TypePara">{cloud.current.map((word,index)=>{
            return <Word 
                text={word} 
                active={index===activeWordIndex}
                correct={correctWordArray[index]}
                />
        })}</p>
        <input className="TextArea" type="text" value={userInput} onChange={(e) => processInput(e.target.value)}/>
        </>
    )
}

export default Typing
