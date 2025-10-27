import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
// import Card from "../components/Card";
// import Single from "./Single";
// import { Link } from "react-router-dom";
import './Leaderboard.css';
export default function Home() {
  const [foodItem, setFoodItem] = useState([]);
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/scoreData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    // console.log(response);
    setFoodItem(response);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div>
        {" "}
        <Navbar />
      </div>
      {/* <div>
        {(localStorage.getItem("authToken")) ?
          <div>
            <Link className="nav-link active" aria-current="page" to="/Single">Single User</Link>
          </div>
          : ""
        }
      </div>

      <div>
        {(localStorage.getItem("authToken")) ?
          <Link className="nav-link active" aria-current="page" to="/">Multiuser User</Link>
          : ""
        }
      </div>
      <div>
        {(localStorage.getItem("authToken")) ?
          ""
          : <div> Try Demo </div>
        }
      </div> */}
      <div>
         {
          foodItem!==[]
             ?
             <div className="LeaderboardTable">
                <table>
                <tr>
                    <th>Email</th>
                    <th>Speed</th>
                </tr>
                {
                    foodItem.map((data)=>{
                    return ( 
                    <tr>
                        <td>{data.email}</td>
                        <td>{Math.max(...data.score)}</td>
                    </tr>
                    )})
                }
                </table>
            </div>
        :<div>"""""</div>
        }
      </div>
      {/* <div>
        <Footer />
      </div> */}
    </div>
  );
}
