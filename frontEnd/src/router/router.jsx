import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import { createHashHistory } from 'history'
import ProblemDisplay from '../components/problemDisplay/problemDisplay';
import Login from '../components/login/login'
import Header from '../layouts/header';
//import { Switch } from '@mui/material';

class RouterConfig extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch> {/*只匹配其中一个 */}
                    <Route path='/' component={Header}></Route>
                    <Route path='/toProblemDisplay' component={ProblemDisplay} />
                    <Route path='/login' component={Login} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default RouterConfig