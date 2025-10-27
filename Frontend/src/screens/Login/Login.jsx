// import MoodIcon from '@mui/icons-material/Mood';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import iconimage from '../../assets/Rectangle_11.png';
import './Login.css';

export default function Login() {
  const [credentials,setcredentials]=useState({});
  let navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
        },
        body:JSON.stringify(credentials)
       
    });
    const json=await response.json();
    console.log(json);
    console.log(credentials);
    if(json.success){
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
    else{
      alert("Oops wrong credentials");
    }
    }
    const onChange=(event)=>{
      setcredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <div>
      {/* <div>
        {" "}
        <Navbar />
      </div> */}

      <div className="container">
        <div className="background">
          <div className="BackgroundLeft"></div>
          <div className="BackgroundRight"></div>
        </div>
        <form onSubmit={handleSubmit} className="LoginForm">
          <div className="FormContainer">
            <div className="FormContainerLeft">
              <h1 className="Welcome">Welcome Back!</h1>
              <h4 className="Quotation">Glad to see you again😊</h4>
              <div className="htmlForm-group">
                <label htmlFor="exampleInputEmail1" className="inputLabel">Email</label>
                <input
                  type="email"
                  className="input"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email"
                  name="email"
                  onChange={onChange}
                />
              </div>
              <div className="htmlForm-group">
                <label htmlFor="exampleInputPassword1" className="inputLabel">Password</label>
                <input
                  type="password"
                  className="input"
                  id="exampleInputPassword1"
                  placeholder="Enter Password"
                  name="password"
                  onChange={onChange}
                />
              </div>
              <button type="submit" className="LoginFormButton">
                {" "}
                LOG IN
              </button>
            </div>
            <div className="FormContainerRight">
              <div className="ButtonGroup">
                <h4 className="NoAccount">Doesn't have any account?</h4>
                <span>
                  <Link to="/Signup" className="LoginFormSign">
                    SIGN UP
                  </Link>
                </span>
              </div>
              <img src={iconimage} alt="image" className="LoginImage"/>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
