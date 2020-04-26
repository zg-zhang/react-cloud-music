
// 扩大可点击区域
const extendClick = () => {
    return `
        position: relative;
        &:before {
            content: '';
            position: absolute;
            top: -10px;
            bottom: -10px;
            left: -10px;
            right: -10px;
        }
    `
}

// 一行文字溢出部分使用 ... 代替
const nowrap = () => {
    return `
        text-overflow: ellipsis;
        over-flow: hidden;
        white-space: nowrap;
    `
}

export default {
    'theme-color': '#d44439',
    'theme-color-shadow': 'rgba(212, 68, 57, .5)',
    'font-color-light': '#f1f1f1',
    'font-color-desc': '#2e3030',
    'font-color-desc-2': '#bba8a8',
    'font-size-ss': '10px',
    'font-size-s': '12px',
    'font-size-m': '14px',
    'font-size-l': '16px',
    'font-size-ll': '18px',
    'border-color': '#e4e4e4',
    'background-color': '#f2f3f4',
    'background-color-shadow': 'rgba(0, 0, 0, 0.3)',
    'highlight-background-color': '#ffffff',
    extendClick,
    nowrap
}