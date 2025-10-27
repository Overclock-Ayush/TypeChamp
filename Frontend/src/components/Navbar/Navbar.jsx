import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";
export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <nav>
        <div className="wrapper">
          <div>
            {!localStorage.getItem("authToken") ? (
              <div className="nav-container">
                <Link className="" to="/">
                  <img src={logo} alt="" className="logo" />
                </Link>
                <div className="btn-container">
                  <Link className="btn btn-login" to="/Login">
                    Login
                  </Link>
                  <Link className="btn btn-signup" to="/Signup">
                    Signup
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="nav-container">
                  <Link className="" to="/">
                    <img src={logo} alt="" className="logo" />
                  </Link>
                  <div className="btn-container">
                    {/* Take to leaderboard section */}
                    <Link className="btn btn-login" to="/Leaderboard">
                      Leaderboard
                    </Link>
                    <div className="btn btn-signup" onClick={handleLogout}>
                      Logout
                    </div>
                  </div>
                </div>
                {/* <div className="btn bg-white text-success">My Profile</div>
                <div
                  className="btn bg-white text-danger"
                  onClick={handleLogout}
                >
                  Logout
                </div> */}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
