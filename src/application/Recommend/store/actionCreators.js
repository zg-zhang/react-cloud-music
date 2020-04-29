// 放不同 action 的地方

import * as actionType from './constant';
// 将 JS 对象转换成 immutable 对象
import { fromJS } from "immutable";
import { getBannerRequest, getRecommendListRequest } from "../../../api/request";

export const changeBannerList = (data) => ({
    type: actionType.CHANGE_BANNER,
    data: fromJS(data)
});

export const changeRecommendList = (data) => ({
    type: actionType.CHANGE_RECOMMEND_LIST,
    data: fromJS(data)
});

export const changeEnterLoading = (data) => ({
    type: actionType.CHANGE_ENTER_LOADING,
    data
});

export const getBannerList = () => {
    return (dispatch) => {
        getBannerRequest().then(data => {
            dispatch(changeBannerList(data.banners));
        }).catch(() => {
            console.error("ERROR: 轮播图数据传输错误")
        })
    }
}

export const getRecommendList = () => {
    return (dispatch) => {
        getRecommendListRequest().then(data => {
            dispatch(changeRecommendList(data.result));
            dispatch(changeEnterLoading(false));
        }).catch(() => {
            console.error("ERROR: 推荐歌单数据传输错误");
        })
    }
}

