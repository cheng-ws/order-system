import React, { Component } from 'react'
import menuConfig from '../../config/menuConfig'
import {Card, Button, Form, Input, Select, Tree, Transfer, Modal,Table,Message } from 'antd'
import {connect} from 'dva'
import moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
@connect(({user})=>({
    user
}))
class PermissionPage extends Component {
    state={
        data: [
            {
                "id": 1,
                "role_name": "普通用户",
                "create_time": "2019-10-16",
                "status": 1,
                "authorize_time":"2019-10-16",
                "authorize_user_name":"chengws"
            },
            {
                "id": 2,
                "role_name": "管理员",
                "create_time": "2019-10-16",
                "status": 1,
                "authorize_time":"2019-10-16",
                "authorize_user_name":"chengws"
            },
            // {
            //     "id": 3,
            //     "role_name": "超级管理员",
            //     "create_time": "2019",
            //     "status": 1,
            //     "authorize_time":"2019",
            //     "authorize_user_name":"王磊"
            // }
        ],
        selectedRowKeys:[]
        
    }
    componentWillMount(){
        this.requestList();
    }
    requestList=()=>{
        const {dispatch} =this.props;
        dispatch({
            type:'user/getRole',
            payload:{}
        }).then((res)=>{
            if(res.code===0){
                let list  = res.list.map((item,i)=>{
                    item.key = i+1;
                    return item;
                })
                this.setState({
                    list
                })
            }
        })
    }
    // 角色创建
    handleRole = ()=>{
        this.setState({
            isRoleVisible:true
        })
    }
     
    handleRoleSubmit=()=>{
        let data = this.roleForm.props.form.getFieldsValue();
        const {username}=localStorage;
        const {dispatch}=this.props;
        dispatch({
            type:'user/createRole',
            payload:{
                ...data,
                create_time:moment().format('YYYY-MM-DD HH:mm:ss'),
                role_creater:username 
            }
        }).then((res)=>{
             if(res.code===0){
                 this.setState({
                    isRoleVisible:false
                })
                Message.success('恭喜，创建角色成功！')
                this.requestList();
             }else{
                this.setState({
                    isRoleVisible:false
                })
                 Message.warning('创建角色失败，请换个名称重试！')
             }    
        })
    }
    //用户权限
    handlePermission = (record)=>{
        console.log(record);
        
        this.setState({
             isPermVisible: true,
             detailInfo:  record
        });
        let menuList = record.role_permission;
        menuList=menuList===null?menuList:menuList.split(',');
        this.setState({
            menuInfo:menuList
        })
    }
    handlePermEditSubmit = ()=>{
        let data = this.roleForm.props.form.getFieldsValue();
        data.id = this.state.detailInfo.id;
        data.role_permission = this.state.menuInfo.join(',');
        console.log(data);
        const {dispatch} =this.props;
        dispatch({
            type:'user/setPermission',
            payload:{
                ...data
            }
        }).then((res)=>{
            if(res){
                this.setState({
                    isPermVisible:false
                })
                this.requestList();
            }
        })    
    }  
    // 用户授权
    handleUserAuth = ()=>{
        // if (!this.state.selectedItem) {
        //     Modal.info({
        //         title: '信息',
        //         content: '未选中任何项目'
        //     })
        //     return;
        // }
        // this.getRoleUserList(this.state.selectedItem.id);
        this.setState({
            isUserVisible: true,
            isAuthClosed: false,
            detailInfo: this.state.selectedItem
        });
    }
    render() {
         
        const columns = [
            {
                title: '序号',
                dataIndex: 'key'
            },
            {
                title: '角色名称',
                dataIndex: 'rolename'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render(create_time){
                    return `${moment(create_time).format('YYYY-MM-DD HH:mm:ss')}`
                }
                
            }, 
            {
                title: '使用状态',
                dataIndex: 'status',
                render(status){
                    if (status ==="1") {
                        return "启用"
                    } else {
                        return "停用"
                    }
                }
            }, 
            {
                title: '所属用户',
                dataIndex: 'role_person',
                
            }, 
            {
                title: '创建者',
                dataIndex: 'role_creater',
            },
            {
                title:'操作',
                render:(record)=>{
                    return <Button type="primary" size="small"  onClick={()=>this.handlePermission(record)} >设置权限</Button>
                }
            }

        ];
         
        return (
            <div>
                <Card>
                    <Button type="primary"  onClick={this.handleRole}>创建角色</Button>
                    {/* <Button type="primary" style={{marginLeft:'10px'}} onClick={this.handlePermission}>设置权限</Button> */}
                    <Button type="primary" style={{marginLeft:'10px'}} onClick={this.handleUserAuth}>用户授权</Button>
                </Card> 
                <div className="content-wrap">
                    <Table
                     rowKey="key"
                     bordered
                     columns={columns}
                     dataSource={this.state.list}
                    />
                </div>
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={()=>{
                        this.roleForm.props.form.resetFields();
                        this.setState({
                            isRoleVisible:false
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={(inst) => this.roleForm = inst }/>
                </Modal>
                <Modal
                       title="权限设置"
                       visible={this.state.isPermVisible}
                       width={600}
                       onOk={this.handlePermEditSubmit}
                       onCancel={()=>{
                           this.setState({
                               isPermVisible:false
                           })
                       }}>
                        <PermEditForm
                            wrappedComponentRef={(inst) => this.roleForm = inst }
                            detailInfo={this.state.detailInfo}
                            menuInfo={this.state.menuInfo||[]}
                            patchMenuInfo={(checkedKeys)=>{
                                this.setState({
                                    menuInfo: checkedKeys
                                });
                            }}
                        />
                </Modal>
                <Modal
                       title="用户授权"
                       visible={this.state.isUserVisible}
                       width={800}
                       onOk={this.handleUserSubmit}
                       onCancel={()=>{
                           this.setState({
                               isUserVisible:false
                           })
                       }}>
                        <RoleAuthForm
                            wrappedComponentRef={(inst) => this.userAuthForm = inst }
                            isClosed={this.state.isAuthClosed}
                            detailInfo={this.state.detailInfo}
                            targetKeys={this.state.targetKeys}
                            mockData={this.state.mockData}
                            patchUserInfo={this.patchUserInfo}
                        />
                </Modal>
            </div>
        )
    }
}

// 角色创建
class RoleForm extends React.Component{

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('rolename',{
                            initialValue:''
                        })(
                            <Input type="text" placeholder="请输入角色名称"/>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('status',{
                            initialValue:1
                        })(
                        <Select>
                            <Option value={1}>开启</Option>
                            <Option value={0}>关闭</Option>
                        </Select>
                    )}
                </FormItem>
            </Form>
        );
    }
}
RoleForm = Form.create({})(RoleForm);
// 设置权限
class PermEditForm extends React.Component {
    state = {};
    // 设置选中的节点，通过父组件方法再传递回来
    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys);
    };
    renderTreeNodes = (data,key='') => {
        return data.map((item) => {
            let parentKey = key+item.key;
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={parentKey} dataRef={item} className="op-role-tree">
                        {this.renderTreeNodes(item.children,parentKey)}
                    </TreeNode>
                );
            } else if (item.btnList) {
                return (
                    <TreeNode title={item.title} key={parentKey} dataRef={item} className="op-role-tree">
                        { this.renderBtnTreedNode(item,parentKey) }
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    };

    renderBtnTreedNode = (menu,parentKey='')=> {
        const btnTreeNode = []
        menu.btnList.forEach((item)=> {
            console.log(parentKey+'-btn-'+item.key);
            btnTreeNode.push(<TreeNode title={item.title} key={parentKey+'-btn-'+item.key} className="op-role-tree"/>);
        })
        return btnTreeNode;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 18}
        };
        const detailInfo = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称：" {...formItemLayout}>
                    <Input disabled placeholder={detailInfo.rolename}   />
                </FormItem>
                <FormItem label="状态：" {...formItemLayout}>
                    {getFieldDecorator('status',{
                        initialValue: detailInfo.status
                    })(
                        <Select style={{ width: 80}}
                                // placeholder="启用"
                        >
                            <Option value="1">启用</Option>
                            <Option value="0">停用</Option>
                        </Select>
                    )}
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys)=>this.onCheck(checkedKeys)}
                    checkedKeys={menuInfo ||[]}
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}

PermEditForm = Form.create({})(PermEditForm);
//用户授权
class RoleAuthForm extends React.Component {

    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
    };
    handleChange = (targetKeys) => {
        this.props.patchUserInfo(targetKeys);
    };

    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 18}
        };
        // const detail_info = this.props.detailInfo;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称：" {...formItemLayout}>
                    <Input disabled maxLength={8}  />
                </FormItem>
                <FormItem label="选择用户：" {...formItemLayout}>
                    <Transfer
                        listStyle={{width: 200,height: 400}}
                        dataSource={this.props.mockData}
                        showSearch
                        titles={['待选用户', '已选用户']}
                        // searchPlaceholder='输入用户名'
                        filterOption={this.filterOption}
                        targetKeys={this.props.targetKeys}
                        onChange={this.handleChange}
                        render={item => item.title}
                    />
                </FormItem>
            </Form>
        )
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm);
export default PermissionPage
