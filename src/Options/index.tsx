import browser from 'webextension-polyfill'

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { MinusCircleOutlined, PlusOutlined, LoadingOutlined, CheckCircleTwoTone, WarningOutlined } from '@ant-design/icons';
import { StyleProvider } from '@ant-design/cssinjs';

import type { RadioChangeEvent } from 'antd';
import { Button, Form, Input, Space, Radio, ConfigProvider, Divider, message } from 'antd';
import styled from 'styled-components';
import { theme } from '../theme'

import "./index.css"
// import "../assets/tailwind.css"
import Usage from "../assets/usage.png"
import { WebsiteType } from '../enum'


let MySection = styled.section`

  border: 1px solid rgba(5, 5, 5, 0.06);
  padding: 20px 20px 0px 20px;
  border-radius: 6px;
  margin-bottom: 34px;

`;

let MyTitle = styled.h2`

  margin-bottom: 10px;

`;



export const Options = () => {

  const [form] = Form.useForm();
  const [radioValue, setRadioValue] = useState(WebsiteType.White);
  const [isVerification, setVerification] = useState<'Unknown' | 'Y' | 'N' | 'Loading'>('Unknown')



  const [messageApi, contextHolder] = message.useMessage();


  useEffect(() => {

    // console.log('options useEffect:');


    // 获取配置信息
    getSettings().then(items => {

      // 更新 input 文本框的默认值
      form.setFieldsValue({ licenseKey: items.licenseKey, websites: items.websites });

      // setWebsites

      validate(items.licenseKey)


    })

    // 监听 background 发来的消息
    browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      console.log('==============');
      console.log(request);
      if (request.type === 'validate') {

        if (request.data.valid) {
          setVerification('Y')
        } else {
          setVerification('N')
        }

      }


    });

  }, []);

  const validate = (key: string) => {

    if (key !== '') {

      setVerification('Loading')

      browser.runtime.sendMessage({

        'type': 'validate', 'data': { key: key }

      })
    } else {
      setVerification('Unknown')
    }

  }


  const onFinish = (values: any) => {

    console.log('Received values of form:', values);

    // 保存到历史记录中
    browser.storage.local.set(
      {
        licenseKey: values['licenseKey'],
        websites: values['websites'],
      }
    ).then(item => {

      messageApi.success('Saved');

    })


    // 验证 Key
    validate(values['licenseKey'])

  };

  const onRadioChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setRadioValue(e.target.value);
  };

  async function getSettings() {
    let items = await browser.storage.local.get({ "licenseKey": '', "websites": [] })
    return items
  }

  return (
    <>


      {contextHolder}
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
          <Form
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            autoComplete="off"
            form={form}
          >
            <MyTitle>⚡Pro</MyTitle>
            <MySection>
              <Form.Item name='licenseKey'
                extra={
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    // justifyContent: 'end'
                  }}>

                    Upgrade to Pro plan to add up to 50 websites

                    <Button style={{
                      paddingLeft: '2px',
                      paddingRight: '0',
                    }} type='link' onClick={() => { window.open('https://jiang.lemonsqueezy.com/checkout/buy/838f5b55-4f39-4e6a-919c-3599ded8019a') }} >Get License⚡</Button>

                    {/* <a style={{
                    paddingLeft: '2px',
                    paddingRight: '0',
                  }} onClick={() => { openBuyLicenseKeyDrawer(true) }} >Get License⚡</a> */}

                  </div>
                }
              >
                <Input
                  suffix={

                    <>
                      {isVerification === 'Loading' && <LoadingOutlined />}

                      {isVerification === 'Y' && <CheckCircleTwoTone twoToneColor="#52c41a" />}

                      {isVerification === 'N' && <WarningOutlined />}
                    </>

                  }
                  type='password' placeholder="License key" />
              </Form.Item>
            </MySection>

            <MyTitle>🪴Websites</MyTitle>
            <MySection>
              <div style={{ marginBottom: '20px', color: '#666' }}>
                <p>👍🏼: Visiting this website will <strong>earn</strong> 🍅</p>
                <p>🔒: Visiting this website will <strong>consume</strong> 🍅</p>
              </div>

              <Divider />

              <Form.List name="websites"
              // initialValue={websites}
              >

                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} style={{ display: 'flex', marginBottom: '20px', gap: '10px' }}>
                        <Form.Item
                          style={{ marginBottom: '0', flex: '1' }}
                          {...restField}
                          name={[name, 'url']}
                          rules={[{ required: true, message: 'Please enter the URL' }]
                          }

                        >
                          <Input placeholder="example.com/" />
                        </Form.Item>
                        <Form.Item
                          style={{ marginBottom: '0' }}
                          {...restField}
                          name={[name, 'type']}
                          rules={[{ required: true, message: 'Please select a category' }]}
                        >
                          <Radio.Group value={radioValue} onChange={onRadioChange} >
                            <Radio.Button value={WebsiteType.White}>👍🏼</Radio.Button>
                            <Radio.Button value={WebsiteType.Black}>🔒</Radio.Button>
                          </Radio.Group>

                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </div>
                    ))}
                    <Form.Item>
                      <Button type="dashed"
                        disabled={isVerification !== 'Y' && fields.length >= 4}
                        onClick={() => add({ 'url': '', 'type': WebsiteType.White })} block icon={<PlusOutlined />}>
                        {isVerification !== 'Y' && fields.length >= 4 ? 'Upgrade to Pro plan to add up to 50 websites' : 'Add New Website'}
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </MySection>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
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
