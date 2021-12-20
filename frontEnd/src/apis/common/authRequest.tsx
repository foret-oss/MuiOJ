import registerType from "@src/constants/register/registerType";
import conf from "@config/conf";
import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router";

const RequestWithAuth = async (
  url: string,
  opts: RequestInit = {},
//   jsonData: Record<string, unknown>
): Promise<string> => {
  //initialize fetch options
  opts.mode = "cors"
  opts.headers = Object.assign (opts.headers ? opts.headers : {}, {
    "Authorization": window.sessionStorage.getItem("token") || ''
  })
  if (window.sessionStorage.getItem("token") == undefined) {
    console.log("未登录需重新登录")
    const navigate = useNavigate();
    navigate('/login');
  }
  try {
    const data = await fetch(`${conf.baseUrl}${url}`, opts).then((result) =>
      result.json()
    )
    console.log("request body:", opts)
    console.log("success response:",data)
    return data
  } catch ({ response }) {
    console.log("request body(error):", opts)
    console.log("request url(error):", `${conf.baseUrl}${url}`)
    throw Error("send http request failed")
  }
};

export default RequestWithAuth


