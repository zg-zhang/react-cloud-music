import styled from "styled-components";
import style from '../../assets/global-style'

export const List = styled.div`
    display: inline-block;
    white-space: nowrap;
    height: 30px;
    padding-top: 6px;
    overflow: hidden;
    
    > span:first-of-type {
        display: inline-block;
        flex: 0 0 auto;
        padding: 6px 0 6px 10px;
        margin-right: 5px;
        color: grey;
        font-size: ${style["font-size-m"]};
    }
`

export const ListItem = styled.div`
    display: inline-block;
    font-size: ${style["font-size-m"]};
    padding: 5px 8px;
    border-radius: 10px;
    border: 1px solid transparent;
    
    &.selected {
        color: ${style["theme-color"]};
        border: 1px solid ${style["theme-color"]};
        opacity: 0.8;
    }
`
