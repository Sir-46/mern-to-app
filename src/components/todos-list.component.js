import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";
import { message } from "antd";
// import Todo from "./todo.component"
import { MdModeEdit, MdDelete } from "react-icons/md";

class TodosList extends Component {
  state = { todos: [] };

  componentWillMount() {
    this.getTodo()
    if (!sessionStorage.getItem("login")) {
      // this.props.history.push("/");
      window.location.replace("/");
    }
  }

  getTodo = () => {
    Axios.get("http://127.0.0.1:3030/api/todos")
      .then(res => {
        this.setState({ todos: res.data });
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  componentDidUpdate(prevState){
    if(prevState !== this.state){
      this.getTodo()
    }
  }

  deleteItem(id, e) {
    Axios.delete("http://localhost:3030/api/todos/" + id)
      .then(res => {
        console.log(res);
        message.success("deleted");
      })
      .catch(function(err) {
        console.log(err);
      });
    console.log("ID", id);
  }

  render() {
    return (
      <div style={{ marginTop: 10 }} className="container">
        <h2>Todos List</h2>
        <div className="table-responsive">
          <table className="table table-bordered" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Responsible</th>
                <th>Priority</th>
                <th>Actios</th>
              </tr>
            </thead>
            {this.state.todos.map((item, i) => (
              <tbody key={i}>
                <tr>
                  <td>{i + 1}</td>
                  <td className={item.completed ? "completed" : ""}>
                    {item.description}
                  </td>
                  <td className={item.completed ? "completed" : ""}>
                    {item.responsible}
                  </td>
                  <td className={item.completed ? "completed" : ""}>
                    {item.priority}
                  </td>
                  <td>
                    <Link
                      className="btn btn-warning m-1"
                      to={"/edit/" + item.id}
                    >
                      <MdModeEdit />
                    </Link>
                    <button
                      className="btn btn-danger m-1"
                      onClick={this.deleteItem.bind(i, item.id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          {/* {this.props.todos.map((todo,i) => 
                        <Todo key={i} todo={todo} />)} */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state
  };
};

export default connect(mapStateToProps)(TodosList);
