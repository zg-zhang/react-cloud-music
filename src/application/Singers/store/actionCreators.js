import {
    getHotSingerListRequest,
    getSingerListRequest
} from "../../../api/request";
import {
    CHANGE_SINGER_LIST,
    CHANGE_PAGE_COUNT,
    CHANGE_ENTER_LOADING,
    CHANGE_PULLUP_LOADING,
    CHANGE_PULLDOWN_LOADING
} from "./constants";
import { fromJS } from "immutable";

const changeSingerList = (data) => ({
    type: CHANGE_SINGER_LIST,
    data: fromJS(data)
})

export const changePageCount = (data) => ({
    type: CHANGE_PAGE_COUNT,
    data
})

export const changeEnterLoading = (data) => ({
    type: CHANGE_ENTER_LOADING,
    data
})

export const changePullUpLoading = data => ({
    type: CHANGE_PULLUP_LOADING,
    data
})

export const changePullDownLoading = data => ({
    type: CHANGE_PULLDOWN_LOADING,
    data
})

// 第一次加载对应类别的歌手
export const getSingerList = (type, area, alpha) => {
    return (dispatch, getState) => {
        getSingerListRequest(type, area, alpha, 0).then(res => {
            console.log(res);
            dispatch(changeSingerList(res.artists));
            dispatch(changeEnterLoading(false));
            dispatch(changePullDownLoading(false));
        }).catch(err => {
            console.error('ERROR: 歌手数据获取错误')
        })
    }
}

// 加载更多歌手
export const refreshSingerList = (type, area, alpha) => {
    return (dispatch, getState) => {
        const pageCount = getState().getIn(['singers', 'pageCount']);
        const singerList = getState().getIn(['singers', 'singerList']).toJS();
        getSingerListRequest(type, area, alpha, pageCount).then(res => {
            const data = [...singerList, ...res.artists];
            console.log(data);
            dispatch(changeSingerList(data));
            dispatch(changePullUpLoading(false));
        }).catch(err => {
            console.error('ERROR: 歌手数据获取错误')
        })
    }
}
