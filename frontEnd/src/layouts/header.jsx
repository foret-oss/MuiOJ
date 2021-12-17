import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './header.css'

class Header extends Component {
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
                        <img style={{ borderRadius: "5px", width: "50px", height: "50px" }} src='http://oj.haizeix.com/pictures/UOJ_small.png' className='titlePicture'></img>
                        &ensp;Online Judge
                    </h1>
                    <div className='userName'>
                        <p>{this.state.username}&emsp;&ensp;</p>
                        {this.state.isLogin === true && <p className='Loginstatus' onClick={this.handleClick}>登出</p>}
                        {this.state.isLogin === false && <p className='Loginstatus' onClick={this.handleClick}>登录</p>}
                    </div>
                </div>
                <div className='container-fluid'>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Item One" {...a11yProps(0)} />
                            <Tab label="Item Two" {...a11yProps(1)} />
                            <Tab label="Item Three" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        Item One
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                </div>
            </div>
        )
    }
}

export default Header;