import React, { Component } from "react";
import ToDoItem from "./ToDoItem";
import ToDoService from "../../rest/ToDoService";

import "./ToDoPageStyle.css";

class ToDoPageComponent extends Component {
  constructor() {
    super();
    this.state = {
      taskTitle: "",
      taskDescription: "",
      items: [
        { _id: "", title: "", description: "", doneyet: false, edit: false }
      ]
    };
  }

  componentDidMount = () => {
    ToDoService.getAllTasks()
      .then(res => {
        this.setState({ items: res.data }, function() {});
      })
      .catch(error => {
        alert("something went wrong. check your network connection");
      });
  };

  handleValueChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  hasInput = () => {
    return this.state.taskTitle.length <= 0 || this.state.taskDescription <= 0
      ? false
      : true;
  };

  handleTaskSubmit = event => {
    if (!this.hasInput()) {
      alert("A task requires both a Title and Description");
      return;
    }

    const task = {
      _id: null,
      title: this.state.taskTitle,
      description: this.state.taskDescription,
      doneyet: false
    };

    ToDoService.createNewTask(task)
      .then(res => {
        this.getAllTasks();
      })
      .catch(error => {
        alert("something went wrong: " + error);
      });
  };

  handleDeleteAction = id => {
    ToDoService.deleteTask(id).then(res => {
      this.getAllTasks();
    });
  };

  handleEditAction = id => {
    const items = this.state.items;
    items.find((item, index) => {
      if (item._id === id) {
        items[index].edit = true;
        this.setState({ items: items });
      }
    });
  };

  handleUpdateAction = (id, title, description, doneyet) => {
    ToDoService.updateTask(id, title, description, doneyet).then(res => {
      this.getAllTasks();
    });
  };

  getAllTasks = () => {
    ToDoService.getAllTasks()
      .then(res => {
        this.resetInput();
        this.setState({ items: res.data });
      })
      .catch(error => {
        alert("something went wrong: " + error);
      });
  };

  resetInput = () => {
    this.taskTitleEntry.value = "";
    this.taskInputEntry.value = "";
    this.setState({ taskTitle: "", taskDescription: "" });
  };

  render() {
    const tasks = [];
    this.state.items.map(item => {
      tasks.push(
        <ToDoItem
          todoItem={item}
          handleEditAction={() => this.handleEditAction(item._id)}
          handleUpdateAction={this.handleUpdateAction}
          handleDeleteAction={() => this.handleDeleteAction(item._id)}
        />
      );
    });

    return (
      <div class="page-container">
        <div class="page-title">
          <h2>Tasks ({this.state.items.length})!</h2>
        </div>
        <div class="task-form">
          <input
            name="taskTitle"
            class="task-input"
            placeholder="  + Add Title"
            onChange={this.handleValueChange}
            ref={el => (this.taskTitleEntry = el)}
          />
          <input
            name="taskDescription"
            class="task-input"
            placeholder="  + Add Description"
            onChange={this.handleValueChange}
            ref={el => (this.taskInputEntry = el)}
          />
          <button onClick={this.handleTaskSubmit}>Add Task</button>
        </div>
        <div class="task-list">{tasks}</div>
      </div>
    );
  }
}

export default ToDoPageComponent;
