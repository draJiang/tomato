import browser from 'webextension-polyfill'
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser'

import icon from '../assets/icon128.png'

import { checkWebsite } from './util'
import { millisecondsToTime } from '../utils'
import { showMaskType, tomatosType } from '../types'
import { Status, WebsiteType, TomatoTime } from '../enum'

import { theme } from '../theme'
import { validate, getNewData } from './util'

// 插件安装事件
browser.runtime.onInstalled.addListener(function () {

});


// 记录番茄状态
let status: Status = Status.Standby;
// 当前标签的 URL
let thisUrl: string | undefined
// 当前标签的 ID
let activeTab: number | undefined | null;

let earnTime: number = 0;
let spendTime: number = 0;

let earnTomato: NodeJS.Timeout | undefined
let spendzTomato: NodeJS.Timeout | undefined

// 监听 popup 的消息
browser.runtime.onMessage.addListener(handleMessage);
function handleMessage(request: any, sender: any, sendResponse: any) {

    console.log("Message from the content script: " + request.type);

    // 开始一个新的番茄
    if (request.type === 'newTomato') {


        // 开始计时
        // lastActivityTime = Date.now();

        earnTomato = setInterval(async () => {

            earnTime = await updateTabTimeSpent(earnTime)!
            console.log(`EarnTomato has been viewed for ${earnTime} ms.`);

        }, 1 * 1000);
        // 记录当前状态
        status = Status.Earn
        // 显示进度条
        showMask(false)
    }

    // 停止一个一开始的番茄
    if (request.type === 'stopTomato') {

        stopTomato()
        status = Status.Standby
        // 通知 Popup 更新
        if (portToPopup) {
            const response = {
                'type': 'updateStatus', 'data':
                {
                    'status': status,
                    'timeSpent': status as Status === Status.Spend ? spendTime : earnTime,
                }

            }
            portToPopup.postMessage(response)
        }

    }

    if (request.type === 'validate') {

        validate(request.data.key).then((data) => {

            console.log(data);
            if (activeTab) {
                browser.tabs.sendMessage(activeTab, { 'type': 'validate', 'data': data });
            }


        })


        return true; // Important: this keeps sendResponse alive for async operation
    }

    if (request.type === 'check') {
        main()
    }

    if (request.type === 'spendTomatos') {
        // 停止赚钱计时
        if (status === Status.Earn) {
            stopTomato()
        }

        // 记录当前状态
        status = Status.Spend
        // 显示进度条
        showMask(false)

        browser.storage.local.get({ 'spendTime': 0 }).then((data: any) => {

            spendTime = data.spendTime



            // 开始计时
            spendzTomato = setInterval(async () => {

                spendTime = await updateTabTimeSpent(spendTime)!
                console.log(`spendzTomato has been viewed for ${spendTime} ms.`);

            }, 1 * 1000);


        })




    }


}

let portToPopup: any
// let portTocontent: any

// 长连接
browser.runtime.onConnect.addListener(port => {

    console.log('连接中------------')

    if (port.name === 'fromContentScript') {

        // portTocontent = port
        // port.postMessage('hello I am bakcground')

        // 检查是否要禁用网页
        // slover()

    } else {
        portToPopup = port
    }

    if (port.name === 'fromPopup') {

        port.onMessage.addListener(async (request) => {

            console.log(request);

            if (request.type === 'getStatus') {

                const website = await checkWebsite(thisUrl!)
                const websiteType = website.type

                let data = await browser.storage.local.get({ "tomato": { 'total': 0, 'balance': 0 } })
                const response = {
                    'type': 'Initialization', 'data':
                    {
                        'websiteType': websiteType,
                        'status': status,
                        'timeSpent': status === 'Spend' ? spendTime : earnTime,
                        'tomato': data.tomato
                    }

                }

                port.postMessage(response)


            }


        })

    }






})


// 初始化活动标签的状态
browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {

    console.log('初始化活动标签的状态');



    if (tabs[0]) {
        activeTab = tabs[0].id;
        thisUrl = tabs[0].url
        console.log(thisUrl);

        main()
    }




})

// 监听浏览器窗口切换
browser.windows.onFocusChanged.addListener(function (windowId) {

    console.log('browser.windows.onFocusChanged');

    if (windowId !== browser.windows.WINDOW_ID_NONE) {

        main()

    }
});

// 监听标签激活状态的改变
browser.tabs.onActivated.addListener(function (activeInfo) {

    console.log('browser.tabs.onActivated');

    // updateTabTimeSpent();

    console.log(activeInfo);
    activeTab = activeInfo.tabId

    main()

});

// 根据当前番茄状态和网站类型处理核心逻辑（限制访问或者累积番茄等）
function main() {

    browser.tabs.query({ active: true, currentWindow: true }).then(async (tabs) => {


        if (tabs[0]) {

            activeTab = tabs[0].id;

            if ('url' in tabs[0]) {
                thisUrl = tabs[0].url
            } else {
                thisUrl = tabs[0].pendingUrl
            }


            //  根据网站状态处理计时逻辑
            const website = await checkWebsite(thisUrl!)
            const websiteType = website.type

            console.log('当前状态：' + status + '；当前网页：' + websiteType);

            switch (websiteType) {

                // 网站是白名单
                case WebsiteType.White:

                    // 不显示 Mask
                    showMask(false)

                    // 当前番茄状态
                    // Standby, Earn, Spend
                    switch (status) {
                        case Status.Standby:
                            break;
                        case Status.Earn:
                            // stopTomato()
                            break;
                        case Status.Spend:
                            // 将计时时长保存起来，下一次从这里继续计时
                            browser.storage.local.set({ 'spendTime': spendTime })
                            // 停止计时
                            stopTomato()
                            // 默认状态
                            status = Status.Standby
                            break
                        default:
                            break;
                    }

                    break;

                // 网站是黑名单
                case WebsiteType.Black:

                    // 当前番茄状态
                    switch (status) {

                        case Status.Standby:
                            // 禁止浏览网页
                            showMask(true)

                            break;

                        case Status.Earn:
                            // 当前正在累积番茄
                            // 显示提示
                            showMask(true)
                            break;

                        case Status.Spend:
                            // 继续计时
                            // 不显示 Mask
                            showMask(false)
                            break;

                        default:
                            break;
                    }

                    break;

                case WebsiteType.Other:

                    // 当前番茄状态
                    switch (status) {

                        case Status.Standby:
                            showMask(false)
                            break;

                        case Status.Earn:
                            // 当前正在累积番茄
                            // 提示用户离开了白名单页面，会中断番茄
                            showMask(true)

                            break;

                        case Status.Spend:
                            // 暂停计时
                            browser.action.setBadgeText({ text: '' })
                            // 将计时时长保存起来，下一次从这里继续计时
                            browser.storage.local.set({ 'spendTime': spendTime })
                            // 停止计时
                            stopTomato()
                            // 恢复默认状态
                            status = Status.Standby

                            break;

                        default:
                            break;
                    }

                    break

                default:
                    break;
            }


        }


    })

}




// 对关闭的标签进行处理
// browser.tabs.onRemoved.addListener(function (tabId, removeInfo) {
//     if (tabId === activeTab) {
//         // updateTabTimeSpent();
//         activeTab = null;
//     }
// });

// 更新倒计时
async function updateTabTimeSpent(currentTimeSpent: number) {

    if (activeTab) {
        // let duration = Date.now() - lastActivityTime;
        let duration = 1000
        let newCurrentTimeSpent = currentTimeSpent

        newCurrentTimeSpent += duration;



        if (newCurrentTimeSpent >= TomatoTime.Earn) {
            // 累积满了 1 个番茄

            console.log('🍅🍅🍅');


            //更新番茄余额、总额
            if (status === 'Spend') {
                updateTomato(-1)

                // 锁定网页
                setTimeout(() => {
                    showMask(true)
                }, 400);

                //重置消费番茄倒计时
                browser.storage.local.set({ 'spendTime': 0 })



            } else {
                // 完成 1 个番茄钟的累积
                updateTomato(1)

                browser.tabs.sendMessage(activeTab, {
                    'type': 'completeTomato',
                    'data': {}

                });

            }


            // 停止番茄计时
            stopTomato()
            // 恢复默认状态
            status = Status.Standby
            newCurrentTimeSpent = 0

        }



        // 将消息发送给 Popup
        if (portToPopup) {
            const full = newCurrentTimeSpent >= TomatoTime.Earn

            if (full) {

            }

            const website = await checkWebsite(thisUrl!)
            const websiteType = website.type

            const response = {
                'type': 'updateStatus', 'data':
                {
                    'websiteType': websiteType,
                    'status': status,
                    'timeSpent': newCurrentTimeSpent
                    // 'tomato':''
                }

            }

            try {

                portToPopup.postMessage(response)

            } catch (error: any) {

                console.log('error:');
                console.log(error);

                // Popup 窗口已关闭
                if (error.message!.indexOf('disconnected') >= 0) {

                    portToPopup = undefined

                }

            }


        }


        if (newCurrentTimeSpent !== 0) {

            const remainingTime = TomatoTime.Earn - newCurrentTimeSpent
            let timeFormat = millisecondsToTime(remainingTime)

            // 更新 content Script
            browser.tabs.sendMessage(activeTab, {
                'type': 'updateTomato',
                'data': {
                    'remainingTime': remainingTime
                }

            });

            // Firefox
            if (navigator.userAgent.indexOf('Firefox') >= 0) {
                timeFormat = timeFormat.split(':')[0] === '00' ? timeFormat.split(':')[1] : timeFormat.split(':')[0]
            }

            //  更新 Popup
            browser.action.setBadgeText({ text: timeFormat })
            if (status === Status.Spend) {
                //green
                browser.action.setBadgeBackgroundColor({ color: theme.color.colorYellow })
                browser.action.setBadgeTextColor({ color: '#000000' })

            } else {
                browser.action.setBadgeBackgroundColor({ color: theme.token.colorPrimary })
                browser.action.setBadgeTextColor({ color: '#ffffff' })
            }

        }


        return newCurrentTimeSpent
    }

    return 0
}

// 停止赚钱/花钱番茄
function stopTomato() {

    if (status === Status.Spend) {
        clearInterval(spendzTomato);
        spendzTomato = undefined
        spendTime = 0; // 重置时间

    } else {
        clearInterval(earnTomato);
        earnTomato = undefined
        earnTime = 0; // 重置时间

    }

    // status = Status.Standby //默认状态
    browser.action.setBadgeText({ text: '' })

    if (activeTab) {
        // 隐藏进度条
        browser.tabs.sendMessage(activeTab, {
            'type': 'updateTomato',
            'data': { 'remainingTime': 0 }

        });
    }

}

async function showMask(isShow: boolean) {

    if (activeTab) {

        let data = await browser.storage.local.get({ "tomato": { 'total': 0, 'balance': 0 } })

        const website = await checkWebsite(thisUrl!)
        const websiteType = website.type

        let msg: showMaskType = {
            'status': status,
            'showMask': isShow,
            'tomato': data.tomato,
            'websiteType': websiteType
        }

        browser.tabs.sendMessage(activeTab, {
            'type': 'showMask',
            'data': msg

        });
    }




}

// 增加/减少番茄
async function updateTomato(n: number) {


    let data = await browser.storage.local.get({ 'tomato': { 'total': 0, 'balance': 0 }, 'data': { 'earn': [], 'spend': [] } })



    const today = new Date().toISOString().split('T')[0];

    if (n > 0) {
        //赚了番茄，总额+1
        data.tomato.total = data.tomato.total + n
        // newData.earn.push({ 'date': today, value: n })

    } else {
        //消费了番茄
        // newData.spend.push({ 'date': today, value: Math.abs(n) })
    }

    //设置余额
    data.tomato.balance = data.tomato.balance + n

    //处理番茄统计数据
    const oldData = { ...data.data }
    const newData = getNewData(oldData, n)

    console.log('newData:');
    console.log(newData);
    

    //保存金额与数据统计
    browser.storage.local.set({ 'tomato': data.tomato, 'data': newData })

    // 通知 Popup 更新
    if (portToPopup) {
        const response = {
            'type': 'updateTomatos', 'data':
            {
                'status': Status.Standby,
                'timeSpent': status === 'Spend' ? spendTime : earnTime,
                'tomato': data.tomato
            }

        }
        portToPopup.postMessage(response)
    }





}