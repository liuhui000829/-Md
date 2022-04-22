/* 容器组件*/

/*
//引入CountUI组件
import CountUI from "../../components/Count";

import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction,
} from "../../redux/count_Action";

// 引入connect用于连接 UI组件与redux
import { connect } from "react-redux";

const mapStateToProps = (state) => ({ count: state });
const mapDispatchToProps = (dispatch) => {
  return {
    increment: (number) => dispatch(createIncrementAction(number)),
    decrement: (number) => dispatch(createDecrementAction(number)),
    asyncIncrement: (number, time) =>
      dispatch(createIncrementAsyncAction(number, time)),
  };
};

// 创建并暴漏一个Count的容器组件
// connect 是个高阶函数  mapStateToProps 接收state状态   mapDispatchToProps接收操作状态的方法
export default connect(mapStateToProps, mapDispatchToProps)(CountUI);


// export default connect(mapStateToProps, mapDispatchToProps)(CountUI);
//相当于   <Count store={store} a={1} b={()=>123}/> a和b写成了  mapStateToProps mapDispatchToProps
*/

//2 . 优化写法
//引入CountUI组件
import CountUI from "../../components/Count";

import {
  incrementAction,
  decrementAction,
  incrementAsyncAction,
} from "../../redux/count_Action";

// 引入connect用于连接 UI组件与redux
import { connect } from "react-redux";

// 自动调用了dispatach
export default connect((state) => ({ count: state }), {
    incrementAction,
    decrementAction,
    incrementAsyncAction,
})(CountUI);
