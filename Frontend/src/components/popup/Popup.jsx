import React from 'react';
import './Popup.css';

function Popup(props) {
  const {trigger,speed} = props

  const handleSubmit=async(e)=>{
      
      e.preventDefault();
      let Useremail=localStorage.getItem("Useremail");
      const response=await fetch("http://localhost:5000/api/score",{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
      },
      body:JSON.stringify({
        score:Number(speed),
        email:Useremail
      })
    
      });
      const json=await response.json();
      console.log(json);
      console.log(speed);
      if(json.success){
      console.log("score sent")
      }
  }

  return (trigger)?(
    <>
      <form onSubmit={handleSubmit}>
        <div className="popup">
          <div className="popup-inner">
              {props.children}
              <button className="submitScore" onClick={()=>props.setTrigger(false)}>OK</button>
          </div>
        </div>
      </form>
    </>
  ):"";
}

export default Popup
