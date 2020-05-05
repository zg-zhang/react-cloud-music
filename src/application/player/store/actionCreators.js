import {
    SET_FULL_SCREEN,
    SET_PLAYER_STATE,
    SET_CURRENT_SONG,
    SET_SHOW_PLAYLIST,
    SET_CURRENT_INDEX,
    SET_PLAY_MODE,
    SET_PLAYLIST,
    SET_SEQUENCE_PLAYLIST
} from "./constant";
import { fromJS } from "immutable";

export const changeCurrentSong = data => ({
    type: SET_CURRENT_SONG,
    data: fromJS(data)
})

export const changeFullScreen = data => ({
    type: SET_FULL_SCREEN,
    data
})

export const changePlayingState = data => ({
    type: SET_PLAYER_STATE,
    data
})

export const changeSequencePlayList = data => ({
    type: SET_SEQUENCE_PLAYLIST,
    data: fromJS(data)
})

export const changePlayList = data => ({
    type: SET_PLAYLIST,
    data: fromJS(data)
})

export const changePlayMode = data => ({
    type: SET_PLAY_MODE,
    data
})

export const changeCurrentIndex = data => ({
    type: SET_CURRENT_INDEX,
    data
})

export const changeShowPlayList = data => ({
    type: SET_SHOW_PLAYLIST,
    data
})
