import React, { Component } from "react";
import SignUp from "../sign-up/SignUp";
import history from "../../config/history";
import UserService from "../../rest/UserService";

import "./LoginStyle.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      userNotFound: false,
      showSignUp: false,
      isAuth: false
    };
  }

  handleLogin = e => {
    const userDetails = {
      username: this.state.username,
      password: this.state.password
    };

    UserService.login(userDetails).then(res => {
      if (res.data.message === "sorry, we coun't find that account") {
        alert(res.data.message);
        this.setState({ userNotFound: true });
      } else {
        this.setState({ isAuth: true });
        this.props.handleAuth(this.state.isAuth);

        history.push("/tasks");
      }
    });
  };

  handleSignup = e => {
    this.setState({ showSignUp: true });
    e.preventDefault();
  };

  render() {
    return (
      <div className="todoListMain">
        <div class="title">Sign In </div>
        <div className="login-details">
          <input
            placeholder="Username"
            name="username"
            type="text"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit" onClick={() => this.handleLogin()}>
            Sign In
          </button>
        </div>
        {this.state.hasEnoughCharacters ? <span>USER NOT FOUND</span> : null}
        <div class="signup-details ">
          <span>
            New here ? &nbsp;
            <a href="f" onClick={this.handleSignup}>
              Sign up
            </a>
          </span>
        </div>
        <div className="header">
          <SignUp
            show={this.state.showSignUp}
            handleAuth={this.props.handleAuth}
          />
        </div>
      </div>
    );
  }
}

export default Login;
