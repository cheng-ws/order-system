import React, { Component } from 'react'
import { List, Avatar, Tag, Button, Modal, Card, Form, DatePicker, Divider, message } from 'antd';
import moment from 'moment'
import { connect } from 'dva'

const { confirm } = Modal;
const FormItem = Form.Item;

@connect(({ user }) => ({
    user
}))
// const TagText = ({ color, text }) => (
//     <span>
//         <Tag color={color} style={{marginLeft: '50px'}} onChange={(color,checked)=>{
//              const username=localStorage.getItem['userName'];
//              console.log(checked,color,username);
//         }}>
//         {text}</Tag>
//     </span>
// );

class PlaceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            color: 'orange', 
            time: moment().format('YYYY-MM-DD'),          
        };

    }

    componentDidMount() {
        // console.log(this.props.match.params.placeName);
        //  console.log(this.props.location.query);
        const {location}=this.props;
        let title;
        let placeName;
        if(location.query&&location.query.title&&location.query.placeName){
            title=location.query.title;
            placeName=location.query.placeName;
            localStorage.setItem('title',title);
            localStorage.setItem('placeName',placeName);
        }else{
            title=localStorage.getItem('title');
            placeName=localStorage.getItem('placeName');
        }   
        this.setState({
            title,
            placeName
        })
        this.handlePlaces();
    }
    handlePlaces = () => {
        const { dispatch } = this.props;
        const { time } = this.state;
        const {placeName}=localStorage;
        dispatch({
            type: 'user/getPlace',
            payload: {
                time,
                placeName
            }
        }) 
    }

    handleYu = (item) => {
        const {username,placeName} = localStorage;
        console.log(item, username);
        const { dispatch } = this.props;
        const { time } = this.state;
        confirm({
            title: `您确定要预约${item.title}这个时间段吗？`,
            content: `${item.description}`,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                // return new Promise((resolve, reject) => {
                //      setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                // }).catch(() => console.log('Oops errors!'));
                dispatch({
                    type: 'user/upStatus',
                    payload: {
                        "id": item.id,
                        "place_person": username,
                        "place_time":moment().format('YYYY-MM-DD HH:mm:ss')
                    }
                }).then((res) => {
                    if (res.code === 0) {
                        dispatch({
                            type: 'user/getPlace',
                            payload: {
                               time,
                               placeName
                            }
                        })
                        message.success("恭喜，预约成功！")
                    } else {
                        message.error("预约失败，请重试！");
                        dispatch({
                            type: 'user/getPlace',
                            payload: {
                                time,
                               placeName
                            }
                        })
                    }

                })

            },
            onCancel() {
                console.log('取消');
            },
        });
    }
    handleSearch = () => {
        this.handlePlaces();
    }
    onTimeChange = (date, dateString) => {
        this.setState({
            time: dateString
        })
    }
    render() {
        const list = this.props.user.list;
        return (
            <Card title={'预约-' + localStorage.getItem('title') + '场地'}>
                <Form layout="inline" >
                    <FormItem label="日期" >
                       <DatePicker placeholder="请选择日期" format="YYYY-MM-DD" onChange={this.onTimeChange} defaultValue={moment()}  />     
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.handleSearch}>查询</Button>
                    </FormItem>
                </Form>
                <Divider type="horizontal" />
                <List
                    style={{ backgroundColor: '#fff' }}
                    itemLayout="vertical"
                    size="large"
                    // pagination={{
                    //     onChange: page => {
                    //         console.log(page);
                    //     },

                    // }}
                    dataSource={list}
                    renderItem={item => (
                        <List.Item
                            key={item.id}
                            actions={[
                                
                                item.time<moment().format('YYYY-MM-DD HH:mm:ss')?<Tag color='gray' style={{marginLeft:'50px'}} title="已过期，不可预约">已过期，不可预约</Tag>:
                                item.status === "1" ? <Tag color="red" style={{ marginLeft: '50px' }} title="已被预约">已被预约</Tag> : <Button type="primary" size="small" style={{ marginLeft: '50px' }} title="可预约" onClick={() => this.handleYu(item)}>可预约</Button>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle' }} size="large">
                                        {item.place_id}
                                    </Avatar>
                                }
                                title={item.time.split(' ')[0]+ ' '+item.title}
                                description={item.description}
                            />

                            {/* {item.content} */}
                        </List.Item>
                    )}
                />
            </Card>

        )
    }
}
 

    
    
export default PlaceDetail
