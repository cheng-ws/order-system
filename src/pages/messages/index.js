import React, { Component } from 'react'
import { Card, Input, Button, Form, Icon,message } from 'antd'
import {connect} from 'dva'
const FormItem = Form.Item;

@connect(({user})=>({
    user
}))

class Login extends Component {
    handleSubmit = () => {
        // let userInfo = this.props.form.getFieldsValue();
         const {dispatch} = this.props;
        const {userpassword}=localStorage;
        this.props.form.validateFields((err, values) => {
            if (values.userpassword===userpassword) {
                message.warning('你的信息未修改，不能保存！')
            }else{
                dispatch({
                    type:'user/upUser',
                    payload:{
                        username:values.username,
                        userpassword:values.userpassword
                    }
                }).then((res)=>{
                    if(res.code===0){
                          message.success('信息保存成功，请谨记！')
                          this.props.history.push('/login');
                    }else{
                        message.error('信息修改失败，请重试！')
                    }
                })
              
            }
        })
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const {username,userpassword}=localStorage;
        
         
        return (
             
                    <Card title="个人信息" className="login_card">
                        <Form style={{ width: 300 }} className="login_form">
                            <FormItem label="用户名：">
                                {
                                    getFieldDecorator('username', {
                                        initialValue:username,
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
                                        <Input prefix={<Icon type="user" />} disabled />
                                    )
                                }
                            </FormItem>
                            <FormItem label="密码：">
                                {
                                    getFieldDecorator('userpassword', {
                                        initialValue:  userpassword,
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
                                        <Input prefix={<Icon type="lock" />} type="password"   />
                                    )
                                }
                            </FormItem>
                            
                            <FormItem>
                                <Button type="primary" onClick={this.handleSubmit}>保存</Button>
                                
                            </FormItem>

                        </Form>
                    </Card>
                

        )
    }
}

export default Form.create()(Login)
