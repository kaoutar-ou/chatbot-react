import * as api from "../api";
import * as constants from "./constants"

export const verifyCandidatInfos = async (candidat_infos) => {
  const candidat_infos_reference = {
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    calendar: "",
    comment: "",
  };

  let errors = {};

  // Format
  if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(candidat_infos.email)) {
    errors["email"] = (await constants.formatErrors()).emailFormatError;
  }

  if(!/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/.test(candidat_infos.telephone)) {
    errors["telephone"] = (await constants.formatErrors()).telephoneFormatError;
  }

  // Undefined / Empty
  if (
    candidat_infos.nom === undefined ||
    candidat_infos.nom === ""
  ) {
    errors["nom"] = (await constants.emptyErrors()).nomEmptyError;
  }

  if (
    candidat_infos.prenom === undefined ||
    candidat_infos.prenom === ""
  ) {
    errors["prenom"] = (await constants.emptyErrors()).prenomEmptyError;
  }

  if (candidat_infos.email === undefined || candidat_infos.email === "") {
    errors["email"] = (await constants.emptyErrors()).emailEmptyError;
  }

  if (candidat_infos.telephone === undefined || candidat_infos.telephone === "") {
    errors["telephone"] = (await constants.emptyErrors()).telephoneEmptyError;
  }

  if (candidat_infos.adresse === undefined || candidat_infos.adresse === "") {
    errors["adresse"] = (await constants.emptyErrors()).adresseEmptyError;
  }

  // Length
  if (
    [...candidat_infos?.nom].length < 3 ||
    [...candidat_infos.nom].length > 30
  ) {
    errors["nom"] = (await constants.lengthErrors()).nomLengthError;
  }

  if (
    [...candidat_infos?.prenom].length < 3 ||
    [...candidat_infos.prenom].length > 30
  ) {
    errors["prenom"] =
    (await constants.lengthErrors()).prenomLengthError;
  }

  if ([...candidat_infos?.adresse].length < 10) {
    errors["adresse"] = (await constants.lengthErrors()).minAdresseLengthError;
  }

  if ([...candidat_infos?.adresse].length > 75) {
    errors["adresse"] = (await constants.lengthErrors()).maxAdresseLengthError;
  }

  if ([...candidat_infos?.telephone].length < 10) {
    errors["telephone"] =
    (await constants.lengthErrors()).minTelephoneLengthError;
  }

  if ([...candidat_infos?.telephone].length > 14) {
    errors["telephone"] =
    (await constants.lengthErrors()).maxTelephoneLengthError;
  }

  if ([...candidat_infos?.comment].length > 255) {
    errors["comment"] = (await constants.lengthErrors()).commentLengthError;
  }

  let comment =
  (await constants.errors()).goBackError;

  if (Object.keys(errors).length > 0) {
     errors = { ...errors, comment: comment };
  }
  return errors;
};

export const saveCandidat = async (candidat_infos) => {
  let response = {
    data: {},
    errors: {},
  };

  console.log(candidat_infos)
  let res;

  let server_error_message =
  (await constants.errors()).internalError;
  let comment =
  (await constants.errors()).goBackError;

  response.errors = await verifyCandidatInfos(candidat_infos);
  
  if (candidat_infos.calendar === undefined || candidat_infos.calendar === "") {
    response.errors["calendar"] = 
    (await constants.errors()).calendarError;
  }

  if (Object.keys(response.errors).length > 0) {
    if (response.errors["calendar"] === "") {
      response.errors = { ...response.errors, comment: comment };
    }
    return response;
  }

  try {
    res = await api.saveCandidat(candidat_infos);
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
