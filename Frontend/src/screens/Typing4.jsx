import React, { useState } from 'react';
import '../components/Typing.css';

function Typing4() {
   const [credentials,setcredentials]=useState({});
    const handleSubmit=async(e)=>{
      
        e.preventDefault();
       let Useremail=localStorage.getItem("Useremail");
        const response=await fetch("http://localhost:5000/api/score",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
        },
        body:JSON.stringify({
          score:credentials,
          email:Useremail
        })
       
    });
       const json=await response.json();
    console.log(json);
    console.log(credentials);
    if(json.success){
     console.log("score sent")
    }
    
    }
  const onChange=(event)=>{
      setcredentials({...credentials,    [event.target.name]:event.target.value})
    }
  
  return (
    <div>Single
      <form onSubmit={handleSubmit}> 
      <input onChange={onChange} name="score"></input>
         <button type="submit" className="m-3 btn btn-success">  Submit
          
          </button>
        </form>
    </div>
  )
}
export default Typing4
