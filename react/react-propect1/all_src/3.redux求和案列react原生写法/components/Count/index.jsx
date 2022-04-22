import React from "react";

export default class Count extends React.Component {
  state = { count: 0 };
  operation = (type) => {
    return () => {
      let { count } = this.state;
      let { value } = this.selectNumber;

      if (type === "increment") {
        count += value * 1;
      }
      if (type === "decrement") {
        count -= value * 1;
      }
      if (type === "addIncrement") {
        if (count % 2 !== 0) {
          count += value * 1;
        }
      }

      this.setState({ count });
    };
  };
  asycIncrement = () => {
   
    setTimeout(() => {
        let { count } = this.state;
        let { value } = this.selectNumber;
    //   count += value * 1;
    //   this.setState({ count:this.state.count+this.selectNumber.value*1 });
      count += value * 1;
      this.setState({ count});
    }, 1000);
  };

  render() {
    let { count } = this.state;
    return (
      <div>
        <h1>当前求和为: {count}</h1>
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
        <button onClick={this.asycIncrement}>异步加</button>
      </div>
    );
  }
}
