import browser from 'webextension-polyfill'

import React, { useEffect, useState, createContext, useContext } from "react";
import ReactDOM from "react-dom";

import { Mask } from "./Mask"

import { StyleProvider } from '@ant-design/cssinjs';

const APP_NAME = '__jiang-tomato'

// 初始化主容器，主容器用来挂在全局样式，包括第三方组件的样式
let MyBox: HTMLElement | null = document.getElementById(APP_NAME);
// container 承载 UI 组件
let container = document.createElement('div')
// 使用 shadow 来隔离样式
let shadowRoot: any = undefined

if (MyBox !== null && MyBox !== undefined) {
  // 如果已存在容器
  // console.log('已存在 Box 容器');
  // 移除旧容器，避免出现 2 个主容器会导致 UI 渲染错误
  MyBox.parentNode?.removeChild(MyBox);

}

// 创建主容器
MyBox = document.createElement('div')
MyBox.id = APP_NAME
document.getElementsByTagName('html')[0].appendChild(MyBox);
MyBox.style.display = 'block' 

shadowRoot = MyBox?.attachShadow({ mode: 'open' });
container.className = 'container'
shadowRoot?.appendChild(container)


ReactDOM.render(
  <React.StrictMode>
    <StyleProvider container={shadowRoot}>
      <Mask />
    </StyleProvider>
  </React.StrictMode>,
  container
);


// let port = browser.runtime.connect({
//   name: 'fromContentScript'

// })

// port.onMessage.addListener((msg) => {
//   console.log(msg);


//   if (msg.type === "showMask") {

//     // MyBox.style.display = 'block'
//     showMask()

//   }


// });

// 接收 background 消息（目前是通过浏览器的右键菜单触发）
// browser.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

//   console.log('content script onMessage:');
//   console.log(msg);
//   if (msg.type === 'showMask') {

//     showMask()

//   }

// });

// 显示应用窗口
// async function showMask() {

//   ReactDOM.render(
//     <React.StrictMode>
//       <StyleProvider container={shadowRoot}>
//         <Mask />
//       </StyleProvider>
//     </React.StrictMode>,
//     container
//   );

// }