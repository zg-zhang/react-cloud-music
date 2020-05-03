import React, {useCallback, useEffect, useRef, useState} from "react";
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';

import Header from "../../baseUI/header";
import Scroll from "../../baseUI/scroll";
import {
    Container,
    TopDesc,
    Menu,
    SongList,
    SongItem
} from "./style";
import style from '../../assets/global-style';
import { getName } from "../../api/utils";
import {changeEnterLoading, getAlbumList} from "./store/actionCreators";
import { isEmptyObject, getCount } from "../../api/utils";
import Loading from "../../baseUI/loading";
import SongsList from "../SongsList";

export const HEADER_HEIGHT = 45;

function Album(props) {
    const id = props.match.params.id;

    const headerEl = useRef();

    const { currentAlbum:currentAlbumImmutable, enterLoading } = props;
    const { getAlbumDataDispatch } = props;

    const [showStatus, setShowStatus] = useState(true);
    const [title, setTitle] = useState('歌单');
    const [isMarquee, setIsMarquee] = useState(false);

    useEffect(() => {
        getAlbumDataDispatch(id);
    }, [getAlbumDataDispatch, id])

    let currentAlbum = currentAlbumImmutable.toJS();

    const handleBack = useCallback(() => {
            setShowStatus(false);
        }, []);

    const handleScroll = useCallback(pos => {
        let minScrollY = -HEADER_HEIGHT;
        let percent = Math.abs(pos.y/minScrollY);
        let headerDom = headerEl.current;
        // 滑动顶部的高度开始变化
        if (pos.y < minScrollY) {
            headerDom.style.backgroundColor = style["theme-color"];
            headerDom.style.opacity = Math.min(1, (percent-1)/2);
            setTitle(currentAlbum.name);
            setIsMarquee(true);
        } else {
            headerDom.style.backgroundColor = '';
            headerDom.style.opacity = 1;
            setTitle('歌单');
            setIsMarquee(false);
        }
    }, [currentAlbum])

    const renderTopDesc = () => {
        return (
            <TopDesc background={currentAlbum.coverImgUrl}>
                <div className="background">
                    <div className="filter"/>
                </div>
                <div className="img_wrapper">
                    <div className="decorate"/>
                    <img src={currentAlbum.coverImgUrl} alt=""/>
                    <div className="play_count">
                        <i className="iconfont play">&#xe885;</i>
                        <span className="count">{Math.floor (currentAlbum.subscribedCount/1000)/10} 万 </span>
                    </div>
                </div>
                <div className="desc_wrapper">
                    <div className="title">{currentAlbum.name}</div>
                    <div className="person">
                        <div className="avatar">
                            <img src={currentAlbum.creator.avatarUrl} alt=""/>
                        </div>
                        <div className="name">{currentAlbum.creator.nickname}</div>
                    </div>
                </div>
            </TopDesc>
        )
    }

    const renderMenu = () => {
        return (
            <Menu>
                <div>
                    <i className="iconfont">&#xe6ad;</i>
                    评论
                </div>
                <div>
                    <i className="iconfont">&#xe86f;</i>
                    点赞
                </div>
                <div>
                    <i className="iconfont">&#xe62d;</i>
                    收藏
                </div>
                <div>
                    <i className="iconfont">&#xe606;</i>
                    更多
                </div>
            </Menu>
        )
    }

    return (
        <CSSTransition
            in={showStatus}
            timeout={300}
            classNames="fly"
            appear={true}
            unmountOnExit
            onExited={props.history.goBack}
        >
            <Container>
                {enterLoading ? <Loading/> : []}
                <Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee}/>
                {!isEmptyObject(currentAlbum) ? (
                    <Scroll bounceTop={false} onScroll={handleScroll}>
                        <div>
                            { renderTopDesc() }
                            { renderMenu() }
                            <SongsList
                                collectCount={currentAlbum.subscribedCount}
                                showCollect={true}
                                showBackground={true}
                                songs={currentAlbum.tracks}
                            />
                        </div>
                    </Scroll>
                ) : []}
            </Container>
        </CSSTransition>
    )
}

const mapStateToProps = state => ({
    currentAlbum: state.getIn(['album', 'currentAlbum']),
    enterLoading: state.getIn(['album', 'enterLoading'])
})

const mapDispatchToProps = dispatch => {
    return {
        getAlbumDataDispatch(id) {
            dispatch(changeEnterLoading(true));
            dispatch(getAlbumList(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));
