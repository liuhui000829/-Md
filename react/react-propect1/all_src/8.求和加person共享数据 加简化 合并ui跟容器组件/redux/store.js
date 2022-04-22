/*

整个应用只有一个store对象
*/

// 引入createStore,专门用于创建redux中最为核心的store对象  applyMiddlewar中间件
import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux'
// import {createStore } from 'redux'

//引入为Count组件服务的reducer
import { countReducer } from './reduces/count'
import { personReducer } from './reduces/person'

// 引入redux-thunk ,用于支持异步action
import thunk from 'redux-thunk'

// 汇总所有的reducer
const allReduces = combineReducers({
    count: countReducer,
    person: personReducer
})


// 暴露store
export default createStore(allReduces, applyMiddleware(thunk))