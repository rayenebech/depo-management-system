import React from "react";
import logo from "../images/logo.png"
import mailicon from "../images/mail.png"
import telicon from "../images/telicon.png"
import infoicon from "../images/infoicon.png"
import contactus from "../images/contactus.png"
import facebook from "../images/facebook.png"
import twitter from "../images/twitter.png"
import {Link} from 'react-router-dom';


const Contact = () => {
  return(
  <div className="contact">
    <header className="mynavbar">
    <Link to='/'><img class="logo" src={logo} alt="logo" /> </Link>
      <ul>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/about'>About Us</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
      </ul>
    </header>
    <div className = "content">
    <div class="sidenav">
      <img src={mailicon}/>
      <img src={telicon}/>
      <img src={infoicon}/>
    </div>
    <div className="right-content">
      <div className = "informations">
        <h5>smartstore@gmail.com</h5>
        <h5>Davut Paşa Mah., Davutpaşa Cad., Esenler, İstanbul, Türkiye</h5>
        <h5>+90 212 905 0505</h5>
      </div>
      <div className="imageandsocial">
        <img src={contactus} id="contactus" />
        <div className="socialmedia">
          <div id="twitter"> <a href=""><img src={twitter} /></a> <p>Twitter</p> </div>
          <div id="facebook"> <a href=""><img src={facebook}/></a> <p>Facebook</p> </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  );
}

export default Contact;