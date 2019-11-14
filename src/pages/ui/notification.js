import React, { Component } from 'react'
import { Card,Button, notification } from 'antd'
export class Notification extends Component {
    openNotification=()=>{
        notification.success({
             message: '发工资',
             description: '上个月'
        })
    }
    open=(type)=>{
        notification[type]({
            message: '发',
            description:'这个月'
        })
    }
    render() {
        return (
            <div>
               <Card title="通知提醒框">
                   <Button type="primary" onClick={this.openNotification}>success</Button>
                   <Button type="primary" onClick={()=>this.open('warning')}>warning</Button>
               </Card> 
            </div>
        )
    }
}

export default Notification
