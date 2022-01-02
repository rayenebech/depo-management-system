import './App.css';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import Home from "./pages/Home" 
import About from "./pages/About"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Branches from "./pages/Branches"
import Store from "./pages/Store"
import Report from "./pages/Report"
import Branch from './pages/Branch';
import DashBoard from './pages/DashBoard';
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import NoAccess from './Components/NoAccess';
import NoAccess2 from './Components/NoAccess2';

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  const providerValue = useMemo(() => ({authState, setAuthState}), [authState, setAuthState]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);
  return (
    <AuthContext.Provider value={providerValue}>
      <BrowserRouter>
          
          <main>

            <Switch>
              <Route path="/branches/bybranchid/:id" exact component={Branch}></Route>
              <Route path="/branches/byuserid/:id" exact component={Branches}></Route>
              <Route path="/store/products/:id" exact component={Store}></Route>
              <Route path="/report/:id" exact component={Report}></Route>
              <Route path="/dashboard" exact component={DashBoard}></Route>
              <Route path="/login" exact component={Login}></Route>
              <Route path="/home" exact component={Home}></Route>
              <Route path="/contact" exact component={Contact} ></Route>
              <Route path="/about" exact component={About} ></Route>
              <Route path="/" exact component={Home}></Route>
              <Route path="*" exact component={NoAccess2} /> 
              
            </Switch>
          
          </main>
      </BrowserRouter>
      </AuthContext.Provider>
  );
}

export default App;


