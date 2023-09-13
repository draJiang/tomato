import { WebsiteType } from '../enum';
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
            if (thisUrl.indexOf(websites[i].url) >= 0) {

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
