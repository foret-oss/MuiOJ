import loginType from '@constants/login/loginType'
import conf from "@config/conf";

interface RestForm {
  [key: string]: string
}

const Endpoint = {
  emailLogin: "/user/login",
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
    return fetch(`${conf.baseUrl}${url}`, opts).then((result) =>
      result.json()
    )
  } catch ({ response }) {
    console.log(response);
    throw Error("send http request failed");
  }
};

export default {
  [loginType.Email]: async (form: RestForm, service: string): Promise<string> => {
    return wrapLoginRequest(Endpoint.emailLogin, {
      email: form.Email,
      password: form.Password,
    });
  },
};
