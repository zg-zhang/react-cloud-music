import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

const Content = styled.div`
    width: 100%;
    overflow: hidden;
    position: relative;
    height: 32px;
`;

const Marquee = props => {
    const text = useRef();
    const outer = useRef();

    useEffect(() => {
        const outerWidth = outer.current.offsetWidth;
        const textWidth = text.current.offsetWidth;

        let w = outerWidth;
        const inter = setInterval(() => {
            w = (w + textWidth) === 0 ? outerWidth : w - 1;
            text.current.style.transform = `translate(${w}px)`
        }, 10);
        return () => {
            clearInterval(inter);
        }
    }, []);

    return (
        <Content ref={outer}>
            <div ref={text}>{props.title}</div>
        </Content>
    )
}

Marquee.defaultProps = {
    title: '歌单'
}

Marquee.propTypes = {
    title: PropTypes.string
}

export default React.memo(Marquee);
