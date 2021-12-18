import React, { Component } from 'react';
import './header.css'
import TabPanel from "@/layouts/TabPanel"
import {Link} from 'react-router-dom'


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "wald",
            isLogin: true,
            value: 0
        };
    }
    

    handleClick = (e) => {
        this.setState({ isLogin: false });
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
                        {this.state.isLogin === true && <p className='Loginstatus' onClick={this.handleClick}>
                            <Link to={"/login"}>登出</Link></p>}
                        {this.state.isLogin === false && <p className='Loginstatus' onClick={this.handleClick}>登录</p>}
                    </div>
                </div>
                <TabPanel className='TabPanel'></TabPanel>
            </div>
        )
    }
}

export default Header;