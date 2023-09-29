import browser from 'webextension-polyfill'

import React, { useEffect, useState } from "react";
import { ResponsiveLine } from '@nivo/line'
import { tomatosDataType } from '../types'


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
        pastDate.setDate(currentDate.getDate() - 30);

        const sections: tomatosDataKey[] = ['earn', 'spend'];
        

        for (let section of sections) {
            let currentArray = originalData[section];
            let tempData: { id: tomatosDataKey, color: string, data: { x: string, y: number }[] } = { id: section, color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`, data: [] };
            
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


    const data = [
        {
            "id": "japan",
            "color": "hsl(104, 70%, 50%)",
            "data": [
                {
                    "x": "2023-09-22",
                    "y": 1
                },
                {
                    "x": "2023-09-25",
                    "y": 3
                },
                {
                    "x": "2023-09-29",
                    "y": 7
                },
                {
                    "x": "2023-10-03",
                    "y": 1
                }
            ]
        },
        {
            "id": "france",
            "color": "hsl(208, 70%, 50%)",
            "data": [
                {
                    "x": "2023-09-24",
                    "y": 1
                },
                {
                    "x": "2023-09-25",
                    "y": 2
                },
                {
                    "x": "2023-09-29",
                    "y": 1
                },
                {
                    "x": "2023-10-04",
                    "y": 1
                }
            ]
        },
    ]


    return (
        <div style={{
            height: '200px'
        }}>

            <ResponsiveLine
                data={lineData!}
                isInteractive={true}
                useMesh={true}
            />

        </div>
    )

}