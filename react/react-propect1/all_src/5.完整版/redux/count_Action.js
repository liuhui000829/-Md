// 专门为Count组件生成action对象
import { INCREMENT, DECREMENT } from './constant'

export const createIncrementAction = data => ({ type: INCREMENT, data })  //注意: 返回一个对象写法
export const createDecrementAction = data => ({ type: DECREMENT, data })