import React, {useEffect, useRef, useState} from "react";
import {connect} from 'react-redux';

import {
    changeCurrentIndex,
    changeCurrentSong,
    changeFullScreen,
    changePlayingState,
    changePlayList,
    changePlayMode,
    changeShowPlayList,
} from "./store/actionCreators";
import MiniPlayer from "./miniPlayer";
import NormalPlayer from "./normalPlayer";
import {getSongUrl, isEmptyObject, findIndex, shuffle} from "../../api/utils";
import {playMode} from "../../api/config";
import Toast from "../../baseUI/toast";

function Player(props) {
    const {fullScreen, playing, sequencePlayList:immutableSequencePlayList, playList:immutablePlayList, mode, currentIndex, showPlayList, currentSong:immutableCurrentSong} = props;
    const {
        togglePlayingDispatch,
        toggleFullScreenDispatch,
        togglePlayListDispatch,
        changeCurrentIndexDispatch,
        changeCurrentSongDispatch,
        changeModeDispatch,
        changePlayListDispatch
    } = props;

    const audioRef = useRef();
    const toastRef = useRef();

    const songReady = useRef(true)

    // 目前播放时间
    const [currentTime, setCurrentTime] = useState(0)
    // 歌曲总时长
    const [duration, setDuration] = useState(0);

    // 记录当前的歌曲，以便于下次重渲染时对比是否是一首歌
    const [preSong, setPreSong] = useState({});
    const [modeText, setModeText] = useState('');

    // 歌曲播放进度
    let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

    const currentSong = immutableCurrentSong.toJS();
    const sequencePlayList = immutableSequencePlayList.toJS();
    const playList = immutablePlayList.toJS();

    useEffect(() => {
        if (
            !playList.length ||
            currentIndex === -1 ||
            !playList[currentIndex] ||
            playList[currentIndex].id === preSong.id ||
            !songReady
        ) return;
        let current = playList[currentIndex];
        setPreSong(current);
        setSongReady(false);
        changeCurrentSongDispatch(current);
        audioRef.current.src = getSongUrl(current.id);
        setTimeout(() => {
            audioRef.current.play().then(() => {
                setSongReady(true);
            });
        });
        togglePlayingDispatch(true);//播放状态
        setCurrentTime(0);//从头开始播放
        setDuration((current.dt / 1000) | 0);//时长
    }, [playList, currentIndex])

    useEffect(() => {
        playing ? audioRef.current.play() : audioRef.current.pause();
    }, [playing])

    const clickPlaying = (e, state) => {
        e.stopPropagation();
        togglePlayingDispatch(state);
    }

    const updateTime = e => {
        setCurrentTime(e.target.currentTime);
    }

    const onProgressChange = curPercent => {
        const newTime = curPercent * duration;
        setCurrentTime(newTime);
        audioRef.current.currentTime = newTime;
        if (!playing) {
            togglePlayingDispatch(true);
        }
    }

    // 单曲循环
    const handleLoop = () => {
        audioRef.current.currentTime = 0;
        changePlayingState(true);
        audioRef.current.play();
    }

    const handlePrev = () => {
        if (playList.length === 1) {
            handleLoop();
            return;
        }
        let index = currentIndex - 1;
        if (index < 0) index = playList.length - 1;
        if (!playing) togglePlayingDispatch(true);
        changeCurrentIndexDispatch(index);
    }

    const handleNext = () => {
        if (playList.length === 1) {
            handleLoop();
            return;
        }
        let index = currentIndex + 1;
        if (index === playing.length) index = 0;
        if (!playing) togglePlayingDispatch(true);
        changeCurrentIndexDispatch(index);
    }

    const changeMode = () => {
        let newMode = (mode + 1) % 3;
        if (newMode === 0) {
            //顺序模式
            changePlayListDispatch(sequencePlayList);
            let index = findIndex(currentSong, sequencePlayList);
            changeCurrentIndexDispatch(index);
            setModeText('顺序循环');
        } else if (newMode === 1) {
            //单曲循环
            changePlayListDispatch(sequencePlayList);
            setModeText('单曲循环');
        } else if (newMode === 2) {
            //随机
            let newList = shuffle(sequencePlayList);
            let index = findIndex(currentSong, newList);
            changePlayListDispatch(newList);
            changeCurrentIndexDispatch(index);
            setModeText('随机播放');
        }
        changeModeDispatch(newMode);
        toastRef.current.show();
    }

    const handleEnd = () => {
        if (mode === playMode.loop) {
            handleLoop();
        } else  {
            handleNext();
        }
    }

    const handleError = () => {
        songReady.current = true;
        handleNext();
        alert('播放出错');
    }

    return (
        <div>
            { isEmptyObject(currentSong) ? null :
                <MiniPlayer
                    song={currentSong}
                    fullScreen={fullScreen}
                    playing={playing}
                    toggleFullScreen={toggleFullScreenDispatch}
                    clickPlaying={clickPlaying}
                    percent={percent}
                />
            }
            { isEmptyObject(currentSong) ? null :
                <NormalPlayer
                    song={currentSong}
                    fullScreen={fullScreen}
                    playing={playing}
                    duration={duration}//总时长
                    currentTime={currentTime}//播放时间
                    percent={percent}//进度
                    toggleFullScreen={toggleFullScreenDispatch}
                    mode={mode}
                    clickPlaying={clickPlaying}
                    onProgressChange={onProgressChange}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                    changeMode={changeMode}
                />
            }
            <audio ref={audioRef} onTimeUpdate={updateTime} onEnded={handleEnd} onError={handleError}/>
            <Toast text={modeText} ref={toastRef}/>
        </div>
    )
}

const mapStateToProps = state => ({
    fullScreen: state.getIn(['player', 'fullScreen']),   // 播放器是否为全屏
    playing: state.getIn(['player', 'playing']),  //当前歌曲是否播放
    sequencePlayList: state.getIn(['player', 'sequencePlayList']),    // 顺序播放，之前会有随机列表，乱序列表，因此拿这个来存储顺序
    playList: state.getIn(['player', 'playList']),
    mode: state.getIn(['player', 'mode']), // 播放模式
    currentIndex: state.getIn(['player', 'currentIndex']),    // 当前歌曲在播放列表的索引位置
    showPlayList: state.getIn(['player', 'showPlayList']), // 是否展示播放列表
    currentSong: state.getIn(['player', 'currentSong'])
})

const mapDispatchToProps = dispatch => {
    return {
        togglePlayingDispatch(data) {
            dispatch(changePlayingState(data))
        },
        toggleFullScreenDispatch(data) {
            dispatch(changeFullScreen(data));
        },
        togglePlayListDispatch(data) {
            dispatch(changeShowPlayList(data))
        },
        changeCurrentIndexDispatch(data) {
            dispatch(changeCurrentIndex(data));
        },
        changeCurrentSongDispatch(data) {
            dispatch(changeCurrentSong(data))
        },
        changeModeDispatch(data) {
            dispatch(changePlayMode(data));
        },
        changePlayListDispatch(data) {
            dispatch(changePlayList(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player))
