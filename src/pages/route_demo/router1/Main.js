import React, { Component } from 'react'
import {HashRouter } from 'react-router-dom'
export class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    this is main page 
                    {/* <Link to="/main/a">嵌套路由</Link> */}
                    <hr/>
                    {/* {this.props.children} */}
                </div>
            </HashRouter>
        )
    }
}

export default Main
