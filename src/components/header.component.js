import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import CreateTodo from "./create-todo.component";
import EditTodo from "./edit-todo.component";
import TodosList from "./todos-list.component";
import Login from "./login.component";

export default class Header extends Component {
  state = {
    login: ""
  };

  componentWillMount() {
    this.setState({
      login: sessionStorage.getItem("login")
    });
  }

  Logout = () => {
    sessionStorage.setItem("login", "");
    this.setState({
      login: ""
    });
    this.forceUpdate();
  };

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <Link to="/todo" className="navbar-brand">
                MERN-Stack Todo App
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <Link to="/todo" className="nav-link">
                      Todo
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/create" className="nav-link active">
                      Create Todo
                    </Link>
                  </li>
                  <li className="nav-item">
                    <div>
                      {this.state.login && (
                        <Link
                          to="/"
                          onClick={this.Logout}
                          className=" nav-item active btn btn-danger my-2 my-sm-0"
                        >
                          Logout
                        </Link>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/todo" component={TodosList} />
            <Route exact path="/edit/:id" component={EditTodo} />
            <Route exact path="/create" component={CreateTodo} />
          </div>
        </div>
      </Router>
    );
  }
}
