import * as api from "../api"
import * as constants from "./constants"

export const getAllServices = async () => {
    let response = {
        data: null,
        errors: null
    }

    console.log((await constants.errors()).internalError)

    let internalError = (await constants.errors()).internalError

    let res

    try {
        res = await api.getAllServices()
        response.data = res.data
    } catch (error) {
        // response.errors = {...response.errors, server_error:"Nous sommes désolés, nous avons rencontré une erreur interne !"}
        response.errors = {...response.errors, server_error: internalError}
    }

    return response
}