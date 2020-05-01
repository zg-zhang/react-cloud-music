import React, {createContext, useReducer} from 'react';
import { fromJS } from "immutable";

// context
export const TypeAreaDataContext = createContext({});

// 相当于之前的 constants
export const CHANGE_TYPE = 'singers/CHANGE_TYPE';
export const CHANGE_AREA = 'singers/CHANGE_AREA';
export const CHANGE_ALPHA = 'singers/CHANGE_ALPHA';

// reducer 纯函数
const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_TYPE:
            return state.set('type', action.data);
        case CHANGE_AREA:
            return state.set('area', action.data);
        case CHANGE_ALPHA:
            return state.set('alpha', action.data);
        default:
            return state;
    }
}

// Provider 组件
export const Data = props => {
    // useReducer 的第二个参数传入初始值
    const [data, dispatch] = useReducer(reducer, fromJS({
        type: '-1',
        area: '-1',
        alpha: '-1'
    }))
    return (
        <TypeAreaDataContext.Provider value={{data, dispatch}}>
            {props.children}
        </TypeAreaDataContext.Provider>
    )
}
