

import { ADDPERSON } from '../constant'

const initState = [{id:'001', name: '张三', age: 18 }]
export const personReducer = (preState = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case ADDPERSON:
            return [data, ...preState]
        default:
            return preState
    }
}