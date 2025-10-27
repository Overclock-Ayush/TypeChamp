import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import iconimage from '../../assets/Rectangle_11.png';
import './Signup.css';


export default function Signup() {
    const [credentials,setcredentials]=useState({});
    let navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/signup",{
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
    
    }
    const onChange=(event)=>{
      setcredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <div>
      <div>
        {" "}
        {/* <Navbar /> */}
      </div>

      <div className="container">
        <div className="background">
          <div className="BackgroundLeft"></div>
          <div className="BackgroundRight"></div>
        </div>
        <form onSubmit={handleSubmit} className="SignupForm"> 
          <div className="SignFormContainer">
            <div className="SignFormContainerLeft">
              <h1 className="SignWelcome">Create Account</h1>
              <p className="SignQuotation">Create a account for playing a game.</p>
              <div className="SignhtmlForm-group">
                <label htmlFor="exampleInputEmail1" className="SigninputLabel">UserName</label>
                <input
                  type="text"
                  className="Signinput"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Username"
                  name="name"
                  onChange={onChange}
                />
              
              </div>
              <div className="SignhtmlForm-group">
                <label htmlFor="exampleInputEmail1" className="SigninputLabel">Email</label>
                <input
                  type="email"
                  className="Signinput"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email"
                  name="email"
                  onChange={onChange}
                />
                
              </div>
              <div className="SignhtmlForm-group">
                <label htmlFor="exampleInputPassword1" className="SigninputLabel">Password</label>
                <input
                  type="password"
                  className="Signinput"
                  id="exampleInputPassword1"
                  placeholder="Enter Password"
                  name="password"
                  onChange={onChange}
                />
              </div>
              <div className="SignhtmlForm-group">
                <label htmlFor="exampleInputPassword1" className="SigninputLabel">Confirm Password</label>
                <input
                  type="password"
                  className="Signinput"
                  placeholder="Re-enter Password"
                  name="password"
                />
              </div>
              <button type="submit" className="SignupFormButton">  
                SIGN UP
              </button>
            </div>
            <div className="SignFormContainerRight">
              <div className="SignButtonGroup">
                <h4 className="SignNoAccount">Already have any account?</h4>
                <span>
                  <Link to="/Login" className="SignupFormLogin">
                    LOG IN
                  </Link>
                </span>
              </div>
              <img src={iconimage} alt="image" className="SignImage"/>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  );
}
