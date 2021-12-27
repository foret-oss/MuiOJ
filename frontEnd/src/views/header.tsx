
import React, { Component, FC, useEffect, useState } from 'react';
import './header.css'
// import Content fro@layouts/Content
import { Link } from 'react-router-dom'
import { loginMessage } from '@apis/login/rest'
import styled from '@emotion/styled';
import {Global, css} from '@emotion/react'
import homeAvatar from '@images/homeAvatar.png'

const Header: FC<{}> = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [username, setUsername] = useState("")
    useEffect(() => {
        let data : any = window.sessionStorage.getItem('loginData')
        if (data !== null) {
            data = JSON.parse(data)
            console.log("LoginName:",typeof (data))
            setUsername(data.username)
            setIsLogin(true)
        }
    }, [])

    const logout = (e: never) => {
        window.sessionStorage.clear()
        setIsLogin(false)
    }

    return (
        <HeaderOutside>
            <HeaderLayout>
                <HeaderBlock>
                    <img style={{ borderRadius: "5px", width: "50px", height: "50px" }} src={homeAvatar} className='titlePicture'></img>
                    <HeaderTitle>Online Judge</HeaderTitle>
                    
                </HeaderBlock>
                <HeaderBlock>
                    <StyledLink to={'/user'} >{username}</StyledLink>
                    {isLogin ?  <StyledLink to={"/login"} onClick={logout} >退出</StyledLink> : 
                                <StyledLink to={"/login"} >登录</StyledLink>}
                </HeaderBlock>
            </HeaderLayout>
        </HeaderOutside>
    )
}

const HeaderOutside = styled.div`
    width: 100%;
`

const HeaderLayout = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`

const HeaderBlock = styled.div`
    padding: 1rem;
    text-align: center;
    display: flex;
    align-items: center;
`

const HeaderTitle = styled.h3`
    font-size: 36px;
    margin: 0 0 0 1rem;
`

const ContentLayout = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`

const StyledLink = styled(Link)`
    margin: 0 0.5rem;
    :hover{
        text-decoration: none;
    }
`

export default Header;