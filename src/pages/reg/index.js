import React, { Component } from 'react'
import {Card,Input,Button,Form,Icon,message} from 'antd'
import {connect} from 'dva'
import './index.less'
const FormItem=Form.Item;

@connect(({user})=>({
    user
}))
class Reg extends Component {
    handleSubmit = ()=>{ 
       
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {dispatch}= this.props;
                dispatch({
                    type:'user/addUser',
                    payload:{
                        username:values.username,
                        userpassword:values.userpassword
                    }
                }).then((res)=>{
                    if(res.code===0){
                        message.success('注册成功，请登录！')
                        window.location.href="/login";
                    }else{
                        message.warning("用户名已被占用，请重新注册！");
                    }
                }) 
                 
            }
        })
    }
    handleLogin=()=>{
        window.location.href="/login"
    }
    render() {
        const {getFieldDecorator} =this.props.form;
        return (
            <div className="wrap">
               <Card title="欢迎注册" className="login_card">
                    <Form style={{width:300}} className="login_form">
                        <FormItem label="用户名：">
                            {
                                getFieldDecorator('username',{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required:true,
                                            message:'用户名不能为空'
                                        },
                                        {
                                            min:4,max:10,
                                            message:'长度不在范围内'
                                        },
                                        {
                                            pattern:new RegExp('^\\w+$','g'),
                                            message:'用户名必须为字母或者数字'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user"/>} placeholder="请输入用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem label="密码：">
                            {
                                getFieldDecorator('userpassword', {
                                    initialValue: '',
                                    rules: [                   
                                        {
                                           required: true,
                                           message: '密码不能为空'
                                        },
                                        {
                                            pattern:new RegExp('^\\w+$','g'),
                                            message:'密码必须为字母或者数字'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />
                                )
                            }
                        </FormItem>
                       
                        <FormItem>
                            <Button type="dashed" ghost onClick={this.handleSubmit}>提交</Button>
                            <Button type="dashed"  ghost style={{float:'right'}} onClick={this.handleLogin}>返回</Button>
                        </FormItem>
                     
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(Reg)
