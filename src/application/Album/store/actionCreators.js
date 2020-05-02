import {fromJS} from "immutable";

import {
    CHANGE_CURRENT_ALBUM,
    CHANGE_ENTER_LOADING
} from "./constants";
import {getAlbumDetailRequest} from "../../../api/request";

const changeCurrentAlbum = data => ({
    type: CHANGE_CURRENT_ALBUM,
    data: fromJS(data)
})

export const changeEnterLoading = data => ({
    type: CHANGE_ENTER_LOADING,
    data
})

export const getAlbumList = id => {
    return dispatch => {
        getAlbumDetailRequest(id).then(res => {
            let data = res.playlist;
            dispatch(changeCurrentAlbum(data));
            dispatch(changeEnterLoading(false));
        }).catch(err => {
            console.error('ERROR: 获取Album数据失败' +
                '')
        })
    }
}
