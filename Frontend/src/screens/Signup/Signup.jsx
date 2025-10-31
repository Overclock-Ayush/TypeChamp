import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import iconimage from "../../assets/Rectangle_11.png";
import "./Signup.css";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password match check
    if (credentials.password !== credentials.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Backend API URL — comes from Render env variable in production
    const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

    try {
      const response = await fetch(`${API_BASE}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      console.log("Response:", json);

      if (json.success) {
        localStorage.setItem("authToken", json.authToken);
        console.log("Auth token:", json.authToken);
        navigate("/");
      } else {
        alert(json.message || "Signup failed. Try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="background">
          <div className="BackgroundLeft"></div>
          <div className="BackgroundRight"></div>
        </div>

        <form onSubmit={handleSubmit} className="SignupForm">
          <div className="SignFormContainer">
            <div className="SignFormContainerLeft">
              <h1 className="SignWelcome">Create Account</h1>
              <p className="SignQuotation">
                Create an account to start playing the game.
              </p>

              <div className="SignhtmlForm-group">
                <label htmlFor="name" className="SigninputLabel">
                  Username
                </label>
                <input
                  type="text"
                  className="Signinput"
                  id="name"
                  placeholder="Enter Username"
                  name="name"
                  value={credentials.name}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="SignhtmlForm-group">
                <label htmlFor="email" className="SigninputLabel">
                  Email
                </label>
                <input
                  type="email"
                  className="Signinput"
                  id="email"
                  placeholder="Enter Email"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="SignhtmlForm-group">
                <label htmlFor="password" className="SigninputLabel">
                  Password
                </label>
                <input
                  type="password"
                  className="Signinput"
                  id="password"
                  placeholder="Enter Password"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="SignhtmlForm-group">
                <label
                  htmlFor="confirmPassword"
                  className="SigninputLabel"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="Signinput"
                  id="confirmPassword"
                  placeholder="Re-enter Password"
                  name="confirmPassword"
                  value={credentials.confirmPassword}
                  onChange={onChange}
                  required
                />
              </div>

              <button type="submit" className="SignupFormButton">
                SIGN UP
              </button>
            </div>

            <div className="SignFormContainerRight">
              <div className="SignButtonGroup">
                <h4 className="SignNoAccount">Already have an account?</h4>
                <span>
                  <Link to="/Login" className="SignupFormLogin">
                    LOG IN
                  </Link>
                </span>
              </div>
              <img src={iconimage} alt="Signup Visual" className="SignImage" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
