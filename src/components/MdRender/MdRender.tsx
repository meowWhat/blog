import React, { createRef, PureComponent } from 'react'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import './MdRender.less'

marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  },
})

interface Content {
  title: string
  fire: number
  date: string
  article: any
  callBack: () => void
}
export interface Props {
  content: Content
}

class MdRender extends PureComponent<Props> {
  article: React.RefObject<HTMLDivElement>
  constructor(props: Props) {
    super(props)
    this.article = createRef()
  }
  render() {
    return (
      <div className="articleContent">
        {/* context */}
        <h1 className="articleContentHead green">{this.props.content.title}</h1>
        <div className="articleContentTag gray">
          {this.props.content.date}&nbsp;阅读&nbsp;{this.props.content.fire}
        </div>
        <div ref={this.article} className="articleContentCompiler"></div>
        {/* support */}
      </div>
    )
  }
  componentDidMount() {
    this.goMarked()
    //在这里 再去渲染 评论
    this.props.content.callBack()
  }

  goMarked = () => {
    let dom = this.article.current
    if (dom && this.props.content.article) {
      dom.innerHTML = marked(this.props.content.article)
    } else {
      //
    }
  }
}
export default MdRender
