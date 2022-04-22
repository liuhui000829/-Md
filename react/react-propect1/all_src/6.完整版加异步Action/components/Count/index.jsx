import React from "react";
import store from "../../redux/store";
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction,
} from "../../redux/count_Action";

export default class Count extends React.Component {
  incrementAction = () => {
    let { value } = this.selectNumber;
    store.dispatch(createIncrementAction(value * 1));
  };

  operation = (type) => {
    return () => {
      const count = store.getState();
      let { value } = this.selectNumber;

      if (type === "increment") {
        this.incrementAction();
      } else if (type === "decrement") {
        store.dispatch(createDecrementAction(value * 1));
      } else if (type === "addIncrement") {
        if (count % 2 !== 0) {
          this.incrementAction();
        }
      } else if (type === "asycIncrement") {
        store.dispatch(createIncrementAsyncAction(value * 1, 1000));
      }
    };
  };

  render() {
    return (
      <div>
        <h1>当前求和为: {store.getState()}</h1>
        <br />
        <select ref={(c) => (this.selectNumber = c)} style={{ width: 100 }}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;
        <button onClick={this.operation("increment")} style={{ width: 100 }}>
          +
        </button>
        &nbsp;
        <button onClick={this.operation("decrement")} style={{ width: 100 }}>
          -
        </button>
        &nbsp;
        <button onClick={this.operation("addIncrement")}>
          当前求和为奇数再加
        </button>
        &nbsp;
        <button onClick={this.operation("asycIncrement")}>异步加</button>
      </div>
    );
  }
}
