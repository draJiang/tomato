import browser from 'webextension-polyfill'

import React, { useEffect, useState, useRef, useContext } from "react";

import { showMaskType } from '../types'
import { WebsiteType, TomatoTime, Status } from '../enum';
import { Button, ConfigProvider, Divider, message } from 'antd';
import { theme } from '../theme'

// import { LockOutlined } from '@ant-design/icons';
import { LockClosedIcon } from '@radix-ui/react-icons'

import confetti from 'canvas-confetti';


export function Mask(props: any) {

    // 窗口拖拽逻辑
    // const [showMaks, setShowMaks] = useState(false);
    const [status, setStatus] = useState<showMaskType>({
        'showMask': false,
        'status': '',
        'websiteType': '',
        'tomato': { 'balance': 0, 'total': 0 }

    })

    const [remainingTime, setRemainingTime] = useState<number>(0)

    const windowElement = useRef<HTMLDivElement>(null);







    useEffect(() => {



        browser.runtime.sendMessage({
            'type': 'check', 'data': {}

        })


        browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {

            // 显示或隐藏遮罩
            if (request.type === "showMask") {

                setStatus(request.data)

            }

            // 增加了 1 个番茄
            if (request.type === "completeTomato") {

                confetti({
                    particleCount: 140,
                    spread: 170,
                    origin: { y: 0.4 }
                });

                message.success({
                    content: 'You just completed a tomato timer',
                    icon: <span style={{ marginRight: '4px' }}>🍅</span>,
                    duration: 4,
                })


            }

            // 更新时间进度
            if (request.type === "updateTomato") {

                setRemainingTime(request.data.remainingTime)

            }



        });


    }, []);

    // 消费番茄
    const handleSpendTomatosBtnClick = () => {

        //消费番茄
        browser.runtime.sendMessage({
            'type': 'spendTomatos', 'data': {}

        })



        //暂停累积番茄

        setStatus((prevStatus: showMaskType) => {
            return { ...prevStatus, showMask: false }
        })


    }

    // 停止番茄
    const handleStopTomatosBtnClick = () => {

        //消费番茄
        browser.runtime.sendMessage({
            'type': 'stopTomato', 'data': {}

        })

        //暂停累积番茄

        setStatus((prevStatus: showMaskType) => {
            return { ...prevStatus, showMask: false }
        })


    }


    return (

        <>

            <ConfigProvider
                theme={theme}
            >
                <div id="" ref={windowElement} style={{
                    fontFamily: 'inherit',
                    fontSize: '14px'
                }}>

                    {status?.showMask &&
                        <div
                            className='contentBox'
                            style={{
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
                            }}
                        >
                            <div style={{
                                display: "flex",
                                width: '300px',
                                flexDirection: "column",
                                alignItems: "center",
                                backgroundColor: "#F8F2DF",
                                padding: "40px 80px",
                                borderRadius: '4px',
                                border: '1px solid rgba(0, 0, 0, 0.1)'
                            }}>

                                {status.websiteType === WebsiteType.Black &&

                                    <>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center"
                                        }}>
                                            <h1 style={{ marginTop: '0px' }}><LockClosedIcon style={{ opacity: '0.8', width: '24px', height: '24px' }} /></h1>
                                            <Button
                                                style={{
                                                    marginBottom: '1em',
                                                    minWidth: '180px'
                                                }}
                                                disabled={status.tomato.balance <= 0 ? true : false}
                                                onClick={handleSpendTomatosBtnClick}>Unlock</Button>
                                        </div>

                                        <Divider />

                                        <div style={{
                                            color: 'rgba(0, 0, 0, 0.8)',
                                            fontSize: '1em',
                                            marginTop: '1em'
                                        }}
                                        >🍅 balance: {status.tomato.balance}</div>

                                    </>

                                }

                                {status.websiteType === WebsiteType.Other &&

                                    <>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center"
                                        }}>
                                            <h1 style={{
                                                marginTop: '0px'
                                            }}>🍅</h1>

                                            <Button
                                                style={{
                                                    marginBottom: '1em'
                                                }}
                                                onClick={handleStopTomatosBtnClick}>Stop tomato</Button>

                                            <Button
                                                type='text'
                                                style={{
                                                    marginBottom: '1em'
                                                }}
                                                onClick={() => setStatus((prevStatus: showMaskType) => {
                                                    return { ...prevStatus, showMask: false }
                                                })}>Unblock</Button>
                                        </div>

                                    </>

                                }
                            </div>

                        </div>
                    }

                    {remainingTime > 0 && status.status !== Status.Standby &&

                        <div title='🍅Tomato Bank' style={{
                            position: 'fixed',
                            width: ((TomatoTime.Earn - remainingTime) / TomatoTime.Earn * 100).toFixed(2).toString() + '%',
                            height: '5px',
                            backgroundColor: status.status === Status.Earn ? theme.token.colorPrimary : theme.color.colorYellow,
                            zIndex: '99999',
                            top: '0'
                        }}>

                        </div>
                    }

                </div >
            </ConfigProvider >
        </>

    );
};