// 创建一个reducer, 本质是一个纯函数
// 会接收到两个参数 一个是之前的对象 和动作对象action
const initState = 0   //初始化
export const countReducer = (preState = initState, action) => {
    if (preState === undefined) preState = 0;        // 如果是初始化的时候
    const { type, data } = action;   // action:{type:'increment',data:1};
    switch (type) {
        case 'increment':
            return preState + data
        case 'decrement':
            return preState - data
        default:
            return preState
    }
}