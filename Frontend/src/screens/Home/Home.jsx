import React from "react";
import Navbar from "../../components/Navbar/Navbar";
// import Demo from "../../components/Demo/Demo.jsx";
import { Link } from "react-router-dom";
import homeImg from "../../assets/homeImg.png";
import img1 from "../../assets/img1.png";
// import img2 from "../../assets/img2.png";
// import img3 from "../../assets/img3.png";
import lowerImg from "../../assets/lower.png";
import upperImg from "../../assets/upper.png";
import "./Home.css";
export default function Home() {
  // const navigate = useNavigate();

  return (
    <div>
      <div>
        {" "}
        <Navbar />
      </div>

      <div className="home-body">
        <div className="home-top">
          <img src={homeImg} alt="" className="homeImg" />
          <h1 className="home-heading">
            Unleash your inner speedster.Challenge awaits.
          </h1>
          <div>
            {localStorage.getItem("authToken") ? (
              <Link
                className="nav-link active"
                aria-current="page"
                to="/Single"
              >
                <button className="user single">Single Mode</button>
              </Link>
            ) : (
              ""
            )}
          </div>

          <div>
            {localStorage.getItem("authToken") ? (
              <Link className="nav-link active" aria-current="page" to="/">
                <button className="user multi">Multi Mode</button>
              </Link>
            ) : (
              ""
            )}
          </div>
          <div>
            {localStorage.getItem("authToken") ? (
              ""
            ) : (
              <Link to="/Demo" style={{ textDecoration: "none" }}>
                <button className="demo try">Try Demo!</button>
              </Link>
            )}
          </div>
        </div>
        <div className="home-1">
          <div className="left">Master Your Typing Speed</div>
          <div className="right">
            Welcome to Type Champ, where you can practice your typing skills and
            compete against other speedsters like yourself in an
            adrenaline-pumping race against time!
          </div>
        </div>
        <div className="home-2">
          <div className="get-started">Get Started</div>
          <div className="home-2-below">
            Learn to type like a pro and crush your competition. Join Type Champ
            today!
          </div>
          {/* <div>
            {localStorage.getItem("authToken") ? (
              ""
            ) : (
              <Link to="/Demo" style={{ textDecoration: "none" }}>
                <button className="demo">Try Demo!</button>
              </Link>
            )}
          </div> */}
        </div>
        <div className="home-3">
          <div className="home-3-upper">
            <div className="text-upper">
              <div className="text-upper-1">
                Practice Solo Mode—Take Control of Your Typing
              </div>
              <div className="text-upper-2">
                Choose your level of difficulty and game duration to improve
                your accuracy and speed in a personalized practice session.
                Visualize your progress and real-time speed as you type!
              </div>
            </div>
            <img src={upperImg} alt="" className="upperImg" />
          </div>
          <div className="home-3-lower">
            <img src={lowerImg} alt="" className="lowerImg" />
            <div className="text-lower">
              <div className="text-lower-1">
                Multiplayer Matchup—Challenge Against Fellow Speedsters
              </div>
              <div className="text-lower-2">
                Enter the lobby, meet other players at your level, and face off
                as you all type the same paragraph. Keep an eye on their
                progress, and may the fastest fingers win!
              </div>
            </div>
          </div>
        </div>
        <div className="home-4">
          <h1 className="feedback">Speak Your Mind</h1>
          <div className="feedback-container">
            <div className="feed">
              <img src={img1} alt="" className="img" />
              <div className="name">JASON REED</div>
              <div className="feedback-content">
                I appreciated the clean and intuitive interface of the game. It
                was easy to navigate, making it accessible for all players.
              </div>
            </div>
            <div className="feed">
              {/* <img src={img2} alt="" className="img" /> */}
              <div className="name">SERENA VAUGHN</div>
              <div className="feedback-content">
                The gameplay itself was quite enjoyable. The timed challenges
                and the progression in difficulty kept me engaged and motivated
                to improve my typing speed.
              </div>
            </div>
            <div className="feed">
              {/* <img src={img3} alt="" className="img" /> */}
              <div className="name">MARCUS GRANT</div>
              <div className="feedback-content">
                I was pleased to see that the game also measured typing
                accuracy. This feature is essential as it encourages players to
                focus on both speed and precision, helping them become better
                typists overall.
              </div>
            </div>
          </div>
        </div>
        <div className="footer">Made with ❤ by Trinetra</div>
      </div>
      <div>{/* <Footer /> */}</div>
    </div>
  );
}
