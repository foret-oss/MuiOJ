import registerType from "@src/constants/register/registerType";
import conf from "@config/conf";
import React from 'react'
import Snackbar from '@mui/material/Snackbar';

// interface RestForm {
//   [key: string]: string
// } 



const getProblemRequest = async (
  url: string
//   jsonData: Record<string, unknown>
): Promise<string> => {
  //initialize fetch options
  const opts: RequestInit = {
    method: "GET",
    mode: "cors",
    headers: {
      "Authorization": window.sessionStorage.getItem("token") || ''
    }
  };
  try {
    const data = await fetch(`${conf.baseUrl}${url}`, opts).then((result) =>
      result.json()
    )
    console.log("request body:", opts.body)
    console.log("success resbouse:",data)
    return data
  } catch ({ response }) {
    console.log("request body:", opts)
    throw Error("send http request failed")
  }
};

export default getProblemRequest

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


