import React, {useState, useEffect, useRef, useLayoutEffect, useContext} from "react";
import { AuthContext } from "../helpers/AuthContext";

const QuitButton = () =>{

  const { authState, setAuthState } = useContext(AuthContext);


  const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = `http://localhost:3000/`;
    setAuthState({ username: "", id: 0, status: false });
  };

  return(
    <div className = "QuitButton onhover" onClick={logout}>
      
        <p>
          QUIT
        </p>
      

    </div>
  )
   
}
export default QuitButton;

