import axios from "axios";

const ToDoService = {
  createNewTask: function(task) {
    return new Promise(function(resolve, reject) {
      axios
        .post(
          "http://localhost:5000/api/tasks/create",
          {
            title: task.title,
            description: task.description,
            doneyet: task.doneyet
          },
          { withCredentials: true }
        )
        .then(res => {
          resolve(res);
        });
    });
  },

  updateTask: function(id, title, description, doneyet) {
    return new Promise(function(resolve, reject) {
      axios
        .post(
          "http://localhost:5000/api/tasks/edit/" + id,
          {
            _id: id,
            title: title,
            description: description,
            doneyet: doneyet
          },
          { withCredentials: true }
        )
        .then(res => {
          resolve(res);
        });
    });
  },

  getAllTasks: function() {
    return new Promise(function(resolve, reject) {
      axios
        .get("http://localhost:5000/api/tasks", { withCredentials: true })
        .then(res => {
          resolve(res);
        });
    });
  },

  deleteTask: function(taskId) {
    return new Promise(function(resolve, reject) {
      axios
        .post(
          "http://localhost:5000/api/tasks/delete/" + taskId,
          {},
          { withCredentials: true }
        )
        .then(res => {
          resolve(res.data);
        });
    });
  }
};

export default ToDoService;
