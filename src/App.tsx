import React, { useEffect, useRef, useState } from 'react'

import { Home, Regist } from './views'
import { BackTop, Result, Button } from 'antd'
import { Route, withRouter, Switch, Redirect, RouteComponentProps } from 'react-router-dom'
import { debounce } from './utils/debounce'
import Progress from './components/Progress/Progress'

function App(props: RouteComponentProps) {
  let time = useRef<NodeJS.Timeout>()
  //通过flag 来控制进度条的显示隐藏
  const [flag, setFlag] = useState<boolean>(false)

  useEffect(() => {
    /* 监听路由的变化 */
    props.history.listen(() => {
      /*页面回到顶部 */
      if (document.body.scrollTop || document.documentElement.scrollTop > 0) {
        window.scrollTo(0, 0)
      }
      /* 进度条控制 */
      debounce(() => {
        //防抖函数
        setFlag(true)
        time.current = setTimeout(() => {
          setFlag(false)
          if (time.current !== undefined) {
            clearTimeout(time.current)
          }
        }, 900)
      }, 150)()
    })
  }, [props.history])
  return (
    <div className="App">
      <Progress flag={flag}></Progress>
      <Switch>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/notFound">
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
              <Button
                type="primary"
                color="#3ca7ff"
                onClick={() => {
                  props.history.push('/')
                }}
              >
                Back Home
              </Button>
            }
          />
        </Route>
        <Route path="/regist">
          <Regist></Regist>
        </Route>
        <Route path="/" exact>
          <Redirect to="/home/default"></Redirect>
        </Route>
        <Route path="/">
          <Redirect to="/notFound"></Redirect>
        </Route>
      </Switch>

      <BackTop></BackTop>
    </div>
  )
}

export default withRouter(App)
