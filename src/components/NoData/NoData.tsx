import React from 'react'
import { Empty, Button } from 'antd'

import './NoData.less'
function NoData() {
  return (
    <Empty description={<span className="empty-title">服务器繁忙请稍后再试</span>} className="empty">
      <Button
        type="primary"
        onClick={() => {
          window.location.replace('/')
        }}
      >
        刷新
      </Button>
    </Empty>
  )
}

export default NoData
