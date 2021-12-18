import React, { Component } from 'react';
import './header.css'
import Content from "@/layouts/Content"
import { Link } from 'react-router-dom'
import { loginMessage } from '@apis/login/rest'


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "尚未登录",
            isLogin: false,
            value: 0
        };
    }


    componentDidMount() {
        const data = window.sessionStorage.getItem('loginData') == undefined ? '' : window.sessionStorage.getItem('loginData')
        if (data.token !== '') 
        {
            console.log("isLogin:",data)
            this.setState ({username:data.username})
        } 
    }


    // handleClick = (e) => {
    //     this.setState({ isLogin: false });
    // }

    logout = (e) => {
        window.sessionStorage.clear("token");
        this.setState({ isLogin: false})
    }

    render() {
        return (
            <div>
                <div className='header'>
                    <h1 className='title' style={{ fontSize: "36px" }}>
                        <img style={{ borderRadius: "5px", width: "50px", height: "50px" }} src='http://oj.haizeix.com/pictures/UOJ_small.png' className='titlePicture'></img>
                        &ensp;Online Judge
                    </h1>
                    <div className='userName'>
                        <p>{this.state.username}&emsp;&ensp;</p>
                        {this.state.isLogin === true && <p className='Loginstatus' onClick={this.logout}>登出</p>}
                        {this.state.isLogin === false && <p className='Loginstatus'>
                            <Link to={"/login"}>登录</Link></p>}
                    </div>
                </div>
                <Content className='TabPanel'></Content>
            </div>
        )
    }
}

export default Header;