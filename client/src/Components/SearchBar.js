import React from "react";
import magnifier from "../images/magnifier.png";


const searchBar = () =>{
      return (
        <div className = "SearchBar">
            <a href="https://www.youtube.com/"><img src={magnifier} alt="search icon"/></a>
        </div>
      );
    
}
export default searchBar;