import React, { Component } from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import App from './App'
import Admin from './admin'
import Home from './pages/home'
import Login from './pages/login'
import Reg from './pages/reg'
// import NoMatch from './pages/nomatch'
import PlaceSearch from './pages/placeSearch'
import YuPage from './pages/placeSearch/yu'
import Person from "./pages/customer"
import Messages from './pages/messages'
import Permission from './pages/permission'
export class IRouter extends Component {
   
    componentDidMount() {
        let uName = localStorage.getItem('username');
        console.log(uName);
    }
    render() {
        return (
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/reg" component={Reg} />
                        {
                            localStorage.getItem('username') !== null ? <Route path="/" render={() =>
                                <Admin>
                                    <Switch>
                                        <Route path="/home" component={Home} />
                                        <Route path="/placesearch" render={()=>
                                            <Switch>
                                                <Route path="/placesearch/home" component={PlaceSearch}/>
                                                <Route path="/placesearch/order" component={YuPage} />
                                                <Redirect to="/placesearch/home" />
                                            </Switch>
                                            
                                        } />
                                        <Route path="/person" component={Person} />
                                        <Route path='/messages' component={Messages}/>
                                        <Route paht='/permission' component={Permission}/>
                                        {/* <Route component={NoMatch} />  */}
                                        <Redirect to="/home" />
                                    </Switch>

                                </Admin>
                            } /> : <Redirect to='/login' />
                        }

                    </Switch>
                </App>
                {/* <Route path="/order/detail" component={Login}/> */}

            </BrowserRouter>
        )
    }
}

export default IRouter
