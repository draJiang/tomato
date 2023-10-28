import { WebsiteType } from '../enum';
import { tomatosDataType } from '../types'
import browser from 'webextension-polyfill'

// let website = [
//     { 'url': 'react.dev', white: true },
//     { 'url': 'duolingo.com', white: true },
//     { 'url': 'medium.com', white: false },
//     { 'url': 'discord.com', white: false }
// ]

export const checkWebsite = async (thisUrl: string) => {

    let websiteType = WebsiteType.Other

    // 获取网站
    const result: any = await browser.storage.local.get({ "websites": [] })
    const websites = result.websites || [];

    // 根据当前网页的 URL 控制 Popup 的状态
    for (let i = 0; i < websites.length; i++) {
        if (thisUrl) {
            const url = websites[i].url.replace(/http:\/\//g, "").replace(/https:\/\//g, "").replace(/www./g, "");
            if (thisUrl.indexOf(url) >= 0) {

                if (websites[i].type === WebsiteType.White) {
                    websiteType = WebsiteType.White
                } else {
                    websiteType = WebsiteType.Black
                }

                break
            }
        }

    }

    return {
        type: websiteType
    }

}

export const validate = (key: string) => {

    return new Promise<void>((resolve, reject) => {

        fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
            method: 'POST',
            body: JSON.stringify({ license_key: key }),
            headers: { 'Content-Type': 'application/json' }

        }).then((response) => {
            response.json().then((data) => {

                console.log(data);
                resolve(data)

            })
        })

    })

}

export const getNewData = (oldData: tomatosDataType, n: number) => {

    let newData = { ...oldData }
    const today = new Date().toISOString().split('T')[0];

    //在旧数据中找到今天的日期，在今日的日期上增加/减少番茄
    if (n > 0) {

        let found = false
        for (let i = 0; i < newData.earn.length; i++) {

            if (newData.earn[i].date === today) {
                newData.earn[i].value += n
                found = true
                break
            }

        }

        //没有在旧数据中找到今天的日期，新增今日日期
        if (!found) {
            newData.earn.push({ 'date': today, value: n })
        }

        newData.earn = newData.earn.slice(-10)

    } else {

        let found = false
        for (let i = 0; i < newData.spent.length; i++) {

            if (newData.spent[i].date === today) {
                newData.spent[i].value += Math.abs(n)
                found = true
                break
            }

        }

        //没有在旧数据中找到今天的日期，新增今日日期
        if (!found) {
            newData.spent.push({ 'date': today, value: Math.abs(n) })
        }

        newData.spent = newData.spent.slice(-10)

    }


    return newData


}