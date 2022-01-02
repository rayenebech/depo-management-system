import React from "react";
import Capture from "../images/Capture.png"


const NoAccess2 = () =>{
    const goLogin = () => {
        window.location.href = `http://localhost:3000/`;
    }
    return (
        <div className= "no-access">
            <img class="access" src={Capture} alt="description" />
            <p>Sorry.. Page Not Found. Please go to Home Page</p>
            <button className=" btn btn-primary" onClick={goLogin}>Go to Home Page</button>
        </div>
    )
}
export default NoAccess2;