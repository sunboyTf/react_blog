import React, { useState, useEffect } from 'react'
import '../static/style/components/header.css'
import { Menu, Row, Col } from 'antd'
import { Icon } from '@ant-design/compatible';
import Router from 'next/router'
import axios from 'axios'
import servicePath from '../config/apiUrl'
const Header = () => {
    const [navArray, setNavArray] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then((res) => {
                return res.data.data
            })
            setNavArray(result)
        }
        fetchData()
    }, [])
    const handleClick = (e) => {
        if (e.key == 0) {
            Router.push('/')
        } else {
            Router.push('/list?id=' + e.key)
        }
    }
    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">发际线与我作对</span>
                    <span className="header-txt">专注JAVA开发30年</span>
                </Col>

                <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key='0'>
                            <Icon type='home' />
                            <a>首页</a>
                        </Menu.Item>
                        {
                            navArray.map((item) => {
                                return (
                                    <Menu.Item key={item.Id}>
                                        <Icon type={item.Icon} />
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header