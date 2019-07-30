import React, { Component } from "react";
import Axios from "axios";
import { message } from "antd";

import { MdSave } from "react-icons/md";

export default class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      responsible: "",
      priority: "",
      completed: false
    };
  }

  componentWillMount() {
    Axios.get("http://localhost:3030/api/todos/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          description: res.data.description,
          responsible: res.data.responsible,
          priority: res.data.priority,
          completed: res.data.completed
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChangeTodoCompleted = e => {
    this.setState({
      completed: !this.state.completed
    });
    console.log(!this.state.completed);
  };

  onSubmit = e => {
    e.preventDefault();
    const obj = {
      completed: this.state.completed,
      priority: this.state.priority,
      responsible: this.state.responsible,
      description: this.state.description
    };
    Axios.put(
      "http://localhost:3030/api/todos/" + this.props.match.params.id,
      obj
    ).then(res => {
      if (res.status === 200) {
        message.success("edit success");
      }
      this.props.history.push("/todo");
    });
  };

  render() {
    return (
      <div
        className="container"
        style={{
          minWidth: 300,
          maxWidth: 500,
          height: 30 + "%",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <h2>Update Todo</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Responsible: </label>
            <input
              type="text"
              className="form-control"
              name="responsible"
              value={this.state.responsible}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priority"
                value="Low"
                checked={this.state.priority === "Low"}
                onChange={this.handleChange}
              />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priority"
                value="Medium"
                checked={this.state.priority === "Medium"}
                onChange={this.handleChange}
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priority"
                value="High"
                checked={this.state.priority === "High"}
                onChange={this.handleChange}
              />
              <label className="form-check-label">High</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="completed"
                value={this.state.completed}
                checked={this.state.completed}
                onChange={this.onChangeTodoCompleted}
              />
              <label className="form-check-label" htmlFor="completedCheckbox">
                Completed
              </label>
            </div>
            <br />
            <div className="form-group">
              <button type="submit" className="btn btn-success">
                <MdSave />
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
