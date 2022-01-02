import React from "react";
import QuitButton from "./QuitButton";
import logo from "../images/logo.png";
import SearchBar from "./SearchBar";


const FlexNavbar = () =>{
  return(
    <div className = "FlexNavbar">
      <a href="" class= "FlexLogoandBrand">
      <img src= {logo}  alt="FlexLogo"/>
      <p>Smart Store</p>
      </a>
      <SearchBar></SearchBar>
      <QuitButton></QuitButton>
    </div>
  )
   
}
export default FlexNavbar;