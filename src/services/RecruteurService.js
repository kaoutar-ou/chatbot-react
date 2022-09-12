import * as api from "../api";
import * as constants from "./constants";

export const verifyRecruteurInfos = async (recruteur_infos) => {
  const recruteur_infos_reference = {
    raison_sociale: "",
    email: "",
    telephone: "",
    adresse: "",
    nombre_employes: "",
    nombre_personnes_a_recruter: "",
    domaine_expertise: "",
    comment: "",
  };

  const max_nombre_employes = 1000
  const max_nombre_personnes_a_recruter = 100

  let errors = {};

  // Format
  if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(recruteur_infos.email)) {
    errors["email"] = (await constants.formatErrors()).emailFormatError;
  }

  if(!/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/.test(recruteur_infos.telephone)) {
    errors["telephone"] = (await constants.formatErrors()).telephoneFormatError;
  }

  // Undefined / Empty
  if (
    recruteur_infos.raison_sociale === undefined ||
    recruteur_infos.raison_sociale === ""
  ) {
    errors["raison_sociale"] = (await constants.emptyErrors()).raisonSocialeEmptyError;
  }

  if (recruteur_infos.email === undefined || recruteur_infos.email === "") {
    errors["email"] = (await constants.emptyErrors()).emailEmptyError;
  }

  if (recruteur_infos.telephone === undefined || recruteur_infos.telephone === "") {
    errors["telephone"] = (await constants.emptyErrors()).telephoneEmptyError;
  }

  if (recruteur_infos.adresse === undefined || recruteur_infos.adresse === "") {
    errors["adresse"] = (await constants.emptyErrors()).adresseEmptyError;
  }

  if (recruteur_infos.nombre_employes === undefined || recruteur_infos.nombre_employes === "") {
    errors["nombre_employes"] = (await constants.emptyErrors()).nombreEmployesEmptyError;
  }

  if (recruteur_infos.nombre_personnes_a_recruter === undefined || recruteur_infos.nombre_personnes_a_recruter === "") {
    errors["nombre_personnes_a_recruter"] = (await constants.emptyErrors()).nombrePersonnesARecruterEmptyError;
  }

  if (recruteur_infos.domaine_expertise === undefined || recruteur_infos.domaine_expertise === "") {
    errors["domaine_expertise"] = (await constants.emptyErrors()).domaineExpertiseEmptyError;
  }

  // Length
  if (
    [...recruteur_infos?.raison_sociale].length < 1 ||
    [...recruteur_infos.raison_sociale].length > 30
  ) {
    errors["raison_sociale"] =
    (await constants.lengthErrors()).raisonSocialeLengthError;
  }

  if ([...recruteur_infos?.adresse].length < 10) {
    errors["adresse"] = (await constants.lengthErrors()).minAdresseLengthError;
  }

  if ([...recruteur_infos?.adresse].length > 75) {
    errors["adresse"] = (await constants.lengthErrors()).maxAdresseLengthError;
  }

  if ([...recruteur_infos?.telephone].length < 10) {
    errors["telephone"] =
    (await constants.lengthErrors()).minTelephoneLengthError;
  }

  if ([...recruteur_infos?.telephone].length > 15) {
    errors["telephone"] =
    (await constants.lengthErrors()).maxTelephoneLengthError;
  }

  if ([...recruteur_infos?.comment].length > 255) {
    errors["comment"] = (await constants.lengthErrors()).commentLengthError;
  }

  // TODO Force number in inputs from begening
  if (isNaN(recruteur_infos.nombre_personnes_a_recruter) || recruteur_infos.nombre_personnes_a_recruter.trim() === "") {
    errors["nombre_personnes_a_recruter"] = (await constants.formatErrors()).enterNumberFormatError;
  }
  
  if (isNaN(recruteur_infos.nombre_employes) || recruteur_infos.nombre_employes.trim() === "") {
    errors["nombre_employes"] = (await constants.formatErrors()).enterNumberFormatError;
  }

  if (recruteur_infos.nombre_personnes_a_recruter > max_nombre_personnes_a_recruter) {
    errors["nombre_personnes_a_recruter"] = (await constants.lengthErrors()).nePasDepasserLengthError + max_nombre_personnes_a_recruter ;
  }
  
  if (recruteur_infos.nombre_employes > max_nombre_employes) {
    errors["nombre_employes"] = (await constants.lengthErrors()).nePasDepasserLengthError + max_nombre_employes ;
  }

  let comment =
  (await constants.errors()).goBackError;

  if (Object.keys(errors).length > 0) {
     errors = { ...errors, comment: comment };
  }

  return errors;
};

export const saveRecruteur = async (recruteur_infos) => {
  let response = {
    data: {},
    errors: {},
  };

  let res;

  let server_error_message =
  (await constants.errors()).internalError;
  let comment =
  (await constants.errors()).goBackError;

  response.errors = await verifyRecruteurInfos(recruteur_infos);
  
  if (recruteur_infos.calendar === undefined || recruteur_infos.calendar === "") {
    response.errors["calendar"] = (await constants.errors()).calendarError;
  }

  if (Object.keys(response.errors).length > 0) {
    if (response.errors["calendar"] === "") {
      response.errors = { ...response.errors, comment: comment };
    }
    return response;
  }

  try {
    res = await api.saveRecruteur(recruteur_infos);
    if (res.data.error != null && res.data.error !== undefined) {
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
};

// TODO .. websiiiiiteee