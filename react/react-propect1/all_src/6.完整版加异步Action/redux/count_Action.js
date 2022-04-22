// 专门为Count组件生成action对象
import { INCREMENT, DECREMENT } from './constant'

// 同步action 返回一个一般对象
export const createIncrementAction = data => ({ type: INCREMENT, data })  //注意: 返回一个对象写法
export const createDecrementAction = data => ({ type: DECREMENT, data })


// 异步action 返回一个是个函数 异步action一般都会调用同步action
// export const createIncrementAsyncAction = (data, time) => {
//     return dispatch => {
//         console.log(dispatch)       // 是store中dispatch对象 参考x
//         setTimeout(() => {
//             dispatch(createIncrementAction(data))
//         }, time);
//     }
// }

//x:
// store.dispatch(createIncrementAsyncAction(value * 1, 500));调用的化 返回的函数参数就是 调用对象


// 简写方式:
export const createIncrementAsyncAction = (data, time) => dispatch => {
    setTimeout(() => {
        dispatch(createIncrementAction(data))
    }, time);
}
