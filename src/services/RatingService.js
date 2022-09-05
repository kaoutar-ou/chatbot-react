import * as api from "../api"

export const saveRating = async (rating) => {
    console.log(rating)
    await api.saveRating(rating)

    let response = {
        data: {},
        errors: {},
    };

    let res

    let server_error_message = "Nous sommes désolés, nous avons rencontré une erreur interne !";

    try {
        res = await api.saveRating(rating)
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