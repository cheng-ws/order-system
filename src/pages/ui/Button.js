import React, { Component } from 'react'
import {Card,Button,Radio} from 'antd'
import './ui.less'
export class ButtonPage extends Component {
    render() {
        return (
            <div>
                <Card title="基础按钮">
                    <Button type="primary">IMooc</Button>
                    <Button>IMooc</Button>
                    <Button type="dashed">IMooc</Button>
                    <Button type="danager">IMooc</Button>
                    <Button disabled>IMooc</Button>
                </Card>
                <Card title="图形按钮">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                </Card>
                <Card title="Loading按钮">
                    <Button type="primary" loading={true}>确定</Button>
                    <Button type="primary" loading={true} shape="circle"></Button>
                    <Button loading={true}>点击加载</Button>
                    <Button shape="circle" loading={true}></Button>
                    <Button type="primary">关闭</Button>
                </Card>
                <Card title="按钮组">
                    <Button.Group>
                        <Button type="primary" icon="left">返回</Button>
                        <Button type="primary" icon="right">前进</Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸">
                    <Radio.Group>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size="large">Imooc</Button>

                </Card>
            </div>
        )
    }
}

export default ButtonPage
