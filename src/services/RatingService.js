import * as api from "../api"
import * as constants from "./constants";

export const saveRating = async (rating) => {

    let response = {
        data: {},
        errors: {},
    };

    let res

    let server_error_message = (await constants.errors()).internalError;

    try {
        res = await api.saveRating(rating)
        if (res?.data?.error != null && res?.data?.error !== undefined) {
          response.errors = { ...response.errors, server_error: res.data.error };
        } else {
          response.data = res.data;
        }
      } catch (error) {
        // console.log(error);
        response.errors = {
          ...response.errors,
          server_error: res?.data?.error ? res.data.error : server_error_message,
        };
      }
    
    return response;
}