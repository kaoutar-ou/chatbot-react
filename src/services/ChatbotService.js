import * as api from "../api";

export const getBotResponse = async (user_message) => {
  
    let response = {
        data: {},
        errors: {},
    };

    let res

    let server_error_message = "Nous sommes désolés, nous avons rencontré une erreur interne !";

    try {
        // res = await api.getBotResponse({user_message})
        res = await api.getBotResponse({user_message:user_message, language:"en-US"})
        if (res?.data?.error != null && res?.data?.error !== undefined) {
          response.errors = { ...response.errors, server_error: res.data.error };
        } else {
          response.data = res.data;
        }
      } catch (error) {
        response.errors = {
          ...response.errors,
          server_error: res?.data?.error ? res.data.error : server_error_message,
        };
      }
    
    return response;
}