import React, { Component } from 'react';
import './header.css'

class Switch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "wald",
            isLogin: true
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
                        <img style={{ borderRadius: "5px", width: "50px", height:"50px" }} src='http://oj.haizeix.com/pictures/UOJ_small.png' className='titlePicture'></img>
                        &ensp;Online Judge
                    </h1>
                    <div className='userName'>
                        <p>{this.state.username}&emsp;&ensp;</p>
                        {this.state.isLogin === true && <p className='Loginstatus' onClick={this.handleClick}>登出</p>}
                    </div>
                </div>
                <div className='container-fluid'>
                    <div className='navbarCollapse'>
                        <ul className='navbarNav'>
                            <li>
                                <a> OJ &emsp;</a>
                            </li>
                            <li>
                                <a href=''>训练场&ensp;</a>
                            </li>
                            <li>
                                <a href=''>比赛&ensp;</a>
                            </li>
                            <li>
                                <a href=''>题库&ensp;</a>
                            </li>
                            <li>
                                <a href=''>提交记录&ensp;</a>
                            </li>
                            <li>
                                <a href=''>博客&ensp;</a>
                            </li>
                            <li>
                                <a href=''>教练列表&ensp;</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Switch;