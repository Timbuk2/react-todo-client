import React, { Component } from "react";
import history from "../../config/history";
import UserService from "../../rest/UserService";

import "./NavStyle.css";

class NavBar extends Component {
  constructor(props) {
    super();
    this.state = {
      isloggedIn: false
    };
  }

  handleLogout = e => {
    UserService.logout().then(res => {
      if (res.data.message === "Success") {
        this.props.handleAuth(false);
        history.push("/");
      }
    });
  };

  render() {
    let logoutButton;
    if (this.props.isAuthenticated) {
      logoutButton = (
        <span class="logout" onClick={() => this.handleLogout()}>
          LOGOUT
        </span>
      );
    }
    return <nav class="nav-bar">{logoutButton}</nav>;
  }
}

export default NavBar;
