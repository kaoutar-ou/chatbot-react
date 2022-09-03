export const verifyClientInfos = (client_infos) => {
    const client_infos_reference = {
        raison_sociale: "",
        email: "",
        telephone: "",
        adresse: "",
        service: "",
        comment: "",
    }

    let errors = {
        raison_sociale: "",
        email: "",
        telephone: "",
        adresse: "",
        service: "",
        comment: "",
    }

    // TODO if errors .. page 5 with .. return to previous pages

    // Undefined / Empty 
    if(client_infos.raison_sociale === undefined || client_infos.raison_sociale === "") {
        errors["raison_sociale"] = "Vous devez remplir la raison sociale"
    }

    if(client_infos.email === undefined || client_infos.email === "") {
        errors["email"] = "Vous devez fournir votre email"
    }

    if(client_infos.telephone === undefined || client_infos.telephone === "") {
        errors["telephone"] = "Vous devez fournir votre numéro de telephone"
    }

    if(client_infos.adresse === undefined || client_infos.adresse === "") {
        errors["adresse"] = "Vous devez fournir votre adresse"
    }

    if(client_infos.service === undefined || client_infos.service === "") {
        errors["service"] = "Vous devez séléctionner un service"
    }

    // XXX le commentaire n est pas obligatoire
    // TODO trim
    // TODO cette condition en real time .. tester sur le nombre des caractères
    // Length
    if([...client_infos?.raison_sociale].length < 1 || [...client_infos.raison_sociale].length > 30) {
        errors["raison_sociale"] = "Votre raison sociale doit être comprise entre 1 et 30 caractères"
    }

    if([...client_infos?.adresse].length < 10) {
        errors["adresse"] = "Votre adresse doit être supérieure à 10 caractères"
    }

    if([...client_infos?.adresse].length > 75) {
        errors["adresse"] = "Votre adresse doit être inférieure à 75 caractères"
    }

    if([...client_infos?.telephone].length < 10) {
        errors["telephone"] = "Votre numéro de téléphone doit être supérieur ou égal à dix caractères"
    }

    if([...client_infos?.telephone].length > 13) {
        errors["telephone"] = "Votre numéro de téléphone doit être inférieur ou égal à 13 caractères"
    }

    if([...client_infos?.comment].length > 255) {
        errors["comment"] = "Veuillez ne pas dépasser 255 caractères"
    }

    // TODO email verification
    // TODO service existant

    return errors
}