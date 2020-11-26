import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/Link'
import { Row, Col, List } from 'antd'
import { Icon } from '@ant-design/compatible';
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Header from '../components/Header'
import Author from '../components/Author'//右侧介绍
import Advert from '../components/Advert'//广告
import Footer from '../components/Footer'//底部
import '../static/style/pages/index.css'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
const Home = (list) => {
  const [mylist, setMylist] = useState(list.data)
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });
  return (
    <div>
      <Head>
        <title>发际线与我作对</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><Icon type="calendar" />
                    {item.addTime}</span>
                  <span className="type_title"><Icon type="folder" />

                    {item.typeName}</span>
                  <span cl><Icon type="fire" />

                    {item.view_count}</span>
                </div>
                <div className="list-context"
                  dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                />
              </List.Item>
            )}
          />
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}
Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then((res) => {
      resolve(res.data)
    })
  })
  return await promise
}
export default Home