import React, {useEffect, useState, useContext} from "react";
import { connect } from 'react-redux';
import LazyLoad, {forceCheck} from 'react-lazyload';
import {renderRoutes} from "react-router-config";

import Horizen from "../../baseUI/horizen-item";
import Scroll from "../../baseUI/scroll";
import Loading from "../../baseUI/loading";
import { typeTypes, areaTypes, alphaTypes } from '../../api/config';
import {
    List,
    ListItem,
    ListContainer
} from "./style";

import {
    changeType,
    changeArea,
    changeAlpha,
    getSingerList,
    changePageCount,
    changeEnterLoading,
    changePullUpLoading,
    changePullDownLoading,
    refreshSingerList
} from "./store/actionCreators";

function Singer (props) {
    const { type, area, alpha, singerList, pageCount, enterLoading, pullUpLoading, pullDownLoading, songsCount } = props;
    const { changeTypeDispatch, changeAreaDispatch, changeAlphaDispatch, getSingerListDispatch, updateDispatch, pullUpRefreshDispatch, pullDownRefreshDispatch } = props;


    useEffect(() => {
        console.log(enterLoading);
        if (!singerList.size) {
            getSingerListDispatch(type, area, alpha)
        }
    }, [])

    let handleUpdateType = val => {
        changeTypeDispatch(val);
        updateDispatch(val, area, alpha)
    }

    let handleUpdateArea = val => {
        changeAreaDispatch(val);
        updateDispatch(type, val, alpha);
    }

    let handleUpdateAlpha = val => {
        changeAlphaDispatch(val);
        updateDispatch(type, area, val);
    }

    const handlePullUp = () => {
        pullUpRefreshDispatch(type, area, alpha, pageCount);
    }

    const handlePullDown = () => {
        pullDownRefreshDispatch(type, area, alpha)
    }

    const enterDetail = id => {
        props.history.push(`/singers/${id}`);
    }

    const renderSingerList = () => {
        const list = singerList ? singerList.toJS() : [];
        return (
            <List>
                {
                    list.map((item, index) => {
                        return (
                            <ListItem key={item.accountId + '' + index} onClick={() => enterDetail(item.id)}>
                                <div className='img_wrapper'>
                                    <LazyLoad placeholder={<img width="100%" height="100%" src={require ('./singer.png')} alt="music"/>}>
                                        <img src={`${item.picUrl}?param=300x300`} width='100%' height='100%' alt="music"/>
                                    </LazyLoad>
                                </div>
                                <span className='name'>{item.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }

    return (
        <div>
            <Horizen
                list={areaTypes}
                handleClick={handleUpdateArea}
                oldVal={area}
                title={"语种："}/>
            <Horizen
                list={typeTypes}
                handleClick={handleUpdateType}
                oldVal={type}
                title={"分类："}/>
            <Horizen
                list={alphaTypes}
                handleClick={handleUpdateAlpha}
                oldVal={alpha}
                title={"筛选："}/>
            <ListContainer play={songsCount}>
                <Scroll
                    onScroll={forceCheck}
                    pullUp={handlePullUp}
                    pullDown={handlePullDown}
                    pullUpLoading={pullUpLoading}
                    pullDownLoading={pullDownLoading}
                >
                    {renderSingerList()}
                </Scroll>
            </ListContainer>
            { renderRoutes(props.route.routes)}
        </div>

    )
}

const mapStateToProps = state => ({
    type: state.getIn(['singers', 'type']),
    area: state.getIn(['singers', 'area']),
    alpha: state.getIn(['singers', 'alpha']),
    singerList: state.getIn(['singers', 'singerList']),
    pageCount: state.getIn(['singers', 'pageCount']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    songsCount: state.getIn (['player', 'playList']).size
});

const mapDispatchToProps = dispatch => {
    return {
        getSingerListDispatch(type, area, alpha) {
            dispatch(getSingerList(type, area, alpha));
        },
        changeTypeDispatch(data) {
            dispatch(changeType(data));
        },
        changeAreaDispatch(data) {
            dispatch(changeArea(data));
        },
        changeAlphaDispatch(data) {
            dispatch(changeAlpha(data));
        },
        updateDispatch(type, area, alpha) {
            dispatch(changePageCount(0));   // 由于改变了分类，所以 pageCount 清零
            dispatch(changeEnterLoading(true)); //loading, 现在实现了控制逻辑
            dispatch(getSingerList(type, area, alpha));
        },
        // 滑倒底部刷新部分的处理
        pullUpRefreshDispatch(type, area, alpha, count) {
            dispatch(changePullUpLoading(true));
            dispatch(changePageCount(count + 1));
            dispatch(refreshSingerList(type, area, alpha));
        },
        // 顶部下拉刷新
        pullDownRefreshDispatch(type, area, alpha) {
            dispatch(changePullDownLoading(true));
            dispatch(changePageCount(0)); // 属于重新获取数据
            dispatch(getSingerList(type, area, alpha));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer));
