import * as actionTypes from './constants';
import {fromJS} from "immutable";

const defaultStaet = fromJS({
    currentAlbum: {},
    enterLoading: false,
})

export default (state = defaultStaet, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_CURRENT_ALBUM:
            return state.set('currentAlbum', action.data);
        case actionTypes.CHANGE_ENTER_LOADING:
            return state.set('enterloading', action.data);
        default:
            return state;
    }
}
