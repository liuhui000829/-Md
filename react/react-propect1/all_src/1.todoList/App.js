import React, { Component } from "react";

import "./App.css";
import Header from "./component/Header";
import List from "./component/List";
import Footer from "./component/Footer";

export default class App extends Component {
  state = {
    todo: [
      { name: "吃饭", done: true, id: "001" },
      { name: "睡觉", done: true, id: "002" },
      { name: "打代码", done: false, id: "003" },
    ],
  };
  addTodo = obj => {
    let { todo } = this.state;
    this.setState({
      todo: [obj, ...todo],
    });
  };

  render() {
    let { todo } = this.state;
    return (
      <div className="App">
        <div className="todo-container">
          <div className="todo-wrap">
            <Header addTodo={this.addTodo} />
            <List todo={todo} />
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
