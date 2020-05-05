import * as actionCreators from './constant';
import { fromJS } from "immutable";

import {playMode} from "../../../api/config";

const defaultState = fromJS({
   fullScreen: false,   // 播放器是否为全屏
   playing: false,  //当前歌曲是否播放
   sequencePlayList: [],    // 顺序播放，之前会有随机列表，乱序列表，因此拿这个来存储顺序
   playList: [],
   mode: playMode.sequence, // 播放模式
   currentIndex: -1,    // 当前歌曲在播放列表的索引位置
   showPlayList: false, // 是否展示播放列表
   currentSong: {}
})

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionCreators.SET_FULL_SCREEN:
            return state.set('fullScreen', action.data);
        case actionCreators.SET_PLAYER_STATE:
            return state.set('playing', action.data);
        case actionCreators.SET_SEQUENCE_PLAYLIST:
            return state.set('sequencePlayList', action.data);
        case actionCreators.SET_PLAYLIST:
            return state.set('playList', action.data);
        case actionCreators.SET_PLAY_MODE:
            return state.set('mode', action.data);
        case actionCreators.SET_CURRENT_INDEX:
            return state.set('currentIndex', action.data);
        case actionCreators.SET_SHOW_PLAYLIST:
            return state.set('showPlayList', action.data);
        case actionCreators.SET_CURRENT_SONG:
            return state.set('currentSong', action.data);
        default:
            return state;
    }
}
