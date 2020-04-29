import React, {useEffect} from "react";
import { connect } from 'react-redux';

import Slider from "../../components/slider";
import RecommendList from "../../components/list";
import Scroll from "../../baseUI/scroll";
import {
    Content
} from "./style";

import * as actionTypes from './store/actionCreators'

function Recommend (props) {
    const { bannerList, recommendList } = props;

    const { getBannerDataDispatch, getRecommendDataDispatch } = props;

    useEffect(() => {
        getBannerDataDispatch();
        getRecommendDataDispatch();
    }, []);

    const bannerListJS = bannerList ? bannerList.toJS() : [];
    const recommendListJS = recommendList ? recommendList.toJS() : [];

    return (
        <Content>
            <Scroll className='list'>
                <div>
                    <Slider bannerList={bannerListJS} />
                    <RecommendList recommendList={recommendListJS}/>
                </div>
            </Scroll>
        </Content>
    )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
    // 不要在这里将数据 toJS
    // 不然每次 diff 对比 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList'])
});

// 映射 dispatch 到 props 上
const mapDisPatchToProps = (dispatch) => {
    return {
        getBannerDataDispatch() {
            dispatch(actionTypes.getBannerList());
        },
        getRecommendDataDispatch() {
            dispatch(actionTypes.getRecommendList())
        }
    }
}

// 将 UI 组件包装成容器组件
export default connect(mapStateToProps, mapDisPatchToProps)(React.memo(Recommend));
