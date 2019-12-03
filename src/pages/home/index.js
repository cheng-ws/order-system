import React, { Component } from 'react'
// import  {connect}  from 'dva'
import './index.less'
// @connect(state=>({
//     data:state
// }))
class Home extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={
           
    //     }
    // }
    // componentDidMount(){
    //    const {dispatch}= this.props;
    //    let params={
    //        "userName":"root",
    //        "userPwd": "root"
    //    }
    //    dispatch({
    //        type:'user/userLogin',
    //        payload :params,
    //    }) 
    // }
    render() {
        // console.log(this.props.data.user);
        return (
            <div className="home-wrap">
                欢迎进行预约
                 
            </div>
        )
    }
}
export default  Home;

 
