import React from 'react'
import './Home.less'

import Nav from './Nav/Nav'
import Content from './Content/Content'
import Foot from './Foot/Foot'
import Login from './Login/Login'

import { ls } from '../../store/login'

export default function Home() {
  return (
    <div>
      <Nav></Nav>s<Content></Content>
      <Login store={ls}></Login>
      <Foot></Foot>
    </div>
  )
}
