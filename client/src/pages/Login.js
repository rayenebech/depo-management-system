import React , {useContext, useState} from "react";
import gorsel from "../images/login_ ekrani_gorseli.png"
import {useHistory} from "react-router-dom";
import logo from "../images/logo.png"
import {Link} from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
const Login = () => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const { setAuthState } = useContext(AuthContext);
  const submitHandler = (e) =>{
    e.preventDefault();
    const data={
      username:  email,
      password: password,
    }
    console.log(data);
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        window.location.href = `http://localhost:3000/dashboard`;
      }
    });
  }

  return (
    <div className="loginp">
   <header className="mynavbar">
        <Link to='/'><img class="logo" src={logo} alt="logo" /> </Link>
       <ul>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/about'>About Us</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
      </ul>
    </header>
    <div>
      <img
      class="loginimg"
      src={gorsel}
      alt="login picture"
    />
    </div>
    
    <div class="loginForm">
      <form  onSubmit={submitHandler}>
        <p class="loginyazi">EMAIL</p>
        <input type="email" class="doldurma" required value= {email}
              onChange = { e => setEmail(e.target.value)}/>
        <p class="loginyazi">PASSWORD</p>
        <input type="password" class="doldurma"  required value= {password}
              onChange = { e => setPassword(e.target.value)}/>
        <input type="submit" value="ENTER" class="loginbuton" />
      </form>
    </div>
  </div>
  )
  
};

export default Login;