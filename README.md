# 仿网易云音乐 web 移动端 第一版

😸 我是国酱

🤓 学了东西不能不用，而且之前也做了挺多项目的，但是没有一个大型的难度较高的项目

😬​更重要的是，作为一个精致的前端，我也想拥有一个自己的精致到极致的项目，我会把自己学到的新的东西都加入进来，不断更新

👍 感谢 [神三元](https://github.com/sanyuan0704/react-cloud-music) 同学给我提供了很好的实战思路，学到了很多

🙏 感谢 [Binaryify](https://github.com/Binaryify/NeteaseCloudMusicApi) 大佬开源的 NodeJS 版的 api 接口 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

## 技术栈

* `react v16.8 全家桶 （react，react-router）` 构建用户界面的 MVVM 框架
* `redux` 著名的 JavaScript 状态管理容器
* `redux-thunk` 处理异步逻辑的 redux 中间件
* `immutable` 进行持久性数据结构处理
* `react-lazyload` react 懒加载库
* `better-scroll` 提升移动端滑动体验的知名库
* `styled-components` 处理样式，体现 css in js 的前端工程化神器
* `axios` 用来请求后端 api 数据
* `fastclick` 解决移动端点击延迟 300ms 的问题

## 项目目录说明

```

├─ api                  // 网络请求代码、工具类函数和相关配置
├─ application          // 项目核心功能
├─ assets               // 字体配置及全局样式
├─ baseUI               // 基础 UI 轮子
├─ components           // 可复用的 UI 组件
├─ routes               // 路由配置文件
├─ store                // redux 相关文件
├─ App.js               // 根组件
├─ index.js             // 入口文件
├─ serviceWorker.js     // PWA 离线应用配置
└─ style.js             // 默认样式

```

## 使用的第三方库

* react-router
* react-router-dom
* react-router-config
* redux
* redux-thunk
* redux-immutable
* react-redux
* immutable
* swiper
* better-scroll@next
* prop-types

## TODO

* 使用 immer 替代 immutable 进行重构
* 使用 TypeScript 重构

