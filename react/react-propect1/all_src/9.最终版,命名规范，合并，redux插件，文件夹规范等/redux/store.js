/*

整个应用只有一个store对象 这个对象只引入一个合并后得reducer
*/

// 引入createStore,专门用于创建redux中最为核心的store对象  applyMiddlewar中间件
import { legacy_createStore as createStore, applyMiddleware } from 'redux'

// redux检测状态得下载这个库
import {composeWithDevTools} from 'redux-devtools-extension'



// 引入redux-thunk ,用于支持异步action
import thunk from 'redux-thunk'

import reducer from './reduces'


// 暴露store
export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk))  )