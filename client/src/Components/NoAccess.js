import React from "react";
import Capture from "../images/Capture.png"


const NoAccess = () =>{
    const goLogin = () => {
        window.location.href = `http://localhost:3000/login`;
    }
    return (
        <div className= "no-access">
            <img class="access" src={Capture} alt="description" />
            <p>Sorry.. You don't have access to this page. Please Login first</p>
            <button className=" btn btn-primary" onClick={goLogin}>Go to Login page</button>
        </div>
    )
}
export default NoAccess;