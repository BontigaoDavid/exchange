import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login/login.js";
import Dashboard from "./pages/dashboard/dashboard.js";
import Home from "./pages/home/home.js";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/dashboard" exact component={Dashboard}></Route>
            <Route path="/" exact component={Home}></Route>
          </Switch> 
        </Router>
      </div>
    );
  }
}

export default App;