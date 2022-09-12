import * as api from "../api"

import * as constants from "./constants"

export const getAllFreeCalendar = async () => {
    let response = {
        data: null,
        errors: null
    }

    let res

    // i18next.t('my.key')

    
    try {
        res = await api.getAllFreeCalendar()
        response.data = res.data
        console.log(res.data)
    } catch (error) {
        response.errors = {...response.errors, server_error:(await constants.errors()).internalError}
    }

    return response
}