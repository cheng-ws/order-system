import React, { Component } from 'react'
import { Card, Form, Input, Button, Table, Tag, DatePicker, message } from 'antd'
import { connect } from 'dva'
import moment from 'moment'
const FormItem = Form.Item;

@connect(({ user }) => ({
    user
}))

class CustomerPage extends Component {
    state={
        time:'',
        place_name:''
    }
    componentDidMount() {
        this.handleMyPerson();
    }
    handleMyPerson = () => {
        const { dispatch } = this.props;
        const { username } = localStorage;
        dispatch({
            type: 'user/getMyPerson',
            payload: {
                'place_person': username
            }
        }) 
    }
    columns = [
        {
            title: '序号',
            dataIndex: 'key',
        },
        {
            title: '场地名称',
            dataIndex: 'place_name'
        },
        {
            title: '预约场地-时间段',
            
            render: (record) => {
                return `${moment(record.time).format("YYYY-MM-DD")+' '+ record.title}`
            }
        },
        {
            title: '预约时间',
           
            render: (record) => {
                return `${moment(record.place_time).format("YYYY-MM-DD HH:mm:ss")}`
            }
        },
        {
            title: '操作',
            dataIndex:'action',
            render: (text, record) => {

                const time = moment().format('YYYY-MM-DD HH:mm:ss')
                return record.time < time ? <Tag color="red" style={{ marginLeft: '50px' }} title="已过期">已过期</Tag> : <Button type="primary" size="small" style={{ marginLeft: '50px' }} title="取消预约" onClick={() => this.handleCancle(record)}>取消预约</Button>
            }
        },

    ]
    
    handleCancle = (record) => {

        const { dispatch } = this.props;
        dispatch({
            type: 'user/removeMyPerson',
            payload: {
                "id": record.id
            }
        }).then((res) => {
            if (res.code === 0) {
                this.handleMyPerson();
                message.success('取消成功，欢迎再次预约！')
            } else {
                this.handleMyPerson();
                message.error('取消失败，请重试！')
            }
        })
    }
    handleSearch = () => {
        const {dispatch} = this.props;
        const {username}=localStorage;
        const {time,place_name}=this.state;
        dispatch({
            type: 'user/selectMyperson',
            payload:{
                time,
                place_person:username,
                place_name,
            }
        })
    }
    onTimeChange=(date,dateString)=>{
       this.setState({
           time: dateString
       })
    }
    onPlaceName=(e)=>{
       this.setState({
           place_name:e.target.value
       })
        
    }
    render() {
        const { list } = this.props.user;
        return (
            <div>
                <Card  title="我的预约">
                    <Form layout="inline" >
                        <FormItem label="场地名称" >
                            <Input type="text" placeholder="请输入场地名称" onChange={this.onPlaceName}/>
                        </FormItem>
                        <FormItem label="预约场地-时间段" >
                            <DatePicker placeholder="请选择日期" format="YYYY-MM-DD" onChange={this.onTimeChange} />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSearch}>查询</Button>
                        </FormItem>
                    </Form>

                </Card>
                <div>
                    <Table
                        rowKey='id'
                        bordered
                        columns={this.columns}
                        dataSource={list}  
                    />

                </div>
            </div>
        )
    }
}

export default CustomerPage
