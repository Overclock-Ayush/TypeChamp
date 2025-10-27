import React, { useEffect, useRef, useState } from "react";
// import time from "../../assets/time.png";
// import speed from "../../assets/speed.png";
// import accuracy from "../../assets/accuracy.png";

import "./Demo.css";

const getcloud = () =>
  "A son asked his father (a programmer) why the sun rises in the east, and sets in the west. His response? It works, don’t touch!"
    .split(" ")
    .sort(() => (Math.random() > 0.5 ? 1 : -1));

function Word(props) {
  const { text, active, correct } = props;

  if (correct === true) {
    return <span className="correct">{text} </span>;
  }
  if (correct === false) return <span className="incorrect">{text} </span>;
  if (active === true) return <span className="active">{text} </span>;
  return <span>{text} </span>;
}
Word = React.memo(Word);

function Timer(props) {
  const { correctWords, startCounting, cloud } = props;
  const [timeElapsed, setTimeElapsed] = useState(0);
  useEffect(() => {
    let id;
    if (startCounting === true) {
      id = setInterval(() => {
        setTimeElapsed((oldTime) => oldTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(id);
    };
  }, [startCounting]);
  const minutes = timeElapsed / 60;
  return (
    <div className="Data">
      <div className="ScoreDetail">
        {/* <div className="inside"></div> */}
        <div className="time">
          {/* <img src={time} alt="" className="img-time" /> */}
          <div className="score">{timeElapsed}</div>
        </div>

        <div className="text">Time</div>
      </div>
      <div className="ScoreDetail">
        <div className="time">
          {/* <img src={speed} alt="" className="img-time" /> */}
          <div className="score">
            {(correctWords / minutes || 0).toFixed(2)}
          </div>
        </div>

        <div className="text">Speed (wpm)</div>
      </div>
      <div className="ScoreDetail">
        <div className="time">
          {/* <img src={accuracy} alt="" className="img-time" /> */}
          <div className="score">
            {((correctWords / cloud.current.length) * 100).toFixed(2)}
          </div>
        </div>

        <div className="text">Accuracy %</div>
      </div>
    </div>
  );
}

const Demo = () => {
  const [userInput, setUserInput] = useState("");
  const [startCounting, setStartCounting] = useState(false);
  const cloud = useRef(getcloud());

  const [activeWordIndex, setActiveWordIndex] = useState(0);

  const [correctWordArray, setCorrectWordArray] = useState([]);

  function processInput(value) {
    if (startCounting === false) {
      setStartCounting(true);
    }
    if (value.endsWith(" ")) {
      setActiveWordIndex((index) => index + 1);
      setUserInput("");
      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] = word === cloud.current[activeWordIndex];
        return newResult;
      });
      if (activeWordIndex === cloud.current.length - 1) {
        setUserInput("Completed!");
        setStartCounting(false);
        document.querySelector(".TextArea").disabled = true;
        return;
      }
    } else {
      setUserInput(value);
    }
  }

  return (
    <div className="demo-container">
      <div className="demo-1">
        <div className="demo-head">Ready, Set, Type!</div>
        <div className="demo-head-content">
          Welcome to Type Champ, where you can put your fingers to the test and
          see how fast you can type. Get ready to conquer the keyboard and
          improve your skills!
        </div>
        <div className="demo-records">
          <div className="demo-record">
            <div className="demo-record-1 number">100</div>
            <div className="demo-record-2">Achievements</div>
          </div>
          <div className="demo-record">
            <div className="demo-record-1 number">250</div>
            <div className="demo-record-2">WPM Record</div>
          </div>
          <div className="demo-record">
            <div className="demo-record-1 number">3000</div>
            <div className="demo-record-2">Happy Users</div>
          </div>
        </div>
      </div>
      <div className="demo-2">
        <div className="demo-2-head">Test Time!</div>
        <div className="demo-2-content">
          Get ready to shatter typing speed records! Test your skills and
          embrace the thrill of surpassing your limits. Are you up for the
          challenge?
        </div>
        <div className="single-wrapper">
          <Timer
            startCounting={startCounting}
            correctWords={correctWordArray.filter(Boolean).length}
            cloud={cloud}
          />
          <p className="Para">
            {cloud.current.map((word, index) => {
              return (
                <Word
                  text={word}
                  active={index === activeWordIndex}
                  correct={correctWordArray[index]}
                />
              );
            })}
          </p>
          <input
            className="Area"
            type="text"
            value={userInput}
            onChange={(e) => processInput(e.target.value)}
            placeholder="Start Typing Here"
          />
        </div>
      </div>
      <div className="demo-4">
        <div className="demo-4-head">Common Curiosities</div>
        <div className="demo-4-content-main">
          <div className="demo-4-content">
            <div className="demo-upper">
              What is the purpose of the speed typing game?
            </div>
            <div className="demo-lower">
              The speed typing game aims to enhance your typing skills by
              challenging you to improve both your speed and accuracy. It serves
              as an engaging and fun way to practice typing and track your
              progress over time.
            </div>
          </div>
          <hr className="vertical" />
          <div className="demo-4-content">
            <div className="demo-upper">How does the typing test work?</div>
            <div className="demo-lower">
              Simply type the prompted text from the textbox as quickly and
              accurately as possible. Complete the test to see your results
              including accuracy, speed, and time taken.
            </div>
          </div>
          <hr className="vertical" />
          <div className="demo-4-content">
            <div className="demo-upper">Can I improve my typing speed?</div>
            <div className="demo-lower">
              Absolutely! Regular practice with our typing test will help you
              gain muscle memory, speed, and accuracy over time. Set aside some
              time each day to practice typing exercises
            </div>
          </div>
        </div>
      </div>
      <div className="footer">Made with ❤ by Trinetra</div>
    </div>
  );
};

export default Demo;
