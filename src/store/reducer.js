import { combineReducers } from "redux-immutable";

import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singerReducer } from '../application/Singers/store/index';
import { reducer as rankReducer } from '../application/Rank/store/index';
import { reducer as AlbumReducer } from "../application/Album/store/index";
import { reducer as SingerInfoReducer } from "../application/Singer/store/index";

export default combineReducers ({
    recommend: recommendReducer,
    singers: singerReducer,
    rank: rankReducer,
    album: AlbumReducer,
    singerInfo: SingerInfoReducer,
})
