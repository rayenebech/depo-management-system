import React, {useContext} from "react";
import logo from "../images/logo.png"
import Box from "../images/box.png"
import List from "../images/list.png"
import Like from "../images/like.png"
import QuitButton from "../Components/QuitButton"
import { AuthContext } from "../helpers/AuthContext";
import NoAccess from "../Components/NoAccess";

const DashBoard = () => {
    const { authState, setAuthState } = useContext(AuthContext);
    console.log(authState);
    const goLogin = () => {
        window.location.href = `http://localhost:3000/login`;
    }
    const goBranches = () => {
        window.location.href = `http://localhost:3000/branches/byuserid/${authState.id}`;
    }

    const goStore = () => {
        window.location.href = `http://localhost:3000/store/products/${authState.id}`;
    }

    const goReports = () => {
        window.location.href = `http://localhost:3000/report/${authState.id}`;
    }
    
        return(
            <div className="dashboard">
               {authState.status ? (<>
    
                <header>
                    <div className="logo onhover">
                        <a><img src={logo}/></a>
                    </div>
                    <QuitButton></QuitButton>
                </header>
                    <div className="ana">
                        
                            <div class="block onhover" onClick={goStore}>
                                <div className="header">WAREHOUSE</div>
                                <div className="image"><img src={Box} alt=""/></div>
                            </div>
                        
                        
                            <div class="block2 onhover" onClick={goBranches}>
                                <div className="header2">BRANCHES</div>
                                <div className="image2"><img src={List} alt=""/></div>
                            </div>
                        
                        
                            <div className="block3 onhover" onClick={goReports}>
                                <div className="header3" >SALE REPORTS</div>
                                <div className="image3"><img src={Like} alt=""/></div>
                            </div>
                        
                    </div>
    
               </>
                   
               ) 
               
               : (<> 
                <NoAccess></NoAccess>
               </>)} 
                
                </div>
      );
    
    
  
}

export default DashBoard;