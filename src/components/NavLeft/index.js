import React, { Component } from 'react'
import MenuConfig from '../../config/menuConfig'
import { Menu  } from 'antd'
import './index.less'
import {NavLink} from 'react-router-dom'
import {connect} from 'dva'
const SubMenu = Menu.SubMenu;
@connect(({user})=>({user}))
class NavLeft extends Component {
    componentWillMount(){
        const {dispatch}=this.props;
        dispatch({
            type:'user/getRolePer',
            payload:{
              role_person:localStorage.username
            }
        }).then((res)=>{
            if(res.code===0){
            //    let NavList=MenuConfig;
               
                // // console.log(res.list[0].role_permission.split(',')); 
                // let list=res.list[0].role_permission.split(','); 
                // let data=[];
                // for(let i=0;i<list.length;i++){
                //     for(let j=0;i<NavList.length;j++){
                //         if(NavList[j].key=list[i]){
                //            data.map(()=>{
                //                 NavList[j];
                //            })
                //         }
                //     }
                // } 
                // console.log(data);
                   
            }
        })
        const menuTreeNode=this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        })
    }
    componentDidMount(){
        console.log(this.state.Data);
        
    }
    //菜单渲染
    renderMenu=(data)=>{
        return data.map((item)=>{
             if(item.children){
                return  (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
             }
            return <Menu.Item title={item.title} key={item.key}><NavLink to={item.key}>{item.title}</NavLink></Menu.Item>
        })
    }
    render() {

        return (
            <div>
                <div className="logo">
                    <img src="/assets/pe.png" alt="" />
                    <h1>管理系统</h1>
                </div>
                <Menu theme="light">
                    {this.state.menuTreeNode}      
                </Menu>
            </div>
        )
    }
}

export default NavLeft
