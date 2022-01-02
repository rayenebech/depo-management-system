import React from "react";
import Gorsel from "../images/site_açılışı_görseli.png"
import Logo from "../images/logo.png"
import login from "./Login"
import {Link} from 'react-router-dom';

const Home = () => (
  <div className="home">
    <header className="mynavbar">
    <Link to='/'><img class="logo" src={Logo} alt="logo" /> </Link>
      <ul>  
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/about'>About Us</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
      </ul>
    </header>

    <img
      class="welcome"
      src={Gorsel}
      alt="welcome picture"
    />
    <p class="storeName">SMART</p>
    <p class="storeName2">STORE</p>
    <p class="slogan1">Smart solutions for every company</p>
    <p class="slogan2">
      You can check and manage all of your warehouses and stores
    </p>
    
  </div>
);

export default Home;