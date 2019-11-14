import React, { Component } from 'react'
import { Card, Input, Button, Form, Icon,message } from 'antd'
import {connect} from 'dva'
// import {routerRedux} from 'dva/router'
import './index.less'
const FormItem = Form.Item;

@connect(state=>({
    user:state.user
}))

class Login extends Component {
   
    
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let params = {
                    "username": userInfo.userName,
                    "userpassword":  userInfo.userPwd
                }
                const {dispatch}= this.props;
                dispatch({
                    type:'user/getUser',
                    payload:params,
                }).then((res)=>{
                    if(res.code===0){
                        localStorage.setItem('userId',res.list[0].id);
                        localStorage.setItem('username',res.list[0].username);
                        localStorage.setItem('userpassword',res.list[0].userpassword)
                        // this.props.history.push('/home');
                        window.location.href="/home";
                    }else{
                        message.warning("用户名/密码输入不正确，请重新输入或注册！");
                    }
                }) 
                 
            }
        })
    }
    handleReg = () => {
        // window.location.href = "/reg"
        this.props.history.push('/reg');
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login_content">
                <div className="wrap">
                    <Card title="欢迎登录" className="login_card">
                        <Form style={{ width: 300 }} className="login_form">
                            <FormItem label="用户名：">
                                {
                                    getFieldDecorator('userName', {
                                        initialValue: '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '用户名不能为空'
                                            },
                                            {
                                                min: 4, max: 10,
                                                message: '长度不在范围内'
                                            },
                                            {
                                                pattern: new RegExp('^\\w+$', 'g'),
                                                message: '用户名必须为字母或者数字'
                                            }
                                        ]
                                    })(
                                        <Input prefix={<Icon type="user" />} placeholder="请输入用户名" />
                                    )
                                }
                            </FormItem>
                            <FormItem label="密码：">
                                {
                                    getFieldDecorator('userPwd', {
                                        initialValue: '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '密码不能为空'
                                            },
                                            {
                                                pattern: new RegExp('^\\w+$', 'g'),
                                                message: '密码必须为字母或者数字'
                                            }
                                        ]
                                    })(
                                        <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />
                                    )
                                }
                            </FormItem>
                            {/* <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName:'checked',
                                    initialValue: true
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                             <a href="#" style={{float:'right'}}>忘记密码</a>  
                        </FormItem> */}
                            <FormItem>
                                <Button type="dashed" ghost onClick={this.handleSubmit}>登录</Button>
                                <Button type="dashed" ghost style={{ float: 'right' }} onClick={this.handleReg}>注册</Button>
                            </FormItem>

                        </Form>
                    </Card>
                </div>
            </div>

        )
    }
}

export default Form.create()(Login)
