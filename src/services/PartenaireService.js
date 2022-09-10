import * as api from "../api";
import * as constants from "./constants";

export const verifyPartenaireInfos = async (partenaire_infos) => {
  const partenaire_infos_reference = {
    raison_sociale: "",
    email: "",
    telephone: "",
    adresse: "",
    nombre_employes: "",
    partenariat: "",
    comment: "",
  };

  const max_nombre_employes = 1000

  let errors = {};

  // Format
  if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(partenaire_infos.email)) {
    errors["email"] = (await constants.formatErrors()).emailFormatError;
  }

  if(!/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/.test(partenaire_infos.telephone)) {
    errors["telephone"] = (await constants.formatErrors()).telephoneFormatError;
  }

  // Undefined / Empty
  if (
    partenaire_infos.raison_sociale === undefined ||
    partenaire_infos.raison_sociale === ""
  ) {
    errors["raison_sociale"] = (await constants.emptyErrors()).raisonSocialeEmptyError;
  }

  if (partenaire_infos.email === undefined || partenaire_infos.email === "") {
    errors["email"] = (await constants.emptyErrors()).emailEmptyError;
  }

  if (partenaire_infos.telephone === undefined || partenaire_infos.telephone === "") {
    errors["telephone"] = (await constants.emptyErrors()).telephoneEmptyError;
  }

  if (partenaire_infos.adresse === undefined || partenaire_infos.adresse === "") {
    errors["adresse"] = (await constants.emptyErrors()).adresseEmptyError;
  }

  if (partenaire_infos.nombre_employes === undefined || partenaire_infos.nombre_employes === "") {
    errors["nombre_employes"] = (await constants.emptyErrors()).nombreEmployesEmptyError;
  }

  if (partenaire_infos.partenariat === undefined || partenaire_infos.partenariat === "") {
    errors["partenariat"] = (await constants.emptyErrors()).partenariatEmptyError;
  }

  // Length
  if (
    [...partenaire_infos?.raison_sociale].length < 1 ||
    [...partenaire_infos.raison_sociale].length > 30
  ) {
    errors["raison_sociale"] =
    (await constants.lengthErrors()).raisonSocialeLengthError;
  }

  if ([...partenaire_infos?.adresse].length < 10) {
    errors["adresse"] = (await constants.lengthErrors()).minAdresseLengthError;
  }

  if ([...partenaire_infos?.adresse].length > 75) {
    errors["adresse"] = (await constants.lengthErrors()).maxAdresseLengthError;
  }

  if ([...partenaire_infos?.telephone].length < 10) {
    errors["telephone"] =
    (await constants.lengthErrors()).minTelephoneLengthError;
  }

  if ([...partenaire_infos?.telephone].length > 13) {
    errors["telephone"] =
    (await constants.lengthErrors()).maxTelephoneLengthError;
  }

  if ([...partenaire_infos?.comment].length > 255) {
    errors["comment"] = (await constants.lengthErrors()).commentLengthError;
  }

  // TODO Force number in inputs from begening
  
  if (isNaN(partenaire_infos.nombre_employes) || partenaire_infos.nombre_employes.trim() === "") {
    errors["nombre_employes"] = (await constants.formatErrors()).enterNumberFormatError;
  }
  
  if (partenaire_infos.nombre_employes > max_nombre_employes) {
    errors["nombre_employes"] = (await constants.lengthErrors()).nePasDepasserLengthError + max_nombre_employes;
  }

  let comment =
  (await constants.errors()).goBackError;

  if (Object.keys(errors).length > 0) {
     errors = { ...errors, comment: comment };
  }
  
  return errors;
};

export const savePartenaire = async (partenaire_infos) => {
  let response = {
    data: {},
    errors: {},
  };

  let res;

  let server_error_message =
  (await constants.errors()).internalError;
  let comment =
  (await constants.errors()).goBackError;

  response.errors = await verifyPartenaireInfos(partenaire_infos);
  
  if (partenaire_infos.calendar === undefined || partenaire_infos.calendar === "") {
    response.errors["calendar"] = (await constants.errors()).calendarError;
  }

  if (Object.keys(response.errors).length > 0) {
    if (response.errors["calendar"] === "") {
      response.errors = { ...response.errors, comment: comment };
    }
    return response;
  }

  try {
    res = await api.savePartenaire(partenaire_infos);
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
