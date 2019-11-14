import React, { Component } from 'react'
import { Card,List,Button,Tag} from 'antd'
 
export class PlaceSearchPage extends Component {
      data = [
        {
            key: 'First',
            title: '会议室1',
        },
        {
            key: 'Second',
            title: '会议室2',
        },
        {
            key: 'Third',
            title: '会议室3',
        },
        {
            key: 'Fourth',
            title: '会议室4',
        },
        {
            key: 'Fifth',
            title: '会议室5'
        }
    ];
    handlePlaceDetail=(item)=>{
        console.log(item.key);
    //    window.location.href=`/placesearch/${item.key}`;
        // this.props.history.push(`/placesearch/${item.key}`);
        this.props.history.push({pathname:'/placesearch/order',query:{placeName:`${item.key}`,title:`${item.title}`}})
    }
    render() {
      
        return (
            <div>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={this.data}
                    renderItem={item => (
                        <List.Item>
                            <Card title={item.title}>
                                <Tag>预约时，请先阅读公告！</Tag>
                                <Button type="primary" size="small" style={{float:'right'}} onClick={()=>this.handlePlaceDetail(item)}>详情</Button>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default PlaceSearchPage
