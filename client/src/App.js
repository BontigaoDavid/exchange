import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login/login.js";
import Dashboard from "./pages/dashboard/dashboard.js";
import Home from "./pages/home/home.js";
import './App.css';
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isInitialized: false
    } 
  }
  
  componentDidMount() {
    axios.get("http://localhost:3000/server").then(response => {
      console.log(response.data);
      this.setState({ isInitialized: response.data.isRSACertified })
      console.log(this.state);
    })
  }

  render() {
    if (this.state.isInitialized) {
      return (
      <div className="App">
        <Router>
            <Switch>
              <Route path="/login" exact component={Login}></Route>
              <Route path="/users/dashboard" exact component={Dashboard}></Route>
              <Route path="/" exact component={Home}></Route>
            </Switch> 
          </Router>
      </div>
      );
    }

    else {
      return (
        <div className="App">
          Initializing...<br/>
          Requires: RSACertificate
        </div>
        );
    }
  }
}

export default App;