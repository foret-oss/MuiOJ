import React, { FunctionComponent, useState } from "react";
import color from "@styles/color/color";
import { Global, css } from "@emotion/react";
import { Button, Card, TextField, IconButton } from "@mui/material";
import styled from "@emotion/styled";
import RegisterType from "@constants/register/registerType";
import useStyles from "@styles/login/login"
import registerText from "@constants/register/registerText";
import RegisterMethod from "@apis/register/register"
import { registerMessage } from "@apis/register/register"
import Snackbar from '@mui/material/Snackbar';
import { createBrowserHistory } from "history";
//import CloseIcon from '@mui/icons-material/Close';

const isWidthLimited = document.body.offsetWidth > 400;

const Register: FunctionComponent<unknown> = () => {
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
            <RegisterForm />
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

const RegisterForm: FunctionComponent<unknown> = () => {
    const registerType = RegisterType.Register;

    //弹框
    const [open, setOpen] = React.useState(false);
    const [snackbarMessage,setSnackbarMessage] = React.useState("")
    
    const classes = useStyles(isWidthLimited);
    const registerFieldText = registerText[registerType]
    let history = createBrowserHistory();

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        console.log("openfalse:", open)
    };



    const RegisterForm = registerFieldText.map((item) => {
        return (
            <RegisterInputBlock key={item}>
                <RegisterInputArea
                    id={item}
                    label={item}
                    variant={"outlined"}
                ></RegisterInputArea>
                <Snackbar
                    open={open}
                    autoHideDuration={1500}
                    onClose={handleClose}
                    message={snackbarMessage}
                />
            </RegisterInputBlock>
        );
    });


    const register = () => {
        const opts: { [key: string]: string } = {};
        for (const id of registerFieldText) {
            const ele = document.querySelector(`#${id}`) as HTMLInputElement;
            const value = ele?.value;
            opts[id] = value;
        }
        //console.log("registerMessage",registerMessage);
        //console.log("registerMethod[registerType](opts):",opts)
        RegisterMethod[registerType](opts);
        if (registerMessage.code === 200) {
            setSnackbarMessage("Register Success!")
            setOpen(true)
            history.push("/login");
        }
        else  {
            setSnackbarMessage("Register Error!")
            setOpen(true)
            console.log("snackbarMessage:",snackbarMessage);
            console.log("open", open)
        }

    };

    return (
        <FormLayout>
            <H2>注册MuiOJ</H2>
            {/* <Logo src={logo} /> */}
            {RegisterForm}
            <RegisterSubmitButton
                onClick={() => register()}
                className={classes.root}
                variant="text"
                disableFocusRipple
            >
                Next
            </RegisterSubmitButton>
            <RegisterSwitch></RegisterSwitch>
        </FormLayout>
    );
};


const H2 = styled.h2`
  font-weight: 600;
  font-size: ${isWidthLimited ? "auto" : "4vmin"};
`;

const FormLayout = styled(Card)`
  padding: 30px 30px 10px 30px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: auto;
  transition: height 0.5s;
`;

const RegisterInputArea = styled(TextField)`
  margin: 0.5rem 0;
  max-width: 400px;
  position: relative;
`;

const RegisterSubmitButton = styled(Button)`
  margin: 1rem 0 1rem;
`;

const RegisterSwitch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  max-width: 300px;
`;

const RegisterInputBlock = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default Register;
