import browser from 'webextension-polyfill'

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";


import { StyleProvider } from '@ant-design/cssinjs';


import { Button, Form, Input, Tabs, Radio, ConfigProvider, Divider, message } from 'antd';

import { theme } from '../theme'
import { SettingsFrom } from './SettingsFrom'
import { Charts } from './Charts'

import "./index.css"

export const Options = () => {

  useEffect(() => {



  }, []);


  return (
    <>




      <div id="MyOptions"
        style={{
          padding: '40px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          border: '1px solid rgba(0, 0, 0, 0.1)'
        }}
      >

        <ConfigProvider
          theme={theme}
        >

          <Tabs
            tabPosition='left'
            items={[
              {
                label: `📊Charts`,
                key: '0',
                children: <Charts />,
              },
              {
                label: `⚙️Setting`,
                key: '1',
                children: <SettingsFrom />,
              }

            ]}
          />


        </ConfigProvider >
      </div >

    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <StyleProvider>
      <Options />
    </StyleProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
