import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import Login from "./components/login/Login";
import NavBar from "./components/nav/NavHeader";
import ToDoPageComponent from "./components/todo/ToDoPageComponent";

import "./App.css";

import history from "./config/history";

class App extends Component {
  inputElement = React.createRef();
  constructor() {
    super();
    this.state = {
      items: [],
      currentItem: { text: "", key: "" },
      isAuthenticated: false
    };
  }

  handleAuth = isAuthenticated => {
    this.setState({ isAuthenticated: isAuthenticated });
  };

  render() {
    let navHeader = (
      <NavBar
        isAuthenticated={this.state.isAuthenticated}
        handleAuth={this.handleAuth}
      />
    );

    return (
      <Router history={history}>
        <div className="App">
          {navHeader}
          <Route
            exact
            path="/"
            render={props => <Login {...props} handleAuth={this.handleAuth} />}
          />
          <Route path="/tasks" component={ToDoPageComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
