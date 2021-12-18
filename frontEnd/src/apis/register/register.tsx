import registerType from "@src/constants/register/registerType";
import conf from "@config/conf";
import React from 'react'
import Snackbar from '@mui/material/Snackbar';

interface RestForm {
  [key: string]: string
}

const Endpoint = {
  register: "/user/register",
};

let registerData = {
    code:0,
    message:''
}

const wrapLoginRequest = async (
  url: string,
  jsonData: Record<string, unknown>
): Promise<string> => {
  //initialize fetch options
  const opts: RequestInit = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  };
  try {
    const data = await fetch(`${conf.baseUrl}${url}`, opts).then((result) =>
      result.json()
    )
    registerData.code = data.code;
    registerData.message = data.message
    console.log("resposeData：",registerData)
    console.log("request body:", opts.body)
    window.sessionStorage.setItem("registerData:",JSON.stringify(data) )
    return data
  } catch ({ response }) {
    console.log(response);
    throw Error("send http request failed");
  }
};

export default {
  [registerType.Register]: async (form: RestForm): Promise<string> => {
    //console.log("Body form", form)
    return wrapLoginRequest(Endpoint.register, {
        username: form.username,
        email: form.email,
        password: form.password,
    });
  },
};


export const registerMessage = registerData


