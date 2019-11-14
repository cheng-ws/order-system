import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Admin from './admin'
// import Home from './pages/route_demo/router1/Home'
// import Router from './pages/route_demo/router3/router'
import Router from './router'
import dva from 'dva'
import { createBrowserHistory } from 'history'

import * as serviceWorker from './serviceWorker';
 
const app=dva(
    {history:createBrowserHistory()}
);
app.model(require('./pages/models/index').default)
app.router(()=><Router />);
app.start('#root');
// ReactDOM.render(app.router(()=><Router />), app.start('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
