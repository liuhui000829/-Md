// 这个必须为纯函数
// 


import { ADDPERSON } from '../constant'

const initState = [{ id: '001', name: '张三', age: 18 }]
export default (preState = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case ADDPERSON:
            return [data, ...preState]    // 引用类型必须返回新对象
        default:
            return preState
    }
}