import React, { Component } from 'react'
import { Card,Button,Modal} from 'antd'
export class ModalPage extends Component {
    state={
        showModal1:false
    }
    handleOpen=(type)=>{
        this.setState({
            showModal1:true
        })
    }
    handleConfirm=(type)=>{
        Modal.confirm({
            title:'确认?',
            content:'你确定?',
            onOk(){
                 
            },
            onCancel(){

            }
        })
    }
    render() {
        return (
            <div>
                <Card title="基础模态框">
                    <Button type="primary" onClick={()=>this.handleOpen('showModal1')}>Open</Button>
                    <Button type="primary">自定义页脚</Button>
                    <Button type="primary">顶部20px弹框</Button>
                    <Button type="primary">水平垂直居中</Button>
                </Card>
                <Card title="信息确认框">
                    <Button type="primary" onClick={()=>this.handleConfirm('confirm')}>信息确认</Button>
                </Card>
                <Modal
                 title="React"
                 visible={this.state.showModal1}
                 onCancel={()=>{}}
                 />

            </div>
        )
    }
}

export default ModalPage
