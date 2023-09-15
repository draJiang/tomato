/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ContentScript/Mask.tsx":
/*!************************************!*\
  !*** ./src/ContentScript/Mask.tsx ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mask = void 0;
const webextension_polyfill_1 = __importDefault(__webpack_require__(/*! webextension-polyfill */ "./node_modules/webextension-polyfill/dist/browser-polyfill.js"));
const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const enum_1 = __webpack_require__(/*! ../enum */ "./src/enum.ts");
const antd_1 = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
const theme_1 = __webpack_require__(/*! ../theme */ "./src/theme.ts");
const canvas_confetti_1 = __importDefault(__webpack_require__(/*! canvas-confetti */ "./node_modules/canvas-confetti/dist/confetti.module.mjs"));
function Mask(props) {
    // 窗口拖拽逻辑
    // const [showMaks, setShowMaks] = useState(false);
    const [status, setStatus] = (0, react_1.useState)({
        'showMask': false,
        'status': '',
        'websiteType': '',
        'tomato': { 'balance': 0, 'total': 0 }
    });
    const [remainingTime, setRemainingTime] = (0, react_1.useState)(0);
    const windowElement = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        console.log('useEffect:');
        webextension_polyfill_1.default.runtime.sendMessage({
            'type': 'check', 'data': {}
        });
        webextension_polyfill_1.default.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            // 显示或隐藏遮罩
            if (request.type === "showMask") {
                setStatus(request.data);
            }
            // 增加了 1 个番茄
            if (request.type === "completeTomato") {
                (0, canvas_confetti_1.default)({
                    particleCount: 140,
                    spread: 170,
                    origin: { y: 0.4 }
                });
                antd_1.message.success({
                    content: 'You just completed a tomato timer',
                    icon: react_1.default.createElement("span", { style: { marginRight: '4px' } }, "\uD83C\uDF45"),
                    duration: 4,
                });
            }
            // 更新时间进度
            if (request.type === "updateTomato") {
                console.log(request);
                console.log(status);
                setRemainingTime(request.data.remainingTime);
            }
        });
    }, []);
    // 消费番茄
    const handleSpendTomatosBtnClick = () => {
        //消费番茄
        webextension_polyfill_1.default.runtime.sendMessage({
            'type': 'spendTomatos', 'data': {}
        });
        //暂停累积番茄
        setStatus((prevStatus) => {
            return Object.assign(Object.assign({}, prevStatus), { showMask: false });
        });
    };
    // 停止番茄
    const handleStopTomatosBtnClick = () => {
        //消费番茄
        webextension_polyfill_1.default.runtime.sendMessage({
            'type': 'stopTomato', 'data': {}
        });
        //暂停累积番茄
        setStatus((prevStatus) => {
            return Object.assign(Object.assign({}, prevStatus), { showMask: false });
        });
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(antd_1.ConfigProvider, { theme: theme_1.theme },
            react_1.default.createElement("div", { id: "", ref: windowElement, style: {
                    fontSize: '14px'
                } },
                (status === null || status === void 0 ? void 0 : status.showMask) &&
                    react_1.default.createElement("div", { className: 'contentBox', style: {
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                            position: "fixed",
                            width: "100%",
                            backgroundColor: "rgb(0,0,0,0.6)",
                            backdropFilter: "blur(10px)",
                            height: "100%",
                            bottom: 0,
                            zIndex: 99999,
                        } },
                        react_1.default.createElement("div", { style: {
                                display: "flex",
                                width: '300px',
                                flexDirection: "column",
                                alignItems: "center",
                                backgroundColor: "#F8F2DF",
                                padding: "40px 80px",
                                borderRadius: '4px',
                                border: '1px solid rgba(0, 0, 0, 0.1)'
                            } },
                            status.websiteType === enum_1.WebsiteType.Black &&
                                react_1.default.createElement(react_1.default.Fragment, null,
                                    react_1.default.createElement("div", { style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center"
                                        } },
                                        react_1.default.createElement("h1", { style: { marginTop: '0px' } }, "\uD83D\uDD12"),
                                        react_1.default.createElement(antd_1.Button, { style: {
                                                marginBottom: '1em',
                                                minWidth: '180px'
                                            }, disabled: status.tomato.balance <= 0 ? true : false, onClick: handleSpendTomatosBtnClick }, "Unlock")),
                                    react_1.default.createElement(antd_1.Divider, null),
                                    react_1.default.createElement("div", { style: {
                                            color: 'rgba(0, 0, 0, 0.8)',
                                            fontSize: '1em',
                                            marginTop: '1em'
                                        } },
                                        "\uD83C\uDF45 balance: ",
                                        status.tomato.balance)),
                            status.websiteType === enum_1.WebsiteType.Other &&
                                react_1.default.createElement(react_1.default.Fragment, null,
                                    react_1.default.createElement("div", { style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center"
                                        } },
                                        react_1.default.createElement("h1", { style: {
                                                marginTop: '0px'
                                            } }, "\uD83C\uDF45"),
                                        react_1.default.createElement(antd_1.Button, { style: {
                                                marginBottom: '1em'
                                            }, onClick: handleStopTomatosBtnClick }, "Stop tomato"))))),
                remainingTime > 0 && status.status !== enum_1.Status.Standby &&
                    react_1.default.createElement("div", { title: '\uD83C\uDF45Tomato Bank', style: {
                            position: 'fixed',
                            width: ((enum_1.TomatoTime.Earn - remainingTime) / enum_1.TomatoTime.Earn * 100).toFixed(2).toString() + '%',
                            height: '5px',
                            backgroundColor: status.status === enum_1.Status.Earn ? theme_1.theme.token.colorPrimary : theme_1.theme.color.colorYellow,
                            zIndex: '99999',
                            top: '0'
                        } })))));
}
exports.Mask = Mask;
;


/***/ }),

/***/ "./src/ContentScript/index.tsx":
/*!*************************************!*\
  !*** ./src/ContentScript/index.tsx ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));
const Mask_1 = __webpack_require__(/*! ./Mask */ "./src/ContentScript/Mask.tsx");
const cssinjs_1 = __webpack_require__(/*! @ant-design/cssinjs */ "./node_modules/@ant-design/cssinjs/es/index.js");
const APP_NAME = '__jiang-tomato';
// 初始化主容器，主容器用来挂在全局样式，包括第三方组件的样式
let MyBox = document.getElementById(APP_NAME);
// container 承载 UI 组件
let container = document.createElement('div');
// 使用 shadow 来隔离样式
let shadowRoot = undefined;
if (MyBox !== null && MyBox !== undefined) {
    // 如果已存在容器
    // console.log('已存在 Box 容器');
    // 移除旧容器，避免出现 2 个主容器会导致 UI 渲染错误
    (_a = MyBox.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(MyBox);
}
// 创建主容器
MyBox = document.createElement('div');
MyBox.id = APP_NAME;
document.getElementsByTagName('html')[0].appendChild(MyBox);
MyBox.style.display = 'block';
shadowRoot = MyBox === null || MyBox === void 0 ? void 0 : MyBox.attachShadow({ mode: 'open' });
container.className = 'container';
shadowRoot === null || shadowRoot === void 0 ? void 0 : shadowRoot.appendChild(container);
react_dom_1.default.render(react_1.default.createElement(react_1.default.StrictMode, null,
    react_1.default.createElement(cssinjs_1.StyleProvider, { container: shadowRoot },
        react_1.default.createElement(Mask_1.Mask, null))), container);
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


/***/ }),

/***/ "./src/enum.ts":
/*!*********************!*\
  !*** ./src/enum.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TomatoTime = exports.WebsiteType = exports.Status = void 0;
var Status;
(function (Status) {
    Status["Standby"] = "Standby";
    Status["Earn"] = "Earn";
    Status["Spend"] = "Spend";
})(Status = exports.Status || (exports.Status = {}));
var WebsiteType;
(function (WebsiteType) {
    WebsiteType["Other"] = "other";
    WebsiteType["White"] = "white";
    WebsiteType["Black"] = "black";
})(WebsiteType = exports.WebsiteType || (exports.WebsiteType = {}));
var TomatoTime;
(function (TomatoTime) {
    TomatoTime[TomatoTime["Earn"] = 18000] = "Earn";
    TomatoTime[TomatoTime["Spend"] = 1500000] = "Spend";
})(TomatoTime = exports.TomatoTime || (exports.TomatoTime = {}));


/***/ }),

/***/ "./src/theme.ts":
/*!**********************!*\
  !*** ./src/theme.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.theme = void 0;
exports.theme = {
    token: {
        colorPrimary: '#EF4B3A',
        colorLink: "#F08A24",
        colorLinkHover: "#ffa28f",
        colorLinkActive: "#c93126"
        // colorText: "#F08A24"
    },
    color: {
        colorSecond: '#A2C975',
        colorYellow: '#F8D772'
    }
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"content_script": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkchrome_extension_typescript_starter"] = self["webpackChunkchrome_extension_typescript_starter"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/ContentScript/index.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTtXQUNBOzs7OztXQzNCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Q7V0FDdEQsc0NBQXNDLGlFQUFpRTtXQUN2RztXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBOzs7OztXQ1ZBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1dDaERBOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci8uL3NyYy9Db250ZW50U2NyaXB0L01hc2sudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL0NvbnRlbnRTY3JpcHQvaW5kZXgudHN4Iiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2VudW0udHMiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvLi9zcmMvdGhlbWUudHMiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvY3JlYXRlIGZha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvaGFybW9ueSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jaHJvbWUtZXh0ZW5zaW9uLXR5cGVzY3JpcHQtc3RhcnRlci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2hyb21lLWV4dGVuc2lvbi10eXBlc2NyaXB0LXN0YXJ0ZXIvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk1hc2sgPSB2b2lkIDA7XG5jb25zdCB3ZWJleHRlbnNpb25fcG9seWZpbGxfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCIpKTtcbmNvbnN0IHJlYWN0XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcInJlYWN0XCIpKTtcbmNvbnN0IGVudW1fMSA9IHJlcXVpcmUoXCIuLi9lbnVtXCIpO1xuY29uc3QgYW50ZF8xID0gcmVxdWlyZShcImFudGRcIik7XG5jb25zdCB0aGVtZV8xID0gcmVxdWlyZShcIi4uL3RoZW1lXCIpO1xuY29uc3QgY2FudmFzX2NvbmZldHRpXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImNhbnZhcy1jb25mZXR0aVwiKSk7XG5mdW5jdGlvbiBNYXNrKHByb3BzKSB7XG4gICAgLy8g56qX5Y+j5ouW5ou96YC76L6RXG4gICAgLy8gY29uc3QgW3Nob3dNYWtzLCBzZXRTaG93TWFrc10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSh7XG4gICAgICAgICdzaG93TWFzayc6IGZhbHNlLFxuICAgICAgICAnc3RhdHVzJzogJycsXG4gICAgICAgICd3ZWJzaXRlVHlwZSc6ICcnLFxuICAgICAgICAndG9tYXRvJzogeyAnYmFsYW5jZSc6IDAsICd0b3RhbCc6IDAgfVxuICAgIH0pO1xuICAgIGNvbnN0IFtyZW1haW5pbmdUaW1lLCBzZXRSZW1haW5pbmdUaW1lXSA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKSgwKTtcbiAgICBjb25zdCB3aW5kb3dFbGVtZW50ID0gKDAsIHJlYWN0XzEudXNlUmVmKShudWxsKTtcbiAgICAoMCwgcmVhY3RfMS51c2VFZmZlY3QpKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3VzZUVmZmVjdDonKTtcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICAgICAgICAgICd0eXBlJzogJ2NoZWNrJywgJ2RhdGEnOiB7fVxuICAgICAgICB9KTtcbiAgICAgICAgd2ViZXh0ZW5zaW9uX3BvbHlmaWxsXzEuZGVmYXVsdC5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIOaYvuekuuaIlumakOiXj+mBrue9qVxuICAgICAgICAgICAgaWYgKHJlcXVlc3QudHlwZSA9PT0gXCJzaG93TWFza1wiKSB7XG4gICAgICAgICAgICAgICAgc2V0U3RhdHVzKHJlcXVlc3QuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDlop7liqDkuoYgMSDkuKrnlarojIRcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnR5cGUgPT09IFwiY29tcGxldGVUb21hdG9cIikge1xuICAgICAgICAgICAgICAgICgwLCBjYW52YXNfY29uZmV0dGlfMS5kZWZhdWx0KSh7XG4gICAgICAgICAgICAgICAgICAgIHBhcnRpY2xlQ291bnQ6IDE0MCxcbiAgICAgICAgICAgICAgICAgICAgc3ByZWFkOiAxNzAsXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbjogeyB5OiAwLjQgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGFudGRfMS5tZXNzYWdlLnN1Y2Nlc3Moe1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAnWW91IGp1c3QgY29tcGxldGVkIGEgdG9tYXRvIHRpbWVyJyxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgc3R5bGU6IHsgbWFyZ2luUmlnaHQ6ICc0cHgnIH0gfSwgXCJcXHVEODNDXFx1REY0NVwiKSxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDmm7TmlrDml7bpl7Tov5vluqZcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnR5cGUgPT09IFwidXBkYXRlVG9tYXRvXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzdGF0dXMpO1xuICAgICAgICAgICAgICAgIHNldFJlbWFpbmluZ1RpbWUocmVxdWVzdC5kYXRhLnJlbWFpbmluZ1RpbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LCBbXSk7XG4gICAgLy8g5raI6LS555Wq6IyEXG4gICAgY29uc3QgaGFuZGxlU3BlbmRUb21hdG9zQnRuQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIC8v5raI6LS555Wq6IyEXG4gICAgICAgIHdlYmV4dGVuc2lvbl9wb2x5ZmlsbF8xLmRlZmF1bHQucnVudGltZS5zZW5kTWVzc2FnZSh7XG4gICAgICAgICAgICAndHlwZSc6ICdzcGVuZFRvbWF0b3MnLCAnZGF0YSc6IHt9XG4gICAgICAgIH0pO1xuICAgICAgICAvL+aaguWBnOe0r+enr+eVquiMhFxuICAgICAgICBzZXRTdGF0dXMoKHByZXZTdGF0dXMpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHByZXZTdGF0dXMpLCB7IHNob3dNYXNrOiBmYWxzZSB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvLyDlgZzmraLnlarojIRcbiAgICBjb25zdCBoYW5kbGVTdG9wVG9tYXRvc0J0bkNsaWNrID0gKCkgPT4ge1xuICAgICAgICAvL+a2iOi0ueeVquiMhFxuICAgICAgICB3ZWJleHRlbnNpb25fcG9seWZpbGxfMS5kZWZhdWx0LnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe1xuICAgICAgICAgICAgJ3R5cGUnOiAnc3RvcFRvbWF0bycsICdkYXRhJzoge31cbiAgICAgICAgfSk7XG4gICAgICAgIC8v5pqC5YGc57Sv56ev55Wq6IyEXG4gICAgICAgIHNldFN0YXR1cygocHJldlN0YXR1cykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcHJldlN0YXR1cyksIHsgc2hvd01hc2s6IGZhbHNlIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQ29uZmlnUHJvdmlkZXIsIHsgdGhlbWU6IHRoZW1lXzEudGhlbWUgfSxcbiAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgaWQ6IFwiXCIsIHJlZjogd2luZG93RWxlbWVudCwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxNHB4J1xuICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAoc3RhdHVzID09PSBudWxsIHx8IHN0YXR1cyA9PT0gdm9pZCAwID8gdm9pZCAwIDogc3RhdHVzLnNob3dNYXNrKSAmJlxuICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogJ2NvbnRlbnRCb3gnLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiKDAsMCwwLDAuNilcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZHJvcEZpbHRlcjogXCJibHVyKDEwcHgpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b206IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiA5OTk5OSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMzAwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI0Y4RjJERlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjQwcHggODBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjEpJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMud2Vic2l0ZVR5cGUgPT09IGVudW1fMS5XZWJzaXRlVHlwZS5CbGFjayAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaDFcIiwgeyBzdHlsZTogeyBtYXJnaW5Ub3A6ICcwcHgnIH0gfSwgXCJcXHVEODNEXFx1REQxMlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuQnV0dG9uLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICcxZW0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluV2lkdGg6ICcxODBweCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgZGlzYWJsZWQ6IHN0YXR1cy50b21hdG8uYmFsYW5jZSA8PSAwID8gdHJ1ZSA6IGZhbHNlLCBvbkNsaWNrOiBoYW5kbGVTcGVuZFRvbWF0b3NCdG5DbGljayB9LCBcIlVubG9ja1wiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChhbnRkXzEuRGl2aWRlciwgbnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjgpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxZW0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6ICcxZW0nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFx1RDgzQ1xcdURGNDUgYmFsYW5jZTogXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLnRvbWF0by5iYWxhbmNlKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLndlYnNpdGVUeXBlID09PSBlbnVtXzEuV2Vic2l0ZVR5cGUuT3RoZXIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQocmVhY3RfMS5kZWZhdWx0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImgxXCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogJzBweCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCBcIlxcdUQ4M0NcXHVERjQ1XCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KGFudGRfMS5CdXR0b24sIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzFlbSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgb25DbGljazogaGFuZGxlU3RvcFRvbWF0b3NCdG5DbGljayB9LCBcIlN0b3AgdG9tYXRvXCIpKSkpKSxcbiAgICAgICAgICAgICAgICByZW1haW5pbmdUaW1lID4gMCAmJiBzdGF0dXMuc3RhdHVzICE9PSBlbnVtXzEuU3RhdHVzLlN0YW5kYnkgJiZcbiAgICAgICAgICAgICAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyB0aXRsZTogJ1xcdUQ4M0NcXHVERjQ1VG9tYXRvIEJhbmsnLCBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAoKGVudW1fMS5Ub21hdG9UaW1lLkVhcm4gLSByZW1haW5pbmdUaW1lKSAvIGVudW1fMS5Ub21hdG9UaW1lLkVhcm4gKiAxMDApLnRvRml4ZWQoMikudG9TdHJpbmcoKSArICclJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICc1cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogc3RhdHVzLnN0YXR1cyA9PT0gZW51bV8xLlN0YXR1cy5FYXJuID8gdGhlbWVfMS50aGVtZS50b2tlbi5jb2xvclByaW1hcnkgOiB0aGVtZV8xLnRoZW1lLmNvbG9yLmNvbG9yWWVsbG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogJzk5OTk5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICcwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSB9KSkpKSk7XG59XG5leHBvcnRzLk1hc2sgPSBNYXNrO1xuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG52YXIgX2E7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCByZWFjdF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5jb25zdCByZWFjdF9kb21fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicmVhY3QtZG9tXCIpKTtcbmNvbnN0IE1hc2tfMSA9IHJlcXVpcmUoXCIuL01hc2tcIik7XG5jb25zdCBjc3NpbmpzXzEgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vY3NzaW5qc1wiKTtcbmNvbnN0IEFQUF9OQU1FID0gJ19famlhbmctdG9tYXRvJztcbi8vIOWIneWni+WMluS4u+WuueWZqO+8jOS4u+WuueWZqOeUqOadpeaMguWcqOWFqOWxgOagt+W8j++8jOWMheaLrOesrOS4ieaWuee7hOS7tueahOagt+W8j1xubGV0IE15Qm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoQVBQX05BTUUpO1xuLy8gY29udGFpbmVyIOaJv+i9vSBVSSDnu4Tku7ZcbmxldCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vIOS9v+eUqCBzaGFkb3cg5p2l6ZqU56a75qC35byPXG5sZXQgc2hhZG93Um9vdCA9IHVuZGVmaW5lZDtcbmlmIChNeUJveCAhPT0gbnVsbCAmJiBNeUJveCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8g5aaC5p6c5bey5a2Y5Zyo5a655ZmoXG4gICAgLy8gY29uc29sZS5sb2coJ+W3suWtmOWcqCBCb3gg5a655ZmoJyk7XG4gICAgLy8g56e76Zmk5pen5a655Zmo77yM6YG/5YWN5Ye6546wIDIg5Liq5Li75a655Zmo5Lya5a+86Ie0IFVJIOa4suafk+mUmeivr1xuICAgIChfYSA9IE15Qm94LnBhcmVudE5vZGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVDaGlsZChNeUJveCk7XG59XG4vLyDliJvlu7rkuLvlrrnlmahcbk15Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5NeUJveC5pZCA9IEFQUF9OQU1FO1xuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5hcHBlbmRDaGlsZChNeUJveCk7XG5NeUJveC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbnNoYWRvd1Jvb3QgPSBNeUJveCA9PT0gbnVsbCB8fCBNeUJveCA9PT0gdm9pZCAwID8gdm9pZCAwIDogTXlCb3guYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nIH0pO1xuY29udGFpbmVyLmNsYXNzTmFtZSA9ICdjb250YWluZXInO1xuc2hhZG93Um9vdCA9PT0gbnVsbCB8fCBzaGFkb3dSb290ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzaGFkb3dSb290LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG5yZWFjdF9kb21fMS5kZWZhdWx0LnJlbmRlcihyZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChyZWFjdF8xLmRlZmF1bHQuU3RyaWN0TW9kZSwgbnVsbCxcbiAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChjc3NpbmpzXzEuU3R5bGVQcm92aWRlciwgeyBjb250YWluZXI6IHNoYWRvd1Jvb3QgfSxcbiAgICAgICAgcmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoTWFza18xLk1hc2ssIG51bGwpKSksIGNvbnRhaW5lcik7XG4vLyBsZXQgcG9ydCA9IGJyb3dzZXIucnVudGltZS5jb25uZWN0KHtcbi8vICAgbmFtZTogJ2Zyb21Db250ZW50U2NyaXB0J1xuLy8gfSlcbi8vIHBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKChtc2cpID0+IHtcbi8vICAgY29uc29sZS5sb2cobXNnKTtcbi8vICAgaWYgKG1zZy50eXBlID09PSBcInNob3dNYXNrXCIpIHtcbi8vICAgICAvLyBNeUJveC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuLy8gICAgIHNob3dNYXNrKClcbi8vICAgfVxuLy8gfSk7XG4vLyDmjqXmlLYgYmFja2dyb3VuZCDmtojmga/vvIjnm67liY3mmK/pgJrov4fmtY/op4jlmajnmoTlj7PplK7oj5zljZXop6blj5HvvIlcbi8vIGJyb3dzZXIucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKG1zZywgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcbi8vICAgY29uc29sZS5sb2coJ2NvbnRlbnQgc2NyaXB0IG9uTWVzc2FnZTonKTtcbi8vICAgY29uc29sZS5sb2cobXNnKTtcbi8vICAgaWYgKG1zZy50eXBlID09PSAnc2hvd01hc2snKSB7XG4vLyAgICAgc2hvd01hc2soKVxuLy8gICB9XG4vLyB9KTtcbi8vIOaYvuekuuW6lOeUqOeql+WPo1xuLy8gYXN5bmMgZnVuY3Rpb24gc2hvd01hc2soKSB7XG4vLyAgIFJlYWN0RE9NLnJlbmRlcihcbi8vICAgICA8UmVhY3QuU3RyaWN0TW9kZT5cbi8vICAgICAgIDxTdHlsZVByb3ZpZGVyIGNvbnRhaW5lcj17c2hhZG93Um9vdH0+XG4vLyAgICAgICAgIDxNYXNrIC8+XG4vLyAgICAgICA8L1N0eWxlUHJvdmlkZXI+XG4vLyAgICAgPC9SZWFjdC5TdHJpY3RNb2RlPixcbi8vICAgICBjb250YWluZXJcbi8vICAgKTtcbi8vIH1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Ub21hdG9UaW1lID0gZXhwb3J0cy5XZWJzaXRlVHlwZSA9IGV4cG9ydHMuU3RhdHVzID0gdm9pZCAwO1xudmFyIFN0YXR1cztcbihmdW5jdGlvbiAoU3RhdHVzKSB7XG4gICAgU3RhdHVzW1wiU3RhbmRieVwiXSA9IFwiU3RhbmRieVwiO1xuICAgIFN0YXR1c1tcIkVhcm5cIl0gPSBcIkVhcm5cIjtcbiAgICBTdGF0dXNbXCJTcGVuZFwiXSA9IFwiU3BlbmRcIjtcbn0pKFN0YXR1cyA9IGV4cG9ydHMuU3RhdHVzIHx8IChleHBvcnRzLlN0YXR1cyA9IHt9KSk7XG52YXIgV2Vic2l0ZVR5cGU7XG4oZnVuY3Rpb24gKFdlYnNpdGVUeXBlKSB7XG4gICAgV2Vic2l0ZVR5cGVbXCJPdGhlclwiXSA9IFwib3RoZXJcIjtcbiAgICBXZWJzaXRlVHlwZVtcIldoaXRlXCJdID0gXCJ3aGl0ZVwiO1xuICAgIFdlYnNpdGVUeXBlW1wiQmxhY2tcIl0gPSBcImJsYWNrXCI7XG59KShXZWJzaXRlVHlwZSA9IGV4cG9ydHMuV2Vic2l0ZVR5cGUgfHwgKGV4cG9ydHMuV2Vic2l0ZVR5cGUgPSB7fSkpO1xudmFyIFRvbWF0b1RpbWU7XG4oZnVuY3Rpb24gKFRvbWF0b1RpbWUpIHtcbiAgICBUb21hdG9UaW1lW1RvbWF0b1RpbWVbXCJFYXJuXCJdID0gMTgwMDBdID0gXCJFYXJuXCI7XG4gICAgVG9tYXRvVGltZVtUb21hdG9UaW1lW1wiU3BlbmRcIl0gPSAxNTAwMDAwXSA9IFwiU3BlbmRcIjtcbn0pKFRvbWF0b1RpbWUgPSBleHBvcnRzLlRvbWF0b1RpbWUgfHwgKGV4cG9ydHMuVG9tYXRvVGltZSA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudGhlbWUgPSB2b2lkIDA7XG5leHBvcnRzLnRoZW1lID0ge1xuICAgIHRva2VuOiB7XG4gICAgICAgIGNvbG9yUHJpbWFyeTogJyNFRjRCM0EnLFxuICAgICAgICBjb2xvckxpbms6IFwiI0YwOEEyNFwiLFxuICAgICAgICBjb2xvckxpbmtIb3ZlcjogXCIjZmZhMjhmXCIsXG4gICAgICAgIGNvbG9yTGlua0FjdGl2ZTogXCIjYzkzMTI2XCJcbiAgICAgICAgLy8gY29sb3JUZXh0OiBcIiNGMDhBMjRcIlxuICAgIH0sXG4gICAgY29sb3I6IHtcbiAgICAgICAgY29sb3JTZWNvbmQ6ICcjQTJDOTc1JyxcbiAgICAgICAgY29sb3JZZWxsb3c6ICcjRjhENzcyJ1xuICAgIH1cbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCJ2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgPyAob2JqKSA9PiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpIDogKG9iaikgPT4gKG9iai5fX3Byb3RvX18pO1xudmFyIGxlYWZQcm90b3R5cGVzO1xuLy8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4vLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbi8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuLy8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4vLyBtb2RlICYgMTY6IHJldHVybiB2YWx1ZSB3aGVuIGl0J3MgUHJvbWlzZS1saWtlXG4vLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuXHRpZihtb2RlICYgMSkgdmFsdWUgPSB0aGlzKHZhbHVlKTtcblx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcblx0aWYodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuXHRcdGlmKChtb2RlICYgNCkgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmKChtb2RlICYgMTYpICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsdWU7XG5cdH1cblx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcblx0dmFyIGRlZiA9IHt9O1xuXHRsZWFmUHJvdG90eXBlcyA9IGxlYWZQcm90b3R5cGVzIHx8IFtudWxsLCBnZXRQcm90byh7fSksIGdldFByb3RvKFtdKSwgZ2V0UHJvdG8oZ2V0UHJvdG8pXTtcblx0Zm9yKHZhciBjdXJyZW50ID0gbW9kZSAmIDIgJiYgdmFsdWU7IHR5cGVvZiBjdXJyZW50ID09ICdvYmplY3QnICYmICF+bGVhZlByb3RvdHlwZXMuaW5kZXhPZihjdXJyZW50KTsgY3VycmVudCA9IGdldFByb3RvKGN1cnJlbnQpKSB7XG5cdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3VycmVudCkuZm9yRWFjaCgoa2V5KSA9PiAoZGVmW2tleV0gPSAoKSA9PiAodmFsdWVba2V5XSkpKTtcblx0fVxuXHRkZWZbJ2RlZmF1bHQnXSA9ICgpID0+ICh2YWx1ZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChucywgZGVmKTtcblx0cmV0dXJuIG5zO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18uaG1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUgPSBPYmplY3QuY3JlYXRlKG1vZHVsZSk7XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgJ2V4cG9ydHMnLCB7XG5cdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRzZXQ6ICgpID0+IHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignRVMgTW9kdWxlcyBtYXkgbm90IGFzc2lnbiBtb2R1bGUuZXhwb3J0cyBvciBleHBvcnRzLiosIFVzZSBFU00gZXhwb3J0IHN5bnRheCwgaW5zdGVhZDogJyArIG1vZHVsZS5pZCk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcImNvbnRlbnRfc2NyaXB0XCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbl9fd2VicGFja19yZXF1aXJlX18uTy5qID0gKGNodW5rSWQpID0+IChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApO1xuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uTyhyZXN1bHQpO1xufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2Nocm9tZV9leHRlbnNpb25fdHlwZXNjcmlwdF9zdGFydGVyXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2Nocm9tZV9leHRlbnNpb25fdHlwZXNjcmlwdF9zdGFydGVyXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgZGVwZW5kcyBvbiBvdGhlciBsb2FkZWQgY2h1bmtzIGFuZCBleGVjdXRpb24gbmVlZCB0byBiZSBkZWxheWVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInZlbmRvclwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9Db250ZW50U2NyaXB0L2luZGV4LnRzeFwiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9