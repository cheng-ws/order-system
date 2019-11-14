import React, { Component } from 'react'
import { Card, message, Tabs } from 'antd'
const TabPane = Tabs.TabPane;
export class TabsPage extends Component {
    // constructor(props) {
    //     super(props);
    //     this.newTabIndex = 0;
    //     const panes = [
    //       { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
    //       { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' },
    //     ];
    //     this.state = {
    //       activeKey: panes[0].key,
    //       panes,
    //     };
    //   }
    
    //   onChange = activeKey => {
    //     this.setState({ activeKey });
    //   };
   
     callback=(key)=>{
        message.info("hi,您选择了页签："+key)
     }
     onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    render() {
        return (
            <div>
                <Card title="Tab页签">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Tab 1" key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                            Content of Tab Pane 2
                         </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                    </Card>
                {/* <Card title="带图的页签">
                    <Tabs defaultActiveKey="1" 
                    onChange={this.onChange} 
                    activeKey={this.state.activeKey}
                    onEdit={this.onEdit}
                    type="editable-card">
                        {/* <TabPane tab={<span><Icon type="plus" /></span>} key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                            Content of Tab Pane 2
                         </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            Content of Tab Pane 3
                        </TabPane> */}
                        {/* {
                        this.state.panes.map((panes)=>{
                            return <TabPane
                            tab={panes.title}
                            key={panes.key}
                            />
                        })
                    }
                    </Tabs> */}
                {/* </Card> */}  
                
            </div>
        )
    }
}

export default TabsPage
