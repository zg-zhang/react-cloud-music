import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

import style from '../../assets/global-style';
import Marquee from "../../baseUI/Marquee";

const HeaderContainer = styled.div`
    position: fixed;
    padding:0 10px 5px;
    height: 40px;
    width: 100%;
    z-index: 100;
    display: flex;
    line-height: 40px;
    color: ${style["font-color-light"]};
    
    .back {
        margin-right: 5px;
        font-size: 20px;
        width: 20px;
    }
    
    >h1 {
        font-size: ${style["font-size-l"]};
        font-weight: 700;
    }
`

// 处理函数组件拿不到 ref 的问题，所以用 forwardRef
const Header = React.forwardRef((props, ref) => {
    const { handleClick, title, isMarquee} = props;

    return (
        <HeaderContainer ref={ref}>
            <i className='iconfont back' onClick={handleClick}>&#xe655;</i>
            {
                isMarquee ? <Marquee title={title} /> : <h1>{title}</h1>
            }
        </HeaderContainer>
    )
})

Header.defaultProps = {
    handleClick: () => {},
    title: '标题',
    isMarquee: false,
}

Header.propTypes = {
    handleClick: PropTypes.func,
    title: PropTypes.string,
    isMarquee: PropTypes.bool,
}

export default React.memo(Header);
