import React, {useEffect} from "react";
import { connect } from "react-redux";

import {getRankList} from "./store";
import {filterIndex} from "../../api/utils";
import {
    Container,
    List,
    ListItem,
    SongList
} from "./style";
import Scroll from "../../baseUI/scroll";
import Loading from "../../baseUI/loading";
import {renderRoutes} from "react-router-config";
import {Content} from "../Recommend/style";

function Rank (props) {
    const { rankList:list, loading, songsCount } = props;
    const { getRankListDataDispatch } = props;

    let rankList = list ? list.toJS() : [];

    useEffect(() => {
        getRankListDataDispatch();
    }, []);

    let globalStartIndex = filterIndex(rankList);
    let officialList = rankList.slice(0, globalStartIndex);
    let globalList = rankList.slice(globalStartIndex);

    const enterDetail = detail => {
        props.history.push(`/rank/${detail.id}`)
    }

    const renderSongList = list => {
        return list.length ? (
            <SongList>
                {
                    list.map((item, index) => {
                        return <li key={index}>{index + 1} . {item.first} - {item.second}</li>
                    })
                }
            </SongList>
        ) : []
    }

    const renderRankList = (list, global) => {
        return (
            <List globalRank={global}>
                {
                    list.map(item => {
                        return (
                            <ListItem key={item.coverImgId} tracks={item.tracks} onClick={() => {enterDetail(item)}}>
                                <div className='img_wrapper'>
                                    <img src={item.coverImgUrl} alt=""/>
                                    <div className='decorate'/>
                                    <span className='update_frequency'>{item.updateFrequency}</span>
                                </div>
                                { renderSongList(item.tracks)}
                            </ListItem>
                        )
                    })
                }
            </List>
        )
    }

    let displayStyle = loading ? {'display': 'none'} : {'display': ''};

    return (
        <Container play={songsCount}>
            <Scroll>
                <div>
                    <h1 className='official' style={displayStyle}> 官方榜 </h1>
                    { renderRankList(officialList) }
                    <h1 className='global' style={displayStyle}> 全球榜 </h1>
                    { renderRankList(globalList, true) }
                    {/*{loading ? <EnterLoading><Loading/></EnterLoading> : []}*/}
                </div>
            </Scroll>
            {renderRoutes(props.route.routes)}
        </Container>
    )
}

const mapStateToProps = state => ({
    rankList: state.getIn(['rank', 'rankList']),
    loading: state.getIn(['rank', 'loading']),
    songsCount: state.getIn (['player', 'playList']).size
})

const mapDispatchToProps = dispatch => {
    return {
        getRankListDataDispatch() {
            dispatch(getRankList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));
