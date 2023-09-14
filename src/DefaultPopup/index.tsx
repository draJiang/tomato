import browser from 'webextension-polyfill'

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { tomatosType } from '../types'
import { Status, WebsiteType, TomatoTime } from '../enum'

import { millisecondsToTime } from '../utils'
import { SettingOutlined } from '@ant-design/icons';
import { Button, ConfigProvider } from 'antd';

import { theme } from '../theme'

import styled from 'styled-components';

import './index.css'

interface InfoProps {
    status: string,
    tomato: tomatosType,
    websiteType: string,
    time: string
}

// interface UIProps {
//     data: InfoProps
// }

const StatusBar = styled.div`

    position: absolute;
    top: 0;
    width: 100%;
    height: 6px;

`

const Description = styled.p`

    color: rgba(0, 0, 0, 0.64);
    padding: 0 10px;
    text-align: center;

`

const ContentBox = styled.div<{ $status?: string }>`

    display: flex;
    flex-direction: column;
    height: inherit;
`

const TopBox = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;

`

const TomatoButton = styled(Button)`

    width:200px;
    margin-top: 14px;

`

const MainInfo = styled.h1`

    font-size: 40px;
    margin-top: 0;
    margin-bottom: 0;
    color: rgba(0, 0, 0, 0.90);
    min-width: 200px;
    text-align: center;

`

export const DefaultPopup = () => {

    const [info, setInfo] = useState<InfoProps>();

    useEffect(() => {

        const port = browser.runtime.connect({
            name: 'fromPopup'
        })

        port.postMessage({ 'type': 'getStatus', 'data': {} })

        port.onMessage.addListener((msg) => {

            if (msg.type === "Initialization") {
                
                const remainingTime = TomatoTime.Earn - msg.data.timeSpent
                const timeFormat = millisecondsToTime(remainingTime)

                setInfo({
                    'status': msg.data.status,
                    'tomato': msg.data.tomato,
                    'websiteType': msg.data.websiteType,
                    'time': timeFormat
                })

            }

            if (msg.type === "updateStatus") {

                
                const remainingTime = TomatoTime.Earn - msg.data.timeSpent
                const timeFormat = millisecondsToTime(remainingTime)

                setInfo((prevInfo: any) => {
                    return { ...prevInfo, time: timeFormat, status: msg.data.status }
                })

            }


            if (msg.type === "updateTomatos") {

                setInfo((prevInfo: any) => {
                    return { ...prevInfo, tomato: msg.data.tomato }
                })

            }


        });



    }, []);

    const newTomato = () => {

        browser.runtime.sendMessage({ 'type': 'newTomato', 'data': {} })

    }

    // const handleMessage = (request: any, sender: any, sendResponse: any) => {

    //     console.log("Message from the background: " + request.type);
    //     setStaus(request.data.status)

    // }


    return (
        <>
            <ConfigProvider
                theme={theme}
            >
                <div id="DefaultPopup" style={{
                    width: '300px',
                    height: '240px',
                    // fontFamily: 'inter'
                }}>

                    {info?.status === Status.Standby && info &&
                        <Standby {...info} />
                    }

                    {info?.status === Status.Earn && info &&
                        <EarnTime {...info} />
                    }

                    {info?.status === Status.Spend && info &&
                        <SpendTime {...info} />
                    }

                </div>
            </ConfigProvider>
        </>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <DefaultPopup />
    </React.StrictMode>,
    document.getElementById("root")
);





function SpendTime(props: InfoProps) {

    useEffect(() => {


    }, [])

    return (

        <ContentBox $status={props.status} style={{
            // borderTop: '4px solid red'
        }}>

            <StatusBar style={{ backgroundColor: theme.color.colorYellow }} />
            <TopBox>

                <MainInfo>{props.time}</MainInfo>

                <div>
                    <Description>Exiting the website will stop the tomato consumption</Description>
                </div>

            </TopBox>

            <BottomBox {...props} />

        </ContentBox>
    )

}

function EarnTime(props: InfoProps) {

    useEffect(() => {


    }, [])

    return (

        <ContentBox $status={props.status} style={{
            // borderTop: '4px solid ' + theme.token.colorPrimary
        }}>

            <StatusBar style={{ backgroundColor: theme.token.colorPrimary }} />
            <TopBox>
                <MainInfo>{props.time}</MainInfo>

                <div>
                    <TomatoButton onClick={() => {
                        browser.runtime.sendMessage({ 'type': 'stopTomato', 'data': {} })
                    }}>Stop</TomatoButton>
                </div>
            </TopBox>

            <BottomBox {...props} />

        </ContentBox>
    )

}

function Standby(props: InfoProps) {

    useEffect(() => {


    }, [])

    return (

        <ContentBox $status={props.status}>



            {
                props?.websiteType === WebsiteType.White &&
                <TopBox>
                    <MainInfo>25:00</MainInfo>
                    <div>
                        <TomatoButton type='primary' onClick={() => {
                            browser.runtime.sendMessage({ 'type': 'newTomato', 'data': {} })
                        }}>Start</TomatoButton>
                    </div>
                </TopBox>
            }

            {
                props?.websiteType === WebsiteType.Black &&
                <TopBox>
                    <MainInfo>🔒</MainInfo>
                    <div>
                        <Description>Blacklisted website, unable to accumulate 🍅</Description>
                    </div>
                </TopBox>
            }

            {
                props?.websiteType === WebsiteType.Other &&
                <TopBox>
                    <MainInfo>🍅</MainInfo>
                    <div>
                        <Description>Accumulate 🍅 on whitelisted websites.</Description>
                    </div>
                </TopBox>
            }

            <BottomBox {...props} />

        </ContentBox >
    )

}

function BottomBox(props: InfoProps) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "10px 10px 10px 14px",
            borderTop: '1px solid rgba(0, 0, 0, 0.10)'

        }}>
            <div style={{
                flex: '1',
                color: 'rgba(0, 0, 0, 0.9)'
            }}>🍅✖️{props?.tomato.balance}</div>
            <Button onClick={() => { browser.runtime.openOptionsPage()}} type="text" icon={<SettingOutlined />} />
        </div>
    )

}