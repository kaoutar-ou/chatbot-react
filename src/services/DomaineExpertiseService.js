import * as api from "../api"

export const getAllDomainesExpertise = async () => {
    let response = {
        data: null,
        errors: null
    }

    let res

    try {
        res = await api.getAllDomainesExpertise()
        response.data = res.data
    } catch (error) {
        response.errors = {...response.errors, server_error:"Nous sommes désolés, nous avons rencontré une erreur interne !"}
    }

    return response
}