import React, { Component } from 'react'
import { HashRouter as Router,Route,Switch} from 'react-router-dom'
import Main from './Main'
import About from '../router1/About'
import Topic from '../router1/Topic'
import Home from './Home'
import Info from './info'
import NoMatch from './Nomatch'
 
export class IRoute extends Component {
    render() {
        return (
            <Router>
                <Home>
                    <Switch>
                    <Route   path="/main" render={()=>
                        <Main>
                            <Route path="/main/:mainId" component={Info}></Route>
                             
                        </Main>
                    }></Route>
                    <Route path="/about" component={About}></Route>
                    <Route exact={true} path="/about/abc" component={About}></Route>
                    <Route path="/topic" component={Topic}></Route>
                    <Route component={NoMatch}></Route>
                    </Switch>
                    
                </Home>
                 
            </Router>
        )
    }
}

export default IRoute
