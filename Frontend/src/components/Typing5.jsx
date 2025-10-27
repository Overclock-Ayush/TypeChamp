import React, { useEffect, useState } from 'react';
import '../components/Typing.css';

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
    const {correctWords,startTimer,cloud} = props;
    const [timeElapsed,setTimeElapsed] = useState(0);
    useEffect(()=>{
        let id
        if(startTimer){
            id = setInterval(()=>{
                setTimeElapsed(oldTime=>oldTime+1)
            },1000)
        }
        return ()=>{
            clearInterval(id);
        }
    },[startTimer])
    const minutes = timeElapsed/60;
    return <div>
        <p>Time : {timeElapsed}</p>
        <p>Speed : {((correctWords/minutes)||0).toFixed(2)} WPM</p>
        <p>Accuracy : {((correctWords/cloud.length).toFixed(2))*100}%</p>
    </div>

}

function Typing5() {
    const [userInput,setUserInput] = useState("");
    const [startTimer,setstartTimer] = useState(false);
    const [activeWordIndex,setActiveWordIndex] = useState(0);
    const [correctWordArray,setCorrectWordArray] = useState([]);
    const [cloud,setCloud] = useState([]);
    if(!startTimer){
        const temp = {generate};
        setCloud([temp]);
    }


    function generate(){
        const clouds = [
            "Now is the time for all good men to come to the aid of their country.",
            "This palindrome contains many common letters, but also some less common ones, which can help you to improve your precision.",
            "The quick brown fox jumps over the lazy dog." ,
            "Typing practice sentences can help improve your typing speed and accuracy.",
            "A son asked his father (a programmer) why the sun rises in the east, and sets in the west. His response? It works, don’t touch!"
        ]
        const index = Math.floor(Math.random()*5);
        const temp = clouds[index];
        const [data,setData] = useState([]);
        let str="";
        for(let i=0;i<temp.length;i++)
        {
            if(temp[i]===" ")
            {
                setData([...data,str]);
                str="";
            }
            else
            {
                str = str+temp[i];
            }
    
        }
        return data;
    }

    function processInput(value){
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
                setUserInput("Completed!")
                setstartTimer(false)
                
                document.querySelector('.TextArea').disabled = true;
                document.querySelector('.Restart').innerHTML = "Start again";
                return;
            }
        }
        else
            setUserInput(value);
    }

  return (
    <>
        <h1 className="TypeHeading">Welcome to Typechamp</h1>
        <h5 className="TypeQuote">Let the battle commence</h5>
        <Timer
            startTimer={startTimer}
            correctWords={correctWordArray.filter(Boolean).length}
            cloud={cloud}
        />
        <p className="TypePara">{cloud.map((word,index)=>{
            return <Word 
                text={word} 
                active={index===activeWordIndex}
                correct={correctWordArray[index]}
                />
        })}</p>
        <input className="TextArea" type="text" value={userInput} onChange={(e) => processInput(e.target.value)}/>
        {/* <button className="Restart" onClick={start}>Submit</button> */}
    </>
  )
}

export default Typing5
