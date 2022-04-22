import React, { Component } from "react";
import "./index.css";
import { nanoid } from "nanoid";

export default class Header extends Component {
  handleKeyUp = (event) => {
    let { keyCode, target } = event;
    if (target.value === "") {
      alert("请输入内容");
      return;
    }

    if (keyCode !== 13) return;
    let obj = { name: target.value, id: nanoid(), done: false };

    this.props.addTodo(obj);
    target.value = "";
  };
  render() {
    return (
      <div className="todo-header">
        <input
          onKeyUp={this.handleKeyUp}
          type="text"
          placeholder="请输入你的任务名称，按回车键确认"
        />
      </div>
    );
  }
}
