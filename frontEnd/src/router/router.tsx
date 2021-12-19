import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//import { createHashHistory } from 'history'
import ProblemDisplay from '@components/problemDisplay/problemDisplay';
import Login from '../components/login/login'
import Main from '@layouts/main'
import Register from '@components/register/register'
import User from '@components/user/user'
import ProblemItem from '@components/problemItem/problemItem'

class RouterConfig extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes> {/*只匹配其中一个 */}
                    <Route path='/' element={<Main/>}></Route>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/user' element={<User />} />
                    <Route path='/edit/:tid' element={<ProblemItem />} />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default RouterConfig