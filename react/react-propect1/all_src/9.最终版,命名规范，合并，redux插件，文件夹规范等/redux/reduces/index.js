// 汇总之后得reducers

import { combineReducers } from 'redux'
//引入为Count组件服务的reducer
import count from './count'
//引入为person组件服务的reducer
import person from './person'
// 汇总所有的reducer
export default combineReducers({
    count,
    person
})