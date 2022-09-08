import * as api from "../api"
import i18next from '../i18n'

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
    } catch (error) {
        response.errors = {...response.errors, server_error:"Nous sommes désolés, nous avons rencontré une erreur interne !"}
    }

    return response
}