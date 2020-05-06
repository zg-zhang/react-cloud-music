import { fromJS } from "immutable";
import * as actionTypes from './constants';

const defaultState = fromJS({
    type: '-1',
    area: '-1',
    alpha: '-1',
    singerList: [], //歌手数据
    enterLoading: true, // 进场 loading
    pullUpLoading: false,   // 上拉 loading
    pullDownLoading: false, // 下拉 loading
    pageCount: 0    // 当前页数
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_TYPE:
            return state.set('type', action.data);
        case actionTypes.CHANGE_AREA:
            return state.set('area', action.data);
        case actionTypes.CHANGE_ALPHA:
            return state.set('alpha', action.data);
        case actionTypes.CHANGE_SINGER_LIST:
            return state.set('singerList', action.data);
        case actionTypes.CHANGE_PAGE_COUNT:
            return state.set('pageCount', action.data);
        case actionTypes.CHANGE_ENTER_LOADING:
            return state.set('enterLoading', action.data);
        case actionTypes.CHANGE_PULLUP_LOADING:
            return state.set('pullUpLoading', action.data);
        case actionTypes.CHANGE_PULLDOWN_LOADING:
            return state.set('pullDownLoading', action.data);
        default:
            return state;
    }
}
