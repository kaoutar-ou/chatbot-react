import i18next from '../../i18n'



export const errors = async () => {
    let internalError = await i18next.t('internalError')
    let goBackError = await i18next.t('goBackError')
    let calendarError = await i18next.t('calendarError')
    let tokenError = await i18next.t('tokenError')
    return {
        internalError,
        goBackError,
        calendarError,
        tokenError
    }
}

export const formatErrors = async () => {
    let emailFormatError = await i18next.t('formatError.email')
    let telephoneFormatError = await i18next.t('formatError.telephone')
    let enterNumberFormatError = await i18next.t('formatError.enterNumber')
    return {
        emailFormatError,
        telephoneFormatError,
        enterNumberFormatError,
    }
}


export const emptyErrors = async () => {
    let emailEmptyError = await i18next.t('emptyError.email')
    let telephoneEmptyError = await i18next.t('emptyError.telephone')
    let nomEmptyError = await i18next.t('emptyError.nom')
    let prenomEmptyError = await i18next.t('emptyError.prenom')
    let adresseEmptyError = await i18next.t('emptyError.adresse')
    let serviceEmptyError = await i18next.t('emptyError.service')
    let raisonSocialeEmptyError = await i18next.t('emptyError.raisonSociale')
    let documentEmptyError = await i18next.t('emptyError.document')
    let offreEmptyError = await i18next.t('emptyError.offre')
    let typeCandidatureEmptyError = await i18next.t('emptyError.typeCandidature')
    let nombreEmployesEmptyError = await i18next.t('emptyError.nombreEmployes')
    let partenariatEmptyError = await i18next.t('emptyError.partenariat')
    let domaineExpertiseEmptyError = await i18next.t('emptyError.domaineExpertise')
    let nombrePersonnesARecruterEmptyError = await i18next.t('emptyError.nombrePersonnesARecruter')
    return {
        emailEmptyError,
        telephoneEmptyError,
        nomEmptyError,
        prenomEmptyError,
        adresseEmptyError,
        serviceEmptyError,
        raisonSocialeEmptyError,
        documentEmptyError,
        offreEmptyError,
        typeCandidatureEmptyError,
        nombreEmployesEmptyError,
        partenariatEmptyError,
        domaineExpertiseEmptyError,
        nombrePersonnesARecruterEmptyError
    }
}

export const lengthErrors = async () => {
    let raisonSocialeLengthError = await i18next.t('lengthError.raisonSociale')
    let minAdresseLengthError = await i18next.t('lengthError.adresse.min')
    let maxAdresseLengthError = await i18next.t('lengthError.adresse.max')
    let minTelephoneLengthError = await i18next.t('lengthError.telephone.min')
    let maxTelephoneLengthError = await i18next.t('lengthError.telephone.max')
    let commentLengthError = await i18next.t('lengthError.comment')
    let nomLengthError = await i18next.t('lengthError.nom')
    let prenomLengthError = await i18next.t('lengthError.prenom')
    let nePasDepasserLengthError = await i18next.t('lengthError.nePasDepasser')
    return {
        raisonSocialeLengthError,
        minAdresseLengthError,
        maxAdresseLengthError,
        minTelephoneLengthError,
        maxTelephoneLengthError,
        commentLengthError,
        nomLengthError,
        prenomLengthError,
        nePasDepasserLengthError
    }
}

// export const errors = async () => {
//     let internalError = await i18next.t('internalError')
//     let emailFormatError = await i18next.t('formatError.email')
//     let telephoneFormatError = await i18next.t('formatError.telephone')

//     let emailEmptyError = await i18next.t('emptyError.email')
//     let telephoneEmptyError = await i18next.t('emptyError.telephone')
//     let nomEmptyError = await i18next.t('emptyError.nom')
//     let prenomEmptyError = await i18next.t('emptyError.prenom')
//     let adresseEmptyError = await i18next.t('emptyError.adresse')
//     let serviceEmptyError = await i18next.t('emptyError.service')
//     let raisonSocialeEmptyError = await i18next.t('emptyError.raisonSociale')

//     let raisonSocialeLengthError = await i18next.t('lengthError.raisonSociale')
//     let minAdresseLengthError = await i18next.t('lengthError.adresse.min')
//     let maxAdresseLengthError = await i18next.t('lengthError.adresse.max')
//     let minTelephoneLengthError = await i18next.t('lengthError.telephone.min')
//     let maxTelephoneLengthError = await i18next.t('lengthError.telephone.max')
//     let commentLengthError = await i18next.t('lengthError.comment')
//     let goBackError = await i18next.t('goBackError')
//     return {
//         internalError,
//         emailFormatError,
//         telephoneFormatError,
//         emailEmptyError,
//         telephoneEmptyError,
//         nomEmptyError,
//         prenomEmptyError,
//         adresseEmptyError,
//         serviceEmptyError,
//         raisonSocialeEmptyError,
//         raisonSocialeLengthError,
//     }
// }