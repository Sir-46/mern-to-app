import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Login from "./login.component";
import TodosList from "./todos-list.component";
import EditTodo from "./edit-todo.component";
import CreateTodo from "./create-todo.component";

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
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
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
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/todo" component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
        </Switch>
      </div>
    );
  }
}
