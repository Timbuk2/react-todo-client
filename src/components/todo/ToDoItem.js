import React, { Component } from "react";
import "./ToDoItemStyle.css";

class ToDoItem extends Component {
  constructor() {
    super();
    this.state = {
      _id: "",
      title: "",
      description: "",
      doneyet: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        _id: nextProps.todoItem._id,
        title: nextProps.todoItem.title,
        description: nextProps.todoItem.description,
        doneyet: nextProps.todoItem.doneyet
      });
    }
  }

  getTaskAsText = () => {
    return (
      <div class="task-info">
        <span class="task-info-title">{this.props.todoItem.title}</span>
        <span class="task-info-description">
          {this.props.todoItem.description}
        </span>
      </div>
    );
  };

  getTaskAsEditable = () => {
    return (
      <div class="task-info">
        <input
          type="text"
          name="title"
          value={this.state.title}
          placeholder={this.props.todoItem.title}
          onChange={this.handleValueChange}
        />
        <input
          type="text"
          name="description"
          value={this.state.description}
          placeholder={this.props.todoItem.description}
          onChange={this.handleValueChange}
        />
      </div>
    );
  };

  getButtonAsUpdateAction = () => {
    return (
      <button class="delete-button" onClick={() => this.sendUpdate()}>
        Update
      </button>
    );
  };

  getButtonAsEditAction = () => {
    return (
      <button class="delete-button" onClick={this.props.handleEditAction}>
        Edit
      </button>
    );
  };

  handleValueChange = event => {
    if (event.target.name === "doneyet") {
      this.setState({ doneyet: !this.state.doneyet });
      this.sendUpdate();
      return;
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  sendUpdate() {
    this.props.handleUpdateAction(
      this.state._id,
      this.state.title,
      this.state.description,
      this.state.doneyet
    );
  }

  render() {
    // render task information as text by default
    let taskInfoLabel = this.getTaskAsText();
    let actionButton = this.getButtonAsEditAction();
    // render task information as an editable if property is flagged as edit=true
    if (this.props.todoItem.edit) {
      taskInfoLabel = this.getTaskAsEditable();
      actionButton = this.getButtonAsUpdateAction();
    }

    return (
      <div class="todo-item">
        <div class="task-info">{taskInfoLabel}</div>
        <div class="task-actions">
          {actionButton}
          <button
            class="delete-btn"
            onClick={() => this.props.handleDeleteAction()}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default ToDoItem;
