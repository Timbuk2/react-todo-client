import axios from "axios";

const UserService = {
  register: function(user) {
    return new Promise(function(resolve, reject) {
      axios
        .post(
          "http://localhost:5000/api/signup",
          {
            username: user.username,
            password: user.password
          },
          {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          { withCredentials: true }
        )
        .then(res => {
          resolve(res);
        });
    });
  },

  login: function(user) {
    return new Promise(function(resolve, reject) {
      axios
        .post(
          "http://localhost:5000/api/login",
          {
            username: user.username,
            password: user.password
          },
          { withCredentials: true }
        )
        .then(res => {
          resolve(res);
        });
    });
  },

  logout: function() {
    return new Promise(function(resolve, reject) {
      axios
        .post("http://localhost:5000/api/logout", {}, { withCredentials: true })
        .then(res => {
          resolve(res);
        });
    });
  }
};

export default UserService;
