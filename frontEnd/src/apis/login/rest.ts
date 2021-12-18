import loginType from '@constants/login/loginType'
import conf from "@config/conf";

interface RestForm {
  [key: string]: string
}

const Endpoint = {
  emailLogin: "/user/login?type=email",
  usernameLogin: "/user/login?type=username",
};

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
    console.log("resposeData：",data)
    console.log("request body:", opts.body)
    return data
  } catch ({ response }) {
    console.log(response);
    throw Error("send http request failed");
  }
};

export default {
  [loginType.Email]: async (form: RestForm): Promise<string> => {
    console.log("Body form", form)
    return wrapLoginRequest(Endpoint.emailLogin, {
      email: form.email,
      password: form.password,
    });
  },
  [loginType.Username]: async (form: RestForm): Promise<string> => {
    console.log("Body form", form)
    return wrapLoginRequest(Endpoint.usernameLogin, {
      username: form.username,
      password: form.password,
    });
  },
};
