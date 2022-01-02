import React from "react";

const BackButton= () =>{
  const goDash = () => {
    window.location.href = `http://localhost:3000/dashboard`
  }
  return(
    <button type="button" class=" goback btn btn-secondary" onClick={goDash}>Go Back</button>
  )
   
}
export default BackButton;