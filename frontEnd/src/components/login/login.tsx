import React, { FunctionComponent, useState } from "react";
import color from "@styles/color/color";
import { Global, css } from "@emotion/react";
import { Button, Card, Tab, Tabs, TextField } from "@mui/material";
import styled from "@emotion/styled";
import LoginType from "@constants/login/loginType";
import useStyles from "@styles/login/login"
import loginText from "@constants/login/loginText";
import loginMethod from "@apis/login/rest";
import { loginMessage } from "@apis/login/rest"
import Snackbar from '@mui/material/Snackbar';
import { createBrowserHistory } from "history";
import { Link } from 'react-router-dom'

//路由有问题，不能在点击时就跳转，需要刷新一次在跳转

const isWidthLimited = document.body.offsetWidth > 400;

const Login: FunctionComponent<unknown> = () => {
  return (
    <Main id="Container">
      <Global
        styles={css`
          body {
            margin: 0;
            font-family: Gilroy-Medium, Tahoma, PingFangSC-Regular,
              Microsoft Yahei, Myriad Pro, Hiragino Sans GB, sans-serif;
          }
        `}
      />
      <LoginForm />
    </Main>
  );
};

const Main = styled.div`
  height: ${window.innerHeight}px;
  background-image: ${color.backgroundColor};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginForm: FunctionComponent<unknown> = () => {
  const [loginType, setLoginType] = useState(LoginType.Email);

  //弹框
  const [open,setOpen] = React.useState(false)
  const [snackbarMessage,setSnackbarMessage] = React.useState('')

  const tabIndex = {
    [LoginType.Email]: 1,
    [LoginType.Username]: 0,
  };
  const classes = useStyles(isWidthLimited)
  const loginFieldText = loginText[loginType]
  let history = createBrowserHistory();

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
};

  const loginForm = loginFieldText.map((item) => {
    console.log(item);
    return (
      <LoginInputBlock key={item}>
        <LoginInputArea
          id={item}
          label={item}
          type={item === 'password' ? 'password' : ''}
          variant={"outlined"}
        ></LoginInputArea>

        {/* 弹框组件 */}
        <Snackbar
          open={open}
          autoHideDuration={1500}
          onClose={handleClose}
          message={snackbarMessage}
        />
      </LoginInputBlock>
    );
  });


  const login = () => {
    const opts: { [key: string]: string } = {};
    for (const id of loginFieldText) {
      const ele = document.querySelector(`#${id}`) as HTMLInputElement;
      const value = ele?.value;
      opts[id] = value;
    }
    loginMethod[loginType](opts);
    console.log("loginMessage:", loginMessage)

    //处理登录token及弹框数据
    if (loginMessage.code === 200) {
      window.sessionStorage.setItem('token', loginMessage.token.toString())
      //有问题，不能及时渲染
      setSnackbarMessage("Login Succesfully!")
      setOpen(true)
      window.sessionStorage.setItem("loginData",JSON.stringify(loginMessage))
      history.push('./')
    }
    else {
      setOpen(true)
      setSnackbarMessage("Login Error!") 
    }
  };


  return (
    <FormLayout>
      <H2>登录MuiOJ</H2>
      {/* <Logo src={logo} /> */}
      <TabList>
        <Tabs className={classes.tabs} value={tabIndex[loginType]}>
          <Tab
            label="用户名"
            onClick={() => setLoginType(LoginType.Username)}
            className={classes.tabs}
          />
          <Tab
            label="邮箱"
            onClick={() => setLoginType(LoginType.Email)}
            className={classes.tabs}
          />
          {/* <Tab
          label="Lark认证"
          onClick={() => setLoginType(LoginType.LarkOauth)}
          className={classes.default}
        /> */}
        </Tabs>
      </TabList>
      {loginForm}
      <LoginSubmitButton
        onClick={() => login()}
        className={classes.root}
        variant="text"
        disableFocusRipple
      >
        Next
      </LoginSubmitButton>
      <RegisterButton><Link to={'/register'} style={{textDecoration: "none", color:"#1976d2"}}>Register</Link></RegisterButton>
      <LoginSwitch></LoginSwitch>
    </FormLayout>
  );
};


export const loginData = loginMessage

const TabList = styled.div`
  margin-bottom: 10px;
`

const H2 = styled.h2`
  font-weight: 600;
  font-size: ${isWidthLimited ? "auto" : "4vmin"};
`;

const FormLayout = styled(Card)`
  padding: 0 30px 30px 30px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: auto;
  transition: height 0.5s;
`;

const LoginInputArea = styled(TextField)`
  margin: 0.5rem 0;
  max-width: 400px;
  position: relative;
`;


const LoginSubmitButton = styled(Button)`
  margin: 2rem 0 1rem;
  padding-right: 15rem;
  background-color: "#1e68f9"
`;

const RegisterButton = styled(Button)`
 margin-left: 13rem;
 margin-top: -3.5rem;
`

const LoginSwitch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  max-width: 300px;
`;

const LoginInputBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default Login;
