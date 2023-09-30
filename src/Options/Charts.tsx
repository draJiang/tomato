import browser from 'webextension-polyfill'

import React, { useEffect, useState } from "react";
import { ResponsiveLine } from '@nivo/line'
import { tomatosDataType } from '../types'
import { theme } from '../theme'


export function Charts() {

    const [lineData, setLineData] = useState<Array<{ id: string, color: string, data: any }>>([]);

    useEffect(() => {

        // 获取 Line 数据
        browser.storage.local.get({ "data": [] }).then((result) => {

            console.log(result.data);

            // 将数据转为组件需要的格式
            // const earnData = result.data.earn.map((item: { date: string, value: number }) => { return { x: item.date, y: item.value } })
            // const spendData = result.data.spend.map((item: { date: string, value: number }) => { return { x: item.date, y: item.value } })

            const newData = processOriginalData(result.data)
            console.log('newData:');
            console.log(newData);


            setLineData(newData)

        })

    }, [])

    // type ArrayData = { date: string, value: number };
    type tomatosDataKey = 'earn' | 'spend';

    const processOriginalData = (originalData: tomatosDataType) => {
        let resultData = [];

        let currentDate = new Date();
        let pastDate = new Date();
        // 最近 30 天的数据
        pastDate.setDate(currentDate.getDate() - 30);

        const sections: tomatosDataKey[] = ['earn', 'spend'];


        for (let section of sections) {
            let currentArray = originalData[section];
            let tempData: { id: tomatosDataKey, color: string, data: { x: string, y: number }[] } = { id: section, color: section === 'earn' ? theme.token.colorPrimary : theme.color.colorYellow, data: [] };

            let loopDate = new Date(pastDate); // Create a new Date object for the loop
            for (let d = loopDate; d <= currentDate; d.setDate(d.getDate() + 1)) {
                let formatDate: string = d.toISOString().slice(0, 10);

                let findData = currentArray.find((item: { date: string, value: number }) => item.date === formatDate);

                let value: number = findData ? findData.value : 0;

                tempData.data.push({ x: formatDate, y: value });
            };

            resultData.push(tempData);
            console.log('tempData:');
            console.log(tempData);

        }

        return resultData;

    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    const tickValues = Array.from({ length: 30 }, (_, i) => {
        const date = new Date(startDate.getTime());
        date.setDate(date.getDate() + i);
        if (i % 3 === 0) {
            return date.toISOString().slice(0, 10);
        }
    }).filter(Boolean);

    console.log('lineData:');
    console.log(lineData);


    return (



        <div style={{
            height: '240px'
        }}>
            {lineData.length > 0 ?
                <ResponsiveLine
                    data={lineData!}
                    isInteractive={true}
                    enableArea={true}
                    enablePoints={false}
                    enableGridX={false}
                    useMesh={true}
                    curve='basis'
                    enableSlices='x'
                    margin={{ top: 10, right: 20, bottom: 20, left: 20 }}
                    axisLeft={null}
                    axisBottom={{
                        tickSize: 0,
                        tickValues,
                        format: d => {
                            const date = new Date(d);
                            return `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                        },
                    }}
                    sliceTooltip={({ slice }) => {
                        return (
                            <div style={{
                                backgroundColor: '#fff',
                                width: 'auto',
                                padding: '10px',
                                borderRadius: '4px',
                                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                            }}>
                                <div style={{ opacity: '0.6', marginBottom: '2px' }}>{slice.points[0].data.xFormatted}</div>
                                {slice.points.map(point => (
                                    <div
                                        key={point.id}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            padding: '3px 0',
                                        }}
                                    >

                                        <div
                                            style={{
                                                width: '10px',
                                                height: '10px',
                                                marginRight: '4px',
                                                backgroundColor: point.color
                                            }}
                                        ></div><strong>{point.serieId}</strong> : {point.data.yFormatted}
                                    </div>
                                ))}

                            </div>
                        );
                    }}
                />
                :
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <h1>📊</h1>
                    <div style={{
                        color: '#666',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <h3 style={{ margin: 0 }}>No Data Available</h3>
                        <p>Daily Earned and Consumed Tomato Data will be Displayed Here</p>
                    </div>
                </div>

            }

        </div>
    )

}