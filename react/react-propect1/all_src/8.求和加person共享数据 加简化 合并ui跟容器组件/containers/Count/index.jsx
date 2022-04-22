/* 容器组件*/

//2 . 优化写法
//引入CountUI组件
import React from "react";
// 引入connect用于连接 UI组件与redux
import { connect } from "react-redux";

import {
  incrementAction,
  decrementAction,
  incrementAsyncAction,
} from "../../redux/actions/count";

class Count extends React.Component {
  operation = (type) => {
    return (e) => {
      let {
        count,
        incrementAction,
        decrementAction,
        incrementAsyncAction,
      } = this.props;
      let value = this.selectNumber.value * 1;

      if (type === "increment") incrementAction(value);
      if (type === "decrement") decrementAction(value);
      if (
        type === "addIncrement"
          ? count % 2 !== 0
            ? incrementAction(value)
            : ""
          : ""
      );
      if (type === "asycIncrement") incrementAsyncAction(value, 1000);
    };
  };

  render() {
    console.log(this);
    return (
      <div>
        <h1>当前求和为: {this.props.count}</h1>
        <h2>person组件的人数是{this.props.person.length}</h2>
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

// 自动调用了dispatach
export default connect(
  (state) => ({ count: state.count, person: state.person }),
  {
    incrementAction,
    decrementAction,
    incrementAsyncAction,
  }
)(Count);
