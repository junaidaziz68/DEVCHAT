import React,{Fragment,useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import './App.css';
import Navbar from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
<Router>
<Fragment>
  
<Navbar />
<Routes>
<Route path = "/"  element = {<Landing />} />
<Route path = "/register" element = {<Register />} />
<Route path = "/login"  element = {<Login />} />
</Routes>
</Fragment>
</Router>   




    
  );
}

export default App;
