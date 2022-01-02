import React from "react";
import gorsel from "../images/Capture.png"
import logo from "../images/logo.png"


const AccessDenied = () =>{
    return (
        <div className= "no-access">
            <img className="access" src={logo} alt="description"/>
            <p>Sorry.. You don't have access to this page. Please Login first</p>
        </div>
    )
}
export default AccessDenied;