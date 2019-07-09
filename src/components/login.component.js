import React, { Component } from "react";
import Axios from "axios";
import { message } from 'antd'
export default class login extends Component {
  
    state = {
      username: "",
      password: ""
    };
  

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  login = e => {
    e.preventDefault();
    const data = {
      'username': this.state.username,
      'password': this.state.password
    }
    console.log(data);

    Axios.post("http://localhost:3030/api/Users/login", data)
      .then(response => {
        message.success('login success')
        console.log(response);
        sessionStorage.setItem("login", "islogin");
        this.props.history.push('/todo')
      })
      .catch(error => {
        console.log(error);
        message.error('login faild')
        this.props.history.push('/')
      });
  };

  render() {
    return (
      <div className="container my-5">
        <div className="card" style={{minWidth: 300,maxWidth: 500, height: 30 + '%', marginLeft: 'auto', marginRight: 'auto'}}>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              {/* {this.state.email}<br/>
                            {this.state.password} */}
              <div className="form-group">
                <button onClick={this.login} className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
