import React, { FunctionComponent, useState } from "react";
import color from "@styles/color/color";
import { Global, css } from "@emotion/react";
import { Button, Card, Tab, Tabs, TextField } from "@mui/material";
import styled from "@emotion/styled";
import LoginType from "@constants/login/loginType";
import useStyles from "@styles/login/login"
import loginText from "@constants/login/loginText";
import loginMethod from "@apis/login/rest";
import {loginMessage} from "@apis/login/rest"
import { createBrowserHistory } from "history";

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
  //const [loginType, setLoginType] = useState(LoginType.Username);
  const tabIndex = {
    [LoginType.Email]: 1,
    [LoginType.Username]: 0,
    // [LoginType.LarkOauth]: 3,
  };
  const classes = useStyles(isWidthLimited);
  const loginFieldText = loginText[loginType];
  let history = createBrowserHistory();
  const loginForm = loginFieldText.map((item) => {
    console.log(item);
    return (
      <LoginInputBlock key={item}>
        <LoginInputArea
          id={item}
          label={item}
          variant={"outlined"}
        ></LoginInputArea>
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
    // console.log("loginMethod[loginType](opts):",opts)
    // console.log("[loginType]:",loginType)
    loginMethod[loginType](opts);
    console.log("loginMessage:",loginMessage)
    if (loginMessage.code === 200) {
      window.sessionStorage.setItem('token',loginMessage.token.toString())
      history.push('./')
    }
  };

  return (
    <FormLayout>
      <H2>登录Unique Studio</H2>
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
      <LoginSwitch></LoginSwitch>
    </FormLayout>
  );
};

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

const QuerySms = styled(Button)`
  position: absolute;
  right: 0;
  min-width: 100px;
  height: calc(100% - 1rem);
`

const LoginSubmitButton = styled(Button)`
  margin: 2rem 0 1rem;
`;

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
