import React from "react";
import {Link} from "react-router-dom";
import QuitButton from "./QuitButton";
import logo from "../images/logo.png";


const Navbar = () =>{

  return(
    <div className = "navbar">
      <a href="" class= "logoandbrand">
      <img src= {logo}  alt="logo"/>
      <p>Smart Store</p>
      </a>
      <QuitButton></QuitButton>

    </div>
  )
   
}
export default Navbar;