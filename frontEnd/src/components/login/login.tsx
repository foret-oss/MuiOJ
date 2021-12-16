import React, { FunctionComponent, useState } from "react";
import color from "@color/color";
import { Global, css } from "@emotion/react";
import { Button, Card, Tab, Tabs, TextField } from "@mui/material";
import { makeStyles } from "@mui/material";
import styled from "@emotion/styled";
import font from "../font/ScheherazadeNewBold.woff2";
import LoginType from "@constant/loginType";
import loginText from "@constant/login/";
import loginMethod from "@api/rest";

const isWidthLimited = document.body.offsetWidth > 400;

const useStyles = makeStyles(() => ({
  root: {
    background: color.buttonColor,
    "&:hover": {
      background: color.buttonColor,
    },
    color: "white",
    border: 0,
    borderRadius: 3,
    height: 48,
    padding: "0 30px",
  },
  default: {
    color: color.defaultSvgColor,
    backgroundColor: "transparent",
    minHeight: "30px",
    padding: isWidthLimited ? "0 10px" : "0 5px",
    minWidth: isWidthLimited ? "50px" : "auto",
    marginRight: isWidthLimited ? "20px" : 0,
    fontSize: isWidthLimited ? "auto" : "4vmin",
  },
  tabs: {
    minHeight: "30px",
    color: color.defaultSvgColor,
    backgroundColor: "transparent",
    padding: isWidthLimited ? "0 10px" : "0 5px",
    minWidth: isWidthLimited ? "50px" : "auto",
    marginRight: isWidthLimited ? "20px" : 0,
    fontSize: isWidthLimited ? "auto" : "4vmin",
  },
  querySms :{
    "&:hover": {
      background: 'transparent',
    }
  }
}));

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
          @font-face {
            font-family: "Flower Font";
            src: url("${font}") format("woff2");
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
  const [loginType, setLoginType] = useState(LoginType.SMS);
  const tabIndex = {
    [LoginType.Phone]: 0,
    [LoginType.Email]: 1,
    [LoginType.SMS]: 2,
    // [LoginType.LarkOauth]: 3,
  };
  const classes = useStyles();
  const loginFieldText = loginText[loginType];
  const loginForm = loginFieldText.map((item) => {
    console.log(item);
    return (
      <LoginInputBlock key={item}>
        <LoginInputArea
          id={item}
          label={item}
          variant={"outlined"}
        ></LoginInputArea>
        {item == '验证码' && <QuerySms onClick={() => methodQuerySms()} className={classes.querySms} variant="text">获取验证码</QuerySms>}
      </LoginInputBlock>
    );
  });
  
  const methodQuerySms = () => {
    if(loginType === LoginType.SMS){
      console.log("获取短信");
      console.log("手机号:")
    }else{
      console.log("系统错误,请刷新页面");
      
    }
  }

  const login = () => {
    const opts: { [key: string]: string } = {};
    for (const id of loginFieldText) {
      const ele = document.querySelector(`#${id}`) as HTMLInputElement;
      const value = ele?.value;
      opts[id] = value;
    }
    loginMethod[loginType](opts, "null");
  };

  return (
    <FormLayout>
      <H2>登录Unique Studio</H2>
      {/* <Logo src={logo} /> */}
      <TabList>
      <Tabs className={classes.tabs} value={tabIndex[loginType]}>
        <Tab
          label="手机号"
          onClick={() => setLoginType(LoginType.Phone)}
          className={classes.tabs}
        />
        <Tab
          label="邮箱"
          onClick={() => setLoginType(LoginType.Email)}
          className={classes.tabs}
        />
        <Tab
          label="短信验证码"
          onClick={() => setLoginType(LoginType.SMS)}
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
