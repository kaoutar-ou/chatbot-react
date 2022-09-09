import i18next from '../../i18n'



export const errors = async () => {
    let internalError = await i18next.t('internalError')
    return {
        internalError : internalError
    }
}