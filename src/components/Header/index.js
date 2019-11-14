import React, { Component } from 'react'
import { Row,Col, Button } from 'antd'
import './index.less'
import utils from '../../utils/utils'
// import Axios from '../../axios'
export class Header extends Component {
    constructor(props){
        super(props)
        this.state={
        username:''
       }
    }
    
    componentWillMount(){
        const Local_userName=localStorage.username
        this.setState({
            username: Local_userName
        })
        setInterval(()=>{
           let sysTime = utils.formateDate(new Date().getTime(),'YYYY-MM-DD HH-mm-ss');
           this.setState({
               sysTime
           })
        },1000)
        // this.getWeatherAPIData();
    }
    //天气
    // getWeatherAPIData=()=>{
    //   let city="北京"
    //   Axios.jsonp({
    //       url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=2p49MVra6urFRG0T9s8UBWr'
    //   }).then((res)=>{
    //       if(res.status=='success'){
    //           let data=res.result[0].weather_data[0];
    //           this.setState({
    //           })
    //       }
    //   })
    // }
    handleRemove=()=>{
        localStorage.removeItem('username');
        window.location.href="/login"
    }
    render() {
        return (
            <div className="header">
                 <Row className="header-top">
                     <Col span={24}>
                         <span>欢迎,{this.state.username}</span>
                         <Button style={{marginLeft: '10px'}} size="small" onClick={this.handleRemove}>退出</Button>
                     </Col>
                 </Row>
                 <Row className="breadcrumb">
                     {/* <Col span="4" className="breadcrumb-title">
                        首页
                     </Col> */}
                     <Col span={20} className="weather">
                         <span className="date">{this.state.sysTime}</span>
                         <span className="weather-deatil">晴转多云</span>
                     </Col>
                 </Row>
            </div>
        )
    }
}

export default Header
