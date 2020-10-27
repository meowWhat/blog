import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { LoginStore } from '../../../store/login'
import { Form, Input, Button, Checkbox } from 'antd'
import './Login.less'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const NormalLoginForm = (props: { click: (index: number) => void }) => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
  }

  return (
    <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          onClick={() => {
            props.click(1)
          }}
        />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          onClick={() => {
            props.click(2)
          }}
          onBlur={() => {
            props.click(0)
          }}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <span className="login-form-forgot rd-a">忘记密码</span>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
        或 <Link to="/regist">立即注册!</Link>
      </Form.Item>
    </Form>
  )
}

const Login = observer((props: { store: LoginStore }) => {
  const [index, setIndex] = useState(0)
  const store = props.store
  const closeModal = () => {
    store.setVsible(false)
  }
  const getPanda = () => {
    const pandas = [
      <img src="//s3.pstatp.com/toutiao/xitu_juejin_web/img/normal.0447fe9.png" alt="panda" className="normal" />,
      <img src="//s3.pstatp.com/toutiao/xitu_juejin_web/img/greeting.1415c1c.png" alt="greeting" className="greeting" />,
      <img src="//s3.pstatp.com/toutiao/xitu_juejin_web/img/blindfold.58ce423.png" alt="blindfold" className="blindfold" />,
    ]
    return pandas[index]
  }
  return (
    <div className="login-modal" style={{ display: store.visible ? 'flex' : 'none' }}>
      <div className="login-content">
        <div className="panfish">{getPanda()}</div>
        <h1 className="login-title">
          账密登录
          <span className="login-close" onClick={closeModal}>
            X
          </span>
        </h1>
        <NormalLoginForm
          click={(index) => {
            setIndex(index)
          }}
        ></NormalLoginForm>
        <div className="oauth-box">
          <div className="oauth-bg">
            <img title="微博" alt="微博" src="//s3.pstatp.com/toutiao/xitu_juejin_web/img/weibo.fa758eb.svg" className="oauth-btn" />
          </div>
          <div className="oauth-bg">
            <img title="微信" alt="微信" src="//s3.pstatp.com/toutiao/xitu_juejin_web/img/wechat.e0ff124.svg" className="oauth-btn" />
          </div>
          <div className="oauth-bg">
            <img title="GitHub" alt="GitHub" src="//s3.pstatp.com/toutiao/xitu_juejin_web/img/github.547dd8a.svg" className="oauth-btn" />
          </div>
        </div>
        <span className="login-info">
          注册登录即表示同意 <span className="rd-a">用户协议</span> 、<span className="rd-a">隐私政策</span>
        </span>
      </div>
    </div>
  )
})

export default Login
