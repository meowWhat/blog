import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import MdRender, { Props } from '../../../components/MdRender/MdRender'
import NotData from '../../../components/NoData/NoData'
import axios from '../../../netWork'

function ArticleDetail(props: RouteComponentProps) {
  const params = props.match.params
  const id: string = (params as any).articleId
  const [state, setstate] = useState<Props>()
  const [flag, setFlag] = useState(true)
  useEffect(() => {
    axios
      .get(`/front/blog/detail/${id}`)
      .then((res) => {
        const data = res.data
        setstate({
          content: {
            title: data.blogTitle,
            fire: data.blogRead,
            date: data.createdTime,
            article: data.blogContent,
            callBack: () => {},
          },
        })
      })
      .catch(() => {
        setFlag(false)
      })

    return () => {}
  }, [id])
  return (
    <div>
      {flag ? <div>{(state && state.content && <MdRender content={state.content}></MdRender>) || <Spin></Spin>}</div> : <NotData></NotData>}
    </div>
  )
}

export default withRouter(ArticleDetail)
