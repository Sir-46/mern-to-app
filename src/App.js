import React from "react";
import { HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import Header from "./components/header.component";

export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Header />
      </HashRouter>
    );
  }
}
