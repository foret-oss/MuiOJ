import registerType from "@src/constants/register/registerType";
import conf from "@config/conf";
import React from 'react'
import Snackbar from '@mui/material/Snackbar';

// interface RestForm {
//   [key: string]: string
// } 



const RequestWithAuth = async (
  url: string,
  method: string,
//   jsonData: Record<string, unknown>
): Promise<string> => {
  //initialize fetch options
  const opts: RequestInit = {
    method: method,
    mode: "cors",
    headers: {
      "Authorization": window.sessionStorage.getItem("token") || ''
    }
  };
  try {
    const data = await fetch(`${conf.baseUrl}${url}`, opts).then((result) =>
      result.json()
    )
    return data
  } catch ({ response }) {
    console.log("request body:", opts)
    throw Error("send http request failed")
  }
};

export default RequestWithAuth

// export default {
//   [registerType.Register]: async (form: RestForm): Promise<string> => {
//     //console.log("Body form", form)
//     return wrapLoginRequest(getProblem, {
//         username: form.username,
//         email: form.email,
//         password: form.password,
//     });
//   },
// };


