import * as api from "../api"
import * as constants from "./constants";

export const getAllOffres = async () => {
    let response = {
        data: null,
        errors: null
    }

    let res

    try {
        res = await api.getAllOffres()
        response.data = res.data
    } catch (error) {
        response.errors = {...response.errors, server_error:(await constants.errors()).internalError}
    }

    return response
}