import React, { Component } from 'react'
import {Card, Spin,Icon,Alert} from 'antd';
export class loadings extends Component {
    render() {
        const icon=<Icon type="loading" style={{fontSize: 24}} /> 
        return (
            <div>
               <Card title="Spin用法">
                   <Spin />
                   <Spin size="small"></Spin>
                   <Spin size="large"></Spin>
                   <Spin indicator={icon} style={{marginLeft:20}} />
                </Card> 
                <Card title="内容遮罩">
                   <Spin>
                        <Alert 
                        message="React"
                        description="欢迎来到React"
                        type="info"></Alert>
                   </Spin>
                   <Spin tip="加载中..." indicator={icon}>
                        <Alert 
                        message="React"
                        description="欢迎来到React"
                        type="info"></Alert>
                   </Spin>
                </Card>
            </div>
        )
    }
}

export default loadings
