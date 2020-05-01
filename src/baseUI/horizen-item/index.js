import React from "react";
import PropTypes from 'prop-types';

import Scroll from "../scroll";
import {
    List,
    ListItem
} from "./style";

function Horizen(props) {
    const { list, oldVal, title } = props;
    const { handleClick } = props;

    return (
        <Scroll direction={"horizental"}>
                <List>
                    <span>{title}</span>
                    {
                        list.map(item => {
                            return (
                                <ListItem
                                    key={item.key}
                                    className={`${oldVal === item.key ? 'selected' : ''}`}
                                    onClick={() => handleClick(item.key)}
                                >
                                    {item.name}
                                </ListItem>
                            )
                        })
                    }
                </List>
        </Scroll>
    )

}

Horizen.defaultProps = {
    list: [],   // 接收的列表数据
    oldVal: '', // 当前的 item 的值
    title: '',  // 列表左边的标题
    handleClick: null   // 为点击不同的 item 执行的方法
}

Horizen.propTypes = {
    list: PropTypes.array,
    oldVal: PropTypes.string,
    title: PropTypes.string,
    handleClick: PropTypes.func
}

export default React.memo(Horizen)
