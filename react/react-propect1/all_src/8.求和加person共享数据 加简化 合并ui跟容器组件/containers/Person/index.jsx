import React, { Component } from "react";
import { addPersonAction } from "../../redux/actions/person";
import { connect } from "react-redux";
import { nanoid } from "nanoid";

class Person extends Component {
  addPerson = () => {
    const name = this.name.value;
    const age = this.age.value;
    const id = nanoid();
    const personObj = { id, name, age };
    this.props.addPersonAction(personObj);
    // console.log(personObj);
  };
  render() {
    console.log(this.props.person);
    return (
      <div>
        <h1>我是Person组件</h1>
        <h2>count组件求和为{this.props.count}</h2>
        <input
          ref={(c) => (this.name = c)}
          type="text"
          placeholder="请输入名字"
        />
        <input
          ref={(c) => (this.age = c)}
          type="text"
          placeholder="请输入年龄"
        />
        <button onClick={this.addPerson}>添加</button>
        <ul>
          {this.props.person.map((v) => (
            <li key={v.id}>
              {v.name}---{v.age}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect(
  (state) => ({ person: state.person, count: state.count }),
  {
    addPersonAction
  }
)(Person);
