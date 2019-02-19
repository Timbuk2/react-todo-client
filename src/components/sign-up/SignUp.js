import React, { Component } from "react";
import history from "../../config/history";
import UserService from "../../rest/UserService";

import "./SignUpStyle.css";

class SignUp extends Component {
  constructor(props) {
    super();

    this.state = {
      username: "",
      password: "",
      hasEnoughCharacters: true,
      usernameExists: false,
      isAuth: false
    };
  }

  handleRegisterUser = () => {
    if (this.state.password.length < 7) {
      this.setState({ hasEnoughCharacters: false });
      return;
    } else {
      this.setState({ hasEnoughCharacters: true });
    }

    const userDetails = {
      username: this.state.username,
      password: this.state.password
    };

    UserService.register(userDetails).then(res => {
      if (
        res.data.message === "The username already exists" &&
        res.status === 200
      ) {
        this.setState({ usernameExists: true });
      } else if (res.status === 200) {
        this.setState({ isAuth: true });
        this.props.handleAuth(this.state.isAuth);
        history.push("/tasks");
      }
    });
  };

  render() {
    let passwordWarning = null;
    let usernameExistsWarning = (
      <span class="password-warning">This username is already in use</span>
    );

    if (!this.state.hasEnoughCharacters) {
      passwordWarning = (
        <span class="password-warning">Password is 7 characters minium</span>
      );
    }
    if (this.props.show) {
      return (
        <div className="signup-form">
          <input
            type="text"
            name="Username"
            placeholder="Username"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
          />
          <input
            type="password"
            name="password"
            placeholder="Password (At Least 7 Characters)"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          <div>{passwordWarning}</div>
          <div>{this.state.usernameExists ? usernameExistsWarning : null}</div>

          <button type="submit" onClick={() => this.handleRegisterUser()}>
            Register
          </button>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default SignUp;
