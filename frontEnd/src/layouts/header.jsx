import React, { Component } from 'react';
import './header.css'
import Content from "@/layouts/Content"
import { Link } from 'react-router-dom'
import { loginMessage } from '@apis/login/rest'


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            isLogin: false,
            value: 0
        };
    }


    componentDidMount() {
        const data = window.sessionStorage.getItem('loginData') !== null ? JSON.parse(window.sessionStorage.getItem('loginData')) : null;
        if (data !== null) 
        {
            console.log("LoginName:",typeof (data))
            this.setState ({username:data.username})
            this.setState({isLogin:true})
        } 
    }


    // handleClick = (e) => {
    //     this.setState({ isLogin: false });
    // }

    logout = (e) => {
        window.sessionStorage.clear("token");
        this.setState({ isLogin: false})
    }

    styles = {textDecoration: "none" , color: "#71838f"}

    render() {
        return (
            <div>
                <div className='header'>
                    <h1 className='title' style={{ fontSize: "36px" }}>
                        <img style={{ borderRadius: "5px", width: "50px", height: "50px" }} src='http://oj.haizeix.com/pictures/UOJ_small.png' className='titlePicture'></img>
                        &ensp;Online Judge
                    </h1>
                    <div className='userName'>
                        <p> <Link to={'/user'} style={this.styles}>{this.state.username}&emsp;&ensp;</Link></p>
                        {this.state.isLogin === true && <p className='Loginstatus' onClick={this.logout}>
                        <Link to={"/login"} style={this.styles}>退出</Link></p>}
                        {this.state.isLogin === false && <p className='Loginstatus'>
                            <Link to={"/login"} style={this.styles}>登录</Link></p>}
                    </div>
                </div>
                <Content className='TabPanel'></Content>
            </div>
        )
    }
}

export default Header;