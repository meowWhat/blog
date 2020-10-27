import React, { useEffect, useState } from 'react'
import './Content.less'
import { Row, Col, Tag, Divider, Tooltip, Avatar, Tabs, Image, Spin, Pagination } from 'antd'
import { CalendarOutlined, FileOutlined, FireOutlined, GithubOutlined, QqOutlined, WechatOutlined, WeiboOutlined } from '@ant-design/icons'

import { withRouter, RouteComponentProps, Route, Switch, Redirect } from 'react-router-dom'
import ArticleDetail from '../ArticleDetail/ArticleDetail'
import axios from '../../../netWork'
import NoData from '../../../components/NoData/NoData'

const { TabPane } = Tabs

export default function Content() {
  return (
    <div className="home-content heart">
      <div className="home-content-left">
        <Switch>
          <Route path="/home/:typeId" exact>
            <ArticleRender></ArticleRender>
          </Route>
          <Route path="/home/article/:articleId" exact>
            <ArticleDetail></ArticleDetail>
          </Route>
          <Route path="/">
            <Redirect to="/notFound"></Redirect>
          </Route>
        </Switch>
      </div>
      <div className="home-content-right">
        <Profile></Profile>
      </div>
    </div>
  )
}

/**
 * 首页单个文章组件
 * 根据 标题,信息(标签,时间,热度,分类),简介(文章概述),追踪路由 进行渲染
 */
interface ArticleProps {
  title: string
  info: {
    tag: string
    time: string
    fire: number
    sort: string
    color: string
  }
  img: string
  intro: string
  trace: number
}
const Article = withRouter((props: ArticleProps & RouteComponentProps) => {
  const { title, info, intro, img, trace } = props
  const goArticleDetail = () => {
    props.history.push(`/home/article/${trace}`)
  }
  return (
    <div className="home-content-article">
      <h2 className="home-content-article-title" onClick={goArticleDetail}>
        {title}
      </h2>
      <Row className="home-content-article-info">
        <Tag color={info.color}>{info.tag}</Tag>
        <Col>
          <CalendarOutlined />
          &nbsp;&nbsp;
          {info.time}
        </Col>
        &nbsp;&nbsp;
        <Col>
          <FileOutlined />
          &nbsp;&nbsp;
          {info.sort}
        </Col>
        &nbsp;&nbsp;
        <Col>
          <FireOutlined />
          &nbsp;&nbsp;
          {info.fire}
        </Col>
      </Row>
      <Row>
        {img && <Image src={img} height={105} width={190} alt="-图片加载失败" className="home-content-article-img" />}
        <p className="home-content-article-intro" onClick={goArticleDetail}>
          {intro + '...'}
        </p>
      </Row>
      <Row>
        <Col span={2} offset={22}>
          <span className="home-content-article-trace" onClick={goArticleDetail}>
            查看全文
          </span>
        </Col>
      </Row>
    </div>
  )
})

const ArticleRender = withRouter((props: RouteComponentProps) => {
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(50)
  const [list, setlist] = useState<
    Array<{ time: string; title: string; fire: number; sort: string; id: number; content: string; img: string }>
  >([])
  const [flag, setflag] = useState(true)
  const [spin, setSpin] = useState(false)
  const type = (props.match.params as { typeId: string }).typeId
  useEffect(() => {
    const config = {
      currentPage: page,
      pageSize: 5,
      sortColumn: 'created_time',
      sortMethod: 'asc',
    }
    if (type !== 'default') {
      ;(config as any)['params'] = { typeId: type }
    }

    axios
      .post('/front/blog/page', JSON.stringify(config))
      .then(({ data }) => {
        setTotal(data.totalCount)
        if (data.list) {
          if (data.list.length === 0) {
            setflag(false)
            return
          }
          setlist(
            data.list.map((el: any) => {
              return {
                time: el.createdTime.slice(0, el.createdTime.length - 8),
                fire: el.blogRead,
                sort: el.typeName,
                id: el.blogId,
                content: el.blogDescription,
                title: el.blogTitle,
                img: el.blogImage,
              }
            })
          )
        } else {
          setflag(false)
        }
        setSpin(true)
      })
      .catch((err) => {
        setflag(false)
      })
    return () => {}
  }, [page, type])

  return (
    <div>
      {flag ? (
        spin ? (
          list.map((item, idx) => {
            const { time, title, fire, sort, id, content, img } = item
            let color: string = '#87e8de'
            if (idx === 0) {
              color = '#ff0000'
            }
            return (
              <Article
                title={title}
                info={{ time, fire, sort, tag: idx === 0 ? '置顶' : '推荐', color }}
                intro={content}
                trace={id}
                key={id}
                img={img}
              ></Article>
            )
          })
        ) : (
          <Spin />
        )
      ) : (
        <NoData></NoData>
      )}
      <Pagination
        defaultCurrent={1}
        total={total}
        pageSize={5}
        onChange={(page) => {
          setPage(page)
          setTimeout(() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }, 200)
        }}
      />
    </div>
  )
})
/**
 * 首页网站介绍
 */
const Profile = () => {
  return (
    <div>
      <div className="profile">
        <div id="profile-avatar">
          <div className="avatar"></div>
          <h2 className="green">MyBlog</h2>
          <h4 className="gray"> 没有感情的coding机器</h4>
          <div className="tagControl">
            <Tag color="red">开源分享</Tag>
            <Tag color="cyan">技术博客</Tag>
            <Tag color="green">支持线上交流</Tag>
            <Tag color="blue">免费文章649篇</Tag>
            <Tag color="geekblue">被访问159697次</Tag>
          </div>
          <Divider>社交账号</Divider>
          <div className="publicMessage">
            <Tooltip title="1797793818">
              <Avatar icon={<QqOutlined />} className="avatarItem" />
            </Tooltip>
            <Tooltip title="GGsimida1022">
              <Avatar icon={<WechatOutlined />} className="avatarItem" />
            </Tooltip>
            <Tooltip title="https://github.com/meowWhat">
              <Avatar icon={<GithubOutlined />} className="avatarItem" />
            </Tooltip>
            <Tooltip title="带带大师兄">
              <Avatar icon={<WeiboOutlined />} className="avatarItem" />
            </Tooltip>
          </div>
        </div>
      </div>
      <Push></Push>
    </div>
  )
}

/* 推送栏 */
const Push = withRouter((props: RouteComponentProps) => {
  const [list, setlist] = useState<Array<{ name: string; count: number; id: number }>>([])

  const [className, setClassName] = useState('')
  useEffect(() => {
    axios.get('/front/type').then(({ data }) => {
      setlist(
        data.map((el: any) => {
          return {
            name: el.typeName,
            count: el.typeBlogCount,
            id: el.typeId,
          }
        })
      )
    })
  }, [])
  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY >= 390) {
        setClassName('fixed')
      } else {
        setClassName('')
      }
    }

    return () => {
      window.removeEventListener('scroll', window as any)
    }
  }, [className])
  return (
    <div id="push" className={className}>
      <Tabs defaultActiveKey="1" centered size="middle">
        <TabPane tab="精选分类" key="1">
          <ul className="tabs-sort">
            {list.map((item, index) => {
              return (
                <li
                  className="tabs-sort-item"
                  key={index}
                  onClick={() => {
                    props.history.push(`/home/${item.id}`)
                  }}
                >
                  <span className="tabs-sort-item-title">{item.name}</span>
                  <span className="tabs-sort-item-tag">
                    <Tag color="#f5f5f5">
                      <span style={{ color: '#333' }}> {item.count}篇</span>
                    </Tag>
                  </span>
                </li>
              )
            })}
          </ul>
        </TabPane>
        <TabPane tab="热门推送" key="2">
          这些功能尚处于试验阶段，可能会发生改变。
        </TabPane>
        <TabPane tab="XXXX" key="3">
          这些功能尚处于试验阶段，可能会发生改变。
        </TabPane>
      </Tabs>
    </div>
  )
})
