import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//import { createHashHistory } from 'history'
import ProblemDisplay from '@components/problemDisplay/problemDisplay';
import Login from '../components/login/login'
import Header from '../layouts/header';

class RouterConfig extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes> {/*只匹配其中一个 */}
                    <Route path='/' element={<Header />}></Route>
                    <Route path='/login' element={<Login />} />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default RouterConfig