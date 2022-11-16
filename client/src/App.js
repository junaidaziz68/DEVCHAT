import React,{Fragment} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Navbar from './layout/Navbar';
import { Landing } from './layout/Landing';


function App() {
  return (
<Router>
<Fragment>
<Navbar />
<Route path='/' element ={<Landing />} />
</Fragment>
</Router>

    
  );
}

export default App;
