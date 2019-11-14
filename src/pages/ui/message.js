import React, { Component } from 'react'
import {Card,Button,message} from 'antd'
export class Message extends Component {
    showMessage=()=>{
        message.success("恭喜你")
    }
    render() {
        return (
            <div>
                <Card title="全局提示框">
                    <Button type="primary" onClick={this.showMessage}>Success</Button>
                </Card>
            </div>
        )
    }
}

export default Message
