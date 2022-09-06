import * as api from "../api";

export const getBotResponse = async (user_message) => {
    // console.log(user_message)
    // await api.getBotResponse(user_message)

    let response = {
        data: {},
        errors: {},
    };

    let res

    let server_error_message = "Nous sommes désolés, nous avons rencontré une erreur interne !";

    try {
        res = await api.getBotResponse({user_message})
        console.log(res);
        if (res?.data?.error != null && res?.data?.error !== undefined) {
          response.errors = { ...response.errors, server_error: res.data.error };
        } else {
          response.data = res.data;
        }
      } catch (error) {
        console.log(error);
        response.errors = {
          ...response.errors,
          server_error: res?.data?.error ? res.data.error : server_error_message,
        };
      }
    
    return response;
}