import React, { Component } from 'react'
import { HashRouter as Router,Route} from 'react-router-dom'
import Main from './Main'
import About from '../router1/About'
import Topic from '../router1/Topic'
import Home from './Home'
export class IRoute extends Component {
    render() {
        return (
            <Router>
                <Home>
                    <Route   path="/main" render={()=>
                        <Main>
                            <Route path="/main/a" component={About}></Route>
                             
                        </Main>
                    }></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/topic" component={Topic}></Route>
                </Home>
                 
            </Router>
        )
    }
}

export default IRoute
