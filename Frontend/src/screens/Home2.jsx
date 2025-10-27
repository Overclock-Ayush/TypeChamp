import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
export default function Home() {
 
  return (
    <div>
      <div>
        {" "}
        <Navbar />
      </div>
      <div>
      {(localStorage.getItem("authToken"))?
          <Link className="nav-link active" aria-current="page" to="/">Single User</Link>
        :""
        }
        </div>
      
      <div>
       {(localStorage.getItem("authToken"))?
          <Link className="nav-link active" aria-current="page" to="/">Multiuser User</Link>
        :""
        }
        </div>
      <div>Try Demo</div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
